//* import express, path module to navigate folders, helmet to secure headers
const express = require('express');
const path = require('path');
const helmet = require('helmet');

//* import the routes related to sauce and user 
const sauceRoutes = require('./routes/sauce');
const userRoutes = require('./routes/user');

//* import environment variable
if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
};

//* creation of an express application 
const app = express();

//* set up the database MongoDB
const mongoose = require('mongoose');
const { addAbortSignal } = require('stream');
mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_NAME}.mongodb.net/?retryWrites=true&w=majority`,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

//* set up of control access headers to avoid CORS issues
app.use((req, res, next) => {
    //* allow all users to have access to the api
    res.setHeader('Access-Control-Allow-Origin', '*');
    //* allow to have specific headers to interact with the API
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    //* allow to have specific methods to interact with the API
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

//* define the middleware functions to be applied on the application
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" })); //* secure headers allowing cross origin resource display
app.use(express.json()); //* parse incoming request with json
app.use('/images', express.static(path.join(__dirname, 'images'))); //* manage images request as static to allow the images display
app.use('/api/sauces', sauceRoutes); //* middleware to be exectuted for sauces manipulation 
app.use('/api/auth', userRoutes); //* middleware to be executed for authentification

//* export the application
module.exports = app;