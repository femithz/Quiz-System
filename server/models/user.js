// Schema for User
var mongoose=require('mongoose');
var Schema=mongoose.Schema
var bcrypt=require('bcryptjs');

var UserSchema=mongoose.Schema({
    user_id:mongoose.Schema.Types.ObjectId,
    username:{
    	type:String,
        require:true,
        trim: true, 
        unique: true,
    },
    email:{
       type:String,
       require:true,
       trim: true, 
       unique: true,
       match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    },
    password:{
    	       type:String,
               require:true
    },
    // imageURL:{
    //     type:String,
    // },
    reg_dt:{
        type:Date,
    	require:true
    },
    profileimage_posted_date:{
        type:Date,
    	require:true
    },
    facebook: {
        type: {
              id: String,
              token: String,
              email: String,
              name: String
        },
        select: false
  }
});

UserSchema.statics.hashPassword=function hashPassword(password){
    return bcrypt.hashSync(password,10)
}
UserSchema.methods.isValid=function (hashedpassword) {
    return bcrypt.compareSync(hashedpassword,this.password);
}

module.exports=mongoose.model('User',UserSchema);