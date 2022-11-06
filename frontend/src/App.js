import React, { useState } from 'react';
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import Login from './components/login/login';
import Homepage from './components/homepage/homepage'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
      <Route path='/' exact element = {<Homepage/>} />
      <Route path='/login' element = {<Login/>} />
    </Routes>        
      </BrowserRouter>
    </div>
  );
}

export default App;
