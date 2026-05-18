# FeastRush — Premium Food Delivery Platform 🍽️

A modern, production-ready full-stack food delivery web application with a stunning purple/teal brand identity.

## Tech Stack

- **Frontend**: React.js + Vite + Tailwind CSS + Framer Motion
- **Backend**: Node.js + Express.js
- **Database**: MongoDB + Mongoose
- **Auth**: JWT + bcrypt
- **State**: Context API (Auth, Cart, Theme)

## Quick Start

### Prerequisites
- Node.js 18+
- MongoDB (local or Atlas)
- npm or yarn

---

### 1. Clone & Setup

```bash
# Navigate to project
cd FeastRush
```

---

### 2. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env
# Edit .env with your MongoDB URI and JWT secret

# Seed the database with sample data
npm run seed

# Start development server
npm run dev
```

The backend runs on **http://localhost:5000**

---

### 3. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Create environment file
cp .env.example .env
# VITE_API_URL=http://localhost:5000/api

# Start development server
npm run dev
```

The frontend runs on **http://localhost:5173**

---

## Environment Variables

### Backend `.env`
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/feastrush
JWT_SECRET=your_super_secret_key_minimum_32_chars
JWT_EXPIRE=7d
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

### Frontend `.env`
```
VITE_API_URL=http://localhost:5000/api
```

---

## Test Credentials

After running `npm run seed`:

| Role  | Email                  | Password  |
|-------|------------------------|-----------|
| Admin | admin@feastrush.com    | admin123  |
| User  | user@feastrush.com     | user123   |

---

## Features

### User Features
- Browse restaurants by category, cuisine, rating
- Search restaurants and food items
- Add to cart, manage quantities
- Multi-step checkout with address & payment
- Real-time order tracking
- View order history
- User profile management
- Save favorite restaurants
- Dark/light mode toggle

### Admin Features
- Dashboard with analytics
- CRUD for restaurants
- CRUD for food items  
- Order management with status updates
- User management with role control

### Technical Features
- JWT authentication with refresh
- Protected routes
- Responsive design (mobile-first)
- Glassmorphism UI elements
- Smooth Framer Motion animations
- Loading skeletons
- Toast notifications
- Rate limiting
- Input validation

---

## API Endpoints

### Auth
- `POST /api/auth/register` — Register
- `POST /api/auth/login` — Login
- `GET /api/auth/me` — Get profile (protected)
- `PUT /api/auth/profile` — Update profile
- `PUT /api/auth/change-password` — Change password
- `POST /api/auth/address` — Add address
- `POST /api/auth/favorites/:id` — Toggle favorite

### Restaurants
- `GET /api/restaurants` — Get all (with filters)
- `GET /api/restaurants/featured` — Featured restaurants
- `GET /api/restaurants/search?q=` — Search
- `GET /api/restaurants/:id` — Get by ID
- `GET /api/restaurants/:id/menu` — Get menu
- `POST /api/restaurants` — Create (admin)
- `PUT /api/restaurants/:id` — Update (admin)
- `DELETE /api/restaurants/:id` — Delete (admin)

### Foods
- `GET /api/foods` — Get all
- `GET /api/foods/popular` — Popular/bestsellers
- `GET /api/foods/search?q=` — Search
- `GET /api/foods/:id` — Get by ID
- `POST /api/foods` — Create (admin)
- `PUT /api/foods/:id` — Update (admin)
- `DELETE /api/foods/:id` — Delete (admin)

### Cart
- `GET /api/cart` — Get cart
- `POST /api/cart/add` — Add item
- `PUT /api/cart/item/:id` — Update quantity
- `DELETE /api/cart/item/:id` — Remove item
- `DELETE /api/cart/clear` — Clear cart

### Orders
- `POST /api/orders` — Place order
- `GET /api/orders/my-orders` — User orders
- `GET /api/orders/:id` — Order detail
- `PUT /api/orders/:id/cancel` — Cancel
- `GET /api/orders` — All orders (admin)
- `PUT /api/orders/:id/status` — Update status (admin)

---

## Deployment

### Backend (Render/Railway)
1. Push to GitHub
2. Connect to Render
3. Add environment variables
4. Set build command: `npm install`
5. Set start command: `npm start`

### Frontend (Vercel/Netlify)
1. Push to GitHub
2. Connect to Vercel
3. Set `VITE_API_URL` to your deployed backend URL
4. Build command: `npm run build`
5. Output directory: `dist`

### MongoDB Atlas
1. Create free cluster at mongodb.com
2. Get connection string
3. Update `MONGODB_URI` in backend `.env`

---

## Project Structure

```
FeastRush/
├── backend/
│   ├── src/
│   │   ├── config/        # Database config
│   │   ├── controllers/   # Route handlers
│   │   ├── middleware/    # Auth, error handlers
│   │   ├── models/        # MongoDB schemas
│   │   ├── routes/        # API routes
│   │   └── utils/         # Seeder, helpers
│   └── server.js
└── frontend/
    └── src/
        ├── api/           # Axios instances
        ├── components/    # Reusable UI
        │   ├── admin/     # Admin components
        │   ├── cart/      # Cart sidebar
        │   ├── common/    # Navbar, Footer, etc.
        │   └── home/      # Landing page sections
        ├── context/       # Auth, Cart, Theme
        ├── pages/         # Route pages
        │   └── admin/     # Admin dashboard pages
        └── utils/         # Helper functions
```

---

Built with ❤️ using React, Node.js, MongoDB — FeastRush
