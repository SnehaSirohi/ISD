import React, { useEffect } from 'react';
import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Admin from './components/Admin/Admin Dashboard/login';
import Register_teacher from './components/Admin/Admin Dashboard/Register/registerteacher'
import Register_student from './components/Admin/Admin Dashboard/Register/registerstudent'
import Register_Mul_student from './components/Admin/Admin Dashboard/Register/registermultiplestudents'
import Login from './components/login/login';
import Login2 from './components/login2/Login2';
import LoginTeacher from './components/loginteacher/loginteacher';
import Homepage from './components/homepage/homepage'

// import AttendanceSem1 from './components/Attendance list/Sem_1';
// import AttendanceSem2 from './components/Attendance list/Sem_2';
// import AttendanceSem3 from './components/Attendance list/Sem_3';
// import AttendanceSem4 from './components/Attendance list/Sem_4';
// import ClassScheduleSem1 from './components/Class Schedule/Sem_1.'
// import ClassScheduleSem2 from './components/Class Schedule/Sem_2'
// import ClassScheduleSem3 from './components/Class Schedule/Sem_3'
// import ClassScheduleSem4 from './components/Class Schedule/Sem_4'
// import TestscheduleSem1 from './components/Test Schedule/Sem_1';
// import TestscheduleSem2 from './components/Test Schedule/Sem_2';
// import TestscheduleSem3 from './components/Test Schedule/Sem_3';
// import TestscheduleSem4 from './components/Test Schedule/Sem_4';
import Student_Dashboard from './components/Student_dashboard/student_dashboard';
import Student_Profile from './components/Student_dashboard/Student_profile'
import ChangeStudentPassword from './components/Student_dashboard/change_student_password';
import Teacher_Dashboard from './components/Teacher_dashboard/Teacher_dashboard';
import Teacher_Profile from './components/Teacher_dashboard/Teacher_profile'
import ChangeTeacherPassword from './components/Teacher_dashboard/change_teacher_password';
// import Sem1 from './components/Teacher_dashboard/sem1';
// import Sem2 from './components/Teacher_dashboard/sem2';
// import Sem3 from './components/Teacher_dashboard/sem3';
// import Sem4 from './components/Teacher_dashboard/sem4';
import Sem1_Student from './components/Student_dashboard/sem1';
// import Sem1filters from './components/Filters/Sem1filters';
// import Sem2filters from './components/Filters/Sem2filters';
// import Sem3filters from './components/Filters/Sem3filters';
// import Sem4filters from './components/Filters/Sem4filters';
import Classreport from './components/schedule_report/teacher/scheduleclassreport';
import Testreport from './components/schedule_report/teacher/scheduletestreport';
// import Testreport_student from './components/Scheduled_test_List/testreport_student';
// import Classreport_student from './components/Scheduled_Class_List/classreport_student';
import Schedulereport from './components/schedule_report/schedulereport';


import Classreport_semester from './components/schedule_report/Classreport_semester';
import Testreport_semester from './components/schedule_report/Testreport_semester';

