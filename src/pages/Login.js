import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";

function LoginPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");
    const stored = localStorage.getItem("user");
    const user = stored ? JSON.parse(stored) : null;
    if (user && user.username === username && user.password === password) {
      navigate("/home");
    } else {
      setError("Invalid username or password. Please try again.");
    }
  };

  return (
    <div className="login-page">
      {/* Hero Panel */}
      <div className="login-hero">
        <div className="hero-brand">Gym<span>Flow</span></div>
        <p className="hero-tagline">
          Manage your gym smarter. Track members, classes, and revenue — all in one place.
        </p>
        <div className="hero-stats">
          <div className="hero-stat">
            <div className="hero-stat-number">120+</div>
            <div className="hero-stat-label">Members</div>
          </div>
          <div className="hero-stat">
            <div className="hero-stat-number">8</div>
            <div className="hero-stat-label">Classes/day</div>
          </div>
          <div className="hero-stat">
            <div className="hero-stat-number">₹45K</div>
            <div className="hero-stat-label">Revenue</div>
          </div>
        </div>
      </div>

      {/* Form Panel */}
      <div className="login-form-panel">
        <div className="login-form-inner">
          <h2>Welcome back</h2>
          <p className="login-subtitle">Sign in to your GymFlow account</p>

          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                id="username"
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {error && <p className="form-error">{error}</p>}

            <button type="submit" className="btn-primary">Sign In</button>
          </form>

          <div className="login-footer">
            Don't have an account?
            <button className="btn-link" onClick={() => navigate("/register")}>
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;