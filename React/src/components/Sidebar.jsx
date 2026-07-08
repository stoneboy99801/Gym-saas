// src/components/Sidebar.jsx

import { useNavigate } from "react-router-dom";

const Sidebar = ({ role, activeSection, onSectionChange }) => {
  const navigate = useNavigate();
  const roleLabel =
    role === "admin" ? "Super Admin" : role === "owner" ? "Gym Owner" : "Member";

  const sectionItems = {
    member: [
      { key: "dashboard", label: "Dashboard" },
      { key: "scan-qr", label: "Scan QR / Check-In" },
      { key: "my-gyms", label: "My Gyms" },
      { key: "attendance", label: "Attendance History" },
      { key: "reviews", label: "My Gym Reviews" },
      { key: "membership", label: "My Membership" },
    ],
    owner: [
      { key: "dashboard", label: "Dashboard" },
      { key: "my-gyms", label: "My Gyms" },
      { key: "qr-center", label: "QR Print Center" },
      { key: "recent-checkins", label: "Recent Check-Ins" },
    ],
    admin: [
      { key: "dashboard", label: "Dashboard" },
      { key: "overview", label: "System Overview" },
      { key: "members", label: "Members" },
      { key: "owners", label: "Owners" },
      { key: "gyms", label: "Gyms" },
    ],
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("role");

    navigate("/login");
  };

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <div className="dashboard-sidebar">
      <div className="dashboard-sidebar__head">
        <p className="dashboard-sidebar__eyebrow">GymLife SaaS</p>
        <h2>Control Center</h2>
        <span className="dashboard-role-pill">{roleLabel}</span>
      </div>

      <div className="dashboard-sidebar__nav">
        {(sectionItems[role] || sectionItems.member).map((item) => (
          <button
            key={item.key}
            type="button"
            className={`sidebar-item ${activeSection === item.key ? "active" : ""}`}
            onClick={() => onSectionChange(item.key)}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="dashboard-sidebar__footer">
        <button type="button" className="sidebar-item sidebar-item--footer" onClick={handleGoHome}>
          Go Home
        </button>
        <button type="button" className="sidebar-item sidebar-item--footer sidebar-item--logout" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;