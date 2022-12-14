const express = require ('express');
const router = express.Router();
const auth = require('../middleware/auth')
const postCtrl = require('../controllers/post');
const multer = require('../middleware/multer-config')
const commentCtrl = require("../controllers/comment")

//create
router.post('/',auth,multer,postCtrl.createPost);

//read all
router.get('/',auth, postCtrl.displayAllPosts);

//read one
router.get('/:id',auth, postCtrl.displayOnePost);

//update one
router.patch('/:id',auth,multer,postCtrl.udpateOnePost);

//delete one
router.delete('/:id',auth, postCtrl.deleteOnePost);

//delete image 

router.delete('/:id/image',auth,postCtrl.deleteImage)

//like systeme 

router.post('/:id/like',auth,postCtrl.likePost)

//read one
router.get('/:id/comments',auth, commentCtrl.displayAllCommentsForPost);

//create
router.post('/:id/comment',auth, commentCtrl.createComment);

module.exports = router;