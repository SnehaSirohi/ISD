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
      var year=newDate.getFullYear()
      var getMonth = String(newDate.getMonth() + 1).padStart(2, '0');
      var getDate = String(newDate.getDate() ).padStart(2, '0');
      var date = [year,getMonth,getDate].join("-");
const loginteacher = (req, res) => {
  const { Teacher_id, password } = req.body;
  Teacher.findOne({ Teacher_id: Teacher_id }, (err, teacher) => {
    if (teacher) {
      const token = jwt.sign(
        {
          Teacher_id: teacher.Teacher_id,
        },
        "secret1234"
      );
      if (password === teacher.password) {
        res.send({ message: "Login successful", teacher: token });
      } else {
        res.send({ message: "password didn't match" });
      }
    } else {
      res.send({ message: "Teacher not registered" });
    }
  });
};

const GetTeacherdashboard = async (req, res) => {
  const token = req.headers["x-access-token"];

  try {
    const decoded = jwt.verify(token, "secret1234");
    const Teacher_id = decoded.Teacher_id;
    const teacher = await Teacher.findOne({ Teacher_id: Teacher_id });
    const Classes_taken_count = await ClassesTaken.count({
      name: teacher.name,
    });
    const Classes_Scheduled = await ScheduledClass.count({
      name: teacher.name,
    });
    const Test_Scheduled = await ScheduledTest.count({ name: teacher.name });
    const Assignments_posted = await AssignmentsPosted.count({
      teacher: teacher.name,
    });
    const Study_Material_posted = await StudyMaterial.count({
      teacher: teacher.name,
    });

    return res.json({
      status: "ok",
      Classes_taken_count,
      Classes_Scheduled,
      Test_Scheduled,
      Assignments_posted,
      Study_Material_posted,
      Teacher_id: teacher.Teacher_id,
      name: teacher.name,
      email: teacher.email,
      contactNum: teacher.contactNum,
    });
  } catch (error) {
    console.log(error);
    res.json({ status: "error", error: "invalid token" });
  }
};

const GetTeacherProfile = async (req, res) => {
  const token = req.headers["x-access-token"];

  try {
    const decoded = jwt.verify(token, "secret1234");
    const Teacher_id = decoded.Teacher_id;
    const teacher = await Teacher.findOne({ Teacher_id: Teacher_id });

    return res.json({
      status: "ok",
      Teacher_id: teacher.Teacher_id,
      name: teacher.name,
      email: teacher.email,
      contactNum: teacher.contactNum,
    });
  } catch (error) {
    console.log(error);
    res.json({ status: "error", error: "invalid token" });
  }
};

const PostTeacherProfile = async (req, res) => {
  const token = req.headers["x-access-token"];

  try {
    const decoded = jwt.verify(token, "secret1234");
    const Teacher_id = decoded.Teacher_id;
    return res.status(200).json({
      success: true,
      data: await Teacher.UpdateOne(
        { Teacher_id: Teacher_id },
        { $set: { Teacher_id: Teacher_id } },
        { $set: { name: req.body.name } },
        { $set: { email: req.body.email } },
        { $set: { contactNum: req.body.contactNum } }
      ),
    });
  } catch (error) {
    console.log(error);
    res.json({ status: "error", error: "invalid token" });
  }
};

const GetTeacherChangePassword = async (req, res) => {
  const token = req.headers["x-access-token"];
  try {
    const decoded = jwt.verify(token, "secret1234");
    const Teacher_id = decoded.Teacher_id;
    const teacher = await Teacher.findOne({ Teacher_id: Teacher_id });
    return res.json({ status: "ok", Teacher_id: teacher.Teacher_id });
  } catch (error) {
    console.log(error);
    res.json({ status: "error", error: "invalid token" });
  }
};

