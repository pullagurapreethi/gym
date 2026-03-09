import React, { useState } from "react";
import "../styles/Pages.css";

// ── Plans mock data (FR-01 — MembershipPlan entity)
// Replace with: HttpService.get("/api/member/plans")
const PLANS = [
  {
    id: 1,
    name: "Basic",
    price: 1000,
    durationMonths: 1,
    featured: false,
    features: [
      { label: "Gym floor access",     included: true  },
      { label: "2 group classes/week", included: true  },
      { label: "Locker access",        included: true  },
      { label: "Personal trainer",     included: false },
      { label: "Nutrition guide",      included: false },
      { label: "Unlimited classes",    included: false },
    ],
  },
  {
    id: 2,
    name: "Standard",
    price: 2500,
    durationMonths: 3,
    featured: true,
    features: [
      { label: "Gym floor access",     included: true  },
      { label: "5 group classes/week", included: true  },
      { label: "Locker access",        included: true  },
      { label: "1 PT session/month",   included: true  },
      { label: "Nutrition guide",      included: false },
      { label: "Unlimited classes",    included: false },
    ],
  },
  {
    id: 3,
    name: "Premium",
    price: 4500,
    durationMonths: 6,
    featured: false,
    features: [
      { label: "Unlimited gym access", included: true },
      { label: "Unlimited classes",    included: true },
      { label: "Personal trainer",     included: true },
      { label: "Nutrition guide",      included: true },
      { label: "Priority booking",     included: true },
      { label: "Towel & sauna",        included: true },
    ],
  },
];

// ── Subscription history mock
const HISTORY = [
  { plan: "Basic",    price: 1000, months: 1, date: "Jan 2025", status: "expired" },
  { plan: "Standard", price: 2500, months: 3, date: "Feb 2025", status: "expired" },
  { plan: "Premium",  price: 4500, months: 6, date: "May 2025", status: "active"  },
];

// ==============================================
// SubscriptionPage — FR-01
// Props: memberId (from AuthService)
// ==============================================
function SubscriptionPage({ memberId = "1001" }) {
  const [activePlanId, setActivePlanId] = useState(3);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [subscribing,  setSubscribing]  = useState(false);
  const [showToast,    setShowToast]    = useState(false);
  const [toastMsg,     setToastMsg]     = useState("");

  const toast = (msg) => {
    setToastMsg(msg);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  // mirrors POST /api/member/subscribe?planId=&memberId=
  const handleSubscribe = () => {
    setSubscribing(true);
    setTimeout(() => {
      setActivePlanId(selectedPlan.id);
      setSelectedPlan(null);
      setSubscribing(false);
      toast(`Subscribed to ${selectedPlan.name} plan!`);
    }, 900);
  };

  return (
    <div className="container">

      <h1>Membership Plans</h1>
      <p className="page-subtitle">Choose the plan that fits your goals. Upgrade or change anytime.</p>

      {/* Plan Cards */}
      <div className="plan-grid">
        {PLANS.map((plan) => {
          const isActive = plan.id === activePlanId;
          return (
            <div key={plan.id} className={`plan-card ${plan.featured ? "featured" : ""} ${isActive ? "active-plan" : ""}`}>

              {plan.featured && <div className="plan-ribbon">POPULAR</div>}

              {isActive && (
                <span className="badge badge-green" style={{ marginBottom: "14px", display: "inline-block" }}>
                  ✓ Current Plan
                </span>
              )}

              <div className="plan-name">{plan.name}</div>
              <div className="plan-price"><sup>₹</sup>{plan.price.toLocaleString()}</div>
              <div className="plan-duration">{plan.durationMonths} month{plan.durationMonths > 1 ? "s" : ""} membership</div>

              <ul className="plan-features">
                {plan.features.map((f, i) => (
                  <li key={i} className={f.included ? "" : "no"}>
                    <span className={f.included ? "feat-yes" : "feat-no"}>{f.included ? "✓" : "✗"}</span>
                    {f.label}
                  </li>
                ))}
              </ul>

              <button
                className={`btn ${isActive ? "btn-success" : "btn-primary"}`}
                onClick={() => !isActive && setSelectedPlan(plan)}
                disabled={isActive}
              >
                {isActive ? "✓ Current Plan" : "Subscribe Now"}
              </button>
            </div>
          );
        })}
      </div>

      {/* History */}
      <div className="section-heading">
        <h2>Subscription History</h2>
      </div>
      <div className="history-list">
        {HISTORY.map((h, i) => (
          <div key={i} className="history-item">
            <div className="history-date">{h.date}</div>
            <div className="history-info">
              <strong>{h.plan} Plan</strong>
              <span>{h.months} month{h.months > 1 ? "s" : ""} · ₹{h.price.toLocaleString()}</span>
            </div>
            <span className={`badge ${h.status === "active" ? "badge-green" : "badge-gray"}`}>
              {h.status === "active" ? "Active" : "Expired"}
            </span>
          </div>
        ))}
      </div>

      {/* Confirm Modal */}
      {selectedPlan && (
        <div className="modal-overlay" onClick={(e) => e.target.className === "modal-overlay" && setSelectedPlan(null)}>
          <div className="modal-box">
            <h3>Confirm Subscription</h3>
            <p>You are subscribing to <strong>{selectedPlan.name}</strong>. Your current plan will be replaced immediately.</p>
            <div className="modal-summary">
              {[
                ["Plan",     selectedPlan.name],
                ["Duration", `${selectedPlan.durationMonths} month${selectedPlan.durationMonths > 1 ? "s" : ""}`],
                ["Amount",   `₹${selectedPlan.price.toLocaleString()}`],
                ["Starts",   "Today"],
              ].map(([label, value]) => (
                <div key={label} className="modal-row">
                  <span>{label}</span><span>{value}</span>
                </div>
              ))}
            </div>
            <div className="modal-actions">
              <button className="btn btn-primary" style={{ flex: 1 }} onClick={handleSubscribe} disabled={subscribing}>
                {subscribing ? "Processing…" : "Confirm & Pay"}
              </button>
              <button className="btn btn-outline" onClick={() => setSelectedPlan(null)}>Cancel</button>
            </div>
          </div>
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

export default SubscriptionPage;
