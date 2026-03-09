import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Register.css";

function RegisterPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("");
  const [error, setError] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();
    setError("");
    if (!role) {
      setError("Please select a role.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    const user = { username, password, role };
    localStorage.setItem("user", JSON.stringify(user));
    navigate("/");
  };

  return (
    <div className="register-page">
      <div className="register-card">
        <div className="register-brand">Gym<span>Flow</span></div>
        <h2>Create your account</h2>
        <p className="register-subtitle">Join GymFlow and start managing your gym today.</p>

        <form onSubmit={handleRegister}>
          <div className="rform-group">
            <label htmlFor="reg-username">Username</label>
            <input
              id="reg-username"
              type="text"
              placeholder="Choose a username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="rform-group">
            <label htmlFor="reg-password">Password</label>
            <input
              id="reg-password"
              type="password"
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="rform-group">
            <label htmlFor="reg-confirm">Confirm Password</label>
            <input
              id="reg-confirm"
              type="password"
              placeholder="Repeat your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <div className="rform-group">
            <label htmlFor="reg-role">Role</label>
            <div className="select-wrapper">
              <select
                id="reg-role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="">Select a role</option>
                <option value="admin">Admin</option>
                <option value="trainer">Trainer</option>
                <option value="member">Member</option>
              </select>
            </div>
          </div>

          {error && <p className="form-error">{error}</p>}

          <button type="submit" className="btn-register">Create Account</button>
        </form>

        <div className="register-footer">
          Already have an account?
          <button className="btn-link" onClick={() => navigate("/")}>
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;