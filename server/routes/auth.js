const express = require('express');
const router = express.Router();
const User = require('../models/user');
const passport=require('passport');
const cloudinary = require('cloudinary');
var multer = require('multer');
// var Book = require('../models/book');
// var Rating =require('../models/rating')
// Section that Handles image
// Router for User Registration
router.get('/', function(req, res, next) {
  res.send('Welcome to Auth Section Developed By Femithz');
});
router.post('/register', function(req, res, next) {
   addToDB(req,res); 
});
async function addToDB(req,res){
  const user= new User({
    email:req.body.email,
    username:req.body.username,
    password:User.hashPassword(req.body.password),
    reg_dt:Date.now()
  });
  try{
    doc = await user.save();
    console.log(doc);
    return res.status(201).json(doc);
  } 
  catch(err) {
    console.log(err);
    return res.status(501).json(err);
  }
}
// Section to login
router.post('/login', function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
      if (err) { return res.status(501).json(err); }
      if (!user) { return res.status(501).json(info); }
      req.logIn(user, function(err) {
        if (err) { 
          return res.status(501).json(err);
         }
         else {
          return res.status(200).json({
            message:'You have Successfully Login'
          });
         }
      });
    })(req, res, next);
});
// section for facebook signup and login authentication
router.get('/auth/facebook', passport.authenticate('facebook'));

router.get('/auth/facebook/callback',
  passport.authenticate('facebook', { successRedirect: '/profile',
                                      failureRedirect: '/' }));
module.exports = router;