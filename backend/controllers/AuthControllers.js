import { User } from "../models/Users.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import 'dotenv/config'

export const GetRegister = async (req, res) => {
    try {
        const { username, password } = req.body
        const passwordHash = await bcrypt.hash(password, 10)
        const newUser = new User({
            username,
            passwordHash
        })

        const SavedUser = await newUser.save()

        res.status(201).json({
            id: SavedUser._id,
            username: SavedUser.username
        })
    }
    catch (error) {
        if (error.name === 'MongoServerError' && error.message.includes('E11000 duplicate key error')) {
            return res.json({ error: 'This username was already taken.' })
        }
        res.json({ error })
    }
}

export const GetLogin = async (req, res) => {
    try {
        const { username, password } = req.body

        const UserFound = await User.findOne({ username })

        if (!UserFound) return res.json({ error: "The user does not exist" })

        const passwordCorrect = await bcrypt.compare(password, UserFound.passwordHash)

        if (!passwordCorrect) return res.json({ error: "The password is incorrect" })

        const token = jwt.sign({ username: UserFound.username, id: UserFound._id }, process.env.SECRET, { expiresIn: 60 * 60 })
        if (!token) return res.json({ error: "An error ocurred generating the token" })
        else {
            const userData = {
                id: UserFound._id,
                username: UserFound.username,
                token: token
            }
            res.status(200).json(userData)
        }
    }
    catch (err) {
        res.json({ error: err })
    }
}

export const GetLogout = (req, res) => {
    res.status(200).json({ message: 'you are out' })
}