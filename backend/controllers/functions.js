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
const scheduledclass = require("../models/scheduledclass");
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const { classScheduleMail, testScheduleMail, AssignmentMail,StudyMaterialMail } = require("../utils/mail");

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
      rollNum: student.rollNum,
      contactNum: student.contactNum,
    });
  } catch (error) {
    console.log(error);
    res.json({ status: "error", error: "invalid token" });
  }
}

const Postdashboard = async (req, res) => {
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
}

const GetTeacherdashboard = async (req, res) => {
  const token = req.headers["x-access-token"];

  try {
    const decoded = jwt.verify(token, "secret1234");
    const Teacher_id = decoded.Teacher_id;
    const teacher = await Teacher.findOne({ Teacher_id: Teacher_id });
    const Classes_taken_count = await ClassesTaken.count({ name: teacher.name });
    const Classes_Scheduled = await ScheduledClass.count({ name: teacher.name });
    const Test_Scheduled = await ScheduledTest.count({ name: teacher.name });


    return res.json({
      status: "ok",
      Classes_taken_count,
      Classes_Scheduled,
      Test_Scheduled,
      Teacher_id: teacher.Teacher_id,
      name: teacher.name,
      email: teacher.email,
      contactNum: teacher.contactNum,
    });
  } catch (error) {
    console.log(error);
    res.json({ status: "error", error: "invalid token" });
  }
}

const Postteacherdashboard = async (req, res) => {
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
}

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
}

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
}

const GetTeacherChangePassword = async (req, res) => {
  const token = req.headers['x-access-token']
  try {
    const decoded = jwt.verify(token, 'secret1234')
    const Teacher_id = decoded.Teacher_id
    const teacher = await Teacher.findOne({ Teacher_id: Teacher_id })
    return res.json({ status: 'ok', Teacher_id: teacher.Teacher_id })

  } catch (error) {
    console.log(error)
    res.json({ status: 'error', error: 'invalid token' })
  }
}

