import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import connectDB from './config/connection.js'




dotenv.config()

const port = process.env.PORT || 8000

const app = express()

const corsOption = {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}

//middlewares
app.use(cors(corsOption))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//routes
app.get('/', (req, res) => {
    res.send('API is running...')
})




//connect to database
connectDB().then(() => {
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`)
    })
}).catch((error) => {
    console.error('Error starting server:', error)
    process.exit(1)
}).finally(() => {
    console.log('Server setup process completed.')
})


