import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/crm'

const connectDB = async () => {
    try {
        await mongoose.connect(mongoURI)
    } catch (error) {
        console.error('Error connecting to MongoDB:', error)
        process.exit(1)
    }
}

export default connectDB
