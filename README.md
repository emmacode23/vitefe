# Vitefê

Vitefê est une application web mobile-first de mise en relation entre particuliers et prestataires à Abidjan. Le projet comprend une interface React/Vite et une API REST Express avec une base SQLite locale.

## Projet

- **Entreprise :** TNTECH
- **Cible :** application mobile et plateforme web
- **Méthode :** développement agile et conception orientée objet
- **Horizon prévisionnel :** 2028
- **Priorité :** confidentialité et protection des données

## Fonctionnalités actuelles

- Inscription client et artisan, avec vérification du numéro par OTP
- Connexion par mot de passe ou OTP
- Catalogue des six catégories : artisans, santé, vétérinaire, immobilier, cabine en ligne et vente express
- Création et consultation des demandes de services
- Enregistrement d’alertes SOS, avec coordonnées GPS si l’utilisateur les autorise
- Sessions JWT et comptes persistés dans SQLite

## Prérequis

- Node.js 20 ou plus récent
- npm

## Démarrage en développement

Lancer l’API dans un premier terminal PowerShell :

```powershell
cd backend
Copy-Item .env.example .env
npm install
npm run dev
```

Ne recopiez pas `.env.example` par-dessus un fichier `.env` déjà configuré. L’API est disponible sur `http://localhost:4000` et crée sa base dans `backend/data/vitefe.sqlite`.

Dans un second terminal PowerShell, lancer le frontend :

```powershell
cd frontend
npm install
npm run dev
```

Ouvrir `http://localhost:3000`. Le frontend utilise `http://localhost:4000/api/v1` par défaut. Pour changer cette adresse, définir `VITE_API_URL` dans `frontend/.env` à partir de `frontend/.env.example`.

### OTP en développement

L’envoi de SMS est simulé. Après avoir demandé un code dans le formulaire, l’API renvoie le code de test `4556` par défaut et l’interface l’affiche. Cette simulation ne doit pas être utilisée en production.

## Vérification

Lancer les tests d’intégration de l’API :

```powershell
cd backend
npm test
```

Construire le frontend pour la production :

```powershell
cd frontend
npm run build
```

## API

La documentation des routes, de la configuration et des limites actuelles se trouve dans [backend/README.md](backend/README.md). L’état du service est disponible à `GET /api/health`.

## État et limites

Le backend couvre les comptes, l’authentification, les demandes et l’enregistrement des alertes SOS. L’envoi réel de SMS, les paiements Mobile Money et le séquestre, le dispatch des prestataires, le traitement des documents KYC et la notification d’équipes d’urgence restent à intégrer. Les écrans de dépôt KYC actuels sont des simulations d’interface ; aucun document n’est transmis ni conservé par l’API.

Avant tout déploiement, configurer un `JWT_SECRET` fort, `NODE_ENV=production` et les origines exactes dans `CORS_ORIGINS`. Prévoir une base de données serveur si l’application est déployée sur plusieurs instances.
