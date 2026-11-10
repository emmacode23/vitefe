import Database from 'better-sqlite3';
import { mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';

export function createDatabase(filename = process.env.DATABASE_FILE || './data/vitefe.sqlite') {
  const resolvedFilename = filename === ':memory:' ? filename : resolve(filename);
  if (resolvedFilename !== ':memory:') mkdirSync(dirname(resolvedFilename), { recursive: true });

  const db = new Database(resolvedFilename);
  db.pragma('journal_mode = WAL');
  db.pragma('foreign_keys = ON');
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      role TEXT NOT NULL CHECK (role IN ('client', 'artisan')),
      full_name TEXT NOT NULL,
      phone TEXT NOT NULL UNIQUE,
      commune TEXT NOT NULL,
      password_hash TEXT NOT NULL,
      craft TEXT,
      wallet TEXT,
      kyc_status TEXT NOT NULL DEFAULT 'pending',
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS service_requests (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL REFERENCES users(id),
      service_id TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'pending',
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS emergency_alerts (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL REFERENCES users(id),
      latitude REAL,
      longitude REAL,
      status TEXT NOT NULL DEFAULT 'received',
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS phone_verifications (
      phone TEXT PRIMARY KEY,
      code_hash TEXT NOT NULL,
      expires_at INTEGER NOT NULL,
      attempts INTEGER NOT NULL DEFAULT 0,
      verified_until INTEGER
    );
  `);

  return db;
}

export function publicUser(row) {
  if (!row) return null;
  return {
    id: row.id,
    role: row.role,
    fullName: row.full_name,
    name: row.full_name.split(' ')[0],
    phone: row.phone,
    commune: row.commune,
    craft: row.craft,
    wallet: row.wallet,
    kycStatus: row.kyc_status,
    createdAt: row.created_at,
  };
}