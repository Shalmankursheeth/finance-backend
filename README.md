# 💰 Finance Backend System with Role-Based Access Control

## 📌 Project Overview

This project is a backend system designed for managing financial transactions and providing summary insights for a dashboard. It supports multiple user roles with controlled access permissions and demonstrates clean architecture, data handling, and backend design.

The system simulates a real-world finance platform where users interact with financial data based on their roles.

---

## 🚀 Features

### 🔐 Authentication & Authorization

* User signup and login
* JWT-based authentication
* Role-based access control (RBAC)

**Roles:**

* **Viewer** → Access dashboard only
* **Analyst** → View transactions + dashboard
* **Admin** → Full access (CRUD operations)

---

### 💰 Transaction Management

Each transaction contains:

* `amount` (number)
* `type` (INCOME / EXPENSE)
* `category` (string)
* `date` (YYYY-MM-DD)
* `notes` (optional)

Supports:

* Create
* Read
* Update
* Delete

---

### 🔍 Advanced Filtering

Supports dynamic queries:

* `?type=INCOME`
* `?category=Salary`
* `?startDate=YYYY-MM-DD`
* `?endDate=YYYY-MM-DD`
* Combined filters supported

---

### 📊 Dashboard APIs

Returns:

* Total income
* Total expense
* Net balance
* Category-wise breakdown
* Recent transactions (last 5)
* Monthly trends

---

### 🛡️ Validation & Error Handling

* Input validation using Zod
* Proper error responses
* Handles invalid inputs safely

---

## 🧱 Tech Stack

* Node.js
* Express.js
* Prisma ORM (v5)
* SQLite
* JWT
* Zod

---

## 🏗️ Architecture

* Routes → API endpoints
* Controllers → Request/response logic
* Services → Business logic
* Middleware → Auth & RBAC
* Prisma → Database layer

---

## 🔐 Access Control

| Role    | Access                        |
| ------- | ----------------------------- |
| Viewer  | Dashboard only                |
| Analyst | View transactions + dashboard |
| Admin   | Full CRUD                     |

---

## ⚡ Quick Test Flow

1. Signup as Admin
2. Login → copy token
3. Create a transaction
4. Fetch dashboard summary

This verifies the full flow of the system.

# 📡 API TEST GUIDE (IMPORTANT 🔥)

## 🔑 Authentication Flow

---

### 1️⃣ Signup

**POST** `/api/users/signup`

```json
{
  "name": "Admin",
  "email": "admin@test.com",
  "password": "123456",
  "role": "ADMIN"
}
```

---

### 2️⃣ Login

**POST** `/api/users/login`

```json
{
  "email": "admin@test.com",
  "password": "123456"
}
```

👉 Response:

```json
{
  "token": "YOUR_TOKEN"
}
```

---

## 🔐 Use Token in Headers

```
Authorization: YOUR_TOKEN
```

---

# 💰 TRANSACTION APIs

---

### ✅ Create Transaction (Admin)

**POST** `/api/transactions`

```json
{
  "amount": 5000,
  "type": "INCOME",
  "category": "Salary",
  "date": "2026-04-03",
  "notes": "Salary credit"
}
```

---

### ✅ Get Transactions

**GET** `/api/transactions`

---

### 🔍 Filtering Examples

```
/api/transactions?type=INCOME
/api/transactions?category=Salary
/api/transactions?startDate=2026-04-01
/api/transactions?endDate=2026-04-10
/api/transactions?type=INCOME&category=Salary&startDate=2026-04-01
```

---

### ✅ Update Transaction (Admin)

**PUT** `/api/transactions/:id`

```json
{
  "amount": 7000
}
```

---

### ✅ Delete Transaction (Admin)

**DELETE** `/api/transactions/:id`

---

# 📊 DASHBOARD

---

### ✅ Get Summary

**GET** `/api/dashboard`

Example response:

```json
{
  "totalIncome": 115000,
  "totalExpense": 0,
  "netBalance": 115000,
  "categoryBreakdown": {
    "Salary": 115000
  },
  "recentTransactions": [],
  "monthlyTrends": {}
}
```

---

# 🧪 ROLE TESTING

| Action             | Viewer | Analyst | Admin |
| ------------------ | ------ | ------- | ----- |
| GET transactions   | ❌      | ✅       | ✅     |
| POST transaction   | ❌      | ❌       | ✅     |
| PUT transaction    | ❌      | ❌       | ✅     |
| DELETE transaction | ❌      | ❌       | ✅     |
| Dashboard          | ✅      | ✅       | ✅     |

---

# ⚙️ SETUP

```bash
npm install
npm install prisma@5 @prisma/client@5
npx prisma generate
npx prisma migrate dev
node src/server.js
```

---
### Environment Variables

Create a `.env` file in the root:
Create a .env file using .env.example as reference

JWT_SECRET=your_secret_key
DATABASE_URL="file:./dev.db"

## 🌐 Server

```
http://localhost:5000
```

---

# ⚠️ NOTES

* Backend-only project (no UI required)
* SQLite used for simplicity
* Fresh database will be created on setup

👉 Reviewer can test using Postman or any API client

---

# 🧠 DESIGN DECISIONS

* Layered architecture for scalability
* Middleware-based RBAC
* Dynamic query filtering
* Aggregation logic for dashboard insights
* Input validation for data integrity

---

# 🔮 FUTURE IMPROVEMENTS

* Pagination
* Search
* Rate limiting
* Swagger docs
* Automated tests

---

# 👨‍💻 Author

Mohamed Shalman Kursheeth
