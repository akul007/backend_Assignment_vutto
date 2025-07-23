
---

## ✅ **2. Backend: `backend/README.md`**

# Vutto - Backend

This is the backend server for **Vutto**, a second-hand bike marketplace built with **Node.js**, **Express**, and **MongoDB**.

It provides RESTful APIs for authentication and bike listing operations.

---

## ⚙️ Tech Stack

- **Node.js + Express**
- **MongoDB + Mongoose**
- **JWT Authentication**
- **CORS**
- **bcrypt for password hashing**

---

## 🛠️ Setup Instructions

**Navigate to the backend folder**:
   ```bash
   cd backend

Install dependencies:
npm install

Configure environment variables

Create a .env file and add:

PORT=5000
MONGO_URI=mongodb://localhost:27017/vutto
JWT_SECRET=your_super_secret_key

Start the server:
npm run dev
The server will run on http://localhost:5000

📁 Folder Structure
bash
Copy
Edit
backend/
├── controllers/       # Logic for users and bikes
├── middleware/        # Auth middleware (JWT)
├── models/            # Mongoose schemas (User, Bike)
├── routes/            # Express routers
├── .env               # Environment variables
├── server.js          # Entry point
└── package.json


📌 Available API Routes
🔐 Auth Routes
Method	Endpoint	Description
POST	/auth/register	Register a user
POST	/auth/login	Login & get token

🛵 Bike Routes
Method	Endpoint	Description
GET	/bikes	Get all bikes (optionally filtered)
GET	/bikes/:id	Get single bike by ID
GET	/bikes/user	Get bikes listed by logged-in user
POST	/bikes	Add a new bike (auth required)
PUT	/bikes/:id	Edit a bike (auth + ownership)
DELETE	/bikes/:id	Delete a bike (auth + ownership)

🔐 JWT Auth Flow
After login/register, a JWT is returned.

Include it in headers for protected routes:

Authorization: Bearer <token>


🧪 Sample Test (Postman)

Register a new user.

Log in and copy the JWT token.

Use token to create a new bike listing.

Get and delete bikes using the correct endpoints.


