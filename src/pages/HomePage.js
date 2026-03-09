import React from "react";
import { Link } from "react-router-dom";
import "../styles/HomePage.css";

function HomePage() {
  return (
    <div className="home-page">

      <section className="home-hero">
        <span className="home-hero-eyebrow">Gym Management Platform</span>
        <h1>
          Manage Your Gym<br />
          <span>The Smart Way</span>
        </h1>
        <p>
          GymFlow helps you track members, schedule classes, and monitor revenue —
          all from one clean, powerful dashboard.
        </p>
        <div className="home-hero-actions">
          <Link to="/dashboard" className="btn-hero-primary">Go to Dashboard</Link>
          <Link to="/register" className="btn-hero-secondary">Invite a Member</Link>
        </div>
      </section>

      <div className="home-stats">
        <div className="home-stat-card">
          <div className="home-stat-icon">🏋️</div>
          <div className="home-stat-number">120</div>
          <div className="home-stat-label">Active Members</div>
        </div>
        <div className="home-stat-card">
          <div className="home-stat-icon">📅</div>
          <div className="home-stat-number">8</div>
          <div className="home-stat-label">Classes Today</div>
        </div>
        <div className="home-stat-card">
          <div className="home-stat-icon">💰</div>
          <div className="home-stat-number">₹45K</div>
          <div className="home-stat-label">Monthly Revenue</div>
        </div>
      </div>

      <section className="home-features">
        <h2 className="home-features-title">Everything you need to run your gym</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">👥</div>
            <h3>Member Management</h3>
            <p>Track sign-ups, renewals, and member activity in real time.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🗓️</div>
            <h3>Class Scheduling</h3>
            <p>Plan daily and weekly classes with automatic slot management.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3>Revenue Reports</h3>
            <p>Get clear financial insights with monthly and weekly breakdowns.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🔐</div>
            <h3>Role-Based Access</h3>
            <p>Separate views for admins, trainers, and members.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;