import React, { useState } from 'react';
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import Login from './components/login/login';
import Homepage from './components/homepage/homepage'
import Attendance from './components/Attendance list/Attendance';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
      <Route path='/' exact element = {<Homepage/>} />
      <Route path='/login' element = {<Login/>} />
      <Route path='/attendance' element = {<Attendance/>} />
    </Routes>        
      </BrowserRouter>
    </div>
  );
}

export default App;
