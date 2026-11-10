import 'dotenv/config';
import { createApp } from './app.js';
import { createDatabase } from './db.js';

const db = createDatabase();
const app = createApp({ db });
const port = Number(process.env.PORT || 4000);

const server = app.listen(port, '0.0.0.0', () => {
  console.log(`Vitefê API disponible sur http://localhost:${port}`);
});

function shutdown() {
  server.close(() => {
    db.close();
    process.exit(0);
  });
}

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);