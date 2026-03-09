import React, { useState } from "react";
import "../styles/Pages.css";

// ── 6 Trainers mock data (FR-02 — Trainer entity)
// Replace with: HttpService.get("/api/member/trainers")
const TRAINERS = [
  {
    id: 1,
    name: "Rahul Sharma",
    initials: "RS",
    specialty: "Bodybuilding",
    experience: "5 Years",
    bio: "Certified bodybuilding coach. Specialises in muscle gain and competition prep.",
    available: true,
    color: "#4f46e5",
  },
  {
    id: 2,
    name: "Priya Reddy",
    initials: "PR",
    specialty: "Yoga",
    experience: "4 Years",
    bio: "500-hour certified yoga instructor focused on flexibility and mindfulness.",
    available: true,
    color: "#0891b2",
  },
  {
    id: 3,
    name: "Arjun Kumar",
    initials: "AK",
    specialty: "CrossFit",
    experience: "6 Years",
    bio: "CrossFit Level 2 coach. Expert in functional movement and Olympic lifting.",
    available: true,
    color: "#16a34a",
  },
  {
    id: 4,
    name: "Sneha Patel",
    initials: "SP",
    specialty: "Weight Loss",
    experience: "3 Years",
    bio: "Nutrition & cardio specialist. Helped 100+ clients reach their weight goals.",
    available: false,
    color: "#ca8a04",
  },
  {
    id: 5,
    name: "Vikram Singh",
    initials: "VS",
    specialty: "Strength Training",
    experience: "7 Years",
    bio: "Powerlifting coach with national-level competition experience.",
    available: true,
    color: "#dc2626",
  },
  {
    id: 6,
    name: "Anita Das",
    initials: "AD",
    specialty: "Cardio Fitness",
    experience: "4 Years",
    bio: "HIIT and cardio expert. Focuses on endurance, fat loss, and heart health.",
    available: true,
    color: "#7c3aed",
  },
];

const SPECIALTIES = ["All", "Bodybuilding", "Yoga", "CrossFit", "Weight Loss", "Strength Training", "Cardio Fitness"];

// ==============================================
// TrainerListPage — FR-02
// Props: memberId (from AuthService)
// ==============================================
function TrainerListPage({ memberId = "1001" }) {
  const [filter,      setFilter]      = useState("All");
  const [requested,   setRequested]   = useState([]);
  const [showToast,   setShowToast]   = useState(false);
  const [toastMsg,    setToastMsg]    = useState("");

  const toast = (msg) => {
    setToastMsg(msg);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  // mirrors POST /api/admin/assign-trainer (sends request to admin)
  const handleRequest = (trainer) => {
    setRequested((prev) => [...prev, trainer.id]);
    toast(`Request sent for ${trainer.name}!`);
  };

  const filtered = filter === "All"
    ? TRAINERS
    : TRAINERS.filter((t) => t.specialty === filter);

  return (
    <div className="container">

      <h1>Available Trainers</h1>
      <p className="page-subtitle">Browse certified trainers and send a request to your admin for assignment.</p>

      {/* Filter bar */}
      <div className="filter-bar">
        {SPECIALTIES.map((s) => (
          <button
            key={s}
            className={`filter-chip ${filter === s ? "active" : ""}`}
            onClick={() => setFilter(s)}
          >
            {s}
          </button>
        ))}
      </div>

      {/* Trainer cards */}
      <div className="trainer-grid">
        {filtered.map((trainer) => {
          const isRequested = requested.includes(trainer.id);

          return (
            <div key={trainer.id} className={`trainer-card ${trainer.available ? "" : "unavailable"}`}>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div className="trainer-avatar" style={{ background: trainer.color }}>
                  {trainer.initials}
                </div>
                <span className={`badge ${trainer.available ? "badge-green" : "badge-red"}`}>
                  {trainer.available ? "● Available" : "○ Unavailable"}
                </span>
              </div>

              <div className="trainer-name">{trainer.name}</div>
              <div className="trainer-spec">{trainer.specialty}</div>

              <p style={{ fontSize: "13px", color: "#6b7280", marginBottom: "12px", lineHeight: "1.6" }}>
                {trainer.bio}
              </p>

              <div className="trainer-meta">
                <span>⏱ {trainer.experience}</span>
              </div>

              <div style={{ display: "flex", gap: "10px" }}>
                <button
                  className="btn btn-primary btn-sm"
                  style={{ flex: 1 }}
                  onClick={() => handleRequest(trainer)}
                  disabled={!trainer.available || isRequested}
                >
                  {isRequested ? "✓ Requested" : trainer.available ? "Request Trainer" : "Unavailable"}
                </button>
              </div>

            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div style={{ textAlign: "center", padding: "60px 20px", color: "#9ca3af" }}>
          <div style={{ fontSize: "40px", marginBottom: "12px" }}>🔍</div>
          <p>No trainers found for this specialty.</p>
        </div>
      )}

      {/* Toast */}
      {showToast && (
        <div className="toast">
          <div className="toast-dot"></div>
          {toastMsg}
        </div>
      )}

    </div>
  );
}

export default TrainerListPage;
