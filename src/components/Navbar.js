import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../components/Navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const menuRef = useRef(null);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) setUser(JSON.parse(stored));
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  const initials = user?.username
    ? user.username.slice(0, 2).toUpperCase()
    : "?";

  return (
    <nav className="navbar">

      {/* Logo */}
      <Link to="/home" className="navbar-logo">
        Gym<span>Flow</span>
      </Link>

      {/* Navigation Links */}
      <div className="navbar-links">
        <Link to="/home">Home</Link>
        <Link to="/dashborad">Dashboard</Link>
        <Link to="/memberdashboard">memberdashboard</Link>
        <Link to="/subscriptions">Subscriptions</Link>
        <Link to="/trainers">Trainers</Link>
      </div>

      {/* User Menu */}
      <div className="menu-wrapper" ref={menuRef}>
        <button
          className="hamburger"
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          {initials}
        </button>

        {menuOpen && (
          <div className="navbar-dropdown">
            <div className="dropdown-user">
              <div className="dropdown-avatar">{initials}</div>

              <div>
                <div className="dropdown-username">
                  {user?.username || "Guest"}
                </div>
                <div className="dropdown-role">
                  {user?.role || "Member"}
                </div>
              </div>
            </div>

            <button
              className="dropdown-btn"
              onClick={() => {
                setMenuOpen(false);
                navigate("/memberdashboard");
              }}
            >
              📊 Dashboard
            </button>

            <button
              className="dropdown-btn logout"
              onClick={handleLogout}
            >
              🚪 Logout
            </button>
          </div>
        )}
      </div>

    </nav>
  );
}

export default Navbar;