//* call Multer
const multer = require('multer');

//* creation of a dictonnary that will be used to standardize the format name of the images
const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
};

//* creation of constante to define in multer the place to save the images - using the destination function
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'images');
    },
    //* standardize the name of the images, replacing spaces with underscore, using the dictonary and adding a timestamp - using the filename function
    filename: (req, file, callback) => {
        const name = file.originalname.split(' ').join('_');
        const extension = MIME_TYPES[file.mimetype];
        callback(null, name + Date.now() + '.' + extension);
    }
});

//* export multer with storage defined through the storage constant, taking into account the image files only
module.exports = multer({ storage: storage }).single('image');