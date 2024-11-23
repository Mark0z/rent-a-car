import './App.css';
import { Main } from 'pages/main/Main';
import { Header } from 'components/header/Header';
import { Navbar } from 'components/navbar/Navbar';
import { Slider } from 'components/slider/Slider';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Rules } from 'pages/rules/Rules';
import { Contact } from 'pages/contact/Contact';
import { Footer } from 'components/footer/Footer';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Navbar />
        <Slider />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/rules" element={<Rules />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
