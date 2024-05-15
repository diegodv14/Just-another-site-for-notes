import express from 'express'
import cors from 'cors'
import { connectDB } from './databases/Mongo.js'
import cookieParser from 'cookie-parser'
import { AuthRouter } from './routes/auth.routes.js'
import { NoteRouter } from './routes/note.routes.js'
import morgan from 'morgan'
import 'dotenv/config'

export const app = express()

connectDB()

app.use(cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000"
}))

app.use(express.json())

app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))

app.use(cookieParser())

app.use('/api', AuthRouter)

app.use('/api/notes', NoteRouter)

app.use((request, response) => {
    response.status(404).send('Error: Endpoint not found')
})


