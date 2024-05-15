import mongoose from 'mongoose'
import { MONGODB_URI } from '../utils/config.js'

const url = MONGODB_URI

mongoose.set("strictQuery", false)

export const connectDB = () => {
    try {
        mongoose.connect(url)
        console.log("Connected")
    }
    catch (err) {
        console.error("An error appears", err)
    }
}



