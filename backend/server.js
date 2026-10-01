const dns = require("dns");

dns.setServers(["8.8.8.8", "1.1.1.1"]);
require('dotenv').config();
const app = require('./src/config/app');
const connectDB = require('./src/config/db');

const PORT = Number(process.env.PORT) || 5000;
let server;

async function start() {
  if (!process.env.MONGO_URI || !process.env.FIREBASE_PROJECT_ID || !process.env.FIREBASE_CLIENT_EMAIL || !process.env.FIREBASE_PRIVATE_KEY) {
    console.error('Missing required environment variables: MONGO_URI and Firebase Admin credentials');
    process.exit(1);
  }
  await connectDB();
  server = app.listen(PORT, () => console.log(`SmartPasal API listening on port ${PORT}`));
}

function shutdown(signal) {
  console.log(`${signal} received. Shutting down gracefully.`);
  if (server) server.close(() => process.exit(0));
  else process.exit(0);
}
process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));
process.on('unhandledRejection', (err) => { console.error('Unhandled rejection:', err); shutdown('unhandledRejection'); });

start();
