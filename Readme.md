# 🚗 Vehicle Rental Management System

### 🔗 Live URL

**Backend API Live URL:** _Add your deployed link here_

---

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
│   │   ├── auth.service.ts
│   │   └── auth.validation.ts
│   ├── users/
│   ├── vehicles/
│   ├── bookings/
│   └── ...
│
├── config/
├── middlewares/
└── app.ts
```

## ⚙️ Setup & Installation

### **1. Clone the Repository**

```
git clone <your-repo-url>
cd vehicle-rental-system
```

### **2. Install Dependencies**

```
npm install
```

### **3. Configure Environment Variables**

Create a `.env` file:

```
DATABASE_URL=postgres://user:password@localhost:5432/vehiclerental
JWT_SECRET=your_jwt_secret
PORT=5000
```

### **4. Run Database Migrations (If applicable)**

```
npm run migrate
```

### **5. Start the Development Server**

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
- Add JWT token in headers:

```
Authorization: Bearer <token>
```

---

### **1. Install dependencies**

```
npm install
```

### **2. Set environment variables** (`.env`)

```
DATABASE_URL=
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
