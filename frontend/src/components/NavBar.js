// src/components/NavBar.js
import React from 'react';
import { Link } from 'react-router-dom';

function NavBar({ token, onLogout }) {
  return (
    <nav>
      {token ? (
        <>
          <Link to="/profile">Profile</Link>
          <button onClick={onLogout}>Logout</button>
        </>
      ) : (
        <>
          <Link to="/login">Login</Link>{' '}
          <Link to="/register">Register</Link>
        </>
      )}
    </nav>
  );
}

export default NavBar;
