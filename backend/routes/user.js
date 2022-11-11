const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const password = require('../middleware/password');
const limiter = require('../middleware/limiter');
const userCtrl = require('../controllers/user');

//s'enregistrer
router.post('/signup',password,multer,userCtrl.signup);

//se connecter
router.post('/login',limiter,userCtrl.login);

//read one
router.get('/:id',auth, userCtrl.displayOneUser);

//update one
router.patch('/:id',auth,multer,userCtrl.udpateOneUser);

//delete one
router.delete('/:id',auth, userCtrl.deleteOneUser);

//delete image 
router.delete('/:id/image',auth,userCtrl.deleteImage);

module.exports = router;