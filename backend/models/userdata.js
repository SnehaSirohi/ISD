const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userSchema = new Schema({
    enrollNum: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: truea
    }
},{ timestamps: true })

module.exports = mongoose.model('User', userSchema )