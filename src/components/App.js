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
        <Route path="/" element={<Home />} />
        <Route path="/play/:levelKey" element={<Game />} />
        <Route path="/result/:sessionKey" element={<Result />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;