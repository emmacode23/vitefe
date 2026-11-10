import assert from 'node:assert/strict';
import { after, test } from 'node:test';
import request from 'supertest';
import { createApp } from '../src/app.js';
import { createDatabase } from '../src/db.js';

const db = createDatabase(':memory:');
const app = createApp({ db, jwtSecret: 'test-secret', nodeEnv: 'test', otpDevCode: '4556' });
let token;

after(() => db.close());

async function verifyPhone(phone) {
  await request(app).post('/api/v1/auth/otp/request').send({ phone }).expect(200);
  await request(app).post('/api/v1/auth/otp/verify').send({ phone, code: '4556' }).expect(200);
}

test('expose les six services du tableau de bord', async () => {
  const response = await request(app).get('/api/v1/services').expect(200);
  assert.equal(response.body.services.length, 6);
  assert.deepEqual(response.body.services.map((service) => service.id), [
    'artisans', 'sante', 'veterinaire', 'immobilier', 'cabine', 'vente',
  ]);
});

test('inscrit un client et authentifie son mot de passe', async () => {
  const registrationData = {
    role: 'client', fullName: 'Aminata Touré', phone: '07 89 45 12 00', commune: 'cocody',
    password: 'motdepasse-securise', termsAccepted: true,
  };
  await request(app).post('/api/v1/auth/register').send(registrationData).expect(403);
  await verifyPhone('0789451200');
  const registration = await request(app).post('/api/v1/auth/register').send(registrationData).expect(201);
  assert.equal(registration.body.user.phone, '+2250789451200');
  assert.ok(registration.body.token);
  assert.equal(registration.body.user.password, undefined);

  const login = await request(app).post('/api/v1/auth/login').send({
    phone: '0789451200', password: 'motdepasse-securise',
  }).expect(200);
  token = login.body.token;
  await request(app).post('/api/v1/auth/login').send({
    phone: '0789451200', password: 'incorrect',
  }).expect(401);
});

test('crée et liste une demande de service authentifiée', async () => {
  await request(app).post('/api/v1/requests').send({ serviceId: 'artisans' }).expect(401);
  const created = await request(app).post('/api/v1/requests').set('Authorization', `Bearer ${token}`)
    .send({ serviceId: 'artisans' }).expect(201);
  assert.equal(created.body.request.service_id, 'artisans');

  const listed = await request(app).get('/api/v1/requests').set('Authorization', `Bearer ${token}`).expect(200);
  assert.equal(listed.body.requests.length, 1);
});

test('rejette un OTP incorrect puis ouvre une session avec le bon code', async () => {
  await request(app).post('/api/v1/auth/otp/request').send({ phone: '0789451200' }).expect(200);
  await request(app).post('/api/v1/auth/otp/verify').send({ phone: '0789451200', code: '1111' }).expect(401);
  const verified = await request(app).post('/api/v1/auth/otp/verify')
    .send({ phone: '0789451200', code: '4556' }).expect(200);
  assert.ok(verified.body.token);
});

test('enregistre une alerte SOS authentifiée avec coordonnées facultatives', async () => {
  const response = await request(app).post('/api/v1/emergencies').set('Authorization', `Bearer ${token}`)
    .send({ latitude: 5.36, longitude: -4.01 }).expect(201);
  assert.equal(response.body.alert.status, 'received');
  assert.equal(response.body.alert.latitude, 5.36);
});