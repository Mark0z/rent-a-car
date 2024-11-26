import './App.css';
import { Main } from 'pages/main/Main';
import { Header } from 'components/header/Header';
import { Navbar } from 'components/navbar/Navbar';
import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Rules } from 'pages/rules/Rules';
import { Contact } from 'pages/contact/Contact';
import { Footer } from 'components/footer/Footer';
import { Cars } from 'pages/cars/Cars';
import { Auth } from 'pages/auth/Auth';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Navbar />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/cars" element={<Cars />} />
          <Route path="/rules" element={<Rules />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
