const express = require('express')
const User = require('../models/userdata')
// import {sendEmail} from '/backend/utils/mail'
const {sendEmail}=require('../utils/mail')
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
    const {name,email,rollNum,contactNum,enrollNum, password} = req.body

    try {
        const user = await User.create({name,email,rollNum,contactNum,enrollNum, password})
        res.status(200).json(user)
    } catch (error){
        res.status(400).json({error: error.message})
    }

})
router.get('/attendance', async(req, res) => {
   
    return res.status(200).json({
		success: true,
		data: await User.find({}),
	});

})

router.post('/schedule',async (req,res)=>{
    const subject=req.body.subject
    const date=req.body.date
    const time=req.body.time
    res.json({status:'ok'})
    let data = await User.find({})
    data.forEach((user)=>{
        sendEmail(subject, date, time,user.email);
        console.log(subject,date,time,user.email)
    })
})

// router.post('/details',async(req,res)=>
// {
//      const {Name}=req.body

//      try {
//         const details = await Details.create({Name})
//         res.status(200).json(details)
//     } catch (error){
//         res.status(400).json({error: error.message})
//     }
// })


module.exports = router