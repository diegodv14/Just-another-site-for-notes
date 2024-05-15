import jwt from "jsonwebtoken"

export const AuthRequired = (req, res, next) => {
    try {
        const token = req.cookies.token
        if (!token) return res.status(401).json({ error: "No Authorized" })

        jwt.verify(token, process.env.SECRET)
        next()
    } catch (err) {
        return res.status(401).json({ error: "The token is deprecated" })
    }
}