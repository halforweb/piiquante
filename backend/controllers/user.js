//* import bcrypt, jsonwebtoken 
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//* import the user model
const User = require('../models/User');

//* define and export the signup function
exports.signup = (req, res, next) => {
    //* hash the password entered by the user with hash algo running 10 times
    bcrypt.hash(req.body.password, 10)
        //* create a new user respecting the format of the database 
        .then(hash => {
            const user = new User({
                email: req.body.email,
                password: hash
            });
            //* save the user in the database
            user.save()
                .then(() => res.status(201).json({ message: 'User created !' }))
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};

//* define and export the login function
exports.login = (req, res, next) => {
    //* check if the user exists in the database 
    User.findOne({ email: req.body.email })
        .then(user => {
            //* the user doesn't exist in the database    
            if (!user) {
                return res.status(401).json({ message: 'incorrect login/password' });
            }
            //* the user exist in the database and we execute a check on the password   
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ message: 'incorrect login/password' });
                    }
                    //* the user exist, the password is right; we encrypt a new token for the userID
                    res.status(200).json({
                        userId: user._id,
                        token: jwt.sign(
                            { userId: user._id },
                            `${process.env.TOKEN}`,
                            { expiresIn: '24h' }
                        )
                    });
                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};