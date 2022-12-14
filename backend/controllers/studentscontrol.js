const Students = require("../models/studentdata");
const Sem1Attendance = require("../models/Sem1Attendance");
const Sem2Attendance = require("../models/Sem2Attendance");
const Sem3Attendance = require("../models/Sem3Attendance");
const Sem4Attendance = require("../models/Sem4Attendance");
const ScheduledClass = require("../models/scheduledclass");
const ScheduledTest = require("../models/scheduledtest");
const ClassesTaken = require("../models/classestaken");
const Teacher = require("../models/teacherdata");
const AssignmentsPosted = require("../models/Assignment");
const StudyMaterial = require("../models/StudyMaterial");
const SubmittedAssignment = require("../models/SubmittedAssignment")
const jwt = require("jsonwebtoken");
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
var newDate = new Date();
var year = newDate.getFullYear()
var getMonth = String(newDate.getMonth() + 1).padStart(2, '0');
var getDate = String(newDate.getDate()).padStart(2, '0');
var date = [year, getMonth, getDate].join("-");

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
};

const Getdashboard = async (req, res) => {
  const token = req.headers["x-access-token"];

  try {
    const decoded = jwt.verify(token, "secret123");
    const enrollNum = decoded.enrollNum;
    const student = await Students.findOne({ enrollNum: enrollNum });

    const sem1Attendance = await Sem1Attendance.find({ name: student.name });
    const sem2Attendance = await Sem2Attendance.find({ name: student.name });
    const sem3Attendance = await Sem3Attendance.find({ name: student.name });
    const sem4Attendance = await Sem4Attendance.find({ name: student.name });

    let Classes_taken_count = 0;
    let attend = [];

    if (student.semester == "Sem-1") {
      attend = sem1Attendance;
      for (const k of sem1Attendance) {
        if (k.attendanceStatus == "Present") {
          Classes_taken_count = Classes_taken_count + 1;
        }
      }
      console.log(Classes_taken_count);
    } else if (student.semester == "Sem-2") {
      attend = sem2Attendance;
      for (const k of sem2Attendance) {
        if (k.attendanceStatus == "Present") {
          Classes_taken_count = Classes_taken_count + 1;
        }
      }
      console.log(Classes_taken_count);
    }

    if (student.semester == "Sem-3") {
      attend = sem3Attendance;
      for (const k of sem3Attendance) {
        if (k.attendanceStatus == "Present") {
          Classes_taken_count = Classes_taken_count + 1;
        }
      }
      console.log(Classes_taken_count);
    }

    if (student.semester == "Sem-4") {
      attend = sem4Attendance;
      for (const k of sem4Attendance) {
        if (k.attendanceStatus == "Present") {
          Classes_taken_count = Classes_taken_count + 1;
        }
      }
      console.log(Classes_taken_count);
    }
    // console.log(attend);
    const newdate = new Date();
    const monthval = newdate.getMonth() + 1;
    const day = newdate.getDate();
    const year = newdate.getFullYear();

    let scheduledclasses = await ScheduledClass.find({
      semester: student.semester,
    });
    const data1 = scheduledclasses.filter((data) => {
      if (
        (data.date.slice(8, 10) >= day && data.date.slice(5, 7) == monthval && data.date.slice(0, 4) == year) ||
        (data.date.slice(5, 7) > monthval && data.date.slice(0, 4) == year) ||
        data.date.slice(0, 4) > year
      ) {
        return data;
      }
    });

    let scheduledtests = await ScheduledTest.find({
      semester: student.semester,
    });
    const data2 = scheduledtests.filter((data) => {
      if (
        (data.date.slice(8, 10) >= day && data.date.slice(5, 7) == monthval && data.date.slice(0, 4) == year) ||
        (data.date.slice(5, 7) > monthval && data.date.slice(0, 4) == year) ||
        data.date.slice(0, 4) > year
      ) {
        return data;
      }
    });

    const Classes_held = await ClassesTaken.count({
      semester: student.semester,
    });
    const Classes_Scheduled = data1.length;
    const Test_Scheduled = data2.length;
    const Assignment_posted = await AssignmentsPosted.count({
      semester: student.semester,
    });
    const assignment_submitted = await SubmittedAssignment.count({name: student.name})
    return res.json({
      status: "ok",
      Classes_taken_count,
      Classes_held,
      Classes_Scheduled,
      Test_Scheduled,
      Assignment_posted,
      assignment_submitted,
      attend,
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
};

const PatchChangepassword = async (req, res) => {
  console.log("patch");
  const token = req.headers["x-access-token"];
  const { oldpassword, newpassword, confirmpassword } = req.body;
  try {
    const decoded = jwt.verify(token, "secret123");
    const enrollNum = decoded.enrollNum;
    if (!oldpassword || !newpassword || !confirmpassword) {
      return res.json({ status: 400, msg: "Please enter all fields" });
    }

    if (oldpassword === newpassword) {
      return res.json({
        status: 400,
        msg: "old and new password cannot be same",
      });
    }

    Students.findOne({ enrollNum: enrollNum }, (err, student) => {
      if (student) {
        if (oldpassword === student.password) {
          Students.findOneAndUpdate(
            { enrollNum },
            { $set: { password: newpassword } },
            (err, user) => {
              if (!err && user) {
                return res.json({ status: 200, msg: "Updated successfully" });
              }
            }
          );
        } else {
          res.send({ message: "password entered is incorrect" });
        }
      } else {
        res.send({ message: "Students not registered" });
      }
    });
  } catch (error) {
    console.log(error);
    res.json({ status: "error", error: "invalid token" });
  }
};

const register = async (req, res) => {
  const { name, semester, email, rollNum, contactNum, enrollNum, password } =
    req.body;
    const student = await Students.find({enrollNum: enrollNum}) 
console.log(student)

let check 
 student.map((x) => {
  if(x.enrollNum == enrollNum)
  {
    check = "true"
    return
  }
  else{
    check = "false"
  }
})
console.log(check)
  if(check){
    res.status(400).json({status: "notok", msg: "Another student already registered with this Enrollment Number"})
  } else {
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
      res.status(200).json({success:true});
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
  
};

const registerall = async (req, res) => {
  // const { name, semester, email, rollNum, contactNum, enrollNum, password } =
  //   req.body;
    const jsonData = req.body;
    console.log(jsonData)
   try{
    jsonData.map(async(x) => {
      const { name, semester, email, rollNum, contactNum, enrollNum, password } = x;
              const student = await Students.create({
                name,
                semester,
                email,
                rollNum,
                contactNum,
                enrollNum,
                password,
              });
             
    })
    return res.status(200).json({status: "ok", success: true});
   }catch (error) {
    res.status(400).json({msg:"Something gone Wrong, Try Again!", error: error.message });
  }

};

const Test_Scheduled = async (req, res) => {
  const token = req.headers["x-access-token"];
  try {
    const decoded = jwt.verify(token, "secret123");
    const enrollNum = decoded.enrollNum;
    const newdate = new Date()
    const monthval = newdate.getMonth()+1;
    const day = newdate.getDate()
    const year = newdate.getFullYear()

    
    const student = await Students.findOne({ enrollNum: enrollNum });
    const tests2 = await ScheduledTest.find({ semester: student.semester })

    const tests = tests2.filter((data)=>{
      if((data.date.slice(8,10)>=day &&  data.date.slice(5,7)==monthval && data.date.slice(0,4)==year) || (data.date.slice(5,7)>monthval && data.date.slice(0,4)==year) || data.date.slice(0,4)>year  )
      {
          return data
      }
    })
    return res.status(200).json({
      success: true,
      data: tests,
      sem: student.semester,
    });
  } catch (error) {
    console.log(error);
    res.json({ status: "error", error: "invalid token" });
  }
};

const Classes_Scheduled = async (req, res) => {
  const token = req.headers["x-access-token"];
  try {
    const decoded = jwt.verify(token, "secret123");
    const enrollNum = decoded.enrollNum;
    
    const newdate = new Date()
    const monthval = newdate.getMonth()+1;
    const day = newdate.getDate()
    const year = newdate.getFullYear()

    const student = await Students.findOne({ enrollNum: enrollNum });
    const classes2 = await ScheduledClass.find({ semester: student.semester })

    const classes = classes2.filter((data)=>{
      if((data.date.slice(8,10)>=day &&  data.date.slice(5,7)==monthval && data.date.slice(0,4)==year) || (data.date.slice(5,7)>monthval && data.date.slice(0,4)==year) || data.date.slice(0,4)>year  )
      {
          return data
      }
    })
    return res.status(200).json({
      success: true,
      data: classes,
      sem: student.semester,
    });
  } catch (error) {
    console.log(error);
    res.json({ status: "error", error: "invalid token" });
  }
};

const Assignment_Schedule_student = async (req, res) => {
  const token = req.headers["x-access-token"];
  try {
    const decoded = jwt.verify(token, "secret123");
    const enrollNum = decoded.enrollNum;
    const student = await Students.findOne({ enrollNum: enrollNum });
    return res.status(200).json({
      success: true,
      data: await AssignmentsPosted.find({ semester: student.semester }),
      sem: student.semester,
    });
  } catch (error) {
    console.log(error);
    res.json({ status: "error", error: "invalid token" });
  }
};

const GetAssignments = async (req, res) => {
  return res.status(200).json({
    success: true,
    data: await AssignmentsPosted.find({}),
  });
};

const classnotification = async (req, res) => {
  return res.status(200).json({
    success: true,
    data: await ScheduledClass.find({}),
  });
};
const testnotification = async (req, res) => {
  return res.status(200).json({
    success: true,
    data: await ScheduledTest.find({}),
  });
};

const StudyMaterial_Posted_Students = async (req, res) => {
  const token = req.headers["x-access-token"];
  try {
    const decoded = jwt.verify(token, "secret123");
    const enrollNum = decoded.enrollNum;
    const students = await Students.findOne({ enrollNum: enrollNum });
    return res.status(200).json({
      success: true,
      data: await StudyMaterial.find({ semester: students.semester }),
      sem: students.semester,
    });
  } catch (error) {
    console.log(error);
    res.json({ status: "error", error: "invalid token" });
  }
};

const PostAssignmentSubmitt = async (req, res) => {
  const { assignment_id,files, enrollNum, subject } = req.body
  const student = await Students.findOne({ enrollNum: enrollNum })
  const name = student.name;
  const semester = student.semester;

  try {

    const assignment = await SubmittedAssignment.create({
      assignment_id,
      name,
      subject,
      semester,
      date,
      files
    });
    res.status(200).json({
      assignment,
      success:true
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }

};

const assignmentsubmited = async(req,res)=>{

   const token = req.headers["x-access-token"];
   console.log("request rcvd")
   console.log(req.headers['assignment_id'])
  try {
    const decoded = jwt.verify(token, "secret123");
    const enrollNum = decoded.enrollNum;
    const students = await Students.findOne({ enrollNum: enrollNum });
    return res.status(200).json({
      success: true,
      data: await SubmittedAssignment.find({ name:students.name}),
    });
  } catch (error) {
    console.log(error);
    res.json({ status: "error", error: "invalid token" });
  }
}


module.exports = {
  login,
  Getdashboard,
  PatchChangepassword,
  register,
  registerall,
  Test_Scheduled,
  Classes_Scheduled,
  Assignment_Schedule_student,
  GetAssignments,
  classnotification,
  StudyMaterial_Posted_Students,
  PostAssignmentSubmitt,
  testnotification,
  assignmentsubmited
};
