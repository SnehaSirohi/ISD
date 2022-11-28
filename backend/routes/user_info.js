const express = require("express");
const {
    login,Getdashboard,Postdashboard, Getprofile, Postprofile, Getchangepassword,
    PatchChangepassword, register,loginteacher,GetTeacherdashboard,Postteacherdashboard,
    GetTeacherProfile,PostTeacherProfile,GetTeacherChangePassword,PatchTeacherChangePassword,
    RegisterTeacher,GetScheduleclass, Postscheduleclass, GetScheduletest,PostscheduleTest,
    GetAttendance,sem1Attendance,sem2Attendance,sem3Attendance,sem4Attendance,
    Sem1AttendanceReport,Sem2AttendanceReport,Sem3AttendanceReport,Sem4AttendanceReport,
    ScheduledClassReport,ScheduledTestReport,Upload, Test_Scheduled, Classes_Scheduled
} = require("../controllers/functions")
const { json } = require("body-parser");
const router = express.Router();
//-----------login-student------------
router.post("/login",login);

//Dashboard - student (get)
router.get("/dashboard",Getdashboard);

//Dashboard - student  (post)
router.post("/dashboard",Postdashboard);

//student profile (get)
router.get("/dashboard/profile",Getprofile );

//student profile(post)
router.post("/dashboard/profile",Postprofile);

//student
router.get('/dashboard/changepassword',Getchangepassword )

//student-change password
router.patch('/dashboard/changepassword',PatchChangepassword);

//student register
router.post("/register",register);

//------------------Teacher Login-------------------
router.post("/loginteacher",loginteacher );

//Dashboard - Teacher (get)
router.get("/Teacherdashboard",GetTeacherdashboard);

//Dashboard - Teacher  (post)
router.post("/Teacherdashboard",Postteacherdashboard);

//Teacher profile (get)
router.get("/Teacherdashboard/profile",GetTeacherProfile );

//teacher profile(post)
router.post("/Teacherdashboard/profile",PostTeacherProfile);

//Teacher
router.get('/Teacherdashboard/changepassword',GetTeacherChangePassword )

//student-change password
router.patch('/Teacherdashboard/changepassword',PatchTeacherChangePassword);

//register teacher
router.post("/registerteacher",RegisterTeacher);
router.get("/scheduleclass",GetScheduleclass);
router.post("/scheduleclass",Postscheduleclass);
router.get("/scheduletest",GetScheduletest );
router.post("/scheduletest", PostscheduleTest);

//............
router.get("/attendance",GetAttendance);
router.post("/attendance/sem1",sem1Attendance);
router.post("/attendance/sem2",sem2Attendance);
router.post("/attendance/sem3",sem3Attendance);
router.post("/attendance/sem4",sem4Attendance);
router.get("/attendancereport/sem1",Sem1AttendanceReport );
router.get("/attendancereport/sem2",Sem2AttendanceReport );
router.get("/attendancereport/sem3",Sem3AttendanceReport);
router.get("/attendancereport/sem4",Sem4AttendanceReport );
router.get("/scheduledclassreport",ScheduledClassReport );
router.get("/scheduledtestreport",ScheduledTestReport );
router.post("/upload",Upload)

router.get("/classschedule", Test_Scheduled);
router.get("/testschedule", Classes_Scheduled);

module.exports = router;
