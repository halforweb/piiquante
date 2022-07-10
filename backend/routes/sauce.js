//* import express
const express = require('express');

//* creation of the router
const router = express.Router();

//* import authentification and image mgt middleware
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

//* import the business logic for sauce management and like feature
const sauceCtrl = require('../controllers/sauce');
const likeCtrl = require('../controllers/like');

// * define the routes for each API endpoint; including the auth and img mgt middleware
router.post('/', auth, multer, sauceCtrl.createSauce);
router.get('/', auth, sauceCtrl.getAllSauce);
router.get('/:id', auth, sauceCtrl.getOneSauce);
router.put('/:id', auth, multer, sauceCtrl.modifyOneSauce);
router.delete('/:id', auth, sauceCtrl.deleteOneSauce);
router.post('/:id/like', auth, likeCtrl.likeSauce);

// * export the router
module.exports = router;