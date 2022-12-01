const Students = require("../models/studentdata");
const Sem1Attendance = require("../models/Sem1Attendance");
const Sem2Attendance = require("../models/Sem2Attendance");
const Sem3Attendance = require("../models/Sem3Attendance");
const Sem4Attendance = require("../models/Sem4Attendance");
const ScheduledClass = require("../models/scheduledclass");
const ScheduledTest = require("../models/scheduledtest");
const ClassesTaken = require("../models/classestaken");
const Teacher = require("../models/teacherdata");
const AssignmentsPosted = require("../models/Assignment")
const StudyMaterial = require("../models/StudyMaterial")
const jwt = require("jsonwebtoken");
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"

const login = (req, res) => {
    const { enrollNum, password } = req.body;
    Students.findOne({ enrollNum: enrollNum }, (err, student) => {
      if (student) {
        const token = jwt.sign(
          {
            enrollNum: student.enrollNum,
          },
          "secret123"
        );
  
        if (password === student.password) {
          res.send({ message: "Login successful", student: token });
        } else {
          res.send({ message: "password didn't match" });
        }
      } else {
        res.send({ message: "Students not registered" });
      }
    });
  }
  
  const Getdashboard = async (req, res) => {
    const token = req.headers["x-access-token"];
  
    try {
      const decoded = jwt.verify(token, "secret123");
      const enrollNum = decoded.enrollNum;
      const student = await Students.findOne({ enrollNum: enrollNum });
     
      const sem1Attendance = await Sem1Attendance.find({attendanceStatus: "Present", name: student.name})
      const sem2Attendance = await Sem2Attendance.find({attendanceStatus: "Present", name: student.name})
      const sem3Attendance = await Sem3Attendance.find({attendanceStatus: "Present", name: student.name})
      const sem4Attendance = await Sem4Attendance.find({attendanceStatus: "Present", name: student.name})
  
      let Classes_taken_count
  
      if(student.semester == "Sem-1")
      {
        Classes_taken_count = sem1Attendance.length
        console.log(Classes_taken_count)
      }
  
      else if(student.semester == "Sem-2")
      {
        Classes_taken_count = sem2Attendance.length
        console.log(Classes_taken_count)
      }
  
      if(student.semester == "Sem-3")
      {
        Classes_taken_count = sem3Attendance.length
        console.log(Classes_taken_count)
      }
  
      if(student.semester == "Sem-4")
      {
        Classes_taken_count = sem4Attendance.length
        console.log(Classes_taken_count)
      }
  
      const Classes_held = await ClassesTaken.count({semester: student.semester})
      const Classes_Scheduled = await ScheduledClass.count({ semester: student.semester });
      const Test_Scheduled = await ScheduledTest.count({ semester: student.semester });
      const Assignment_posted = await AssignmentsPosted.count({ semester: student.semester})
  
      return res.json({
        status: "ok",
        Classes_taken_count,
        Classes_held,
        Classes_Scheduled,
        Test_Scheduled,
        Assignment_posted,
        enrollNum: student.enrollNum,
        name: student.name,
        email: student.email,
        semester: student.semester,
        rollNum: student.rollNum,
        contactNum: student.contactNum,
      });
    } catch (error) {
      console.log(error);
      res.json({ status: "error", error: "invalid token" });
    }
  }
  
  const Getprofile = async (req, res) => {
    const token = req.headers["x-access-token"];
  
    try {
      const decoded = jwt.verify(token, "secret123");
      const enrollNum = decoded.enrollNum;
      const student = await Students.findOne({ enrollNum: enrollNum });
  
      return res.json({
        status: "ok",
        enrollNum: student.enrollNum,
        name: student.name,
        email: student.email,
        rollNum: student.rollNum,
        contactNum: student.contactNum,
      });
    } catch (error) {
      console.log(error);
      res.json({ status: "error", error: "invalid token" });
    }
  }
  
  const Postprofile = async (req, res) => {
    const token = req.headers["x-access-token"];
  
    try {
      const decoded = jwt.verify(token, "secret123");
      const enrollNum = decoded.enrollNum;
      return res.status(200).json({
        success: true,
        data: await Students.UpdateOne(
          { enrollNum: enrollNum },
          { $set: { enrollNum: enrollNum } },
          { $set: { name: req.body.name } },
          { $set: { email: req.body.email } },
          { $set: { rollNum: req.body.rollNum } },
          { $set: { contactNum: req.body.contactNum } }
        ),
      });
    } catch (error) {
      console.log(error);
      res.json({ status: "error", error: "invalid token" });
    }
  }
  
  const Getchangepassword = async (req, res) => {
    const token = req.headers['x-access-token']
    try {
      const decoded = jwt.verify(token, 'secret123')
      const enrollNum = decoded.enrollNum
      const student = await Students.findOne({ enrollNum: enrollNum })
      return res.json({ status: 'ok', enrollNum: student.enrollNum })
  
    } catch (error) {
      console.log(error)
      res.json({ status: 'error', error: 'invalid token' })
    }
  }
  
  const PatchChangepassword = async (req, res) => {
    console.log('patch')
    const token = req.headers['x-access-token']
    const { oldpassword, newpassword, confirmpassword } = req.body
    try {
      const decoded = jwt.verify(token, 'secret123')
      const enrollNum = decoded.enrollNum
      if (!oldpassword || !newpassword || !confirmpassword) {
        return res.json({ status: 400, msg: "Please enter all fields" })
      }
  
      if (oldpassword === newpassword) {
        return res.json({ status: 400, msg: "old and new password cannot be same" })
      }
  
      Students.findOne({ enrollNum: enrollNum }, (err, student) => {
        if (student) {
          if (oldpassword === student.password) {
            Students.findOneAndUpdate({ enrollNum }, { $set: { password: newpassword } }, (err, user) => {
  
              if (!err && user) {
                return res.json({ status: 200, msg: "Updated successfully" })
              }
            })
          } else {
            res.send({ message: "password entered is incorrect" })
          }
  
        } else {
          res.send({ message: "Students not registered" })
        }
      })
  
  
    } catch (error) {
      console.log(error)
      res.json({ status: 'error', error: 'invalid token' })
    }
  }
  
  const register = async (req, res) => {
    const { name, semester, email, rollNum, contactNum, enrollNum, password } =
      req.body;
  
    try {
      const student = await Students.create({
        name,
        semester,
        email,
        rollNum,
        contactNum,
        enrollNum,
        password,
      });
      res.status(200).json(student);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

const Test_Scheduled = async (req, res) => {
    const token = req.headers["x-access-token"];
    try {
      const decoded = jwt.verify(token, "secret123");
      const enrollNum = decoded.enrollNum;
      const student = await Students.findOne({ enrollNum: enrollNum });
      
      return res.status(200).json({
        success: true,
        data: await ScheduledTest.find({ semester: student.semester }),
        sem: student.semester
      });
    } catch (error) {
      console.log(error);
      res.json({ status: "error", error: "invalid token" });
    }
  }
  
  const Classes_Scheduled = async (req, res) => {
    const token = req.headers["x-access-token"];
    try {
      const decoded = jwt.verify(token, "secret123");
      const enrollNum = decoded.enrollNum;
      const student = await Students.findOne({ enrollNum: enrollNum });
      return res.status(200).json({
        success: true,
        data: await ScheduledClass.find({ semester: student.semester }),
        sem: student.semester
      });
    } catch (error) {
      console.log(error);
      res.json({ status: "error", error: "invalid token" });
    }
  }
  
  const Assignment_Schedule_student = async (req, res) => {
    const token = req.headers["x-access-token"];
    try {
      const decoded = jwt.verify(token, "secret123");
      const enrollNum = decoded.enrollNum;
      const student = await Students.findOne({ enrollNum: enrollNum });
      return res.status(200).json({
        success: true,
        data: await AssignmentsPosted.find({ semester: student.semester }),
        sem: student.semester
      });
    } catch (error) {
      console.log(error);
      res.json({ status: "error", error: "invalid token" });
    }
  }

  
const GetAssignments = async(req,res)=>{
  return res.status(200).json({
  success: true,
  data: await AssignmentsPosted.find({}),
});
}

const classnotification = async(req,res)=>{
  return res.status(200).json({
    success : true,
    data : await ScheduledClass.find({})
  })
}

const StudyMaterial_Posted_Students = async (req, res) => {
  const token = req.headers["x-access-token"];
  try {
    const decoded = jwt.verify(token, "secret123");
    const enrollNum = decoded.enrollNum;
    const students = await Students.findOne({ enrollNum: enrollNum });
    return res.status(200).json({
      success: true,
      data: await StudyMaterial.find({semester: students.semester }),
      sem: students.semester
    });
  } catch (error) {
    console.log(error);
    res.json({ status: "error", error: "invalid token" });
  }
}


  module.exports = {
    login, Getdashboard, Getprofile, Postprofile, Getchangepassword, PatchChangepassword, register, Test_Scheduled, Classes_Scheduled,  Assignment_Schedule_student, GetAssignments, classnotification,StudyMaterial_Posted_Students
  }