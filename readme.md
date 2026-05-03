# DevCamper API

A production-ready RESTful API for a bootcamp and course discovery platform. Built with Node.js, Express, and MongoDB, the API provides secure authentication, role-based access control, and full CRUD functionality for managing bootcamps, courses, users, and reviews.

---

## 🚀 Features

* JWT-based authentication and authorization
* Role-based access control (admin, publisher, user)
* Full CRUD functionality for bootcamps, courses, and reviews
* Secure password hashing and protected routes
* File upload support
* API security:

  * Rate limiting
  * Data sanitisation
  * XSS protection
  * HTTP header security (Helmet)
* Centralised error handling
* Swagger API documentation

---

## 🛠️ Tech Stack

* **Backend:** Node.js, Express.js
* **Database:** MongoDB (Mongoose)
* **Authentication:** JSON Web Tokens (JWT)
* **Security:** Helmet, Express Rate Limit, Mongo Sanitize, HPP
* **Documentation:** Swagger UI
* **Deployment:** Render

---

## 🌐 Live API

**Base URL:**
https://devcamper-api-w84z.onrender.com

**API Documentation (Swagger):**
https://devcamper-api-w84z.onrender.com/api-docs

---

## 📡 API Endpoints

### Bootcamps

* `GET /api/v1/bootcamps`
* `GET /api/v1/bootcamps/:id`
* `POST /api/v1/bootcamps`
* `PUT /api/v1/bootcamps/:id`
* `DELETE /api/v1/bootcamps/:id`

### Courses

* `GET /api/v1/courses`
* `POST /api/v1/courses`

### Authentication

* `POST /api/v1/auth/register`
* `POST /api/v1/auth/login`
* `GET /api/v1/auth/me`

### Reviews

* `GET /api/v1/reviews`
* `POST /api/v1/reviews`

---

## ⚙️ Installation

### 1. Clone the repository

```bash
git clone https://github.com/hetan00/devcamper-api.git
cd devcamper_api
```

### 2. Install dependencies

```bash
npm install
```

## Run App
```
# Run in dev mode
npm run dev

# Run in prod mode
npm start 
```


## Usage

Rename "config/config.env.env" to "config/config.env" and update the values/settings to your own


### 3. Create environment variables

Create a file:

```bash
/config/config.env
```

Add:

```env
NODE_ENV=development
PORT=5001

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret
JWT_EXPIRE=30d

SMTP_HOST=your_smtp_host
SMTP_PORT=your_smtp_port
SMTP_EMAIL=your_email
SMTP_PASSWORD=your_password
FROM_EMAIL=noreply@devcamper.io
FROM_NAME=DevCamper
```

---

### 4. Run the server

```bash
npm run dev
```

Server will run on:

```bash
http://localhost:5001
```

---

## 🔐 Environment Variables

* `MONGO_URI` – MongoDB connection string
* `JWT_SECRET` – Secret for signing tokens
* `JWT_EXPIRE` – Token expiry time
* `SMTP_HOST` – Mail server
* `SMTP_EMAIL` – Email username
* `SMTP_PASSWORD` – Email password

---

## 🧪 Testing

You can test the API using:

* Swagger UI → `/api-docs`
* Postman
* Insomnia

---

## 🔄 How It Works

The API acts as the backend service for a web or mobile application:

```
Frontend (React / Next.js)
        ↓
DevCamper API (Node.js / Express)
        ↓
MongoDB Database
```

Frontend applications interact with the API via HTTP requests to fetch and manipulate data.

---

## 📌 Future Improvements

* Build a frontend client (React / Next.js)
* User dashboard and profile management
* Advanced filtering, sorting, and pagination
* Image optimisation for uploads
* Real-time features

---

## 🧑‍💻 Author

**Hetan**

GitHub: https://github.com/hetan00

---

## ⭐ Notes

This project focuses on backend architecture, API design, and security best practices. It is designed to be consumed by frontend applications such as web or mobile clients.


- Version: 1.0.0
- License: MIT

