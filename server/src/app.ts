import express from "express";
import dotenv from 'dotenv'
import cors from 'cors'
import nocache from "nocache";
import cookieParser from 'cookie-parser'
import { connectDb } from "./config/dbConfig";


dotenv.config()

const app = express()

const port = process.env.PORT || 3500

connectDb()

const corsOptions = {
    origin: process?.env?.FRONT_END_URL,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
}



app.use(cors(corsOptions));
app.use(cookieParser())
app.use(nocache())

app.use(express.json())
app.use(express.urlencoded({ extended: true }))



app.listen(port, () => {
    console.log(`server running on the port ${port}`);

})