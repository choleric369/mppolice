const { request } = require('express');
const express = require('express');
const router = express.Router();
const Post = require('../models/criminal_records');
const verify = require('../verifyToken');
const multer = require('multer');
const { Mongoose } = require('mongoose');

const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null, './uploads');
    },
    filename: function(req,file,cb){
        cb(null, file.originalname);
    }
});
const upload = multer({storage:storage});

router.post('/', verify, upload.single('image'), (req,res) => {
console.log(req.file);
console.log(req.body);   
const post = new Post({
        cId: req.body.cId,
        Name: req.body.Name,
        Location: req.body.Location,
        Associates: req.body.Associates,
        Vehicles: req.body.Vehicles,
        Apparel: req.body.Apparel,
        criminalImage: req.file.path
    });
    post.save();
    res.send("Successfully created criminal record"); 
});
router.get('/:postId', async (req,res)=>{
    const p = await Post.findOne({Name: req.params.postId});
    res.json(p);
});
router.delete('/:postId', verify, async (req,res)=>{
    const removePost = await Post.remove({cId: req.params.postId});
    res.json(removePost);
    res.send("details removed successfully");
});
router.patch('/:postId', verify, async(req,res)=>{
    const updatePost = await Post.updateOne({cId: req.params.postId},{$set:{cId: req.body.cId, Name: req.body.Name, Location: req.body.Location, Associates: req.body.Associates, Vehicles: req.body.Vehicles, Apparel: req.body.Apparel}});
    res.json(updatePost);
    res.send("details updated successfully");
});
module.exports = router;