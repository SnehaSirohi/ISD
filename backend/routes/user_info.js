const express = require("express");
const { Adminregister, Adminlogin, AdClassesTaken} = require("../controllers/admincontrol")
const {
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
  GetAssignmentSubmitt
} = require("../controllers/teachercontrol");

const {
  login,
  Getdashboard,
  Getprofile,
  Postprofile,
  Getchangepassword,
  PatchChangepassword,
  register,
  Test_Scheduled,
  Classes_Scheduled,
  Assignment_Schedule_student,
  GetAssignments,
  classnotification,
  StudyMaterial_Posted_Students,
  PostAssignmentSubmitt,
  testnotification
} = require("../controllers/studentscontrol");

const {
  Postscheduleclass,
  PostscheduleTest,
  PostUploadassignment,
  PostStudyMaterial,
} = require("../controllers/emailcontrol");

const { json } = require("body-parser");
const StudyMaterial = require("../models/StudyMaterial");
const router = express.Router();

//-----------admin--------------------
router.post("/adminregister", Adminregister);
router.post("/adminlogin", Adminlogin);

//-----------login-student------------
router.post("/login", login);

//Dashboard - student (get)
router.get("/dashboard", Getdashboard);

//student profile (get)
router.get("/dashboard/profile", Getprofile);

//student profile(post)
router.post("/dashboard/profile", Postprofile);

//student
router.get("/dashboard/changepassword", Getchangepassword);

//student-change password
router.patch("/dashboard/changepassword", PatchChangepassword);

//student register
router.post("/register", register);

//------------------Teacher Login-------------------
router.post("/loginteacher", loginteacher);

//Dashboard - Teacher (get)
router.get("/Teacherdashboard", GetTeacherdashboard);

//Teacher profile (get)
router.get("/Teacherdashboard/profile", GetTeacherProfile);

//teacher profile(post)
router.post("/Teacherdashboard/profile", PostTeacherProfile);

//Teacher
router.get("/Teacherdashboard/changepassword", GetTeacherChangePassword);

//student-change password
router.patch("/Teacherdashboard/changepassword", PatchTeacherChangePassword);

//register teacher
router.post("/registerteacher", RegisterTeacher);

router.get("/scheduleclass", GetScheduleclass);
router.post("/scheduleclass", Postscheduleclass);
router.get("/scheduletest", GetScheduletest);
router.post("/scheduletest", PostscheduleTest);

//............
router.get("/attendance", GetAttendance);
router.post("/attendance/sem1", sem1Attendance);
router.post("/attendance/sem2", sem2Attendance);
router.post("/attendance/sem3", sem3Attendance);
router.post("/attendance/sem4", sem4Attendance);
router.get("/attendancereport/sem1", Sem1AttendanceReport);
router.get("/attendancereport/sem2", Sem2AttendanceReport);
router.get("/attendancereport/sem3", Sem3AttendanceReport);
router.get("/attendancereport/sem4", Sem4AttendanceReport);
router.get("/scheduledclassreport", ScheduledClassReport);
router.get("/scheduledtestreport", ScheduledTestReport);
router.get("/upload/assignment", Getuploadassignment);
router.post("/upload/assignment", PostUploadassignment);
router.get("/upload/studymaterial", GetStudyMaterial);
router.post("/upload/studymaterial", PostStudyMaterial);
router.get("/classschedule", Classes_Scheduled);
router.get("/testschedule", Test_Scheduled);
router.get("/assignmentreportstudent", Assignment_Schedule_student);
router.get("/assignmentreportteacher", Assignment_Schedule_teacher);
router.get("/studymaterial_teacher", StudyMaterial_Posted);
router.get("/studymaterial_student", StudyMaterial_Posted_Students);
router.get("/notifications/assignment", GetAssignments);
router.get("/notifications/classes", classnotification);
router.get("/notifications/tests", testnotification);
router.post("/assignmentsubmit",PostAssignmentSubmitt)
router.get("/assignmentsubmit",GetAssignmentSubmitt)
router.get('/classestaken',AdClassesTaken)
module.exports = router;
