import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import connectDB from './config/db.js'
import colors from 'colors'

//Load env vars //load
dotenv.config({path: './config/config.env'})

//Connect to database
connectDB()

// Route files
import bootcamps from './routes/bootcamps.js'

const app = express()

//Body parser 
app.use(express.json())

// Dev logging middleware
if(process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

// Mount routers
app.use('/api/v1/bootcamps', bootcamps)

const PORT = process.env.PORT || 5000

const server = app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold))

// Handle unhandled promise rejections

process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`.red)
    //Close server & exit process
    server.close(() => process.exit(1))
})