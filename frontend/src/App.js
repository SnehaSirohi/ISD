import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route} from 'react-router-dom'
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
import  Dashboard from './components/dashboard/dashboard';
import Profile from './components/dashboard/profile'
import ChangePassword from './components/dashboard/changepassword';
import Att_rep from './components/Attendance Report/Att_rep';

function App() {
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
      <Route path='/dashboard' element = {<Dashboard/>} />
      <Route path='/dashboard/profile' element = {<Profile/>} />
      <Route path="/dashboard/changepassword" element={<ChangePassword/>}/>
      <Route path='/attendance/sem1' element = {<AttendanceSem1/>} />
      <Route path='/attendance/sem2' element = {<AttendanceSem2/>} />
      <Route path='/attendance/sem3' element = {<AttendanceSem3/>} />
      <Route path='/attendance/sem4' element = {<AttendanceSem4/>} />
      <Route path='/classschedule/sem1' element ={<ClassScheduleSem1/>}/>
      <Route path='/classschedule/sem2' element ={<ClassScheduleSem2/>}/>
      <Route path='/classschedule/sem3' element ={<ClassScheduleSem3/>}/>
      <Route path='/classschedule/sem4' element ={<ClassScheduleSem4/>}/>
      <Route path="/testschedule/sem1" element={<TestscheduleSem1/>}/>
      <Route path="/testschedule/sem2" element={<TestscheduleSem2/>}/>
      <Route path="/testschedule/sem3" element={<TestscheduleSem3/>}/>
      <Route path="/testschedule/sem4" element={<TestscheduleSem4/>}/>
      <Route path="/attreport" element={<Att_rep/>}/>
    </Routes>        
      </BrowserRouter>
    </div>
  );
}

export default App;
