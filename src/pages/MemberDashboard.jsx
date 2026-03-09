import React, { useState } from "react";
import "../styles/Pages.css";

// ── 6 Members mock data (FR-01, FR-02)
// Replace with: HttpService.get(`/api/admin/members`)
const MEMBERS = [
  { id: 1, name: "Alex Johnson",  initials: "AJ", plan: "Premium",  trainer: "Marcus King",  joined: "Jan 2025", status: "active",   color: "#4f46e5" },
  { id: 2, name: "Priya Sharma",  initials: "PS", plan: "Standard", trainer: "Sarah Chen",   joined: "Feb 2025", status: "active",   color: "#0891b2" },
  { id: 3, name: "Rahul Mehta",   initials: "RM", plan: "Basic",    trainer: "Not Assigned", joined: "Mar 2025", status: "active",   color: "#dc2626" },
  { id: 4, name: "Kavya Reddy",   initials: "KR", plan: "Premium",  trainer: "James Okafor", joined: "Mar 2025", status: "active",   color: "#16a34a" },
  { id: 5, name: "Arjun Singh",   initials: "AS", plan: "Standard", trainer: "Priya Nair",   joined: "Apr 2025", status: "inactive", color: "#ca8a04" },
  { id: 6, name: "Divya Lakshmi", initials: "DL", plan: "Basic",    trainer: "Sarah Chen",   joined: "Apr 2025", status: "active",   color: "#7c3aed" },
];

// ── Upcoming classes mock data (FR-04)
const CLASSES = [
  { time: "TODAY · 6PM", name: "HIIT Burn Circuit",   trainer: "Sarah Chen",  seats: "4 seats left",  badge: "badge-orange" },
  { time: "THU · 7AM",   name: "Morning Yoga Flow",   trainer: "Priya Nair",  seats: "12 seats left", badge: "badge-green"  },
  { time: "SAT · 9AM",   name: "Power Lifting Intro", trainer: "Marcus King", seats: "Booked ✓",      badge: "badge-blue"   },
];

// ── Plan badge color mapping
function planBadge(plan) {
  if (plan === "Premium")  return "badge badge-purple";
  if (plan === "Standard") return "badge badge-blue";
  return "badge badge-gray";
}

// ==============================================
// MemberDashboard Component
// FR-01 (subscription), FR-02 (trainer)
// Props: memberId — from AuthService
// ==============================================
function MemberDashboard({ memberId = "1001" }) {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="page-card">

      {/* ── Header ── */}
      <h2>Dashboard</h2>
      <p className="page-subtitle">Welcome back, Alex! Here's your fitness overview.</p>

      {/* ── Stat boxes ── */}
      <div className="grid">
        <div className="box">
          <h3>Active Subscription</h3>
          <div className="box-value">Premium</div>
          <div className="box-sub">42 days remaining</div>
        </div>
        <div className="box">
          <h3>Assigned Trainer</h3>
          <div className="box-value">Marcus King</div>
          <div className="box-sub">Strength & Conditioning</div>
        </div>
        <div className="box">
          <h3>Upcoming Classes</h3>
          <div className="box-value">3</div>
          <div className="box-sub">Next: Today at 6 PM</div>
        </div>
        <div className="box">
          <h3>Workout Plans</h3>
          <div className="box-value">4</div>
          <div className="box-sub">2 updated this week</div>
        </div>
      </div>

      {/* ── Subscription status ── */}
      <div className="section-heading">
        <h2>My Subscription</h2>
      </div>
      <div className="sub-banner">
        <h3>Current Plan</h3>
        <h2>PREMIUM</h2>
        <p>₹4,500 · 6 months · Renews Aug 21, 2025</p>
        <div className="progress-info">
          <span>Plan usage</span>
          <span>58 / 100 days</span>
        </div>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: "58%" }}></div>
        </div>
      </div>

      {/* ── Upcoming classes ── */}
      <div className="section-heading">
        <h2>Upcoming Classes</h2>
        <span className="badge badge-blue">{CLASSES.length} Booked</span>
      </div>
      <div className="class-list">
        {CLASSES.map((cls, i) => (
          <div key={i} className="class-item">
            <div className="class-time">{cls.time}</div>
            <div className="class-info">
              <strong>{cls.name}</strong>
              <span>with {cls.trainer}</span>
            </div>
            <span className={`badge ${cls.badge}`}>{cls.seats}</span>
          </div>
        ))}
      </div>

      {/* ── Members overview (6 members) ── */}
      <div className="section-heading" style={{ marginTop: "40px" }}>
        <h2>Members Overview</h2>
        <span className="badge badge-gray">{MEMBERS.length} Records</span>
      </div>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Member</th>
              <th>Plan</th>
              <th>Trainer</th>
              <th>Joined</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {MEMBERS.map((m) => (
              <tr key={m.id}>
                <td>
                  <div className="member-cell">
                    <div className="member-avatar" style={{ background: m.color }}>
                      {m.initials}
                    </div>
                    <div>
                      <div className="member-name">{m.name}</div>
                      <div className="member-id">#{String(m.id).padStart(4, "0")}</div>
                    </div>
                  </div>
                </td>
                <td>
                  <span className={planBadge(m.plan)}>{m.plan}</span>
                </td>
                <td style={{ color: m.trainer === "Not Assigned" ? "#9ca3af" : "#374151" }}>
                  {m.trainer}
                </td>
                <td style={{ fontFamily: "monospace", fontSize: "12px", color: "#9ca3af" }}>
                  {m.joined}
                </td>
                <td>
                  <span className={`badge ${m.status === "active" ? "badge-green" : "badge-red"}`}>
                    {m.status === "active" ? "● Active" : "○ Inactive"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}

export default MemberDashboard;
