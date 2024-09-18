import mongoose from "mongoose";

const mongoURI = process.env.MONGO_URI

if (!mongoURI) {
    throw new Error('MongoURI is not defined')
}

export const connectDb = async () => {

    try {

        await mongoose.connect(mongoURI)
        console.log('MongoDB connection successful')

    } catch (error: any) {
        console.log('MongoDB connection failed', error)
    }
}