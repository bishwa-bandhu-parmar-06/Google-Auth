import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import DashBoard from './pages/DashBoard';
import { ToastContainer } from 'react-toastify';  // Import ToastContainer

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<DashBoard />} />
      </Routes>

      {/* Toast Container */}
      <ToastContainer />
    </BrowserRouter>
  );
};

export default App;
