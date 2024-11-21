import './App.css';
import { Main } from 'pages/main/Main';
import { Header } from 'components/header/Header';
import { Navbar } from 'components/navbar/Navbar';
import { Slider } from 'components/slider/Slider';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Cars } from 'pages/cars/Cars';
import { Rules } from 'pages/rules/Rules';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Navbar />
        <Slider />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/cars" element={<Cars />} />
          <Route path="/rules" element={<Rules />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
