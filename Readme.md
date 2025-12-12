# 🚗 Vehicle Rental Management System

### 🔗 Live URL

## **Backend API Live URL:** https://vehicle-rental-system-kis4o1frl.vercel.app

A complete backend API for managing a **vehicle rental service** with authentication, user roles, vehicle inventory, and booking management.

---

## 📌 Overview

A professional backend system designed for managing a complete **Vehicle Rental Service**. This API provides secure authentication, role-based authorization, vehicle inventory handling, user management, and booking lifecycle automation.

---

This project provides a **modular, production-ready Node.js + TypeScript backend** following clean folder structuring and service-based architecture.

### 🔥 Key Features

- 🔐 **JWT Authentication** with role-based access (Admin & Customer)
- 🚘 **Vehicle Management** (CRUD operations with availability tracking)
- 👤 **User Management** (Admin and profile updates for customers)
- 📅 **Booking System** (renting, returning, price calculation)
- 🗄️ **PostgreSQL Database** with properly designed tables
- 🏗️ **Modular architecture** using routes → controllers → services → DB layer

---

## 🛠️ Tech Stack

- **Node.js** with **TypeScript**
- **Express.js**
- **PostgreSQL**
- **bcrypt** – password hashing
- **jsonwebtoken** – JWT authentication
- **pg** – PostgreSQL client

---

## 📁 Project Structure

```
src/
├── modules/
│   ├── auth/
│   │   ├── auth.route.ts
│   │   ├── auth.controller.ts
│   │   └── auth.service.ts
│   │
│   ├── users/
│   │   ├── user.route.ts
│   │   ├── user.controller.ts
│   │   └── user.service.ts
│   ├── vehicles/
│   │   ├── vehicles.route.ts
│   │   ├── vehicles.controller.ts
│   │   └── vehicles.service.ts
│   └── bookings/
│       ├── bookings.route.ts
│       ├── bookings.controller.ts
│       └── bookings.service.ts
│
│
├── config/
|     └── index.ts
├── middlewares/
|     └── auth.ts
├── database/
|     └── db.ts
└── server.ts
```

## ⚙️ Setup & Installation

### **1. Clone the Repository**

```
git clone https://github.com/hasibulh798/Vehicle_Rental_System_API/tree/main
cd vehicle-rental-system
```

### **2. Install Dependencies**

```
npm install
```

### **3. Configure Environment Variables**

Create a `.env` file:

```
CONNECTION_STRING=postgres://user:password@localhost:5432/vehiclerental
JWT_SECRET=your_jwt_secret
PORT=5000
```

### **4. Start the Development Server**

```
npm run dev
```

---

## ▶️ Usage Instructions

### **Start Server**

```
npm run dev
```

### **Access API Endpoints**

Base URL: `http://localhost:5000/api/v1`

- Use **Postman / Thunder Client** for API testing

### **1. Install dependencies**

```
npm install
```

### **2. Set environment variables** (`.env`)

```
CONNECTION_STRING=
JWT_SECRET=
PORT=5000
```

### **3. Start server**

```
npm run dev
```

---

## 🧪 Testing the API

Use Postman / Thunder Client:

- Include token in headers for protected routes:

```
Authorization: Bearer <your_token>
```

---

## 🤝 Contributing

Pull requests are welcome! Follow modular structure strictly.

---

## 📜 License

MIT License

---

### ⭐ If you like this project, feel free to give it a star!
