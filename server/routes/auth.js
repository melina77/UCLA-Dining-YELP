//authorization router that can retrieve data from the jsonwebtoken
const jwt = require('jsonwebtoken');

const validate = (req, res, next) => {
    //takes the jsonwebtoken from the header labelled authorization
    const header = req.headers['authorization'];
    //token is the second element of the header
    const token = header && header.split(' ')[1];
    if(token){
        try {
            //token is checked to make sure it exists and is not expired
            const decoded = jwt.verify(token, process.env.SECRET_KEY);
            //json data from token is decoded and put into req.user
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