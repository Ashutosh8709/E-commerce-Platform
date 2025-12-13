# 🚀 SwiftCart – Full-Stack E‑Commerce Platform

### **Production‑Grade Architecture | Event‑Driven | Real‑Time Updates | Docker | Jenkins | Kubernetes | MLOps‑Ready**

### **Author: Ashutosh Kumar**

---

# 🧭 Table of Contents

1. Overview
2. Core Features
3. System Architecture
4. Event‑Driven Workflow
5. Tech Stack
6. Microservices Breakdown
7. API Overview
8. Authentication & Authorization
9. Real‑Time Order Tracking (Socket.IO)
10. Caching Strategy (Redis)
11. Seller Onboarding Flow
12. Database Schema Overview
13. CI/CD Pipeline (Docker → Jenkins → Kubernetes)
14. Deployment Architecture
15. Installation (Local + Production)
16. Folder Structure
17. Future Enhancements

---

# 📌 1. Overview

**SwiftCart** is a **production‑ready full‑stack E‑commerce platform** supporting:

- User shopping
- Seller onboarding & store management
- Real‑time admin dashboard
- Event‑driven order lifecycle
- Razorpay payment integration
- Redis caching
- Horizontal scalability with Kubernetes

This document contains complete technical documentation for deployment, development, scaling, and architecture.

---

# ✨ 2. Core Features

### 🛍 Customer Features

- Product browsing, filtering, searching
- Cart and wishlist
- Address management
- Razorpay-based checkout
- Order tracking

### 🧑‍💼 Seller Features

- Store registration + GST verification
- Product CRUD
- Inventory management
- Store analytics

### 🛠 Admin Features

- Real‑time order board
- Insights dashboard
- Manage sellers, customers, and inventory
- Update order statuses

### ⚡ Platform Features

- Event‑driven backend
- Redis caching for high-performance reads
- WebSocket order updates
- Containerized microservices
- CI/CD pipeline
- Kubernetes deployment

---

# 🏗 3. System Architecture

```
                    ┌────────────────────────┐
                    │        Frontend        │
                    │  React + Vite + RTK    │
                    └─────────────┬──────────┘
                                  │ HTTPS/WS
                    ┌─────────────▼──────────────┐
                    │        API Gateway         │
                    │      Express.js Server     │
                    └─────────────┬──────────────┘
                    REST / Events │  Socket.IO
            ┌──────────────────────▼─────────────────────┐
            │                Backend Services            │
            │  User • Auth • Seller • Cart • Orders •    │
            │  Product • Payment • Analytics             │
            └──────────────────────┬─────────────────────┘
                                   │ MongoDB Queries
                     ┌─────────────▼──────────────┐
                     │         MongoDB            │
                     └────────────────────────────┘
                                   │
                     ┌─────────────▼──────────────┐
                     │          Redis Cache       │
                     └────────────────────────────┘
                                   │
                     ┌─────────────▼──────────────┐
                     │      Message/Event Bus     │
                     │        (Socket.IO)         │
                     └────────────────────────────┘
                                   │
                     ┌─────────────▼──────────────┐
                     │     Kubernetes Cluster     │
                     │ API + Worker Pods + Redis  │
                     └────────────────────────────┘
```

### <mark>Project Deployment Flow:</mark>

<img src="https://github.com/DevMadhup/Wanderlust-Mega-Project/blob/main/Assets/DevSecOps%2BGitOps.gif" />

#

---

# ⚡ 4. Event‑Driven Workflow

### Example: New Order Flow

```
User Places Order
      │
      ▼
ORDER_PLACED Event
      │
      ├── Notify Admin Dashboard (Socket.IO)
      ├── Update Inventory Service
      ├── Update Seller Dashboard
      └── Trigger Payment Verification
```

### Example: Order Status Update

```
Admin → Update Status
      │
      ▼
Emit ORDER_STATUS_UPDATED
      │
      ├── Notify User
      ├── Notify Seller
      └── Update Analytics
```

---

# 🧰 5. Tech Stack

### **Frontend**

