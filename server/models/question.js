// Schema for User
var mongoose=require('mongoose');
var Schema=mongoose.Schema
var bcrypt=require('bcryptjs');

var QuestionSchema=mongoose.Schema({
    questionid:mongoose.Schema.Types.ObjectId,
    question:{
       type: String,
       require:true
    },
    options: [
        {question: String, correct: Boolean, selected: Boolean},
		{question: String, correct: Boolean, selected: Boolean},
		{question: String, correct: Boolean, selected: Boolean},
		{question: String, correct: Boolean, selected: Boolean},
    ]
    // email:{
    //    type:String,
    //    require:true,
    //    trim: true, 
    //    unique: true,
    //    match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    // }
});
module.exports=mongoose.model('Question',QuestionSchema);