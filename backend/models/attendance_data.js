const mongoose=require("mongoose")
const Schema=mongoose.Schema

const attendancereport = new Schema({

    date:{
        type:Date,
        required:true

    },
    name:{
        type:String,
        required:true

    },
   attendanceStatus:{
        type:String,
        required:true
   }
})

module.exports=mongoose.model("attRep",attendancereport)