const PatchTeacherChangePassword = async (req, res) => {
  const token = req.headers["x-access-token"];
  const { oldpassword, newpassword, confirmpassword } = req.body;
  try {
    const decoded = jwt.verify(token, "secret1234");
    const Teacher_id = decoded.Teacher_id;
    if (!oldpassword || !newpassword || !confirmpassword) {
      return res.json({ status: 400, msg: "Please enter all fields" });
    }

    if (oldpassword === newpassword) {
      return res.json({
        status: 400,
        msg: "old and new password cannot be same",
      });
    }

    Teacher.findOne({ Teacher_id: Teacher_id }, (err, teacher) => {
      if (teacher) {
        if (oldpassword === teacher.password) {
          Teacher.findOneAndUpdate(
            { Teacher_id },
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

const RegisterTeacher = async (req, res) => {
  const { name, email, Teacher_id, contactNum, password } = req.body;
  console.log(name)
  const teacher = await Teacher.find({Teacher_id: Teacher_id}) 
let check
teacher.map((x) => {
  if(x.Teacher_id == Teacher_id)
  {
    check = "true"
    return
  }
  else {
    check = "false"
  }
})
console.log(check)

if(check) {
  res.status(400).json({status: "notok", msg: "Another Teacher already registered with this Teacher ID"})
} else {
  try {
    const teacher = await Teacher.create({
      name,
      email,
      Teacher_id,
      contactNum,
      password,
    });
    res.status(200).json({status: "ok",teacher});
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}
};

const GetScheduleclass = async (req, res) => {
  const token = req.headers["x-access-token"];

  try {
    const decoded = jwt.verify(token, "secret1234");
    const Teacher_id = decoded.Teacher_id;
    const teacher = await Teacher.findOne({ Teacher_id: Teacher_id });

    return res.json({
      status: "ok",
      Teacher_id: teacher.Teacher_id,
      name: teacher.name,
      email: teacher.email,
      contactNum: teacher.contactNum,
    });
  } catch (error) {
    console.log(error);
    res.json({ status: "error", error: "invalid token" });
  }
};

const GetScheduletest = async (req, res) => {
  const token = req.headers["x-access-token"];

  try {
    const decoded = jwt.verify(token, "secret1234");
    const Teacher_id = decoded.Teacher_id;
    const teacher = await Teacher.findOne({ Teacher_id: Teacher_id });

    return res.json({
      status: "ok",
      Teacher_id: teacher.Teacher_id,
      name: teacher.name,
      email: teacher.email,
      contactNum: teacher.contactNum,
    });
  } catch (error) {
    console.log(error);
    res.json({ status: "error", error: "invalid token" });
  }
};

const GetAttendance = async (req, res) => {
  const token = req.headers["x-access-token"];
  try {
    const decoded = jwt.verify(token, "secret1234");
    const Teacher_id = decoded.Teacher_id;
    const teacher = await Teacher.findOne({ Teacher_id: Teacher_id });

    return res.json({
      status: "ok",
      success: true,
      Teacher_id: teacher.Teacher_id,
      name: teacher.name,
      email: teacher.email,
      contactNum: teacher.contactNum,
      data: await Students.find({}),
    });
  } catch (error) {
    console.log(error);
    res.json({ status: "error", error: "invalid token" });
  }
};

const sem1Attendance = async (req, res) => {
  const token = req.headers["x-access-token"];
  const semester = "Sem-1";
  
  const subject = req.body.subject;
  let teachername;
  const time =
    newDate.getHours() +
    ":" +
    newDate.getMinutes() +
    ":" +
    newDate.getSeconds();
  
  try {
    const decoded = jwt.verify(token, "secret1234");
    const Teacher_id = decoded.Teacher_id;
    const teacher = await Teacher.findOne({ Teacher_id: Teacher_id });
    teachername = teacher.name;

    res.status(200).json({
      success: true,
      data: await ClassesTaken.create({
        name: teacher.name,
        subject,
        semester,
        date,
        time,
      }),
    });
  } catch (error) {
  
    res.json({ status: "error", error: "invalid token" });
  }

  for (const key in req.body.status) {
    const name = key;
    const temp = req.body.status[key];
    var attendanceStatus;
    console.log(key);
    if (temp) {
      attendanceStatus = "Present";
    } else {
      attendanceStatus = "Absent";
    }

    try {
      console.log("date inside try : ",date);
      await Sem1Attendance.create({
        teacher: teachername,
        date,
        name,
        subject,
        semester,
        attendanceStatus,
        time,
      });
    } catch (error) {
      console.log(error);
    }
  }
};

const sem2Attendance = async (req, res) => {
  const token = req.headers["x-access-token"];
  const semester = "Sem-2";
  const subject = req.body.subject;
  let teachername;
  console.log(subject);
  var newDate = new Date();
  const time =
    newDate.getHours() +
    ":" +
    newDate.getMinutes() +
    ":" +
    newDate.getSeconds();
 

  try {
    const decoded = jwt.verify(token, "secret1234");
    const Teacher_id = decoded.Teacher_id;
    const teacher = await Teacher.findOne({ Teacher_id: Teacher_id });
    console.log(Teacher_id);
    teachername = teacher.name;
    res.status(200).json({
      success: true,
      data: await ClassesTaken.create({
        name: teacher.name,
        subject,
        semester,
        date,
        time,
      }),
    });
  } catch (error) {
    console.log(error);
    res.json({ status: "error", error: "invalid token" });
  }

  for (const key in req.body.status) {
    const name = key;
    const temp = req.body.status[key];
    var attendanceStatus;
    console.log(key);
    if (temp) {
      attendanceStatus = "Present";
    } else {
      attendanceStatus = "Absent";
    }

    try {
      await Sem2Attendance.create({
        teacher: teachername,
        date,
        name,
        subject,
        semester,
        attendanceStatus,
        time,
      });
    } catch (error) {
      console.log(error);
    }
  }
};
const sem3Attendance = async (req, res) => {
  const token = req.headers["x-access-token"];
  const semester = "Sem-3";
  const subject = req.body.subject;
  let teachername;
  console.log(subject);
  var newDate = new Date();
  const time =
    newDate.getHours() +
    ":" +
    newDate.getMinutes() +
    ":" +
    newDate.getSeconds();
  const date =
    newDate.getFullYear() +
    "-" +
    (newDate.getMonth() + 1) +
    "-" +
    newDate.getDate();

  try {
    const decoded = jwt.verify(token, "secret1234");
    const Teacher_id = decoded.Teacher_id;
    const teacher = await Teacher.findOne({ Teacher_id: Teacher_id });
    teachername = teacher.name;
    console.log(Teacher_id);
    res.status(200).json({
      success: true,
      data: await ClassesTaken.create({
        name: teacher.name,
        subject,
        semester,
        date,
        time,
      }),
    });
  } catch (error) {
    console.log(error);
    res.json({ status: "error", error: "invalid token" });
  }

  for (const key in req.body.status) {
    const name = key;
    const temp = req.body.status[key];
    var attendanceStatus;
    console.log(key);
    if (temp) {
      attendanceStatus = "Present";
    } else {
      attendanceStatus = "Absent";
    }

    try {
      await Sem3Attendance.create({
        teacher: teachername,
        date,
        name,
        subject,
        semester,
        attendanceStatus,
        time,
      });
    } catch (error) {
      console.log(error);
    }
  }
};
const sem4Attendance = async (req, res) => {
  const token = req.headers["x-access-token"];
  const semester = "Sem-4";
  const subject = req.body.subject;
  let teachername;
  console.log(subject);
  var newDate = new Date();
  const time =
    newDate.getHours() +
    ":" +
    newDate.getMinutes() +
    ":" +
    newDate.getSeconds();
  

  try {
    const decoded = jwt.verify(token, "secret1234");
    const Teacher_id = decoded.Teacher_id;
    const teacher = await Teacher.findOne({ Teacher_id: Teacher_id });
    console.log(Teacher_id);
    teachername = teacher.name;
    res.status(200).json({
      success: true,
      data: await ClassesTaken.create({
        name: teacher.name,
        subject,
        semester,
        date,
        time,
      }),
    });
  } catch (error) {
    console.log(error);
    res.json({ status: "error", error: "invalid token" });
  }

  for (const key in req.body.status) {
    const name = key;
    const temp = req.body.status[key];
    var attendanceStatus;
    console.log(key);
    if (temp) {
      attendanceStatus = "Present";
    } else {
      attendanceStatus = "Absent";
    }

    try {
      await Sem4Attendance.create({
        teacher: teachername,
        date,
        name,
        subject,
        semester,
        attendanceStatus,
        time,
      });
    } catch (error) {
      console.log(error);
    }
  }
};

const Sem1AttendanceReport = async (req, res) => {
  const token = req.headers["x-access-token"];

  try {
    const decoded = jwt.verify(token, "secret1234");
    console.log(decoded.Teacher_id)
    const Teacher_id = decoded.Teacher_id;
    const admin = decoded.name;
    const teacher = await Teacher.findOne({ Teacher_id: Teacher_id });
    console.log(Teacher_id);
    console.log(admin)
    if(admin ){
      return res.status(200).json({
        success: true,
        data2: await Sem1Attendance.find({}),
        
      });
    }
    else{
      return res.status(200).json({
        success: true,
        data: await Sem1Attendance.find({ teacher: teacher.name }),
        name: teacher.name,
      });
    }
   
  } catch (error) {
    console.log(error);
    res.json({ status: "error", error: "invalid token" });
  }
};

const Sem2AttendanceReport = async (req, res) => {
  const token = req.headers["x-access-token"];

  try {
    const decoded = jwt.verify(token, "secret1234");
    console.log(decoded.Teacher_id)
    const Teacher_id = decoded.Teacher_id;
    const admin = decoded.name;
    const teacher = await Teacher.findOne({ Teacher_id: Teacher_id });
    console.log(Teacher_id);
    console.log(admin)
    if(admin ){
      return res.status(200).json({
        success: true,
        data2: await Sem2Attendance.find({}),
        
      });
    }
    else{
      return res.status(200).json({
        success: true,
        data: await Sem2Attendance.find({ teacher: teacher.name }),
        name: teacher.name,
      });
    }
   
  } catch (error) {
    console.log(error);
    res.json({ status: "error", error: "invalid token" });
  }
};
const Sem3AttendanceReport = async (req, res) => {
  const token = req.headers["x-access-token"];

  try {
    const decoded = jwt.verify(token, "secret1234");
    console.log(decoded.Teacher_id)
    const Teacher_id = decoded.Teacher_id;
    const admin = decoded.name;
    const teacher = await Teacher.findOne({ Teacher_id: Teacher_id });
    console.log(Teacher_id);
    console.log(admin)
    if(admin ){
      return res.status(200).json({
        success: true,
        data2: await Sem3Attendance.find({}),
        
      });
    }
    else{
      return res.status(200).json({
        success: true,
        data: await Sem3Attendance.find({ teacher: teacher.name }),
        name: teacher.name,
      });
    }
   
  } catch (error) {
    console.log(error);
    res.json({ status: "error", error: "invalid token" });
  }
};
const Sem4AttendanceReport = async (req, res) => {
  const token = req.headers["x-access-token"];

  try {
    const decoded = jwt.verify(token, "secret1234");
    console.log(decoded.Teacher_id)
    const Teacher_id = decoded.Teacher_id;
    const admin = decoded.name;
    const teacher = await Teacher.findOne({ Teacher_id: Teacher_id });
    console.log(Teacher_id);
    console.log(admin)
    if(admin ){
      return res.status(200).json({
        success: true,
        data2: await Sem4Attendance.find({}),
        
      });
    }
    else{
      return res.status(200).json({
        success: true,
        data: await Sem4Attendance.find({ teacher: teacher.name }),
        name: teacher.name,
      });
    }
   
  }catch (error) {
    console.log(error);
    res.json({ status: "error", error: "invalid token" });
  }
};

const ScheduledClassReport = async (req, res) => {
  const token = req.headers["x-access-token"];
  try {
    const decoded = jwt.verify(token, "secret1234");
    const Teacher_id = decoded.Teacher_id;
    const teacher = await Teacher.findOne({ Teacher_id: Teacher_id });
    return res.status(200).json({
      success: true,
      data: await ScheduledClass.find({ name: teacher.name }),
    });
  } catch (error) {
    console.log(error);
    res.json({ status: "error", error: "invalid token" });
  }
};

const ScheduledTestReport = async (req, res) => {
  const token = req.headers["x-access-token"];
  try {
    const decoded = jwt.verify(token, "secret1234");
    const Teacher_id = decoded.Teacher_id;
    const teacher = await Teacher.findOne({ Teacher_id: Teacher_id });
    return res.status(200).json({
      success: true,
      data: await ScheduledTest.find({ name: teacher.name }),
    });
  } catch (error) {
    console.log(error);
    res.json({ status: "error", error: "invalid token" });
  }
};

const Getuploadassignment = async (req, res) => {
  const token = req.headers["x-access-token"];

  try {
    const decoded = jwt.verify(token, "secret1234");
    const Teacher_id = decoded.Teacher_id;
    const teacher = await Teacher.findOne({ Teacher_id: Teacher_id });

    return res.json({
      status: "ok",
      Teacher_id: teacher.Teacher_id,
      name: teacher.name,
      email: teacher.email,
      contactNum: teacher.contactNum,
    });
  } catch (error) {
    console.log(error);
    res.json({ status: "error", error: "invalid token" });
  }
};

const Assignment_Schedule_teacher = async (req, res) => {
  const token = req.headers["x-access-token"];
  try {
    const decoded = jwt.verify(token, "secret1234");
    const Teacher_id = decoded.Teacher_id;
    const teacher = await Teacher.findOne({ Teacher_id: Teacher_id });
    return res.status(200).json({
      success: true,
      data: await AssignmentsPosted.find({ teacher: teacher.name }),
    });
  } catch (error) {
    console.log(error);
    res.json({ status: "error", error: "invalid token" });
  }
};

const GetStudyMaterial = async (req, res) => {
  const token = req.headers["x-access-token"];

  try {
    const decoded = jwt.verify(token, "secret1234");
    const Teacher_id = decoded.Teacher_id;
    const teacher = await Teacher.findOne({ Teacher_id: Teacher_id });

    return res.json({
      status: "ok",
      Teacher_id: teacher.Teacher_id,
      name: teacher.name,
      email: teacher.email,
      contactNum: teacher.contactNum,
    });
  } catch (error) {
    console.log(error);
    res.json({ status: "error", error: "invalid token" });
  }
};

const StudyMaterial_Posted = async (req, res) => {
  const token = req.headers["x-access-token"];
  try {
    const decoded = jwt.verify(token, "secret1234");
    const Teacher_id = decoded.Teacher_id;
    const teacher = await Teacher.findOne({ Teacher_id: Teacher_id });
    return res.status(200).json({
      success: true,
      data: await StudyMaterial.find({ teacher: teacher.name }),
    });
  } catch (error) {
    console.log(error);
    res.json({ status: "error", error: "invalid token" });
  }
};

const GetAssignmentSubmitt = async (req, res) => {
  const token = req.headers["x-access-token"];
  try{
    const decoded = jwt.verify(token, "secret1234");
    const Teacher_id = decoded.Teacher_id;
    const teacher = await Teacher.findOne({ Teacher_id: Teacher_id });
    return res.status(200).json({
      success: true,
      data: await SubmittedAssignment.find({}),
      name: teacher.name
    });
  } catch (error) {
    console.log(error);
    res.json({ status: "error", error: "invalid token" });
  }
 
};
const assignment_s_submited = async(req,res)=>{

  const token = req.headers["x-access-token"];
  const val = req.params.id
  console.log(req.headers['assignment_id'])
 try {
   const decoded = jwt.verify(token, "secret1234");
   const Teacher_id = decoded.Teacher_id;
   const teacher = await Teacher.findOne({ Teacher_id: Teacher_id });
   return res.status(200).json({
     success: true,
     data: await SubmittedAssignment.find({assignment_id:val }),
   });
 } catch (error) {
   console.log(error);
   res.json({ status: "error", error: "invalid token" });
 }
}


module.exports = {
  loginteacher,
  GetTeacherdashboard,
  GetTeacherProfile,
  PostTeacherProfile,
  GetTeacherChangePassword,
  PatchTeacherChangePassword,
  RegisterTeacher,
  GetScheduleclass,
  GetScheduletest,
  GetAttendance,
  sem1Attendance,
  sem2Attendance,
  sem3Attendance,
  sem4Attendance,
  Sem1AttendanceReport,
  Sem2AttendanceReport,
  Sem3AttendanceReport,
  Sem4AttendanceReport,
  ScheduledClassReport,
  ScheduledTestReport,
  Getuploadassignment,
  Assignment_Schedule_teacher,
  GetStudyMaterial,
  StudyMaterial_Posted,
  GetAssignmentSubmitt,
  assignment_s_submited
};
