const jwt = require('jsonwebtoken');

exports.authenticateToken = (req, res, next) => {
    const authHeaders = req.headers.authorization;

    if (!authHeaders) {
        return res.status(401).json({
            message: 'No token'
        })
    }

    const token = authHeaders.split(' ')[1];

    jwt.verify(token, process.env.ACCESS_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({
                message: 'Invalid Token'
            })
        }

        req.user = user;

        next()
    })
}

exports.isAdmin = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(200).json({
            success: false,
            message: 'Access denied'
        })
    }
    next();
}