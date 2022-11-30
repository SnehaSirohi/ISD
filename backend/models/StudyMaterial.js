const mongoose = require("mongoose")
const Schema = mongoose.Schema

const StudyMaterial = new Schema({
    date:{
        type:String,
        require:true
    },
    teacher:{
        type:String,
        require:true
    },
    subject:{
        type:String,
        require:true
    },
    file:{
        type:String,
        require:true
    },
    semester:{
        type:String,
        require:true
    },
    description:{
        type:String,
        require:true
    }
})

module.exports = mongoose.model("StudyMaterial",StudyMaterial);