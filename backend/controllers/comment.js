const { user } = require('../models');

const Comment = require('../models').Comment;
const User = require('../models').User;
const Voter = require('../models').Voter;

//create Comment
exports.createComment = (req, res, next) => {
    Comment.create({
        ...req.body
    }).then(() => res.status(201).json({ message: 'Objet enregistré !' }))
        .catch(error => res.status(400).json({ error }));
}

//afficher tout les Comments
exports.displayAllComments = (req, res, next) => {
    Comment.findAll({ attributes: ["id", "UserId", "like", "content", "createdAt", "updatedAt", "CommentId", "PostId"] })
        .then(Comment => res.status(200).json(Comment))
        .catch(error => res.status(400).json({ error }))
}

exports.displayAllCommentsForPost =(req,res,next) => {
    Comment.findAll( { where: { id: req.params.id }, attributes: ["id", "UserId", "like", "content", "createdAt", "updatedAt", "CommentId", "PostId"] })
    .then(Comment => res.status(200).json(Comment))
    .catch(error => res.status(400).json({ error }))
}

//update one Comment
exports.udpateOneComment = (req, res, next) => {
    const commentObject = ({ ...req.body });
    Comment.findOne({ where: { id: req.params.id } })
        .then((comment) => {
            // post.UserId = req.body.UserId
            User.findOne({ where: { id: req.auth.userId } })
                .then((user) => {
                    if (user.isAdmin != true && comment.UserId != req.auth.userId) {

                        res.status(401).json({ message: "not authorized" });

                    } else {
                        Comment.update({ ...commentObject }, { where: { id: req.params.id } })
                            .then(() => res.status(200).json({ message: "objet modifié" }))
                            .catch(error => res.status(401).json({ error }));
                    }
                })
        })
        .catch(error => res.status(400).json({ error }))
}

exports.deleteOneComment = (req, res, next) => {
    Comment.findOne({ where: { id: req.params.id } })
        .then(comment => {
            // if (post.UserId != req.auth.userId)
            User.findOne({ where: { id: req.auth.userId } })
                .then((user => {
                    if (user.isAdmin != true && comment.UserId !== req.auth.userId) {
                        res.status(401).json({ message: 'not authorized' });

                    } else {
                        Comment.destroy({ where: { id: req.params.id } })
                            .then(() => { res.status(200).json({ message: "Objet supprimé" }) })
                            .catch(error => res.status(401).json({ error }));
                    }
                }))
        }).catch(error => { res.status(500).json({ error }) })
}

exports.likeComment = (req, res, next) => {
    Comment.findOne({ where: { id: req.params.id } })
        .then(comment => {
            Voter.findOne({ where: { UserId: req.auth.userId, CommentId: comment.id } })
                .then((voter) => {
                    if (voter !== null /*&& req.body.like === 0*/) {
                        comment.like -= 1;
                        comment.save();
                        Voter.destroy({ where: { UserId: req.auth.userId, CommentId: comment.id } })
                        res.status(200).json({ message: 'like retiré', like : comment.like });
                    }/* else if (voter !== null) {
                        res.status(400).json({ message: 'already liked', like : comment.like });

                    } else if (voter === null && req.body.like === 0 || req.body.like < 0 || req.body.like > 1) {
                        comment.like = comment.like;
                        res.status(200).json({ message: 'already unliked', like : comment.like });
                    }*/
                    else {
                        const voter = new Voter();
                        voter.CommentId = comment.id;
                        voter.UserId = req.auth.userId;
                        voter.save();
                        comment.like += 1;
                        comment.save();
                        res.status(201).json({ message: 'like added', like : comment.like })
                    }
                })
                .catch(err => res.status(500).json({ err }))
        })
}

