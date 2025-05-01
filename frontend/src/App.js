import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/Profile';
import AddProject from './components/AddProject';
import Portfolio from './components/Portfolio';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import axios from 'axios'; // Import axios to fetch projects

function App() {
  const [token, setToken] = useState(null);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    if (savedToken) setToken(savedToken);
  }, []);

  // Fetch projects when token is available
  useEffect(() => {
    if (token) {
      const fetchProjects = async () => {
        try {
          const res = await axios.get('http://localhost:5000/api/projects', {
            headers: { Authorization: `Bearer ${token}` },
          });
          setProjects(res.data);
        } catch (err) {
          console.error('Error fetching projects:', err);
        }
      };

      fetchProjects();
    }
  }, [token]);

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem('token');
  };

  const handleAddProject = (newProject) => {
    setProjects([newProject, ...projects]);  // Add the new project to the list
  };

  return (
    <Router>
      <Navbar token={token} onLogout={handleLogout} />
      <Routes>
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route path="/register" element={<Register onRegister={() => { window.location.href = '/login'; }} />} />
        <Route
          path="/profile"
          element={token ? <Profile token={token} onLogout={handleLogout} /> : <Navigate to="/login" />}
        />
        <Route
          path="/portfolio"
          element={
            token ? (
              <Portfolio token={token} projects={projects} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/add-project"
          element={
            token ? (
              <AddProject token={token} onProjectAdded={handleAddProject} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route path="*" element={<Navigate to={token ? "/profile" : "/login"} />} />
      </Routes>
    </Router>
  );
}

export default App;
