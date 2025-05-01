// src/components/Register.js
import React, { useState } from 'react';
import axios from 'axios';

function Register({ onRegister }) {
  const [form, setForm] = useState({ username: '', email: '', password: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/auth/register', form);
      onRegister(); // Switch to login view after registration
    } catch (err) {
      console.error('Registration error:', err.response?.data || err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Register</h2>
      <input name="username" placeholder="Username" value={form.username} onChange={handleChange} required /><br />
      <input name="email" placeholder="Email" value={form.email} onChange={handleChange} required /><br />
      <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} required /><br />
      <button type="submit">Register</button>
    </form>
  );
}

export default Register;
