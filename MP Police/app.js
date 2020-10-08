const express = require('express');
const multer = require('multer');
//const ejs = require('ejs');
//const path = require('path');
const app = express();
const mongoose = require('mongoose');
const authRoute = require('./routes/auth');
const postsRoute = require('./routes/posts');
//const postsRout = require('./routes/posts1');
var bodyParser = require('body-parser');
 
//app.use(bodyParser.json()); 
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/user',authRoute);
app.use('/addcriminal',postsRoute);
app.use('/uploads',express.static('uploads'));
//app.use('/posts1',postsRout);
app.get('/', (req,res)=>{
    res.send('We are on home');
});
mongoose.connect('mongodb://localhost:27017/Criminals',{useNewUrlParser: true, useUnifiedTopology: true}, ()=> console.log('connected to DB!'))
app.listen(3000);