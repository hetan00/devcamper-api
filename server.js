const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const connectDB = require('./config/db');
const fileupload = require('express-fileupload');
const cookieParser = require('cookie-parser');
const colors = require('colors');
const errorHandler = require('./middleware/error');

// Load env vars
dotenv.config({ path: './config/config.env' });

console.log('SMTP_HOST', process.env.SMTP_HOST);
console.log('SMTP_EMAIL present?', !!process.env.SMTP_EMAIL);
console.log('SMTP_PASSWORD present?', !!process.env.SMTP_PASSWORD);


// Connect to database
connectDB();

// Route files
const bootcamps = require('./routes/bootcamps');
const courses = require('./routes/courses');
const auth = require('./routes/auth');
const users = require('./routes/users')
const reviews = require('./routes/reviews')

const app = express();

/* ---------------------------------
   🧱 Core Middleware Order (fixed)
----------------------------------- */

// Parse JSON first (for API requests)
app.use(express.json());

// Parse URL-encoded data (for form submissions, optional but safe)
app.use(express.urlencoded({ extended: true }));

// Handle cookies
app.use(cookieParser());

// Handle file uploads (after body parsers)
app.use(fileupload());

/* ---------------------------------
   🔍 Logging & Debugging
----------------------------------- */

// Dev request logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Optional: log every request to help debugging
app.use((req, res, next) => {
  console.log(`[REQ] ${req.method} ${req.url}`);
  next();
});

/* ---------------------------------
   📁 Static Folder
----------------------------------- */

app.use(express.static(path.join(__dirname, 'public')));

/* ---------------------------------
   🚦 Mount Routers
----------------------------------- */

app.use('/api/v1/bootcamps', bootcamps);
app.use('/api/v1/courses', courses);
app.use('/api/v1/auth', auth);
app.use('/api/v1/users', users)
app.use('/api/v1/reviews', reviews)

/* ---------------------------------
   ⚠️ Error Handler (must be last)
----------------------------------- */

app.use(errorHandler);

/* ---------------------------------
   🚀 Server Setup
----------------------------------- */

const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  () =>
    console.log(
      `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow
        .bold
    )
);

/* ---------------------------------
   ❌ Handle Unhandled Rejections
----------------------------------- */

process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  // Close server & exit process
  server.close(() => process.exit(1));
});
