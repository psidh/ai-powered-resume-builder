import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Auth.css";

function Register() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    console.log("User Registered:", formData);
  };

  return (
    <div className="auth-container">
      <h2 className="auth-title">Sign Up</h2>
      <form className="auth-form" onSubmit={handleRegister}>
        <label className="auth-label">Username</label>
        <input
          type="text"
          name="username"
          placeholder="Enter your username"
          className="auth-input"
          value={formData.username}
          onChange={handleChange}
          required
        />

        <label className="auth-label">Email</label>
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          className="auth-input"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <label className="auth-label">Password</label>
        <input
          type="password"
          name="password"
          placeholder="Enter your password"
          className="auth-input"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <button type="submit" className="auth-button">Sign Up</button>
      </form>

      <p className="auth-text">
        Already have an account? <Link to="/login" className="auth-link">Login</Link>
      </p>
    </div>
  );
}

export default Register;
