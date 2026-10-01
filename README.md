# SmartPasal

Production-oriented shop management system for small shops. Features authentication, inventory, low-stock alerts, sales with stock deduction, expense tracking, profit dashboard, responsive UI, and installable PWA shell.

## Local setup
1. Install Node.js 18+ and MongoDB (or create a MongoDB Atlas database).
2. Backend: copy `backend/.env.example` to `backend/.env`, set `MONGO_URI`, a strong `JWT_SECRET`, and `CLIENT_ORIGIN`; then run `npm install` and `npm run dev` inside `backend`.
3. Frontend: copy `frontend/.env.example` to `frontend/.env`, set `REACT_APP_API_URL=http://localhost:5000/api`; then run `npm install` and `npm start` inside `frontend`.

## Production deployment
- Deploy `backend` to a Node host such as Render/Railway/Fly.io. Set `NODE_ENV=production`, `MONGO_URI`, `JWT_SECRET`, and `CLIENT_ORIGIN=https://your-frontend-domain`.
- Deploy `frontend` to Vercel. Set `REACT_APP_API_URL=https://your-api-domain/api` before the production build.
- Never commit `.env` files or secrets. Restrict MongoDB Atlas network/database access appropriately.
- `/api/health` is available for health checks.

## Security implemented
Helmet headers, CORS allow-list, request size limits, rate limiting, bcrypt password hashing, JWT expiry, user-scoped queries, server-side validation, generic production 500 errors, and graceful shutdown.

## Important scope note
This is suitable as a small-shop MVP. Before handling high-value or regulated transactions, add automated API/integration tests, backups/restore drills, audit logging, stronger session/token revocation, monitoring, and transactional guarantees appropriate to your MongoDB deployment.

## Password reset / SMTP
Forgot Password is implemented with one-time tokens that expire after 15 minutes. Configure `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, and `MAIL_FROM` in `backend/.env`. Never commit real credentials. After this update, run `npm install` in `backend` once to install Nodemailer.


## Firebase Authentication
SmartPasal now uses Firebase Authentication for email/password registration, login and password-reset emails. The Express API verifies Firebase ID tokens using Firebase Admin. MongoDB stores shop profiles and business data, not passwords. Configure the frontend Firebase web-app values and backend Firebase service-account values using the provided `.env.example` files. Enable Email/Password in Firebase Console > Authentication > Sign-in method.
