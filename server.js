import express from 'express'
import dotenv from 'dotenv'

//Load env vars //load
dotenv.config({path: './config/config.env'})

const app = express()

app.get('/api/v1/bootcamps', (req, res) => {
    res.status(200).json({success: true, msg: 'Show all bootcamps'})
} )

app.get('/api/v1/bootcamps:id', (req, res) => {
    res.status(200).json({success: true, msg: `Show single bootcamp ${req.params.id}`})
} )

app.post('/api/v1/bootcamps', (req, res) => {
    res.status(200).json({success: true, msg: 'Create new bootcamp'})
} )

app.put('/api/v1/bootcamps:id', (req, res) => {
    res.status(200).json({success: true, msg: `Update bootcamp ${req.params.id}`})
} )

app.delete('/api/v1/bootcamps', (req, res) => {
res.status(200).json({success: true, msg: `delete bootcamp ${req.params.id}`})
})


const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`))