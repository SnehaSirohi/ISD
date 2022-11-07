import React, { useState } from 'react';
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import Login from './components/login/login';
import Homepage from './components/homepage/homepage'
import Attendance from './components/Attendance list/Attendance';
import Schedule from './components/class schedule/Schedule';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
      <Route path='/' exact element = {<Homepage/>} />
      <Route path='/login' element = {<Login/>} />
      <Route path='/attendance' element = {<Attendance/>} />
      <Route path='/schedule' element ={<Schedule/>}/>
    </Routes>        
      </BrowserRouter>
    </div>
  );
}

export default App;
