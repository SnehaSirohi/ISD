import React, { useEffect } from 'react';
import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './components/login/login';
import LoginTeacher from './components/loginteacher/loginteacher';
import Homepage from './components/homepage/homepage'
import AttendanceSem1 from './components/Attendance list/Sem_1';
import AttendanceSem2 from './components/Attendance list/Sem_2';
import AttendanceSem3 from './components/Attendance list/Sem_3';
import AttendanceSem4 from './components/Attendance list/Sem_4';
import ClassScheduleSem1 from './components/Class Schedule/Sem_1.'
import ClassScheduleSem2 from './components/Class Schedule/Sem_2'
import ClassScheduleSem3 from './components/Class Schedule/Sem_3'
import ClassScheduleSem4 from './components/Class Schedule/Sem_4'
import TestscheduleSem1 from './components/Test Schedule/Sem_1';
import TestscheduleSem2 from './components/Test Schedule/Sem_2';
import TestscheduleSem3 from './components/Test Schedule/Sem_3';
import TestscheduleSem4 from './components/Test Schedule/Sem_4';
import Student_Dashboard from './components/Student_dashboard/student_dashboard';
import Student_Profile from './components/Student_dashboard/Student_profile'
import ChangeStudentPassword from './components/Student_dashboard/change_student_password';
import Teacher_Dashboard from './components/Teacher_dashboard/Teacher_dashboard';
import Teacher_Profile from './components/Teacher_dashboard/Teacher_profile'
import ChangeTeacherPassword from './components/Teacher_dashboard/change_teacher_password';
import Sem1 from './components/Teacher_dashboard/sem1';
import Sem2 from './components/Teacher_dashboard/sem2';
import Sem3 from './components/Teacher_dashboard/sem3';
import Sem4 from './components/Teacher_dashboard/sem4';
import Sem1Attendance from './components/Attendance Report/Sem1Attendance';
import Sem2Attendance from './components/Attendance Report/Sem2Attendance';
import Sem3Attendance from './components/Attendance Report/Sem3Attendance';
import Sem4Attendance from './components/Attendance Report/Sem4Attendance';
import Sem1filters from './components/Filters/Sem1filters';
import Sem2filters from './components/Filters/Sem2filters';
import Sem3filters from './components/Filters/Sem3filters';
import Sem4filters from './components/Filters/Sem4filters';
import Random from './components/random api/Random';
import Classreport from './components/Scheduled_Class_List/scheduleclassreport';
import Testreport from './components/Scheduled_test_List/scheduletestreport';

function App() {
  const[subjectval,setsubjectval]=useState("")
  const[dateval,setdateval]=useState("")
  const[monthval,setmonthval]=useState("")


  useEffect(() => {

    window.process = {
      ...window.process,
    };
  }, []);
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
      <Route path='/' exact element = {<Homepage/>} />
      <Route path='/login' element = {<Login/>} />
      <Route path='/loginteacher' element = {<LoginTeacher/>} />
      <Route path='/dashboard' element = {<Student_Dashboard/>} />
      <Route path='/dashboard/profile' element = {<Student_Profile/>} />
      <Route path="/dashboard/changepassword" element={<ChangeStudentPassword/>}/>
      <Route path='/Teacherdashboard' element = {<Teacher_Dashboard/>} />
      <Route path='/Teacherdashboard/profile' element = {<Teacher_Profile/>} />
      <Route path="/Teacherdashboard/changepassword" element={<ChangeTeacherPassword/>}/>
      <Route path='/attendance/sem1' element = {<AttendanceSem1/>} />
      <Route path='/attendance/sem2' element = {<AttendanceSem2/>} />
      <Route path='/attendance/sem3' element = {<AttendanceSem3/>} />
      <Route path='/attendance/sem4' element = {<AttendanceSem4/>} />
      <Route path='/Teacherdashboard/sem1' element={<Sem1/>} />
      <Route path='/Teacherdashboard/sem2' element={<Sem2/>} />
      <Route path='/Teacherdashboard/sem3' element={<Sem3/>} />
      <Route path='/Teacherdashboard/sem4' element={<Sem4/>} />
      <Route path='/classschedule/sem1' element ={<ClassScheduleSem1/>}/>
      <Route path='/classschedule/sem2' element ={<ClassScheduleSem2/>}/>
      <Route path='/classschedule/sem3' element ={<ClassScheduleSem3/>}/>
      <Route path='/classschedule/sem4' element ={<ClassScheduleSem4/>}/>
      <Route path="/testschedule/sem1" element={<TestscheduleSem1/>}/>
      <Route path="/testschedule/sem2" element={<TestscheduleSem2/>}/>
      <Route path="/testschedule/sem3" element={<TestscheduleSem3/>}/>
      <Route path="/testschedule/sem4" element={<TestscheduleSem4/>}/>
      <Route path="/attendancereport/sem1" element={<Sem1Attendance subjectval={subjectval} dateval={dateval} monthval={monthval}/>}/>
      <Route path='/scheduledclassreport' element={<Classreport/>}/>
      <Route path='/scheduledtestreport' element={<Testreport/>}/>
      <Route path="/filters/sem1" element={<Sem1filters subjectval={subjectval} setsubjectval={setsubjectval} dateval={dateval} setdateval={setdateval} monthval={monthval} setmonthval={setmonthval} />}/>
      <Route path="/attendancereport/sem2" element={<Sem2Attendance subjectval={subjectval} dateval={dateval} monthval={monthval}/>}/>
      <Route path="/filters/sem2" element={<Sem2filters subjectval={subjectval} setsubjectval={setsubjectval} dateval={dateval} setdateval={setdateval} monthval={monthval} setmonthval={setmonthval} />}/>
      <Route path="/attendancereport/sem3" element={<Sem3Attendance subjectval={subjectval} dateval={dateval} monthval={monthval}/>}/>
      <Route path="/filters/sem3" element={<Sem3filters subjectval={subjectval} setsubjectval={setsubjectval} dateval={dateval} setdateval={setdateval} monthval={monthval} setmonthval={setmonthval} />}/>
      <Route path="/attendancereport/sem4" element={<Sem4Attendance subjectval={subjectval} dateval={dateval} monthval={monthval}/>}/>
      <Route path="/filters/sem4" element={<Sem4filters subjectval={subjectval} setsubjectval={setsubjectval} dateval={dateval} setdateval={setdateval} monthval={monthval} setmonthval={setmonthval} />}/>
      <Route path="/random" element={<Random/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
