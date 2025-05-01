// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/Profile';
import AddProject from './components/AddProject';
import Portfolio from './components/Portfolio';







function App() {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    if (savedToken) setToken(savedToken);
  }, []);

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem('token');
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route path="/register" element={<Register onRegister={() => { window.location.href = '/login'; }} />} />
        <Route
          path="/profile"
          element={
            token ? (
              <Profile token={token} onLogout={handleLogout} />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route path="/portfolio" element={<ProtectedRoute><AddProject token={token} /></ProtectedRoute>} />
        <Route path="/portfolio" element={<ProtectedRoute><Portfolio token={token} /></ProtectedRoute>} />
        <Route path="*" element={<Navigate to={token ? "/profile" : "/login"} />} />
      </Routes>
    </Router>
  );
}

export default App;
