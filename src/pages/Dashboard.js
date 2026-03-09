import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Dashboard.css";

const CLASSES = [
  { name: "Yoga Flow", time: "7:00 AM", trainer: "Priya" },
  { name: "HIIT Blast", time: "9:00 AM", trainer: "Rajan" },
  { name: "Zumba", time: "11:00 AM", trainer: "Meera" },
  { name: "Strength", time: "1:00 PM", trainer: "Arjun" },
  { name: "Pilates", time: "4:00 PM", trainer: "Sneha" },
  { name: "Boxing", time: "6:00 PM", trainer: "Vikram" },
  { name: "Cycling", time: "7:30 PM", trainer: "Nisha" },
  { name: "Stretching", time: "9:00 PM", trainer: "Dev" },
];

const ACTIVITY = [
  { icon: "🏋️", title: "New member joined", sub: "Rahul Sharma registered", time: "2m ago" },
  { icon: "📅", title: "Class scheduled", sub: "HIIT Blast — 9:00 AM", time: "18m ago" },
  { icon: "💳", title: "Payment received", sub: "₹3,500 from Ananya K.", time: "1h ago" },
  { icon: "⚠️", title: "Membership expiring", sub: "5 members expire this week", time: "3h ago" },
];

function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (!stored) {
      navigate("/");
      return;
    }
    setUser(JSON.parse(stored));
  }, [navigate]);

  const greet = () => {
    const h = new Date().getHours();
    if (h < 12) return "Good morning";
    if (h < 17) return "Good afternoon";
    return "Good evening";
  };

  return (
    <div className="dashboard-page">

      <div className="dashboard-body">
        <div className="dashboard-header">
          <div className="dashboard-greeting">{greet()}</div>
          <div className="dashboard-title">
            Welcome, <span>{user?.username || "Admin"}</span>
          </div>
        </div>

        {/* Stat cards */}
        <div className="dashboard-cards">
          <div className="dash-card" style={{ "--card-accent": "#5b4fcf" }}>
            <div className="dash-card-header">
              <span className="dash-card-label">Active Members</span>
              <div className="dash-card-icon">👥</div>
            </div>
            <div className="dash-card-value">120</div>
            <div className="dash-card-change">↑ 12 this month</div>
          </div>

          <div className="dash-card" style={{ "--card-accent": "#ff6b35" }}>
            <div className="dash-card-header">
              <span className="dash-card-label">Classes Today</span>
              <div className="dash-card-icon">📅</div>
            </div>
            <div className="dash-card-value">8</div>
            <div className="dash-card-change">↑ 2 more than yesterday</div>
          </div>

          <div className="dash-card" style={{ "--card-accent": "#27ae60" }}>
            <div className="dash-card-header">
              <span className="dash-card-label">Revenue</span>
              <div className="dash-card-icon">💰</div>
            </div>
            <div className="dash-card-value">₹45K</div>
            <div className="dash-card-change">↑ 8% vs last month</div>
          </div>

          <div className="dash-card" style={{ "--card-accent": "#e74c3c" }}>
            <div className="dash-card-header">
              <span className="dash-card-label">Expiring Soon</span>
              <div className="dash-card-icon">⚠️</div>
            </div>
            <div className="dash-card-value">5</div>
            <div className="dash-card-change" style={{ color: "#e74c3c" }}>
              Members this week
            </div>
          </div>
        </div>

        {/* Two column layout */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
          {/* Recent Activity */}
          <div className="dashboard-section">
            <h3>Recent Activity</h3>
            <div className="activity-list">
              {ACTIVITY.map((a, i) => (
                <div className="activity-item" key={i}>
                  <div className="activity-icon">{a.icon}</div>
                  <div className="activity-text">
                    <div className="activity-title">{a.title}</div>
                    <div className="activity-sub">{a.sub}</div>
                  </div>
                  <div className="activity-time">{a.time}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Today's Classes */}
          <div className="dashboard-section">
            <h3>Today's Classes</h3>
            <div className="classes-grid">
              {CLASSES.map((c, i) => (
                <div className="class-item" key={i}>
                  <div className="class-name">{c.name}</div>
                  <div className="class-time">🕐 {c.time} · {c.trainer}</div>
                  <span className="class-badge">Scheduled</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;