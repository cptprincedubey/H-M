# Backend Setup Instructions

This Express/MongoDB backend requires a few environment variables and can be started with `node server.js`.

## Prerequisites

- Node.js installed (v14+)
- MongoDB connection string (Atlas or local)
- Optional: Gmail account with an app password for sending email
- Optional: Razorpay account keys for payments

## Environment Variables

Copy `.env.example` to `.env` and populate all required values. Key variables:

| Variable | Description |
|----------|-------------|
| `mongo_uri` | MongoDB connection URI |
| `JWT_SECRET` | Secret key for user JWTs |
| `JWT_SELLER_SECRET` | Secret key for seller JWTs |
| `PORT` | Port to run server (defaults to 4500) |
| `EMAIL_USER` / `EMAIL_PASS` | Gmail credentials (app password) |
| `RAZORPAY_KEY_ID` / `RAZORPAY_KEY_SECRET` | Razorpay API keys |
| `FRONTEND_URL` | URL(s) of frontend making requests (comma-separated) |

When deploying (Render, Heroku, Vercel, etc.) make sure all above variables are set in the platform's configuration.

## Running

```bash
# from repository root
cd backend
npm install         # if dependencies not installed
node server.js
```

- The server will automatically try the next port if the chosen port is already in use.
- Actual port used will be printed in logs and stored in `process.env.ACTUAL_PORT` for other modules.

## Common Issues

- **Port already in use**: another process is running on the port—stop it or change `PORT`.
- **Email not sending?** Make sure Gmail app password is correct and there are no spaces in `.env` values.
- **Razorpay errors**: check key/id are correct and non-empty.
- **CORS errors**: ensure `FRONTEND_URL` includes the exact origin of your frontend.

