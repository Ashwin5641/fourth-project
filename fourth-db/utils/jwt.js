const jwt = require('jsonwebtoken');

exports.generateAccessToken = (user) => {
    return jwt.sign(
        {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role
        },
        process.env.ACCESS_SECRET,
        {
            expiresIn: '15m'
        }
    )
}

exports.generateRefreshToken = (user) => {
    return jwt.sign(
        {
            id: user.id
        },
        process.env.REFRESH_SECRET,
        {
            expiresIn: '7d'
        }
    )
}