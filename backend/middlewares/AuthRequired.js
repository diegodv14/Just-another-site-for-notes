import jwt from "jsonwebtoken"

export const AuthRequired = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]
        if (!token) return res.status(401).json({ error: "No Authorized" })
        const verify = jwt.verify(token, process.env.SECRET)
        req.data = verify
        next()
    } catch (err) {
        return res.json({ error: "The token is deprecated" })
    }
}