- React + Vite
- TailwindCSS
- React Query
- Socket.IO Client
- Framer Motion

### **Backend**

- Node.js + Express
- MongoDB + Mongoose
- Redis (Caching)
- Socket.IO
- Razorpay Payments
- JWT Authentication

### **DevOps**

- Docker
- Jenkins CI/CD
- Kubernetes (Kind / Cloud)

---

# 🔥 6. Microservices Breakdown

### ✔ User Service

Handles registration, login, roles, seller onboarding.

### ✔ Product Service

CRUD, categories, deals, featured/new arrivals (Redis cached).

### ✔ Cart Service

Add/update/remove items.

### ✔ Order Service

Order creation, payment, tracking, event broadcasting.

### ✔ Payment Service

Razorpay integration + secure verification.

### ✔ Admin Service

Real-time analytics, seller verification, order management.

---

# 📡 7. API Overview

```
/api/v1/users
/api/v1/auth
/api/v1/product
/api/v1/order
/api/v1/seller
/api/v1/admin
/api/v1/address
/api/v1/cart
```

---

# 🔐 8. Authentication & Authorization

### Role-Based Access:

- **User** → Shop & order
- **Seller** → Products, inventory
- **Admin** → Full access

Token structure:

```
{
  userId: "...",
  role: "admin" | "seller" | "user",
  iat, exp
}
```

---

# 🔴 9. Real‑Time Order Tracking (Socket.IO)

### Events:

```
order:new
order:statusUpdated
inventory:update
admin:alert
```

### Backend Emit Example:

```js
global.io.emit("order:new", orderPayload);
```

### Frontend Listener:

```js
socket.on("order:new", (data) => setOrders((prev) => [data, ...prev]));
```

---

# ⚙️ 10. Caching Strategy (Redis)

### Cached items:

- Featured products
- New arrivals
- Category-wise listings
- Seller profile meta

### TTL:

```
newArrivals → 1 hour
featured → 2 hours
categories → 24 hours
```

---

# 🧑‍💼 11. Seller Onboarding Flow

### Registration Flow:

1. User clicks **Become a Seller**
2. Provide:
   - Store name
   - GST Number
   - Phone
   - Email
   - Address
3. Admin verifies seller
4. Role changes → `"seller"`
5. Seller gets access to:
   - Add products
   - Inventory
   - Order management
   - Earnings dashboard

### Seller Schema:

```
storeName
gstNumber
ownerUserId
bankDetails
kycStatus
verificationStatus
```

---

# 🗄 12. Database Schema Overview

### Collections:

```
User
Seller
Product
Category
Order
Payment
Cart
Review
Address
```

---

# 🔄 13. CI/CD Pipeline

```
Developer Push → GitHub
          │
          ▼
Jenkins Pulls Repo
          │
          ├── Run Tests
          ├── Build Docker Image
          ├── Push to Registry
          └── Deploy to Kubernetes
```

---

# ☸️ 14. Kubernetes Deployment

### Pod Structure:

```
api-deployment
socket-deployment
mongo-statefulset
redis-deployment
```

### Services:

```
ClusterIP → API
ClusterIP → Redis
NodePort → Frontend
```

---

# 💻 15. Installation

## Local Setup

```
git clone repo
cd backend && npm install
cd frontend && npm install
npm run dev
```

## Docker Setup

```
docker-compose up --build
```

## Kubernetes

```
kubectl apply -f k8s/
```

---

# 📂 16. Folder Structure

```
/backend
   /controllers
   /models
   /routes
   /services
   /events
   /utils
   server.js

/frontend
   /src
      /components
      /pages
      /hooks
      /context
      /utils
      App.js
```

---

# 🚀 17. Future Enhancements

- AI-powered recommendation engine
- Product ranking using ML models
- Fraud detection
- Advanced analytics
- Chatbot for support
- Seller payouts automation

---

# 🙌 Author

**Ashutosh Kumar**  
Full‑Stack Developer | MLOPS | DevOps Enthusiast

---

# ⭐ If you like this project, give it a star!
