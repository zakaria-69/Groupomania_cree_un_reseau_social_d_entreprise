const express = require ('express');
const cookieParser = require('cookie-parser');
const app = express();
const dotenv = require('dotenv').config();

const db = require("./models/index")

const path = require ('path')

const cors = require("cors");

const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');
const commentRoutes = require('./routes/comment');


const sequelize = require('sequelize');

//outrepasser cors error
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

app.use(express.json({  extended: true }));
app.use(express.urlencoded({  extended: true }));

app.use('/api/users',userRoutes);
app.use('/api/posts',postRoutes);
app.use('/api/comments',commentRoutes);
app.use('/images',express.static(path.join(__dirname,'images')));

module.exports = app;
