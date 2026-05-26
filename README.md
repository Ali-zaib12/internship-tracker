# InternTrack – Internship Tracker

A full-stack web application for tracking internship applications, built with Node.js, Express, and MySQL.

## Project Structure

```
internship-tracker/
├── config/
│   └── db.js              # MySQL connection pool
├── controllers/
│   ├── authController.js  # Register, login, logout
│   ├── applicationController.js
│   └── reviewController.js
├── middleware/
│   └── auth.js            # JWT auth middleware
├── routes/
│   ├── auth.js
│   ├── applications.js
│   └── reviews.js
├── public/
│   ├── css/style.css
│   ├── js/app.js
│   └── pages/
│       ├── login.html
│       ├── dashboard.html
│       ├── applications.html
│       └── reviews.html
├── schema.sql             # Run this first in MySQL
├── server.js
└── package.json
```

## Setup Instructions

### 1. Install dependencies
```bash
npm install
```

### 2. Set up MySQL
Open MySQL and run the schema file:
```sql
source schema.sql;
```

### 3. Configure environment
Copy `.env.example` to `.env` and fill in your values:
```bash
cp .env.example .env
```

Edit `.env`:
```
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=internship_tracker
JWT_SECRET=any_random_string_here
```

### 4. Run the server
```bash
# Development (auto-restart)
npm run dev

# Production
npm start
```

### 5. Open in browser
```
http://localhost:3000
```

## Features
- Register and login with JWT authentication
- Add, edit, delete internship applications
- Track status: Applied → Interview → Offer → Rejected
- Filter applications by status
- Dashboard with stats overview
- Company reviews with star ratings
- Clean dark UI

## Tech Stack
- **Backend**: Node.js, Express.js
- **Database**: MySQL
- **Auth**: JWT + bcrypt
- **Frontend**: HTML, CSS, Vanilla JS
