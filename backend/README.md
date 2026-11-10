# Vitefê API

API REST Express avec stockage SQLite local. L'API est prévue pour le frontend Vite et persiste les comptes, demandes de services et alertes SOS.

## Démarrage local

```powershell
cd backend
Copy-Item .env.example .env
npm install
npm run dev
```

Le serveur écoute sur `http://localhost:4000`. La base est créée dans `backend/data/vitefe.sqlite`. Le frontend utilise cette URL par défaut ; `frontend/.env.example` permet de la remplacer avec `VITE_API_URL`.

Pour lancer les tests :

```powershell
npm test
```

## Routes

- `GET /api/health`
- `GET /api/v1/services`
- `POST /api/v1/auth/otp/request` et `POST /api/v1/auth/otp/verify`
- `POST /api/v1/auth/register`, `POST /api/v1/auth/login`, `GET /api/v1/auth/me`
- `POST /api/v1/requests` et `GET /api/v1/requests`
- `POST /api/v1/emergencies`

Les routes de demandes, SOS et profil exigent un jeton Bearer. Les comptes client et artisan exigent une vérification OTP préalable ; les mots de passe sont hachés avec bcrypt.

## Limites d’intégration

En développement, l’OTP est simulé et renvoyé dans la réponse API (code `4556` par défaut, configurable via `OTP_DEV_CODE`). En production, la demande OTP retourne `503` tant qu’un fournisseur SMS n’est pas branché. Les paiements Mobile Money, le séquestre, le dispatch réel, le traitement des pièces KYC et les notifications d’urgence ne sont pas simulés comme s’ils étaient opérationnels.

Avant déploiement, définir `NODE_ENV=production`, un `JWT_SECRET` aléatoire robuste et `CORS_ORIGINS` avec les origines exactes du frontend. La base SQLite convient au démarrage mono-instance ; une base serveur est à prévoir pour le déploiement distribué.