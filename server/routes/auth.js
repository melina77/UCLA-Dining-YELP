const jwt = require('jsonwebtoken');

const validate = (req, res, next) => {
    const header = req.headers['authorization'];
    const token = header && header.split(' ')[1];
    if(token){
        try {
            const decoded = jwt.verify(token, process.env.SECRET_KEY);
            req.user = decoded;
            return next();
        } catch (error) {
            console.error('Token verification failed:', error);
            return res.status(401).json({ message: 'Token verification failed' });
        }
    } else {
        return res.status(401).json({"messages": "not authorized"})
    }
}

module.exports = { validate };