import Assignmentreport_semester from './components/Assignment_report/semesterwise/Assignmentreport_semester';
import Attendancereport_student from './components/Attendance Report/attendancestudent';
import Assignmentreport_student from './components/Assignment_report/assignmentreport_student';
import Assignmentreport_teacher from './components/Assignment_report/teacher_assignment_report';
import Studymaterial_teacher from './components/Study Material/teacher_studymaterial';
import Studymaterial_student from './components/Study Material/semesterwise/studymaterial_semester';
// import UploadAssignmentsem1 from './components/Assignment_Upload/Upload_assignment_sem1';
// import UploadAssignmentsem2 from './components/Assignment_Upload/Upload_assignment_sem2';
// import UploadAssignmentsem3 from './components/Assignment_Upload/Upload_assignment_sem3';
// import UploadAssignmentsem4 from './components/Assignment_Upload/Upload_assignment_sem4';
import Notifications from './components/Student_dashboard/Notifications';
// import UploadStudyMaterialSem1 from './components/Study Material/UploadStudyMaterialSem1';
// import UploadStudyMaterialSem2 from './components/Study Material/UploadStudyMaterialSem2';
// import UploadStudyMaterialSem3 from './components/Study Material/UploadStudyMaterialSem3';
// import UploadStudyMaterialSem4 from './components/Study Material/UploadStudyMaterialSem4';
import Teacherprofile2 from './components/Teacher_dashboard/Teacherprofile2';
import TeacherNotifications from './components/Teacher_dashboard/Notifications'
import Profile from './components/Teacher_dashboard/Profile/Profile';
import Attendance_report from './components/Admin Dashboard/Attendance_report';
import AdminSem1Attendance from './components/Admin Dashboard/Sem1Attendance';
import AdminSem2Attendance from './components/Admin Dashboard/Sem2Attendance';
import AdminSem3Attendance from './components/Admin Dashboard/Sem3Attendance';
import AdminSem4Attendance from './components/Admin Dashboard/Sem4Attendance';
import AdClasses_taken from './components/Admin Dashboard/Classes_taken';
import Home from './components/Admin Dashboard/Home';
import SubmittedAssignments from './components/Assignment_report/SubmittedAssignments';
import Operations from './components/Teacher_dashboard/Operations';
import Schedule from './components/Scheduling/Schedule';
import Attendance from './components/Attendance list/Attendance';
import Upload from './components/Uploading/Upload';
import Filters from './components/Filters/Filters';
import jwt from 'jsonwebtoken'
function App() {
  // const navigate =useNavigate()
  const [UnmeshShukla, setUnmeshShukla] = useState(false)
  const [NitishaAgg, setNitishaAgg] = useState(false)
  const [MKDas, setMKDas] = useState(false)
  const [SunilKumar, setSunilKumar] = useState(false)
  const [Sanjeev,setSanjeev]=useState(false)
  const [Manish,setManish]=useState(false)
  const [assid,setassid]=useState("")
  const [teacher,setTeacher]=useState("")
  const [totalClasstaken, setTotalClasstaken] = useState([])
  const [totalClassScheduled, setTotalClassScheduled] = useState([])
  const [totalTestScheduled, setTotalTestScheduled] = useState([])
  const [totalAssignments, setTotalAssignments] = useState([])
  const [totalStudymaterial, setTotalStudymaterial] = useState([])
  const [name, setName] = useState([])
  const [email, setEmail] = useState([])
  const [contact, setcontact] = useState([])
  const [teacher_id, setteacher_id] = useState([])
  const [studentsattend, setStudentsattend] = useState([])

   async function populate(e) {
    const req = await fetch(`http://localhost:4000/teacherverify`, {
      headers: {
        'x-access-token': localStorage.getItem('token'), //
      },
    })
    const data = await req.json();
    if (data.status === 'ok') {
      setName(data.name)
      setEmail(data.email)
      setteacher_id(data.Teacher_id)
      setcontact(data.contactNum)
      setTotalClassScheduled(data.Classes_Scheduled)
      setTotalClasstaken(data.Classes_taken_count)
      setTotalTestScheduled(data.Test_Scheduled)
      setTotalAssignments(data.Assignments_posted)
      setTotalStudymaterial(data.Study_Material_posted)
      setStudentsattend(data.data)
  }
    setTeacher(data.name)
    if (data.name == "Unmesh Shukla") {
      setUnmeshShukla(true)
    }
    if (data.name == "Nitisha Aggarwal") {
      setNitishaAgg(true)
    }
    if (data.name == "M.K Das") {
      setMKDas(true)
    }
    if (data.name == "Sunil Kumar") {
      setSunilKumar(true)
    }
    if (data.name == "Sajeev") {
      setSanjeev(true)
    }
    if (data.name == "Manish") {
      setManish(true)
    }
  }

  useEffect(() => {
    const token = localStorage.getItem('token')

    if (token) {
      const user = jwt.decode(token)
      console.log(user)
      if (!user) {
        localStorage.removeItem('token')
        
      } else {
        populate()

      }
    }

  }, [])
  useEffect(() => {
    window.process = {
      ...window.process,
    };
  }, []);


  const [totalclassesheld, setTotalclassesheld] = useState([])
    const [totalClasstakenStudent, setTotalClasstakenStudent] = useState([])
    const [totalClassScheduledStudent, setTotalClassScheduledStudent] = useState([])
    const [totalTestScheduledStudent, setTotalTestScheduledStudent] = useState([])
    const [assignment_submitted, setAssignment_submitted] = useState([])
    const [assignments, setAssignments] = useState([])
    // const navigate = useNavigate();
    const [stuname, setStuName] = useState([])
    const [stuemail, setStuEmail] = useState([])
    const [rollNum, setRollNum] = useState([])
    const [stucontactNum, setStuContactNum] = useState([])
    const [enrollNum, setEnrollNum] = useState([])


    async function populatedashboard() {
        const req = await fetch('http://localhost:4000/dashboard', {
            headers: {
                'x-access-token': localStorage.getItem('token'),

            },
        })

        const json = await req.json()

        // console.log(json)
        if (json.status === 'ok') {
            setStuName(json.name)
            setStuEmail(json.email)
            setEnrollNum(json.enrollNum)
            setRollNum(json.rollNum)
            setStuContactNum(json.contactNum)
            setTotalclassesheld(json.Classes_held)
            setTotalClassScheduledStudent(json.Classes_Scheduled)
            setTotalClasstakenStudent(json.Classes_taken_count)
            setTotalTestScheduledStudent(json.Test_Scheduled)
            setAssignments(json.Assignment_posted)
            setAssignment_submitted(json.assignment_submitted)
        }
        else {
            // alert(data.error)
        }
        
    }
    console.log(assignment_submitted)
    useEffect(() => {
      const token = localStorage.getItem('token')
      if (token) {
          const user = jwt.decode(token)
          if (!user) {
              localStorage.removeItem('token')
              // navigate("/");
          } else {
              populatedashboard()
          }
      }
  }, [name], [email])

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' exact element={<Homepage />} />
          <Route path = '/admin'  element = {<Admin />} />
          <Route path = '/registerTeacher' element = {<Register_teacher />} />
          <Route path = '/registerStudent' element = {<Register_student />} />
          <Route path = '/registerAllStudent' element = {<Register_Mul_student />} />
          <Route path='/login' element={<Login />} />
          <Route path='/login2' element={<Login2 />} />
          <Route path='/loginteacher' element={<LoginTeacher />} />
          <Route path='/dashboard' element={<Student_Dashboard assignment_submitted={assignment_submitted} totalclassesheld={totalclassesheld} totalClasstakenStudent={totalClasstakenStudent} totalClassScheduledStudent={totalClassScheduledStudent} totalTestScheduledStudent={totalTestScheduledStudent} assignments={assignments}/>} />
          <Route path='/dashboard/profile' element={<Student_Profile stucontactNum={stucontactNum} rollNum={rollNum} enrollNum={enrollNum} stuemail={stuemail} stuname={stuname}/>} />
          <Route path="/dashboard/changepassword" element={<ChangeStudentPassword />} />
          <Route path='/Studentdashboard/sem1' element={<Sem1_Student />} />
          {/* <Route path='/testschedule' element={<Testreport_student />} /> */}
          {/* <Route path='/classschedule' element={<Classreport_student />} /> */}
          <Route path="/:schrparam" element={<Schedulereport />} />

          <Route path='/assignmentreportstudent' element={<Assignmentreport_student />} />
          <Route path='/Teacherdashboard/assignmentreportteacher' element={<Assignmentreport_teacher setassid={setassid} />} />
          <Route path='/Teacherdashboard' element={<Teacher_Dashboard totalClasstaken={totalClasstaken} totalClassScheduled={totalClassScheduled} totalTestScheduled={totalTestScheduled} totalAssignments={totalAssignments} totalStudymaterial={totalStudymaterial}/>} />
          <Route path='/Teacherdashboard/profile' element={<Teacher_Profile name={name} email={email} contact={contact} teacher_id={teacher_id}/>} />
          <Route path="/Teacherdashboard/changepassword" element={<ChangeTeacherPassword />} />
          {/* <Route path='/Teacherdashboard/sem1/attendance' element={<AttendanceSem1 />} />
          <Route path='/Teacherdashboard/sem2/attendance' element={<AttendanceSem2 />} />
          <Route path='/Teacherdashboard/sem3/attendance' element={<AttendanceSem3 />} />
          <Route path='/Teacherdashboard/sem4/attendance' element={<AttendanceSem4 />} /> */}
          {/* <Route path='/Teacherdashboard/sem1' element={<Sem1 />} />
          <Route path='/Teacherdashboard/sem2' element={<Sem2 />} />
          <Route path='/Teacherdashboard/sem3' element={<Sem3 />} />
          <Route path='/Teacherdashboard/sem4' element={<Sem4 />} /> */}
          {/* <Route path='/Teacherdashboard/sem1/classschedule' element={<ClassScheduleSem1 />} />
          <Route path='/Teacherdashboard/sem2/classschedule' element={<ClassScheduleSem2 />} />
          <Route path='/Teacherdashboard/sem3/classschedule' element={<ClassScheduleSem3 />} />
          <Route path='/Teacherdashboard/sem4/classschedule' element={<ClassScheduleSem4 />} />
          <Route path="/Teacherdashboard/sem1/testschedule" element={<TestscheduleSem1 />} />
          <Route path="/Teacherdashboard/sem2/testschedule" element={<TestscheduleSem2 />} />
          <Route path="/Teacherdashboard/sem3/testschedule" element={<TestscheduleSem3 />} />
          <Route path="/Teacherdashboard/sem4/testschedule" element={<TestscheduleSem4 />} /> */}
          <Route path='/scheduledclassreport' element={<Classreport />} />
          <Route path='/scheduledtestreport' element={<Testreport />} />
          <Route path='/scheduledclass' element={<Classreport_semester />} />
          <Route path='/scheduledtests' element={<Testreport_semester />} />
          <Route path='/assignments' element={<Assignmentreport_semester />} />
          <Route path='/studymaterial' element={<Studymaterial_student />} />
          <Route path='/attendancereport' element={<Attendancereport_student />} />
          <Route path='/Teacherdashboard/studymaterial' element={<Studymaterial_teacher />} />
          {/* <Route path='/Teacherdashboard/sem1/assignment' element={<UploadAssignmentsem1 />} />
          <Route path='/Teacherdashboard/sem2/assignment' element={<UploadAssignmentsem2 />} />
          <Route path='/Teacherdashboard/sem3/assignment' element={<UploadAssignmentsem3 />} />
          <Route path='/Teacherdashboard/sem4/assignment' element={<UploadAssignmentsem4 />} />
          <Route path='/Teacherdashboard/sem1/studymaterial' element={<UploadStudyMaterialSem1 />} />
          <Route path='/Teacherdashboard/sem2/studymaterial' element={<UploadStudyMaterialSem2 />} />
          <Route path='/Teacherdashboard/sem3/studymaterial' element={<UploadStudyMaterialSem3 />} />
          <Route path='/Teacherdashboard/sem4/studymaterial' element={<UploadStudyMaterialSem4 />} /> */}
          <Route path='/Notifications' element={<Notifications />} />
          {/* <Route path="/Teacherdashboard/filters/sem1" element={<Sem1filters />} />
          <Route path="/Teacherdashboard/filters/sem2" element={<Sem2filters />} />
          <Route path="/Teacherdashboard/filters/sem3" element={<Sem3filters />} />
          <Route path="/Teacherdashboard/filters/sem4" element={<Sem4filters />} /> */}
          <Route path="/Teacherdashboard/profile2" element={<Teacherprofile2 />} />
          <Route path="/teacherNotifications" element={<TeacherNotifications />} />
          <Route path="/admindashboard/attendancereport" element={<Attendance_report />} />
          <Route path="/admindashboard/Sem1/attendance" element={<AdminSem1Attendance />} />
          <Route path="/admindashboard/Sem2/attendance" element={<AdminSem2Attendance />} />
          <Route path="/admindashboard/Sem3/attendance" element={<AdminSem3Attendance />} />
          <Route path="/admindashboard/Sem4/attendance" element={<AdminSem4Attendance />} />
          <Route path="/admindashboard/classestaken" element={<AdClasses_taken />} />
          <Route path="/admindashboard" element={<Home />} />
          <Route path="/profile3" element={<Profile />} />
          <Route path="/operations/:semester" element={<Operations />} />
          <Route path="/Teacherdashboard/:schparam/:semester" element={<Schedule teacher={teacher} NitishaAgg={NitishaAgg} UnmeshShukla={UnmeshShukla} MKDas={MKDas} Sanjeev={Sanjeev} Manish={Manish} SunilKumar={SunilKumar} />} />
          <Route path="/Teacherdashboard/attendance/:semester" element={<Attendance studentsattend={studentsattend} teacher={teacher}  NitishaAgg={NitishaAgg} UnmeshShukla={UnmeshShukla} MKDas={MKDas} Sanjeev={Sanjeev} Manish={Manish} SunilKumar={SunilKumar} />} />
          <Route path="/Teacherdashboard/upload/:postparam/:semester" element={<Upload teacher={teacher} NitishaAgg={NitishaAgg} UnmeshShukla={UnmeshShukla} MKDas={MKDas} Sanjeev={Sanjeev} Manish={Manish} SunilKumar={SunilKumar}/>} />
          <Route path="/Teacherdashboard/filters/:semester" element={<Filters teacher={teacher} NitishaAgg={NitishaAgg} UnmeshShukla={UnmeshShukla} MKDas={MKDas} Sanjeev={Sanjeev} Manish={Manish} SunilKumar={SunilKumar}/>} />
          <Route path="/Teacherdashboard/submissions" element={<SubmittedAssignments assid={assid} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;