const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { user, post } = require('../models');
const User = require('../models').User;
const fs = require("fs");

//s'enregistrer
exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const userObject = req.body;
            delete userObject.id;
            console.log("userObj", userObject)
            const user = new User({
                ...userObject,
                password: hash,
                //cannot read filename 
                profilPicture: req.file !== undefined ?`${req.protocol}://${req.get('host')}/images/${req.file.filename}` : ""
            });
            user.save()
                .then(() => res.status(201).json({ message: 'utilisateur crée' }))
                .catch(error => res.status(400).json({ error }))
        })
};

//se connecter
exports.login = (req, res, next) => {
    User.findOne({ where: { email: req.body.email } })
        .then(user => {
            if (!user) {
                return res.status(401).json({ message: 'Paire login/mot de passe incorrecte' });
            }
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ message: 'Paire login/mot de passe incorrecte ' });
                    }
                    res.status(200).json({
                        userId: user.id,
                        token: jwt.sign(
                            { userId: user.id },
                            'RANDOM_TOKEN_SECRET',
                            { expiresIn: '24h' }
                        )
                    });
                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }))
};


//display one user
exports.displayOneUser = (req, res, next) => {
    User.findOne({ attributes: ["id","firstName", "lastName", "email", "userName", "bio", "profilPicture","isAdmin"], where: { id: req.params.id } })
        .then(user => res.status(200).json(user))
        .catch(error => res.status(404).json({ error }));
}



//update one user
exports.udpateOneUser = (req, res, next) => {
    const userObject = req.file ? {
        ...req.body,
        profilPicture: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };
    User.findOne({ where: { id: req.params.id } })
        //.then((user) => {
            //si id de celui qui veut modifier != de id de celui qui a crée
            //et que celui qui veut modifier n'est pas admin err 401
                User.findOne({ where: { id: req.auth.userId } })
                    .then((user) => {
                        if (user.isAdmin !== true && user.id !== req.auth.userId) {
                            
                                res.status(401).json({ message: "not authorized" });
                        }
                        else {
                            //gere la suppresion de lancienne img si user la remplace
                            if (req.file && user.profilPicture != null) {
                                fs.unlink(`images/${user.profilPicture.split('images/')[1]}`, () => { })
                            }
                            User.update({ ...userObject }, { where: { id: req.params.id } })
                                .then(() => res.status(200).json({ message: "objet modifié" }))
                                .catch(error => res.status(401).json({ error }));
                        }
                    })
     //  })
    console.log(error => res.status(400).json({ error }));
}


//delete User
exports.deleteOneUser = (req, res, next) => {
   User.findOne({ where: { id: req.params.id } })
       //.then(user => {
             //if (user.id != req.auth.userId)
              //  User.findOne({ where: { id: req.auth.userId } })
                    .then((user) => {
                        console.log("test 00000")
                        if (user.isAdmin !== true && user.id !== req.auth.userId) {
                            console.log("test1 ========>")
                            
                                res.status(401).json({ message: 'not authorized' });
                            
                        }
                        else{
                            console.log("test2 ========>")

                            const filename = user.profilPicture.split("/images/")[1];
                            console.log("filename ", filename)
                            fs.unlink(`images/${filename}`, () => {
                                console.log(filename)
                                User.destroy({ where: { id: req.params.id } })
                                    .then(() => { res.status(200).json({ message: "Objet supprimé" }) })
                                    .catch(error => res.status(401).json({ error }));
                                console.log("post.UserId 2", user.id)
                                console.log("req.auth.userId 2", req.auth.userId)
                                console.log(req.params.id)
                                console.log(user.isAdmin)
                            });
                            // console.log(error => res.status(400).json({ error }))
                        }
                    })
       // })
        .catch(error => {
            res.status(500).json({ error });
            console.log("user.id 4", user.id)
            console.log("req.auth.userId 4", req.auth.userId)


        })
}

//delete Image
exports.deleteImage = (req, res, next) => {
    console.log("delete img user")
    User.findOne({ where: { id: req.params.id } })
        .then(user => {
            console.log("user 1", user)
            if (user.id != req.auth.userId) {
                res.status(401).json({ message: 'not authorized' });
            } else {
                const filename = user.profilPicture.split("/images/")[1];
                fs.unlink(`images/${filename}`, () => {
                    user.profilPicture = null
                    user.save();
                    User.update({ user }, { where: { id: req.params.id } })
                        .then(() => { res.status(200).json({ message: "Objet supprimé" }) })
                        .catch(error => res.status(401).json({ error }));
                });
            }
        })
        .catch(error => {
            res.status(500).json({ error });
            console.log("user.id 4", user.id)
            console.log("req.auth.userId 4", req.auth.userId)


        })
}
