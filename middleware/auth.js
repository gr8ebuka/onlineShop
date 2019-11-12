const jwt = require('jsonwebtoken');

// module.exports = (req, res, next) => {
//     const decoded = jwt.verify(req.body.token, process.env.JWT_PrivateKey)

// }

module.exports= (req, res, next) => {
    const token = req.header('x-auth-token')
    if(!token) return res.status(401).json({
        message: 'Access Denied!'
    })
    try {
        const decoded = jwt.verify(token,    process.env.JWT_PrivateKey)
        req.user = decoded;
        next()
    } catch (error) {
        res.status(400).json({
            message:'Invalid token provided' 
        })        
    }
}