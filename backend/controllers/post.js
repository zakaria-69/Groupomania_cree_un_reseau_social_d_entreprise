const Post = require('../models').Post;
const User = require('../models').User;
const Voter = require('../models').Voter;

const fs = require('fs');
const { parse } = require('path');
const { json } = require('sequelize');
const { post, user, voter } = require('../models');

//create post
exports.createPost = (req, res, next) => {
    const postObject = req.body;
    delete postObject.id;
    delete postObject.userId;
    const post = new Post({
        ...postObject,
        UserId: req.auth.userId,
        imageUrl: req.file !== undefined ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : ""
    });
    post.save()
        .then(() => { res.status(201).json({ message: 'Post crée avec succès !' }) })
        .catch(error => { res.status(400).json({ error }) })
};

//afficher tout les posts 
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
        imageUrl: req.file !== undefined ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : ""
    } : { ...req.body };
    Post.findOne({ where: { id: req.params.id } })
        .then((post) => {
            User.findOne({ where: { id: req.auth.userId } })
                .then((user) => {
                    if (user.isAdmin != true && post.UserId !== req.auth.userId) {
                        res.status(401).json({ message: "not authorized" });
                    } else {
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
            User.findOne({ where: { id: req.auth.userId } })
                .then((user) => {
                    if (post.UserId !== req.auth.userId && user.isAdmin != true) {
                            res.status(401).json({ message: `vous n'êtes pas autorisé a supprimé ce message` });                      
                    } else if (post.UserId === req.auth.userId && user.isAdmin === true && post.imageUrl === true) {
                        const filename = post.imageUrl.split("/images/")[1];
                        fs.unlink(`images/${filename}`, () => {
                            Post.destroy({ where: { id: req.params.id } })
                                .then(() => { res.status(200).json({ message: "Objet supprimé" }) })
                                .catch(error => res.status(401).json({ error }));
                        });
                    }else{
                        Post.destroy({ where: { id: req.params.id } })
                                .then(() => { res.status(200).json({ message: "Objet supprimé" }) })
                                .catch(error => res.status(401).json({ error }));
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
    Post.findOne({ where: { id: req.params.id } })
        .then(post => {
            User.findOne({ where: { id: req.auth.userId } })
            .then((user) =>{
            if (post.UserId !== req.auth.userId && user.isAdmin != true) {
                res.status(401).json({ message: 'not authorized' });
            } else {
                const filename = post.imageUrl.split("/images/")[1];
                fs.unlink(`images/${filename}`, () => {
                    post.imageUrl = null
                    post.save();
                    Post.update({ post }, { where: { id: req.params.id } })
                        .then(() => { res.status(200).json({ message: "Objet supprimé" }) })
                        .catch(error => res.status(401).json({ error }));
                });
            }
        })
})
.catch(err => res.status(500).json(err))
}

//like systeme 
exports.likePost = (req, res, next) => {
    Post.findOne({ where: { id: req.params.id } })
        .then(post => {
            Voter.findOne({ where: { UserId: req.auth.userId, PostId: post.id } })
                .then((voter) => {
                    if (voter !== null) {
                        post.like -= 1;
                        post.save();
                        Voter.destroy({ where: { UserId: req.auth.userId, PostId: post.id } })
                        res.status(200).json({ message: 'like retiré', like : post.like });
                    }
                    else {
                        const voter = new Voter();
                        voter.PostId = post.id;
                        voter.UserId = req.auth.userId;
                        voter.save();
                        post.like += 1;
                        post.save();
                        res.status(201).json({ message: 'like added', like : post.like })
                    }
                })
                .catch(err => res.status(500).json({ err }))
        })
}

