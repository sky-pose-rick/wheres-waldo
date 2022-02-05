import React from 'react';
import './App.css';

import {
  BrowserRouter, Route, Routes,
} from 'react-router-dom';

import Game from './Game';
import Result from './Result';
import Home from './Home';
import NavBar from './NavBar';

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/wheres-waldo" element={<Home />} />
        <Route path="/wheres-waldo/play/:levelKey" element={<Game />} />
        <Route path="/wheres-waldo/result/:sessionKey" element={<Result />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
