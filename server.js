const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const connectDB = require('./config/db');
const fileupload = require('express-fileupload');
const cookieParser = require('cookie-parser');
const mongoSanitize = require('express-mongo-sanitize')
const helmet = require('helmet')
const sanitizeInput = require('./middleware/sanitize')
const rateLimit = require('express-rate-limit')
const hpp = require('hpp')
const cors = require('cors')
const colors = require('colors');
const errorHandler = require('./middleware/error');

// ✅ Swagger dependencies
const swaggerUi = require('swagger-ui-express');
const fs = require('fs');
const YAML = require('yaml');

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

// Sanitize data
app.use(mongoSanitize())

// Set security headers
app.use(helmet())

// Prevent XSS attacks
app.use(sanitizeInput)

// Rate limiting
const limiter = rateLimit({
   windowMs: 10 * 60 * 1000, //  10 mins
   max: 100
})

app.use(limiter)

// Prevent http param pollution
app.use(hpp())

// Enable CORS
app.use(cors())

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
   📘 Swagger API Documentation
----------------------------------- */

// Load OpenAPI spec
const swaggerFile = path.join(__dirname, 'docs', 'DevCamper API Prod-openapi.yaml');
if (fs.existsSync(swaggerFile)) {
  const openapiText = fs.readFileSync(swaggerFile, 'utf8');
  const openapiSpec = YAML.parse(openapiText);

  // Mount Swagger UI at /api-docs
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapiSpec, {
    customSiteTitle: 'DevCamper API Docs',
    customCss: '.swagger-ui .topbar { display: none }'
  }));

  console.log('✅ Swagger UI loaded at /api-docs');
} else {
  console.warn('⚠️  DevCamper API Prod-openapi.yaml not found in /docs folder');
}


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
