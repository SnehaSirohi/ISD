const express = require("express");
const { Adminregister, Adminlogin, AdClassesTaken} = require("../controllers/admincontrol")
const {
  loginteacher,
  PatchTeacherChangePassword,
  RegisterTeacher,
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
  Assignment_Schedule_teacher,
  StudyMaterial_Posted,
  GetAssignmentSubmitt,
  assignment_s_submited,
  UploadContent,
  Teacherverification,
} = require("../controllers/teachercontrol");

const {
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

//student-change password
router.patch("/dashboard/changepassword", PatchChangepassword);

//student register
router.post("/register", register);
router.post("/registerall", registerall);


//------------------Teacher Login-------------------
router.post("/loginteacher", loginteacher);

//teacher-change password
router.patch("/Teacherdashboard/changepassword", PatchTeacherChangePassword);

//register teacher
router.post("/registerteacher", RegisterTeacher);

router.get("/teacherverify", Teacherverification);
router.post("/scheduleclass", Postscheduleclass);
router.post("/scheduletest", PostscheduleTest);

//............
router.post("/attendance/Sem1", sem1Attendance);
router.post("/attendance/Sem2", sem2Attendance);
router.post("/attendance/Sem3", sem3Attendance);
router.post("/attendance/Sem4", sem4Attendance);
router.get("/attendancereport/Sem1", Sem1AttendanceReport);
router.get("/attendancereport/Sem2", Sem2AttendanceReport);
router.get("/attendancereport/Sem3", Sem3AttendanceReport);
router.get("/attendancereport/Sem4", Sem4AttendanceReport);
router.get("/scheduledclassreport", ScheduledClassReport);
router.get("/scheduledtestreport", ScheduledTestReport);
router.post("/upload/assignment", PostUploadassignment);
router.post("/upload/studymaterial", PostStudyMaterial);

//..student
router.get("/classschedule", Classes_Scheduled);
router.get("/testschedule", Test_Scheduled);
router.get("/assignmentreportstudent", Assignment_Schedule_student);
router.get("/studymaterial_student", StudyMaterial_Posted_Students);

router.get("/assignmentreportteacher", Assignment_Schedule_teacher);
router.get("/studymaterial_teacher", StudyMaterial_Posted);
router.get("/notifications/assignment", GetAssignments);
router.get("/notifications/classes", classnotification);
router.get("/notifications/tests", testnotification);
router.post("/assignmentsubmit",PostAssignmentSubmitt)
router.get("/assignmentsubmit",GetAssignmentSubmitt)

//admin
router.get('/classestaken',AdClassesTaken)

router.get('/assignmentsubmited',assignmentsubmited)
router.get('/submissions/:id',assignment_s_submited)
module.exports = router;
