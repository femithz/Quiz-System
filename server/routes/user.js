const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Image = require('../models/image');
const passport=require('passport');
const cloudinary = require('cloudinary');
const multer = require('multer');
// Section that Handles image
cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.API_ID,
    api_secret:process.env.API_SECRET
})
// Router for User to Upload Profile Image
  const storage = multer.diskStorage({
    filename:function (req,file,cb) {
       var datetimestamp = Date.now();
       cb(null, file.fieldname + '-' + Date.now());
       filepath = datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1];
      cb(null, filepath);
    } 
   });
  const fileFilter=(req,file,cb) => {
  //reject a file
  if (file.mimetype==='image/jpeg' || 'image/png' ) { 
    cb(null,true);
  }else{
    cb(null,false);
   }    
  } 
  const upload=multer({
   storage:storage,
   limits:{fileSize :1024*1024*5},
    fileFilter:fileFilter
  });
  router.post('/upload', upload.single('profileimage'), function (req,res)  { 
    cloudinary.v2.uploader.upload(req.file.path, function(err, result){
       if(err){
        return res.status(501).json(err);
       } else {
         req.body.profileimage= result.secure_url;
         var newImage = new Image ({
           imageURL:req.body.profileimage,
           profileimage_posted_date:Date.now(),
         });
         console.log(newImage);
         newImage.save(function (err, profile) {
           if (err) {
             console.log(err)
             return res.status(500).json();
           } else {
             console.log(profile);
             return res.status(200).json();
           }
         })
       }
  });
  });
  // Section to check validity of User
  function isValidUser(req,res,next) {
        if (req.isAuthenticated()) next();
        else return res.status(401).json({message:'Unauthorized Request'}); 
  }
module.exports = router;