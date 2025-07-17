# 🍔 Food Ordering REST API

A complete backend API for a food ordering platform, built with **Node.js**, **Express.js**, **MongoDB**, and **TypeScript**.  
Supports authentication, cart management, coupons, reviews, Stripe checkout, and more.

---

## 🚀 Features

- ✅ JWT Authentication (Register/Login)
- ✅ Admin-only Product Management
- ✅ Cart Operations (Add, Remove, Update Items)
- ✅ Apply Coupons and Discounts
- ✅ Stripe Integration for Checkout
- ✅ User Reviews and Ratings
- ✅ Order Creation with Status Updates
- ✅ Fully Documented with Swagger
- ✅ Docker Support for Easy Deployment

---

## 🛠 Tech Stack

- **Backend**: Node.js, Express.js, TypeScript
- **Database**: MongoDB (Mongoose ODM)
- **Authentication**: JWT (Access Token)
- **Payments**: Stripe (Test Mode)
- **Documentation**: Swagger (swagger-jsdoc + swagger-ui-express)
- **DevOps**: Docker

---

## 📂 Project Structure
-src/
-│
-├── modules/
-│ ├── auth/
-│ ├── products/
-│ ├── cart/
-│ ├── orders/
-│ ├── coupons/
-│ ├── reviews/
-│ └── logs/
-├── middlewares/
-├── utils/
-├── config/
-└── app.ts

---

## 📄 API Documentation

All endpoints are documented using Swagger.

🧪 Visit: `http://localhost:5000/api-docs`

---

## 🐳 Run with Docker

```bash
# Build and run the container
docker-compose up --build


