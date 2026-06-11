// src/components/Sidebar.jsx

import { useNavigate } from "react-router-dom";

const Sidebar = ({ role }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  const styles = {
    sidebar: {
      width: "250px",
      minHeight: "100vh",
      background: "rgba(0,0,0,0.75)",
      borderRight: "1px solid #f34e3a",
      padding: "20px",
      color: "#fff",
    },

    title: {
      color: "#f34e3a",
      fontSize: "24px",
      fontWeight: "bold",
      marginBottom: "30px",
    },

    item: {
      padding: "12px",
      marginBottom: "10px",
      borderRadius: "4px",
      cursor: "pointer",
      background: "#111",
    },

    logout: {
      padding: "12px",
      marginTop: "20px",
      borderRadius: "4px",
      cursor: "pointer",
      background: "#f34e3a",
      color: "#fff",
      border: "none",
      width: "100%",
    },
  };

  return (
    <div style={styles.sidebar}>
      <h2 style={styles.title}>Gym System</h2>

      <div style={styles.item}>Dashboard</div>

      <div style={styles.item}>My Gyms</div>

      {role === "member" && (
        <div style={styles.item}>Check-in History</div>
      )}

      <button
        style={styles.logout}
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
};

export default Sidebar;