const Post = require('../models').Post;
const User = require('../models').User;
const Voter = require('../models').Voter;

const fs = require('fs');
const { parse } = require('path');
const { json } = require('sequelize');
const { post, user, voter } = require('../models');
console.log(user)

//create post
exports.createPost = (req, res, next) => {
    console.log('req body', req.body)
    const postObject = req.body;
    delete postObject.id;
    delete postObject.userId;
    const post = new Post({
        ...postObject,
        UserId: req.auth.userId,

        //cannot read properties of undefined readin filename
        imageUrl:  req.file !== undefined ?`${req.protocol}://${req.get('host')}/images/${req.file.filename}` : ""
    });
    post.save()
        .then(() => { res.status(201).json({ message: 'Post crée avec succès !' }) })
        .catch(error => { res.status(400).json({ error }) })
};

//afficher tout les posts

//includes pour recupere les data du post like 
exports.displayAllPosts = (req, res, next) => {
    Post.findAll()
        .then(post => res.status(200).json(post))
        .catch(error => res.status(400).json({ error }))
};

//display one post
exports.displayOnePost = (req, res, next) => {
    Post.findOne({ where: { id: req.params.id }, attributes: ["title", "text", "imageUrl"] })
        .then(post => res.status(200).json(post))
        .catch(error => res.status(404).json({ error }));
};

//update one post
exports.udpateOnePost = (req, res, next) => {
    const postObject = req.file ? {
        ...req.body,
        imageUrl:  req.file !== undefined ?`${req.protocol}://${req.get('host')}/images/${req.file.filename}` : ""
    } : { ...req.body };
    Post.findOne({ where: { id: req.params.id } })
        .then((post) => {
                User.findOne({ where: { id: req.auth.userId } })
                    .then((user) => {
                        if (user.isAdmin != true && post.UserId !== req.auth.userId) {
                                
                            console.log("postUserID" , post.UserId)
                            console.log('req.auth.userId', req.auth.userId)
                                console.log('test3 ===========>')
                                res.status(401).json({ message: "not authorized" });
                            
                        } else {
                            console.log('test4 ===========>')
                            console.log("req.file")
                            console.log(req.file)
                            //gere la suppresion de lancienne img si user la remplace
                            if (req.file && post.imageUrl != null) {
                                fs.unlink(`images/${post.imageUrl.split('images/')[1]}`, () => { })
                            }

                            Post.update({ ...postObject }, { where: { id: req.params.id } })
                                .then(() => res.status(200).json({ message: "objet modifié" }))
                                .catch(error => res.status(401).json({ error }));
                        }
                    }).catch(error => res.status(400).json({ error }))

        })
        .catch(error => res.status(400).json({ error }))
}


//delete one post
exports.deleteOnePost = (req, res, next) => {
    Post.findOne({ where: { id: req.params.id } })
        .then(post => {
            // if (post.UserId != req.auth.userId)
                User.findOne({ where: { id: req.auth.userId } })
                    .then((user) => {
                        if (user.isAdmin != true  && post.UserId !== req.auth.userId) {
                            {
                                console.log("post.UserId 1", post.UserId)
                                console.log("req.auth.userId 1", req.auth.userId)
                                res.status(401).json({ message: `vous n'êtes pas autorisé a supprimé ce message` });
                            }
                        } else {
                            const filename = post.imageUrl.split("/images/")[1];
                            fs.unlink(`images/${filename}`, () => {
                                console.log(filename)
                                Post.destroy({ where: { id: req.params.id } })
                                    .then(() => { res.status(200).json({ message: "Objet supprimé" }) })
                                    .catch(error => res.status(401).json({ error }));
                            });
                        }
                    })
                    .catch(error => {
                        res.status(500).json({ error });
                    })
        })
}

//delete image 
//gerer suppression img si user ne la remplace pas 
exports.deleteImage = (req, res, next) => {
    console.log("test post delete img")
    Post.findOne({ where: { id: req.params.id } })
        .then(post => {
            if (post.UserId != req.auth.userId) {
                res.status(401).json({ message: 'not authorized' });
            } else {
                console.log('post obj1', post)
                const filename = post.imageUrl.split("/images/")[1];
                fs.unlink(`images/${filename}`, () => {
                    console.log("post", post)
                    console.log(filename)
                    post.imageUrl = null
                    post.save();
                    Post.update({ post }, { where: { id: req.params.id } })
                        .then(() => { res.status(200).json({ message: "Objet supprimé" }) })
                        .catch(error => res.status(401).json({ error }));
                    console.log('post after', post)

                });
            }
        })
        .catch(error => {
            res.status(500).json({ error });
        })
}

//like systeme 

exports.likePost = (req, res, next) => {
    console.log("post like route")
     Post.findOne({ where: { id: req.params.id } })
                    .then(post => {
                        Voter.findOne({where : {UserId : req.auth.userId, PostId : post.id}})
                        .then((voter)=>{
                            console.log(voter)
                            if(voter !== null ){
                                console.log("reqbody",req.body)
                                post.like -=1;
                                post.save();
                                Voter.destroy({where :{UserId :req.auth.userId, PostId : post.id}})
                                res.status(200).json({ message: 'like retiré' });   
                            }
                            else{
                                const voter = new Voter();
                                voter.PostId=post.id;
                                voter.UserId=req.auth.userId;
                                voter.save();
                                post.like +=1;
                                post.save();
                                res.status(201).json({message : 'like added'})
                            }  
                        })
                        .catch(err =>res.status(500).json({err}))
                    })}

