# 💰 Finance Data Processing & Access Control Backend

A backend system designed to manage financial records with secure role-based access control (RBAC), built using Node.js, Express, and MongoDB.

---

## 🚀 Features

* 🔐 JWT-based Authentication & Authorization
* 👥 Role-Based Access Control (Viewer, Analyst, Admin)
* 📊 Financial Records Management (CRUD operations)
* 📈 Dashboard Analytics (Income, Expense, Trends)
* 🛡️ Input Validation & Error Handling
* 📄 Swagger API Documentation (`/api-docs`)

---

## 🧠 Tech Stack

* **Node.js** – Runtime environment
* **Express.js** – Backend framework
* **MongoDB + Mongoose** – Database & ODM
* **JWT** – Authentication
* **bcrypt.js** – Password hashing
* **Swagger (OpenAPI)** – API documentation
* **Render** – Deployment

---

## 📦 Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/kishan2613/Zorvyn_Kishan_Kumar.git
cd Zorvyn_Kishan_Kumar
```

### 2. Install dependencies

```bash
npm install
```

### 3. Setup environment variables

Create a `.env` file:

```env
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
```

### 4. Run the server

```bash
npm start/nodemon index.js
```

---

## 🌐 API Documentation

Swagger UI is available at:

```bash
/api-docs
```

👉 Use Swagger to explore and test all endpoints interactively.

---

## 🔐 Authentication & Authorization

After login, a JWT token is generated.

### 📌 Using Swagger

* Click **Authorize 🔒**
* Enter:

```bash
Bearer <your_token>
```

### 📌 Using Postman

```bash
Authorization: Bearer <your_token>
```

### ⚠️ Role-Based Access

* Viewer → Dashboard only
* Analyst → Records + Insights
* Admin → Full access (Users + Records)

Unauthorized access → `403 Forbidden`

---

## 📁 API Endpoints

### 👤 Users

* `POST /api/users/register` – Register
* `POST /api/users/login` – Login
* `GET /api/users` – Get all users (Admin)
* `PATCH /api/users/:id` – Update role/status (Admin)
* `DELETE /api/users/:id` – Delete user (Admin)

---

### 💳 Records

* `POST /api/records` – Create record (Admin)
* `GET /api/records` – Get records
* `PATCH /api/records/:id` – Update record (Admin)
* `DELETE /api/records/:id` – Delete record (Admin)

---

### 📊 Dashboard

* `GET /api/dashboard` – Get analytics (Protected)

---

## 🧩 Project Structure

```bash
├── controllers/
├── routes/
├── models/
├── middleware/
├── config/
├── index.js
```

---

## 🔒 Security Features

* Password hashing using bcrypt
* JWT authentication
* Role-based authorization middleware
* Prevention of privilege escalation
* Input validation and error handling

---

## 📈 Key Highlights

* Clean MVC architecture
* MongoDB aggregation for analytics
* Scalable and modular design
* Swagger integration for testing
* Deployed on Render

---

## ⚠️ Challenges Faced

* Swagger deployment issues (MIME type error)
* Handling role-based restrictions securely
* Preventing users from assigning admin roles
* Managing middleware order in Express

---

## 🚀 Future Improvements

* Pagination & advanced filtering
* Refresh token mechanism
* Rate limiting & security enhancements
* Frontend dashboard integration
* Caching (Redis) for analytics

---

## 📌 Conclusion

This project demonstrates a well-structured backend system with secure authentication, role-based access control, and efficient financial data processing. It reflects real-world backend engineering practices with a focus on scalability, maintainability, and clean architecture.

---

## 👨‍💻 Author

**Kishan Kumar**
Full Stack Developer 🚀
