import express from "express";
import dotenv from 'dotenv'
import cors from 'cors'
import nocache from "nocache";
import cookieParser from 'cookie-parser'
import { connectDb } from "./config/dbConfig";
import userRoutes from './routes/userRoutes'
import taskRoutes from './routes/taskRoutes'
import { Request, Response } from 'express'


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

app.use('/user', userRoutes)

app.use('/task', taskRoutes)

app.use((req: Request, res: Response) => {
    res.status(404).json({ message: 'Not found' })
})

app.listen(port, () => {
    console.log(`server running on the port ${port}`);

})