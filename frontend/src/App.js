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
import Student_Dashboard from './components/Student_dashboard/student_dashboard';
import Student_Profile from './components/Student_dashboard/Student_profile'
import ChangeStudentPassword from './components/Student_dashboard/change_student_password';
import Teacher_Dashboard from './components/Teacher_dashboard/Teacher_dashboard';
import Teacher_Profile from './components/Teacher_dashboard/Teacher_profile'
import ChangeTeacherPassword from './components/Teacher_dashboard/change_teacher_password';
import Sem1_Student from './components/Student_dashboard/sem1';
import Report_Teacher from './components/schedule_report/teacher/schedulereportTeacher';
import Schedulereport from './components/schedule_report/schedulereport';
import Classreport_semester from './components/schedule_report/Classreport_semester';
import Testreport_semester from './components/schedule_report/Testreport_semester';
import Assignmentreport_semester from './components/Assignment_report/semesterwise/Assignmentreport_semester';
import Attendancereport_student from './components/Attendance Report/attendancestudent';
import Assignmentreport_student from './components/Assignment_report/assignmentreport_student';
import Assignmentreport_teacher from './components/Assignment_report/teacher_assignment_report';
import Studymaterial_teacher from './components/Study Material/teacher_studymaterial';
import Studymaterial_student from './components/Study Material/semesterwise/studymaterial_semester';
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
import Loader from './components/Loader/Loader';

function App() {

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
  const [success, setsuccess] = useState(false)
  const [render,setrender]=useState("")
  console.log("app.js")
   async function populate(e) {
    console.log("function called")
    const req = await fetch(`https://isd-production.up.railway.app/teacherverify`, {
      headers: {
        'x-access-token': localStorage.getItem('token'), //
      },
    })
    const data = await req.json();
    if (data.status === 'ok') {
      setsuccess(true)
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
  console.log(name)
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

  }, [],[render])
  console.log()
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
  const [visible, setVisible] = useState(false)
  // const navigate = useNavigate();
  const [stuname, setStuName] = useState([])
  const [stuemail, setStuEmail] = useState([])
  const [rollNum, setRollNum] = useState([])
  const [stucontactNum, setStuContactNum] = useState([])
  const [enrollNum, setEnrollNum] = useState([])


  async function populatedashboard() {
    console.log("inside function")
      const req = await fetch('https://isd-production.up.railway.app/dashboard', {
          headers: {
              'x-access-token': localStorage.getItem('token'),

          },
      })

      const json = await req.json()

      // console.log(json)
      if (json.status === 'ok') {
          setVisible(true)
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
}, [stuname], [stuemail])

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' exact element={<Homepage />} />
          <Route path = '/admin' element = {<Admin />} />
          <Route path = '/registerTeacher' element = {<Register_teacher />} />
          <Route path = '/registerStudent' element = {<Register_student />} />
          <Route path = '/registerAllStudent' element = {<Register_Mul_student />} />
          <Route path='/login' element={<Login />} />
          <Route path='/login2' element={<Login2 />} />
          <Route path='/loginteacher' element={<LoginTeacher setrender={setrender} />} />
          <Route path='/dashboard' element={<Student_Dashboard visible={visible} assignment_submitted={assignment_submitted} totalclassesheld={totalclassesheld} totalClasstakenStudent={totalClasstakenStudent} totalClassScheduledStudent={totalClassScheduledStudent} totalTestScheduledStudent={totalTestScheduledStudent} assignments={assignments}/>} />
          <Route path='/dashboard/profile' element={<Student_Profile visible={visible} stucontactNum={stucontactNum} rollNum={rollNum} enrollNum={enrollNum} stuemail={stuemail} stuname={stuname}/>}/>
          <Route path="/dashboard/changepassword" element={<ChangeStudentPassword />} />
          <Route path='/Studentdashboard/sem1' element={<Sem1_Student />} />
          <Route path="/:schrparam" element={<Schedulereport />} />

          <Route path='/assignmentreportstudent' element={<Assignmentreport_student />} />
          <Route path='/Teacherdashboard/assignmentreportteacher' element={<Assignmentreport_teacher setassid={setassid} />} />
          <Route path='/Teacherdashboard' element={<Teacher_Dashboard success={success} totalClasstaken={totalClasstaken} totalClassScheduled={totalClassScheduled} totalTestScheduled={totalTestScheduled} totalAssignments={totalAssignments} totalStudymaterial={totalStudymaterial}/>} />
          <Route path='/Teacherdashboard/profile' element={<Teacher_Profile success={success} name={name} email={email} contact={contact} teacher_id={teacher_id}/>} />
          <Route path="/Teacherdashboard/changepassword" element={<ChangeTeacherPassword />} />
          <Route path='Teacherdashboard/report/:teachschparam' element={<Report_Teacher />} />
          <Route path='/scheduledclass' element={<Classreport_semester />} />
          <Route path='/scheduledtests' element={<Testreport_semester />} />
          <Route path='/assignments' element={<Assignmentreport_semester />} />
          <Route path='/studymaterial' element={<Studymaterial_student />} />
          <Route path='/attendancereport' element={<Attendancereport_student />} />
          <Route path='/Teacherdashboard/studymaterial' element={<Studymaterial_teacher />} />
          {/* <Route path='/Notifications' element={<Notifications />} /> */}
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
          <Route path="/loader" element={<Loader />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;