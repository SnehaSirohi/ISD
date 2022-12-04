const mongoose = require("mongoose")
const Schema = mongoose.Schema
const SubmittedAssignment = new Schema({
    name:{
        type:String,
        required:true
    },
    subject:{
        type:String,
        required:true
    },
    semester:{
        type:String,
        required:true
    },
    date:{
        type:String,
        required:true
    },
    file:{
        type:String,
        required:true
    },
})
module.exports=mongoose.model("SubmittedAssignment",SubmittedAssignment)