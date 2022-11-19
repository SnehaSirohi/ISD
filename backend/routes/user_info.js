const express = require("express");
const Students = require("../models/studentdata");
const Sem1Attendance = require("../models/Sem1Attendance");
const Sem2Attendance = require("../models/Sem2Attendance");
const Sem3Attendance = require("../models/Sem3Attendance");
const Sem4Attendance = require("../models/Sem4Attendance");
const Teacher = require("../models/teacherdata");
const jwt = require("jsonwebtoken");
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const { classScheduleMail, testScheduleMail } = require("../utils/mail");
const router = express.Router();

router.get("/", (req, res) => {
  res.json({ mssg: "dsf" });
});

router.post("/login", (req, res) => {
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
});

router.get("/dashboard", async (req, res) => {
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
});

router.post("/dashboard", async (req, res) => {
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
});

router.get("/dashboard/profile", async (req, res) => {
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
});

router.post("/dashboard/profile", async (req, res) => {
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
});

router.post("/loginteacher", (req, res) => {
  const { Teacher_id, password } = req.body;
  Teacher.findOne({ Teacher_id: Teacher_id }, (err, teacher) => {
    if (teacher) {
      if (password === teacher.password) {
        res.send({ message: "Login successful", teacher: teacher });
      } else {
        res.send({ message: "password didn't match" });
      }
    } else {
      res.send({ message: "Teacher not registered" });
    }
  });
});

router.post("/register", async (req, res) => {
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
});

router.post("/registerteacher", async (req, res) => {
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
});

router.patch("/dashboard/changepassword", async (req, res) => {
  const { oldpassword, newpassword, enrollNum } = req.body;

  if (!oldpassword || !newpassword || !enrollNum) {
    return res.json({ status: 400, msg: "Please enter all fields" });
  }

  if (oldpassword === newpassword) {
    return res.json({
      status: 400,
      msg: "old and new password cannot be same",
    });
  }

  User.findOneAndUpdate(
    { enrollNum },
    (err, data) => {
      if (err) return res.json({ status: 400, msg: err.message });
      if (!data) return res.json({ status: 400, msg: "No data found" });
    },
    { $set: { password: newpassword } },
    (err, user) => {
      if (!err && user) {
        return res.json({ status: 200, msg: "Updated successfully" });
      }
    }
  );
});

router.get("/attendance", async (req, res) => {
  return res.status(200).json({
    success: true,
    data: await Students.find({}),
  });
});

router.post("/scheduleclass", async (req, res) => {
  const subject = req.body.subject;
  const sem = req.body.sem;
  const date = req.body.date;
  const time = req.body.time;
  const message = req.body.message;
  console.log(req.body);
  let data = await Students.find({});
  data.forEach((student) => {
    if (student.semester == sem) {
      classScheduleMail(
        subject,
        date,
        time,
        student.email,
        student.name,
        message
      );
    }
  });
});

router.post("/scheduletest", async (req, res) => {
  const subject = req.body.subject;
  const date = req.body.date;
  const time = req.body.time;
  const sem = req.body.sem;
  const message = req.body.message;
  let data = await Students.find({});
  data.forEach((student) => {
    if (student.semester == sem) {
      testScheduleMail(
        subject,
        date,
        time,
        student.email,
        student.name,
        message
      );
    }
  });
});

router.post("/attendance/sem1", async (req, res) => {
  const subject = req.body.subject;
  console.log(subject);
  var nowDate = new Date();
  const date =
    nowDate.getFullYear() +
    "-" +
    (nowDate.getMonth() + 1) +
    "-" +
    nowDate.getDate();
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
      await Sem1Attendance.create({ date, name, subject, attendanceStatus });
    } catch (error) {
      console.log(error);
    }
  }
});
router.post("/attendance/sem2", async (req, res) => {
  const subject = req.body.subject;
  console.log(subject);
  var nowDate = new Date();
  const date =
    nowDate.getFullYear() +
    "-" +
    (nowDate.getMonth() + 1) +
    "-" +
    nowDate.getDate();
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
      await Sem2Attendance.create({ date, name, subject, attendanceStatus });
    } catch (error) {
      console.log(error);
    }
  }
});
router.post("/attendance/sem3", async (req, res) => {
  const subject = req.body.subject;
  console.log(subject);
  var nowDate = new Date();
  const date =
    nowDate.getFullYear() +
    "-" +
    (nowDate.getMonth() + 1) +
    "-" +
    nowDate.getDate();
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
      await Sem3Attendance.create({ date, name, subject, attendanceStatus });
    } catch (error) {
      console.log(error);
    }
  }
});
router.post("/attendance/sem4", async (req, res) => {
  const subject = req.body.subject;
  console.log(subject);
  var nowDate = new Date();
  const date =
    nowDate.getFullYear() +
    "-" +
    (nowDate.getMonth() + 1) +
    "-" +
    nowDate.getDate();
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
      await Sem4Attendance.create({ date, name, subject, attendanceStatus });
    } catch (error) {
      console.log(error);
    }
  }
});

router.get("/attendancereport/sem1", async (req, res) => {
  return res.status(200).json({
    success: true,
    data: await Sem1Attendance.find({}),
  });

});

router.get("/attendancereport/sem2", async (req, res) => {
  return res.status(200).json({
    success: true,
    data: await Sem2Attendance.find({}),
  });
});
router.get("/attendancereport/sem3", async (req, res) => {
  return res.status(200).json({
    success: true,
    data: await Sem3Attendance.find({}),
  });
});
router.get("/attendancereport/sem4", async (req, res) => {
  return res.status(200).json({
    success: true,
    data: await Sem4Attendance.find({}),
  });
});
module.exports = router;