const PatchTeacherChangePassword = async (req, res) => {
  const token = req.headers['x-access-token']
  const { oldpassword, newpassword, confirmpassword } = req.body
  try {
    const decoded = jwt.verify(token, 'secret1234')
    const Teacher_id = decoded.Teacher_id
    if (!oldpassword || !newpassword || !confirmpassword) {
      return res.json({ status: 400, msg: "Please enter all fields" })
    }

    if (oldpassword === newpassword) {
      return res.json({ status: 400, msg: "old and new password cannot be same" })
    }

    Teacher.findOne({ Teacher_id: Teacher_id }, (err, teacher) => {
      if (teacher) {
        if (oldpassword === teacher.password) {
          Teacher.findOneAndUpdate({ Teacher_id }, { $set: { password: newpassword } }, (err, user) => {

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

const RegisterTeacher = async (req, res) => {
  const { name, email, Teacher_id, contactNum, password } = req.body;

  try {
    const teacher = await Teacher.create({
      name,
      email,
      Teacher_id,
      contactNum,
      password,
    });
    res.status(200).json(teacher);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

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
}

const Postscheduleclass = async (req, res) => {

  const token = req.headers["x-access-token"];
  const subject = req.body.subject;
  const semester = req.body.sem;
  const date = req.body.date;
  const time = req.body.time;
  const message = req.body.message;
  const teacher = req.body.teacher
  let SCdata = await ScheduledClass.find({});
  for (const data of SCdata) {
    if (date === data.date && time.slice(0, 2) === data.time.slice(0, 2) && semester == data.semester)

      return res.status(200).json({ warning: `${data.name} has already scheduled the class of ${data.subject} on ${date} at ${data.time}, Please schedule your class on another time` })
  }
  let data = await Students.find({});
  data.forEach((student) => {
    if (student.semester == semester) {
      classScheduleMail(
        subject,
        date,
        time,
        student.email,
        student.name,
        teacher,
        message
      );
    }
  });

  try {
    const decoded = jwt.verify(token, "secret1234");
    const Teacher_id = decoded.Teacher_id;
    const teacher = await Teacher.findOne({ Teacher_id: Teacher_id });
    return res.status(200).json({
      success: true,
      data: await ScheduledClass.create({ name: teacher.name, subject, semester, date, time }),
    });

  } catch (error) {
    console.log(error);
    res.json({ status: "error", error: "invalid token" });
  }



}

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
}

const PostscheduleTest = async (req, res) => {

  const token = req.headers["x-access-token"];

  const subject = req.body.subject;
  const date = req.body.date;
  const time = req.body.time;
  const semester = req.body.sem;
  const message = req.body.message;
  const teacher=req.body.teacher
  let STdata = await ScheduledTest.find({});
  for (const data of STdata) {
    if (date === data.date && time.slice(0, 2) === data.time.slice(0, 2) && semester == data.semester)

      return res.status(200).json({ warning: `${data.name} has already scheduled the test of ${data.subject} on ${date} at ${data.time}, Please schedule your test on another time` })
  }
  let data = await Students.find({});
  data.forEach((student) => {
    if (student.semester == semester) {
      testScheduleMail(
        subject,
        date,
        time,
        student.email,
        student.name,
        teacher,
        message
      );
    }

  });

  try {
    const decoded = jwt.verify(token, "secret1234");
    const Teacher_id = decoded.Teacher_id;
    const teacher = await Teacher.findOne({ Teacher_id: Teacher_id });
    console.log(Teacher_id)
    return res.status(200).json({
      success: true,
      data: await ScheduledTest.create({ name: teacher.name, subject, semester, date, time }),
    });

  } catch (error) {
    console.log(error);
    res.json({ status: "error", error: "invalid token" });
  }
}

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

}

const sem1Attendance = async (req, res) => {
  const token = req.headers["x-access-token"];
  const semester = "Sem-1";
  const subject = req.body.subject;
  console.log(subject);
  var nowDate = new Date();
  const time =
    nowDate.getHours() +
    ":" + nowDate.getMinutes() +
    ":" + nowDate.getSeconds();
  const date =
    nowDate.getFullYear() +
    "-" +
    (nowDate.getMonth() + 1) +
    "-" +
    nowDate.getDate();

  try {
    const decoded = jwt.verify(token, "secret1234");
    const Teacher_id = decoded.Teacher_id;
    const teacher = await Teacher.findOne({ Teacher_id: Teacher_id });
    console.log(Teacher_id)
    return res.status(200).json({
      success: true,
      data: await ClassesTaken.create({ name: teacher.name, subject, semester, date, time }),
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
      await Sem1Attendance.create({ date, name, subject, semester, attendanceStatus, time });
    } catch (error) {
      console.log(error);
    }
  }
}

const sem2Attendance = async (req, res) => {
  const token = req.headers["x-access-token"];
  const semester = "Sem-2";
  const subject = req.body.subject;
  console.log(subject);
  var nowDate = new Date();
  const time =
    nowDate.getHours() +
    ":" + nowDate.getMinutes() +
    ":" + nowDate.getSeconds();
  const date =
    nowDate.getFullYear() +
    "-" +
    (nowDate.getMonth() + 1) +
    "-" +
    nowDate.getDate();

  try {
    const decoded = jwt.verify(token, "secret1234");
    const Teacher_id = decoded.Teacher_id;
    const teacher = await Teacher.findOne({ Teacher_id: Teacher_id });
    console.log(Teacher_id)
    return res.status(200).json({
      success: true,
      data: await ClassesTaken.create({ name: teacher.name, subject, semester, date, time }),
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
      await Sem2Attendance.create({ date, name, subject, semester, attendanceStatus, time });
    } catch (error) {
      console.log(error);
    }
  }
}
const sem3Attendance = async (req, res) => {
  const token = req.headers["x-access-token"];
  const semester = "Sem-3";
  const subject = req.body.subject;
  console.log(subject);
  var nowDate = new Date();
  const time =
    nowDate.getHours() +
    ":" + nowDate.getMinutes() +
    ":" + nowDate.getSeconds();
  const date =
    nowDate.getFullYear() +
    "-" +
    (nowDate.getMonth() + 1) +
    "-" +
    nowDate.getDate();

  try {
    const decoded = jwt.verify(token, "secret1234");
    const Teacher_id = decoded.Teacher_id;
    const teacher = await Teacher.findOne({ Teacher_id: Teacher_id });
    console.log(Teacher_id)
    return res.status(200).json({
      success: true,
      data: await ClassesTaken.create({ name: teacher.name, subject, semester, date, time }),
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
      await Sem3Attendance.create({ date, name, subject, semester, attendanceStatus, time });
    } catch (error) {
      console.log(error);
    }
  }
}
const sem4Attendance = async (req, res) => {
  const token = req.headers["x-access-token"];
  const semester = "Sem-4";
  const subject = req.body.subject;
  console.log(subject);
  var nowDate = new Date();
  const time =
    nowDate.getHours() +
    ":" + nowDate.getMinutes() +
    ":" + nowDate.getSeconds();
  const date =
    nowDate.getFullYear() +
    "-" +
    (nowDate.getMonth() + 1) +
    "-" +
    nowDate.getDate();

  try {
    const decoded = jwt.verify(token, "secret1234");
    const Teacher_id = decoded.Teacher_id;
    const teacher = await Teacher.findOne({ Teacher_id: Teacher_id });
    console.log(Teacher_id)
    return res.status(200).json({
      success: true,
      data: await ClassesTaken.create({ name: teacher.name, subject, semester, date, time }),
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
      await Sem4Attendance.create({ date, name, subject, semester, attendanceStatus, time });
    } catch (error) {
      console.log(error);
    }
  }
}

const Sem1AttendanceReport = async (req, res) => {
  return res.status(200).json({
    success: true,
    data: await Sem1Attendance.find({}),
  });

}

const Sem2AttendanceReport = async (req, res) => {
  return res.status(200).json({
    success: true,
    data: await Sem2Attendance.find({}),
  });
}
const Sem3AttendanceReport = async (req, res) => {
  return res.status(200).json({
    success: true,
    data: await Sem3Attendance.find({}),
  });
}
const Sem4AttendanceReport = async (req, res) => {
  return res.status(200).json({
    success: true,
    data: await Sem4Attendance.find({}),
  });
}

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

}

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

}

const GetAssignments = async(req,res)=>{
      return res.status(200).json({
      success: true,
      data: await AssignmentsPosted.find({}),
    });
}

const Getuploadassignment = async(req, res) =>{
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
   
}
const PostUploadassignment = async (req, res) => {
  var nowDate = new Date();

  var date =
    nowDate.getFullYear() +
    "-" +
    (nowDate.getMonth() + 1) +
    "-" +
    nowDate.getDate();

  const {subject,teacher,file,semester,deadline,description} = req.body
  try {
    const assignments = await AssignmentsPosted.create({
      date,subject,teacher,file,semester,deadline,description
    });

 
    res.status(200).json(assignments);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
   let data = await Students.find({});
  data.forEach((student) => {
    if (student.semester == semester) {
      AssignmentMail(
        subject,
        deadline,
        student.email,
        student.name,
        teacher,
        description
      );
    }
  });
}

//for students
const Test_Scheduled = async (req, res) => {
  const token = req.headers["x-access-token"];
  try {
    const decoded = jwt.verify(token, "secret123");
    const enrollNum = decoded.enrollNum;
    const student = await Students.findOne({ enrollNum: enrollNum });
    
    return res.status(200).json({
      success: true,
      data: await ScheduledTest.find({ semester: student.semester }),
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
    });
  } catch (error) {
    console.log(error);
    res.json({ status: "error", error: "invalid token" });
  }
}

const classnotification = async(req,res)=>{
  return res.status(200).json({
    success : true,
    data : await ScheduledClass.find({})
  })
}

const GetStudyMaterial = async(req, res) =>{
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
   
}
const PostStudyMaterial = async (req, res) => {
  var nowDate = new Date();

  var date =
    nowDate.getFullYear() +
    "-" +
    (nowDate.getMonth() + 1) +
    "-" +
    nowDate.getDate();

  const {subject,teacher,file,semester,description} = req.body
  try {
    const assignments = await StudyMaterial.create({
      date,subject,teacher,file,semester,description
    });

 
    res.status(200).json(assignments);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
   let data = await Students.find({});
  data.forEach((student) => {
    if (student.semester == semester) {
      StudyMaterialMail(
        subject,
        student.email,
        student.name,
        teacher,
        description
      );
    }
  });
}


// const cron = require("node-cron")
// cron.schedule('* * * * * *', async () =>
//     {  
//           const arr=["Sem-1","Sem-2","Sem-3","Sem-4"]
//           for(let i=0;i<4;i++)
//        {
//            let classdata = await ClassesTaken.find({semester:arr[i]})
//            const TotalClasses = classdata.length
              // let studentdata= await Students.find({semester:arr[i]})
//           }
          
    
//     }
// );

module.exports = {
  login, Getdashboard, Postdashboard, Getprofile, Postprofile, Getchangepassword,
  PatchChangepassword, register, loginteacher, GetTeacherdashboard, Postteacherdashboard,
  GetTeacherProfile, PostTeacherProfile, GetTeacherChangePassword, PatchTeacherChangePassword,
  RegisterTeacher, GetScheduleclass, Postscheduleclass, GetScheduletest, PostscheduleTest,
  GetAttendance, sem1Attendance, sem2Attendance, sem3Attendance, sem4Attendance,
  Sem1AttendanceReport, Sem2AttendanceReport, Sem3AttendanceReport, Sem4AttendanceReport,
  ScheduledClassReport, ScheduledTestReport, PostUploadassignment, Test_Scheduled, Classes_Scheduled, Getuploadassignment, Assignment_Schedule_student, GetAssignments, classnotification,
  GetStudyMaterial,PostStudyMaterial
}