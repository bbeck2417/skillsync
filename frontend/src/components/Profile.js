// src/components/Profile.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Profile({ token, onLogout }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/auth/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data);
      } catch (err) {
        console.error('Profile error:', err.response?.data || err.message);
      }
    };
    if (token) fetchProfile();
  }, [token]);

  return (
    <div>
      <h2>Profile</h2>
      {user ? (
        <>
          <p><strong>Username:</strong> {user.username}</p>
          <p><strong>Email:</strong> {user.email}</p>
        </>
      ) : (
        <p>Loading...</p>
      )}
      <button onClick={onLogout}>Logout</button>
    </div>
  );
}

export default Profile;
