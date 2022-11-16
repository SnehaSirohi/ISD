const express = require('express')
const User = require('../models/userdata')
const attRep=require("../models/attendance_data")
const Teacher = require('../models/teacherdata')
const jwt = require('jsonwebtoken')


const {classScheduleMail, testScheduleMail}=require('../utils/mail')
const router = express.Router()

router.get('/', (req, res) => {
    res.json({mssg: 'dsf'})
})

router.post('/login', (req, res) =>{
    const {enrollNum, password} = req.body
    User.findOne({enrollNum: enrollNum}, (err, user) => {
        if(user){

            const token = jwt.sign({
                enrollNum: user.enrollNum,
            }, 'secret123')

            if(password === user.password){
                res.send({message: "Login successful", user: token})
            } else {
                res.send({message: "password didn't match"})
            }
                
        } else {
            res.send({message: "user not registered"})
        }
    })
})

router.get('/dashboard', async(req, res) =>{

    const token = req.headers['x-access-token']

    try{
        const decoded = jwt.verify(token, 'secret123') 
        const enrollNum = decoded.enrollNum
        const user = await User.findOne({enrollNum: enrollNum})

        return res.json({ status: 'ok', enrollNum: user.enrollNum, name: user.name, email: user.email, rollNum: user.rollNum, contactNum: user.contactNum})
    } catch(error) {
        console.log(error)
        res.json({ status: 'error', error: 'invalid token'})
    }
})

router.post('/dashboard', async(req, res) =>{

    const token = req.headers['x-access-token']

    try{
        const decoded = jwt.verify(token, 'secret123') 
        const enrollNum = decoded.enrollNum
        return res.status(200).json({
            success:true,
            data: await User.UpdateOne({enrollNum: enrollNum}, {$set: {enrollNum: enrollNum}}, {$set: {name: req.body.name}}, {$set: {email: req.body.email}}, {$set: {rollNum: req.body.rollNum}}, {$set: {contactNum: req.body.contactNum}} )
        })

        // return res.json({ status: 'ok' })
    } catch(error) {
        console.log(error)
        res.json({ status: 'error', error: 'invalid token'})
    }
})

router.get('/dashboard/profile', async(req, res) =>{

    const token = req.headers['x-access-token']

    try{
        const decoded = jwt.verify(token, 'secret123') 
        const enrollNum = decoded.enrollNum
        const user = await User.findOne({enrollNum: enrollNum})

        return res.json({ status: 'ok',enrollNum: user.enrollNum, name: user.name, email: user.email, rollNum: user.rollNum, contactNum: user.contactNum} )
    } catch(error) {
        console.log(error)
        res.json({ status: 'error', error: 'invalid token'})
    }
})

router.post('/dashboard/profile', async(req, res) =>{

    const token = req.headers['x-access-token']

    try{
        const decoded = jwt.verify(token, 'secret123') 
        const enrollNum = decoded.enrollNum
        return res.status(200).json({
            success:true,
            data: await User.UpdateOne({enrollNum: enrollNum}, {$set: {enrollNum: enrollNum}} , {$set: {name: req.body.name}}, {$set: {email: req.body.email}}, {$set: {rollNum: req.body.rollNum}}, {$set: {contactNum: req.body.contactNum}} )
        })
 
        // return res.json({ status: 'ok' })
    } catch(error) {
        console.log(error)
        res.json({ status: 'error', error: 'invalid token'})
    }
})


router.post('/loginteacher', (req, res) =>{
    const {Teacher_id, password} = req.body
    Teacher.findOne({Teacher_id: Teacher_id}, (err, teacher) => {
        if(teacher){
            if(password === teacher.password){
                res.send({message: "Login successful", teacher: teacher})
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

router.post('/registerteacher', async(req, res) => {
    const {name, email, Teacher_id, contactNum, password} = req.body

    try {
        const teacher = await Teacher.create({name, email, Teacher_id, contactNum, password})
        res.status(200).json(teacher)
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

router.post('/scheduleclass',async (req,res)=>{
    const subject=req.body.subject
    const date=req.body.date
    const time=req.body.time
    let data = await User.find({})
    data.forEach((user)=>{
        classScheduleMail(subject, date, time,user.email);
        //classScheduleSms(subject,date,time,user.contactNum);
        //console.log(subject,date,time,user.contactNum)
    })
})

router.post('/scheduletest',async (req,res)=>{
    const subject=req.body.subject
    const date=req.body.date
    const time=req.body.time
    let data = await User.find({})
    data.forEach((user)=>{
        testScheduleMail(subject, date, time,user.email);
        console.log(subject,date,time,user.email)
    })
})

router.post('/attendancereport',async(req,res)=>{
     
    for (const key in req.body)
    {   
        var nowDate = new Date(); 
        const date = nowDate.getFullYear()+'-'+(nowDate.getMonth()+1)+'-'+nowDate.getDate(); 
        const name=key
        const temp=req.body[key]
        var attendanceStatus
         if(temp)
         {
            attendanceStatus="Present"
         }
         else{
              attendanceStatus="Absent"
            }

        try {
          await attRep.create({date,name,attendanceStatus})
            
        } 
        catch (error){
            console.log(error)
        }
        
    
    }
})

router.get('/attendancereport',async(req,res)=>{
    return res.status(200).json({
		success: true,
		data: await attRep.find({}),
	});
})





module.exports = router