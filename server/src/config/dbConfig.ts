import mongoose from "mongoose";
import { config } from "./config";


export const connectDb = async () => {

    try {
        await mongoose.connect(`mongodb+srv://${config.mongo.username}:${config.mongo.password}@cluster0.trekfmx.mongodb.net/${config.mongo.database}?retryWrites=true&w=majority`)

        console.log('MongoDB connection successful')

    } catch (error: any) {
        console.log('MongoDB connection failed', error)
    }
}