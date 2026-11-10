import { randomInt, randomUUID, createHash } from 'node:crypto';
import bcrypt from 'bcryptjs';
import cors from 'cors';
import express from 'express';
import { rateLimit } from 'express-rate-limit';
import helmet from 'helmet';
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import { publicUser } from './db.js';

export const SERVICES = [
  { id: 'artisans', title: 'Artisans' },
  { id: 'sante', title: 'Santé' },
  { id: 'veterinaire', title: 'Vétérinaire' },
  { id: 'immobilier', title: 'Immobilier' },
  { id: 'cabine', title: 'Cabine Ligne' },
  { id: 'vente', title: 'Vente Express' },
];

const phoneSchema = z.string().transform((value) => {
  const digits = value.replace(/\D/g, '');
  return digits.startsWith('225') ? digits.slice(3) : digits;
}).pipe(z.string().regex(/^\d{10}$/, 'Le numéro doit contenir 10 chiffres ivoiriens.'));

const registerSchema = z.object({
  role: z.enum(['client', 'artisan']),
  fullName: z.string().trim().min(2).max(120).optional(),
  proName: z.string().trim().min(2).max(120).optional(),
  phone: phoneSchema,
  commune: z.string().trim().min(2).max(120),
  password: z.string().min(8).max(128),
  craft: z.string().trim().max(80).optional(),
  wallet: z.string().trim().max(40).optional(),
  termsAccepted: z.boolean(),
}).superRefine((value, context) => {
  if (value.role === 'client' && !value.fullName) {
    context.addIssue({ code: 'custom', path: ['fullName'], message: 'Le nom complet est requis.' });
  }
  if (value.role === 'artisan' && !value.proName) {
    context.addIssue({ code: 'custom', path: ['proName'], message: 'Le nom professionnel est requis.' });
  }
  if (!value.termsAccepted) {
    context.addIssue({ code: 'custom', path: ['termsAccepted'], message: 'Les conditions doivent être acceptées.' });
  }
});

const authSchema = z.object({ phone: phoneSchema, password: z.string().min(1) });
const otpRequestSchema = z.object({ phone: phoneSchema });
const otpVerifySchema = z.object({ phone: phoneSchema, code: z.string().regex(/^\d{4,6}$/) });
const requestSchema = z.object({ serviceId: z.string().refine((id) => SERVICES.some((service) => service.id === id)) });
const emergencySchema = z.object({
  latitude: z.number().min(-90).max(90).optional(),
  longitude: z.number().min(-180).max(180).optional(),
});

function parse(schema, value) {
  const result = schema.safeParse(value);
  if (!result.success) {
    const error = new Error(result.error.issues[0]?.message || 'Données invalides.');
    error.status = 400;
    throw error;
  }
  return result.data;
}

function phoneWithCountryCode(phone) {
  return `+225${phone}`;
}

