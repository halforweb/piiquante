//* import jsonwebtoken
const jwt = require('jsonwebtoken');

//* define and export the middleware auth 
module.exports = (req, res, next) => {
    try {
        //* get the token without bearer and check it with verify method
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, `${process.env.TOKEN}`);

        //* get the user id from the decoded token and execute the authentification
        const userId = decodedToken.userId;
        req.auth = {
            userId: userId
        };
        next();
    } catch (error) {
        res.status(401).json({ error });
    }
};