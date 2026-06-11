import { useEffect, useState } from "react";
import api from "../utils/api";
import Sidebar from "../components/Sidebar";

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({ dashboardData: null, gyms: [], history: [] });

  // Role ko localStorage se uthao (Make sure login mein ye set kiya ho)
  const role = localStorage.getItem("role");

  useEffect(() => {
    fetchData();
  }, [role]);

  const fetchData = async () => {
    try {
      if (role === "member") {
        const [d, g, h] = await Promise.all([
          api.get("/member/dashboard"),
          api.get("/member/gyms"),
          api.get("/member/check-in/history"),
        ]);
        setData({ dashboardData: d.data, gyms: g.data.data || [], history: h.data.data || [] });
      } else if (role === "owner") {
        const [d, g] = await Promise.all([
          api.get("/owner/dashboard"),
          api.get("/owner/gyms"),
        ]);
        setData({ dashboardData: d.data, gyms: g.data.gyms || [], history: [] });
      }
    } catch (error) {
      console.error("Data fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  // Inline styles ko clean rakha hai
  const styles = {
    container: { display: "flex", minHeight: "100vh", background: "#0a0a0a", color: "#fff", fontFamily: "sans-serif" },
    content: { flex: 1, padding: "30px" },
    card: { background: "#1a1a1a", border: "1px solid #333", borderRadius: "8px", padding: "20px", marginBottom: "20px" },
    table: { width: "100%", borderCollapse: "collapse", marginTop: "10px" },
    th: { padding: "12px", borderBottom: "2px solid #f34e3a", textAlign: "left" },
    td: { padding: "12px", borderBottom: "1px solid #333" },
    btn: { background: "#f34e3a", color: "#fff", border: "none", padding: "8px 16px", borderRadius: "4px", cursor: "pointer" }
  };

  if (loading) return <div style={{background: "#0a0a0a", color: "#fff", height: "100vh"}}>Loading...</div>;

  return (
    <div style={styles.container}>
      <Sidebar role={role} />
      <div style={styles.content}>
        <h1>{role === "member" ? "Member Dashboard" : "Owner Dashboard"}</h1>
        
        {role === "member" ? (
          <>
            <div style={styles.card}><h2>{data.dashboardData?.message}</h2></div>
            <div style={styles.card}>
              <h3>Available Gyms</h3>
              <table style={styles.table}>
                <thead><tr><th>Gym Name</th><th>Tier</th><th>Action</th></tr></thead>
                <tbody>
                  {data.gyms.map(g => (
                    <tr key={g.id}>
                      <td style={styles.td}>{g.gym_name}</td>
                      <td style={styles.td}>{g.allowed_tier}</td>
                      <td style={styles.td}><button style={styles.btn}>Check In</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <div style={styles.card}>
            <h2>Total Gyms: {data.dashboardData?.analytics?.total_gyms || 0}</h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;