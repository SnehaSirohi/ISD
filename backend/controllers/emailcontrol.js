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
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
const { classScheduleMail, testScheduleMail, AssignmentMail,StudyMaterialMail, MonthlyMail,WarningMail } = require("../utils/mail");

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

  const PostStudyMaterial = async (req, res) => {
    const token = req.headers["x-access-token"];
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

//   const cron = require("node-cron")
// cron.schedule('* * 1 * *', async () =>
//     {  
//           const arr=["Sem-1","Sem-2","Sem-3","Sem-4"]
//           const date=new Date();
//           const monthval=date.getMonth();
//           date.setMonth(monthval - 1);
//           var monthname= date.toLocaleString('en-US', {
//             month: 'long',
//           })
          

//           for(let i=0;i<4;i++)
//        {
//            let TotalClasses = await ClassesTaken.find({semester:arr[i]})
//             TotalClasses=TotalClasses.filter((classes)=>{
//                  if(classes.date.slice(5,7)==monthval)
//                  {
//                       return classes
//                  }
//            })
          
//            const classes=TotalClasses.length
//            let studentdata= await Students.find({semester:arr[i]})
//               if(arr[i]=="Sem-1")
//               {
//                  studentdata.forEach( async(student)=>{
//                    let presentdata= await Sem1Attendance.find({attendanceStatus:"Present",name:student.name})
//                    presentdata=presentdata.filter((data)=>{
//                     if(data.date.slice(5,7)==monthval)
//                     {
//                       return data
//                     }
//                    })
//                    const attendance = presentdata.length;
//                    const perecentage = (attendance/classes)*100;
//                    if(perecentage<=50 && classes>=10)
//                    {
//                       WarningMail(student.name,student.email,student.semester)
//                    }
//                    MonthlyMail(student.name,student.email,classes,attendance,monthname,perecentage)
//                  })

//                }
//               else if(arr[i]=="Sem-2")
//               {
//                  studentdata.forEach( async(student)=>{
//                    let presentdata= await Sem2Attendance.find({attendanceStatus:"Present",name:student.name})
//                    presentdata=presentdata.filter((data)=>{
//                     if(data.date.slice(5,7)==monthval)
//                     {
//                       return data
//                     }
//                    })
//                    const attendance = presentdata.length;
//                    const perecentage = (attendance/classes)*100;
//                    if(perecentage<=50 && classes>=10)
//                    {
//                       WarningMail(student.name,student.email,student.semester)
//                    }
//                    MonthlyMail(student.name,student.email,classes,attendance,monthname,perecentage)
//                  })

//                }
//               else if(arr[i]=="Sem-3")
//               {
//                  studentdata.forEach( async(student)=>{
//                    let presentdata= await Sem3Attendance.find({attendanceStatus:"Present",name:student.name})
//                    presentdata=presentdata.filter((data)=>{
//                     if(data.date.slice(5,7)==monthval)
//                     {
//                       return data
//                     }
//                    })
//                    const attendance = presentdata.length;
//                    const perecentage = (attendance/classes)*100;
//                    if(perecentage<=50 && classes>=10)
//                    {
//                       WarningMail(student.name,student.email,student.semester)
//                    }
//                    MonthlyMail(student.name,student.email,classes,attendance,monthname,perecentage)
//                  })

//                }
//               else 
//               {
//                  studentdata.forEach( async(student)=>{
//                    let presentdata= await Sem2Attendance.find({attendanceStatus:"Present",name:student.name})
//                    presentdata=presentdata.filter((data)=>{
//                     if(data.date.slice(5,7)==monthval)
//                     {
//                       return data
//                     }
//                    })
//                    const attendance = presentdata.length;
//                    const perecentage = (attendance/classes)*100;
//                    if(perecentage<=50 && classes>=10)
//                    {
//                       WarningMail(student.name,student.email,student.semester)
//                    }
//                    MonthlyMail(student.name,student.email,classes,attendance,monthname,perecentage)
//                  })

//                }
//           }    
    
//     }
// );

module.exports = {
    Postscheduleclass, PostscheduleTest, PostUploadassignment, PostStudyMaterial
  }