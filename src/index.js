import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import App from './App';
import Contact from './pages/Contact';
import About from './pages/About';
import Home from './pages/Home';
// import reportWebVitals from './reportWebVitals';

import { createRoot } from 'react-dom/client'


const container = document.getElementById('root')
const root = createRoot(container)

root.render(  
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App/>}>
          <Route path='' element={<Home/>}/>
          <Route path='contact' element={<Contact/>}/>
          <Route path='about' element={<About/>}/>
          <Route path='*' element={<p>404 NOT A PAGE</p>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
