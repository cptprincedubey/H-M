# H&M E-Commerce Platform

A full-stack e-commerce application built with React (Vite) frontend and Node.js/Express backend.

## Features

- 🛍️ Product browsing by category (Ladies, Men, Kids, Beauty, Home)
- 🔐 User authentication (Login/Register)
- 💳 Razorpay payment integration
- 🎨 Modern, responsive UI with Tailwind CSS
- 📦 Product management for sellers
- 🖼️ Image upload using ImageKit

## Tech Stack

### Frontend
- React 19
- Vite
- React Router
- TanStack Query (React Query)
- Tailwind CSS
- Axios
- Razorpay

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication
- Multer (File uploads)
- ImageKit (Image storage)
- Razorpay (Payments)

## Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or MongoDB Atlas)
- Razorpay account (for payments)
- ImageKit account (for image storage)

## Setup Instructions

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd H-M-Final
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory:

```env
mongo_uri=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
JWT_SELLER_SECRET=your_seller_jwt_secret_key
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
IMAGEKIT_URL=your_imagekit_url_endpoint
port=4500
NODE_ENV=development
```

Start the backend server:

```bash
npm start
```

The backend will run on `http://localhost:4500`

### 3. Frontend Setup

Open a new terminal:

```bash
cd frontend
npm install
```

Start the development server:

```bash
npm run dev
```

The frontend will run on `http://localhost:5173`

## API Endpoints

### Authentication
- `POST /api/auth/user/register` - User registration
- `POST /api/auth/user/login` - User login
- `POST /api/auth/seller/register` - Seller registration
- `POST /api/auth/seller/login` - Seller login
- `GET /api/auth/seller/profile` - Get seller profile (protected)

### Products
- `GET /api/products/:category` - Get products by category
- `POST /api/products/create` - Create product (seller, protected)
- `PUT /api/products/update/:id` - Update product (seller, protected)
- `DELETE /api/products/delete/:id` - Delete product (seller, protected)

### Payments
- `POST /api/payment/process` - Create payment order
- `POST /api/payment/verify` - Verify payment

## Project Structure

```
H-M-Final/
├── backend/
│   ├── src/
│   │   ├── config/        # Database, multer, razorpay configs
│   │   ├── controllers/   # Route controllers
│   │   ├── middlewares/   # Auth middlewares
│   │   ├── models/        # Mongoose models
│   │   ├── routes/        # Express routes
│   │   ├── services/      # External services (ImageKit)
│   │   └── validator/     # Joi validators
│   └── server.js          # Entry point
├── frontend/
│   ├── src/
│   │   ├── api/           # API functions
│   │   ├── components/    # React components
│   │   ├── config/        # Axios, Razorpay configs
│   │   ├── context/       # React context
│   │   ├── hooks/         # Custom hooks
│   │   ├── layouts/       # Layout components
│   │   ├── pages/         # Page components
│   │   ├── router/        # React Router setup
│   │   └── store/         # Redux store
│   └── package.json
└── README.md
```

## Usage

1. **Register/Login**: Users can register and login to access the platform
2. **Browse Products**: Navigate through different categories
3. **Purchase**: Click "Buy Now" on any product to initiate payment
4. **Seller Features**: Sellers can register separately and manage their products

## Environment Variables

Make sure to set up all required environment variables in the backend `.env` file before running the application.

## Troubleshooting

- **CORS Errors**: Ensure backend CORS is configured for `http://localhost:5173`
- **Database Connection**: Verify MongoDB connection string in `.env`
- **Payment Issues**: Check Razorpay credentials and test mode settings
- **Image Upload**: Verify ImageKit credentials and folder permissions

## License

ISC
