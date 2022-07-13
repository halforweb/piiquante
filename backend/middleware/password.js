//* import password-validator
const pwdValidator = require('password-validator');

//* Create a schema
var passwordSchema = new pwdValidator();

//* Define the schema 
passwordSchema
.is().min(8)                                    //* Minimum length 8
.is().max(100)                                  //* Max length 100
.has().uppercase()                              //* Must have uppercase letters
.has().lowercase()                              //* Must have lowercase letters
.has().digits(2)                                //* Must have at least 2 digits
.has().not().spaces()                           //* Should not have spaces
.is().not().oneOf(['Passw0rd', 'Password123']); //* Blacklist these values

//* Export the middleware and check the quality of the pwd vs the pwdSchema 
module.exports = (req, res, next) => {
    if (passwordSchema.validate(req.body.password)){
        next();
    }else{
        return res
        .status(400)
        .json({error:"the password is not strong enough:"+ passwordSchema.validate('req.body.passsword',{list:true})})
    }
}