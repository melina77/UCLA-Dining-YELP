const jwt = require('jsonwebtoken');

const validate = (req, res, next) => {
    const header = req.headers['authorization'];
    const token = header && header.split(' ')[1];
    if(token){
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.user = decoded;
        if(decoded){
            return next();
        }
    }
}

module.exports = { validate };