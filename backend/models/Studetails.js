const mongoose = require('mongoose')

const Schema = mongoose.Schema

const studentDetails=new Schema(
    {
        Name:{
            type:String,
            required : true
        }
    },{timestamps:true}
)
module.exports = mongoose.model('Details', studentDetails )