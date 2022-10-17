const express = require ('express');
const cookieParser = require('cookie-parser');
const app = express();
//const auth = require('./middleware/auth')
// const multer = require('./middleware/multer-config')


const db = require("./models/index")

const path = require ('path')

const cors = require("cors");

const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');
const commentRoutes = require('./routes/comment');


const sequelize = require('sequelize');

/*const corsOptions = {
  origin: "http://localhost:3001",
  credentials: true,
  allowedHeaders: ["sessionId", "Content-Type"],
  exposedHeaders: ["sessionId"],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
  preflightContinue: false,
};
app.use(cors(corsOptions));
app.use(cookieParser());*/



//outrepasser cors error
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

  //donne acces aux contenu des objets de requête(anciennement bodyParser)
//app.use(express.json());

app.use(express.json({  extended: true }));
app.use(express.urlencoded({  extended: true }));



app.use('/api/users',userRoutes);
app.use('/api/posts',postRoutes);
app.use('/api/comments',commentRoutes);
app.use('/images',express.static(path.join(__dirname,'images')));

module.exports = app;
