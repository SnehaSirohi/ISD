import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import Login from './components/login/login';
import LoginTeacher from './components/loginteacher/loginteacher';
import Homepage from './components/homepage/homepage'
import Attendance from './components/Attendance list/Attendance';
import ClassSchedule from './components/schedule/ClassSchedule';
import Testschedule from './components/schedule/Testschedule';
import  Dashboard from './components/dashboard/dashboard';
import Profile from './components/dashboard/profile'
import ChangePassword from './components/dashboard/changepassword';

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
      <Route path='/attendance' element = {<Attendance/>} />
      <Route path='/classschedule' element ={<ClassSchedule/>}/>
      <Route path="/testschedule" element={<Testschedule/>}/>
    </Routes>        
      </BrowserRouter>
    </div>
  );
}

export default App;
