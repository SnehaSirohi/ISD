const express = require('express')
const User = require('../models/userdata')

const router = express.Router()

router.get('/', (req, res) => {
    res.json({mssg: 'dsf'})
})

router.post('/login', (req, res) =>{
    const {enrollNum, password} = req.body
    User.findOne({enrollNum: enrollNum}, (err, user) => {
        if(user){
            if(password === user.password){
                res.send({message: "Login successful", user: user})
            } else {
                res.send({message: "password didn't match"})
            }
                
        } else {
            res.send({message: "user not registered"})
        }
    })
})

router.post('/register', async(req, res) => {
    const {enrollNum, password} = req.body

    try {
        const user = await User.create({enrollNum, password})
        res.status(200).json(user)
    } catch (error){
        res.status(400).json({error: error.message})
    }

})


module.exports = router