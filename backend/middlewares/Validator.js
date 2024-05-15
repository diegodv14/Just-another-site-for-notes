export const ValidateSchema = (schema) => (req, res, next) => {
    try {
        schema.parse(req.body)
        next()
    }
    catch (err) {
        return res.json({ error: err })
    }
}