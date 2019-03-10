// Schema for User
var mongoose=require('mongoose');
var Schema=mongoose.Schema
var bcrypt=require('bcryptjs');

var ImageSchema=mongoose.Schema({
    user_id:mongoose.Schema.Types.ObjectId,
    imageURL:{
        type:String,
    },
    // backgroundURL:{
    //     type:String,
    // },
    profileimage_posted_date:{
        type:Date,
    	require:true
    },
});

module.exports=mongoose.model('Image',ImageSchema);