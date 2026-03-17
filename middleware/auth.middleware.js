const jwt = require("jsonwebtoken")

const authMiddleware = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization
        const token = authHeader && authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : authHeader
        if (!token) {
            return res.status(401).json({ message: "Token topilmadi" })
        }
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decodedToken
        next()
    } catch (error) {
        res.status(500).json({ message: "Token noto'g'ri" })
    }
}

module.exports = authMiddleware