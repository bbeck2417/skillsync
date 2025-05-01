// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';

function Navbar({ token, onLogout }) {
  return (
    <nav style={{ padding: '1rem', borderBottom: '1px solid #ccc' }}>
      {token ? (
        <>
          <Link to="/profile" style={{ marginRight: '1rem' }}>Profile</Link>
          <Link to="/portfolio" style={{ marginRight: '1rem' }}>Portfolio</Link>
          <Link to="/add-project" style={{ marginRight: '1rem' }}>Add Project</Link>
          <button onClick={onLogout}>Logout</button>
        </>
      ) : (
        <>
          <Link to="/login" style={{ marginRight: '1rem' }}>Login</Link>
          <Link to="/register">Register</Link>
        </>
      )}
    </nav>
  );
}

export default Navbar;
