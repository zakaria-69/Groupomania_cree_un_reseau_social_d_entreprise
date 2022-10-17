const express = require ('express');
const router = express.Router();
const auth = require('../middleware/auth')
const commentCtrl = require("../controllers/comment")

//create
router.post('/',auth, commentCtrl.createComment);

//read all
router.get('/',auth, commentCtrl.displayAllComments);


//update one
router.patch('/:id',auth, commentCtrl.udpateOneComment);

//delete one
router.delete('/:id',auth, commentCtrl.deleteOneComment);

//like systeme comment 

router.post('/:id/like',auth,commentCtrl.likeComment)





module.exports = router;