const jwt = require('jsonwebtoken')
require('dotenv').config()

function isLoggedIn (req, res, next){
    const token = req.cookies?.token
    if (!token){
        return res.status(401).json({
            message: "User not logged in"
        })
    }

    try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decoded
    return next()
    } catch (err) {
        return res.status(401).json({
            message: "Invalid or Expired Token",
        })
    }
}

module.exports = isLoggedIn