export function createApp({ db, jwtSecret = process.env.JWT_SECRET, nodeEnv = process.env.NODE_ENV || 'development', otpDevCode = process.env.OTP_DEV_CODE } = {}) {
  if (!db) throw new Error('Une base de données SQLite est requise.');
  if (!jwtSecret && nodeEnv === 'production') throw new Error('JWT_SECRET est obligatoire en production.');

  const secret = jwtSecret || 'local-development-secret-change-me';
  const app = express();
  const otpChallenges = new Map();
  const corsOrigins = (process.env.CORS_ORIGINS || 'http://localhost:3000,http://127.0.0.1:3000')
    .split(',').map((origin) => origin.trim()).filter(Boolean);

  app.disable('x-powered-by');
  app.use(helmet());
  app.use(cors({ origin: corsOrigins }));
  app.use(express.json({ limit: '100kb' }));

  const authenticate = (req, res, next) => {
    const token = req.headers.authorization?.match(/^Bearer (.+)$/)?.[1];
    if (!token) return res.status(401).json({ error: 'Authentification requise.' });
    try {
      const payload = jwt.verify(token, secret);
      const user = db.prepare('SELECT * FROM users WHERE id = ?').get(payload.sub);
      if (!user) return res.status(401).json({ error: 'Session invalide.' });
      req.user = user;
      next();
    } catch {
      return res.status(401).json({ error: 'Session invalide ou expirée.' });
    }
  };

  const issueSession = (user) => ({
    token: jwt.sign({ sub: user.id }, secret, { expiresIn: '7d' }),
    user: publicUser(user),
  });
  const authLimiter = rateLimit({ windowMs: 15 * 60 * 1000, limit: 10, standardHeaders: 'draft-8', legacyHeaders: false });
  const otpLimiter = rateLimit({ windowMs: 15 * 60 * 1000, limit: 5, standardHeaders: 'draft-8', legacyHeaders: false });

  app.get('/api/health', (req, res) => res.json({ status: 'ok', service: 'vitefe-api' }));
  app.get('/api/v1/services', (req, res) => res.json({ services: SERVICES }));

  app.post('/api/v1/auth/register', authLimiter, async (req, res, next) => {
    try {
      const input = parse(registerSchema, req.body);
      const phone = phoneWithCountryCode(input.phone);
      const verification = db.prepare('SELECT verified_until FROM phone_verifications WHERE phone = ?').get(input.phone);
      if (!verification || verification.verified_until < Date.now()) {
        return res.status(403).json({ error: 'Vérifiez votre numéro de téléphone avant de créer le compte.' });
      }
      const fullName = input.role === 'client' ? input.fullName : input.proName;
      const id = randomUUID();
      const passwordHash = await bcrypt.hash(input.password, 12);
      try {
        db.prepare(`INSERT INTO users (id, role, full_name, phone, commune, password_hash, craft, wallet)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?)`).run(
          id, input.role, fullName, phone, input.commune, passwordHash, input.craft || null, input.wallet || null,
        );
      } catch (error) {
        if (error.code === 'SQLITE_CONSTRAINT_UNIQUE') {
          return res.status(409).json({ error: 'Ce numéro est déjà associé à un compte.' });
        }
        throw error;
      }
      db.prepare('DELETE FROM phone_verifications WHERE phone = ?').run(input.phone);
      const user = db.prepare('SELECT * FROM users WHERE id = ?').get(id);
      res.status(201).json(issueSession(user));
    } catch (error) {
      next(error);
    }
  });

  app.post('/api/v1/auth/login', authLimiter, async (req, res, next) => {
    try {
      const input = parse(authSchema, req.body);
      const user = db.prepare('SELECT * FROM users WHERE phone = ?').get(phoneWithCountryCode(input.phone));
      if (!user || !(await bcrypt.compare(input.password, user.password_hash))) {
        return res.status(401).json({ error: 'Numéro ou mot de passe incorrect.' });
      }
      res.json(issueSession(user));
    } catch (error) {
      next(error);
    }
  });

  app.post('/api/v1/auth/otp/request', otpLimiter, (req, res, next) => {
    try {
      if (nodeEnv === 'production') {
        return res.status(503).json({ error: 'Le fournisseur SMS n’est pas encore configuré.' });
      }
      const { phone } = parse(otpRequestSchema, req.body);
      const code = otpDevCode || String(randomInt(1000, 10000));
      db.prepare(`INSERT INTO phone_verifications (phone, code_hash, expires_at, attempts, verified_until)
        VALUES (?, ?, ?, 0, NULL)
        ON CONFLICT(phone) DO UPDATE SET code_hash = excluded.code_hash, expires_at = excluded.expires_at,
          attempts = 0, verified_until = NULL`).run(
        phone, createHash('sha256').update(code).digest('hex'), Date.now() + 5 * 60 * 1000,
      );
      const response = { message: 'Si un compte existe, un code de vérification a été envoyé.' };
      if (nodeEnv !== 'production') response.developmentCode = code;
      res.json(response);
    } catch (error) {
      next(error);
    }
  });

  app.post('/api/v1/auth/otp/verify', (req, res, next) => {
    try {
      const { phone, code } = parse(otpVerifySchema, req.body);
      const challenge = db.prepare('SELECT * FROM phone_verifications WHERE phone = ?').get(phone);
      if (!challenge || challenge.expires_at < Date.now() || challenge.attempts >= 5) {
        db.prepare('DELETE FROM phone_verifications WHERE phone = ?').run(phone);
        return res.status(401).json({ error: 'Code expiré ou invalide. Demandez un nouveau code.' });
      }
      const codeHash = createHash('sha256').update(code).digest('hex');
      if (codeHash !== challenge.code_hash) {
        const attempts = challenge.attempts + 1;
        if (attempts >= 5) db.prepare('DELETE FROM phone_verifications WHERE phone = ?').run(phone);
        else db.prepare('UPDATE phone_verifications SET attempts = ? WHERE phone = ?').run(attempts, phone);
        return res.status(401).json({ error: 'Code de vérification incorrect.' });
      }
      db.prepare('UPDATE phone_verifications SET verified_until = ? WHERE phone = ?').run(Date.now() + 10 * 60 * 1000, phone);
      const user = db.prepare('SELECT * FROM users WHERE phone = ?').get(phoneWithCountryCode(phone));
      if (!user) return res.json({ verified: true });
      res.json(issueSession(user));
    } catch (error) {
      next(error);
    }
  });

  app.get('/api/v1/auth/me', authenticate, (req, res) => res.json({ user: publicUser(req.user) }));

  app.post('/api/v1/requests', authenticate, (req, res, next) => {
    try {
      const { serviceId } = parse(requestSchema, req.body);
      const id = randomUUID();
      db.prepare('INSERT INTO service_requests (id, user_id, service_id) VALUES (?, ?, ?)').run(id, req.user.id, serviceId);
      const request = db.prepare('SELECT * FROM service_requests WHERE id = ?').get(id);
      res.status(201).json({ request });
    } catch (error) {
      next(error);
    }
  });

  app.get('/api/v1/requests', authenticate, (req, res) => {
    const requests = db.prepare('SELECT * FROM service_requests WHERE user_id = ? ORDER BY created_at DESC').all(req.user.id);
    res.json({ requests });
  });

  app.post('/api/v1/emergencies', authenticate, (req, res, next) => {
    try {
      const input = parse(emergencySchema, req.body || {});
      const id = randomUUID();
      db.prepare('INSERT INTO emergency_alerts (id, user_id, latitude, longitude) VALUES (?, ?, ?, ?)')
        .run(id, req.user.id, input.latitude ?? null, input.longitude ?? null);
      const alert = db.prepare('SELECT * FROM emergency_alerts WHERE id = ?').get(id);
      res.status(201).json({ alert });
    } catch (error) {
      next(error);
    }
  });

  app.use((req, res) => res.status(404).json({ error: 'Route introuvable.' }));
  app.use((error, req, res, next) => {
    if (res.headersSent) return next(error);
    const status = error.status || 500;
    if (status >= 500) console.error(error);
    res.status(status).json({ error: status >= 500 ? 'Une erreur serveur est survenue.' : error.message });
  });

  return app;
}