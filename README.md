# SmartPasal

**Simple Shop Management**

SmartPasal is a mobile-friendly shop management system designed for small local businesses in Nepal. It helps shop owners manage products, inventory, sales, expenses, and basic business performance from a simple dashboard.

## Features

- Secure user registration and login
- Firebase Authentication
- Forgot/reset password via Firebase
- Separate data for each shop owner
- Product and inventory management
- Sales recording
- Expense tracking
- Dashboard with business statistics
- Basic profit reporting
- Nepalese Rupees (NPR / Rs.)
- Responsive mobile and desktop interface
- Progressive Web App (PWA) support
- Protected backend API

## Tech Stack

### Frontend
- React
- React Router
- Axios
- Firebase Authentication
- PWA

### Backend
- Node.js
- Express.js
- Firebase Admin SDK
- MongoDB / Mongoose

### Database
- MongoDB Atlas

### Authentication
Firebase Authentication handles:

- Email/password registration
- Login
- Password reset
- User identity

The frontend sends a Firebase ID token to the Express API. The backend verifies the token using the Firebase Admin SDK before allowing access to protected resources.

## Architecture

```text
User
  |
  v
React Frontend
  |
  v
Firebase Authentication
  |
  | Firebase ID Token
  v
Node.js / Express API
  |
  | Firebase Admin verification
  v
MongoDB Atlas
  |
  +-- Users
  +-- Products
  +-- Sales
  +-- Expenses
```

Each authenticated user is associated with their own SmartPasal account, keeping shop data isolated between users.

## Project Structure

```text
smartpasal/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middlewares/
│   │   ├── models/
│   │   └── routes/
│   ├── .env.example
│   ├── package.json
│   └── server.js
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   └── pages/
│   ├── .env.example
│   └── package.json
│
├── render.yaml
└── README.md
```

## Local Development

Clone the repository:

```bash
git clone https://github.com/YOUR_USERNAME/smartpasal.git
cd smartpasal
```

### Backend

```bash
cd backend
npm install
```

Create a `.env` file using `.env.example` and configure the required MongoDB and Firebase Admin environment variables.

Then run:

```bash
npm run dev
```

### Frontend

```bash
cd frontend
npm install
```

Create a `.env` file using `.env.example` and add the Firebase web application configuration.

Then run:

```bash
npm start
```

## Production Build

```bash
cd frontend
npm run build
```

## Security

- Passwords are managed by Firebase Authentication.
- Firebase Admin verifies authentication tokens on the backend.
- Shop data is isolated by authenticated user.
- Environment variables are excluded from Git.
- Firebase Admin private keys and MongoDB credentials must never be committed to the repository.

## Deployment

Planned production infrastructure:

- **Frontend:** Vercel
- **Backend:** Render
- **Database:** MongoDB Atlas
- **Authentication:** Firebase Authentication

## Currency

SmartPasal uses Nepalese Rupees:

```text
Rs. / NPR
```

## Status

SmartPasal is currently under active development.

Core authentication, inventory, sales, expenses, dashboard functionality, and multi-user data isolation have been tested locally.

## Author

**Rohan Paheli**