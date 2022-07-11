//* import mongoose and uniqueValidator 
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

//* cretate the user schema with a unique email
const userSchema = mongoose.Schema({
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: [true, "Email required"],
    validate: {
      validator: function (emailInput) { return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailInput); },
      message: "Please enter a valid email"
    },
  },
  password: {
    type: String,
    required: [true, "Password required"],
    validate: {
      validator: function (passwordInput) { return /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(passwordInput); },
      message: "Please enter a valid 8 characters password with at least 1 cap letter, 1 min letter, 1 number, 1 special characters"
    },
  }
});

//* apply the uniqueValidator plugin to the schema created
userSchema.plugin(uniqueValidator);

//* export the user schema into a model
module.exports = mongoose.model('User', userSchema);