import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";
import Sidebar from "../components/Sidebar";
import MemberDashboard from "./MemberDashboard";
import OwnerDashboard from "./OwnerDashboard";
import AdminDashboard from "./AdminDashboard";

const ROLE_TITLES = {
  member: { title: "Member Dashboard", summary: "Scan QR, track your visits, and keep your membership active." },
  owner:  { title: "Owner Dashboard",  summary: "Manage your gyms, print QR codes, and monitor check-ins." },
  admin:  { title: "Admin Dashboard",  summary: "Review system health, accounts, and gym activity at a glance." },
};

const Dashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState(null);
  const [activeSection, setActiveSection] = useState("dashboard");
  const [dashboardData, setDashboardData] = useState(null);
  const [gyms, setGyms] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [recentCheckIns, setRecentCheckIns] = useState([]);
  const [adminStats, setAdminStats] = useState(null);
  const [memberTier, setMemberTier] = useState("basic");
  const [subscription, setSubscription] = useState(null);

  const loadDashboard = async (resetSection = false) => {
    try {
      setLoading(true);
      const configResponse = await api.get("/dashboard-config");
      const resolvedRole = configResponse.data.role || "member";
      setRole(resolvedRole);
      localStorage.setItem("role", resolvedRole);
      if (resetSection) setActiveSection("dashboard");

      if (resolvedRole === "member") {
        const [memberDashRes, memberGymsRes, attendanceRes] = await Promise.all([
          api.get("/member/dashboard"),
          api.get("/member/gyms"),
          api.get("/member/check-in/attendance-summary"),
        ]);
        setDashboardData(memberDashRes.data);
        setSubscription(memberDashRes.data.subscription || null);
        setGyms(memberGymsRes.data.data || []);
        setAttendance(attendanceRes.data.data || []);
        setMemberTier(memberGymsRes.data.member_tier || "basic");
        setRecentCheckIns([]);
        setAdminStats(null);
      } else if (resolvedRole === "owner") {
        const [ownerDashRes, ownerGymsRes] = await Promise.all([
          api.get("/owner/dashboard"),
          api.get("/owner/gyms"),
        ]);
        setDashboardData(ownerDashRes.data);
        setGyms(ownerGymsRes.data.gyms || []);
        setAttendance([]);
        setRecentCheckIns(ownerDashRes.data.recent_check_ins || []);
        setAdminStats(null);
      } else if (resolvedRole === "admin") {
        const adminDashRes = await api.get("/admin/dashboard");
        setDashboardData(adminDashRes.data);
        setGyms([]);
        setAttendance([]);
        setRecentCheckIns(adminDashRes.data.recent_check_ins || []);
        setAdminStats(adminDashRes.data.stats || null);
      }
    } catch (error) {
      if (error?.response?.status === 401) {
        navigate("/login", { replace: true });
        return;
      }
      console.error("Dashboard load error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadDashboard(true); }, []);

  const handleSectionChange = (sectionKey) => setActiveSection(sectionKey);

  if (loading || !role) return <div className="dashboard-loading">Loading dashboard...</div>;

  // Agar member ka subscription active nahi hai to seedha membership page dikhao
  if (role === "member" && !subscription?.is_active) {
    return (
      <div className="dashboard-wrapper">
        <div className="dashboard-content">
          <div className="dashboard-hero">
            <div className="dashboard-hero__copy">
              <span className="dashboard-eyebrow">Welcome to GymHub</span>
              <h1>Activate Your Membership</h1>
              <p>Choose a plan to get started. Once activated, you can access any partner gym with a single QR scan.</p>
            </div>
            <div className="dashboard-hero__badge">MEMBER</div>
          </div>
          <MemberDashboard
            activeSection="membership"
            dashboardData={dashboardData}
            gyms={gyms}
            setGyms={setGyms}
            attendance={attendance}
            memberTier={memberTier}
            setMemberTier={setMemberTier}
            subscription={subscription}
            setSubscription={setSubscription}
            onReload={() => loadDashboard(false)}
          />
        </div>
      </div>
    );
  }

  const { title, summary } = ROLE_TITLES[role] || ROLE_TITLES.member;

  return (
    <div className="dashboard-wrapper">
      <Sidebar role={role} activeSection={activeSection} onSectionChange={handleSectionChange} />

      <div className="dashboard-content">
        <div className="dashboard-hero">
          <div className="dashboard-hero__copy">
            <span className="dashboard-eyebrow">GymLife SaaS Console</span>
            <h1>{title}</h1>
            <p>{summary}</p>
          </div>
          <div className="dashboard-hero__badge">{role.toUpperCase()}</div>
        </div>

        {role === "member" && (
          <MemberDashboard
            activeSection={activeSection}
            dashboardData={dashboardData}
            gyms={gyms}
            setGyms={setGyms}
            attendance={attendance}
            memberTier={memberTier}
            setMemberTier={setMemberTier}
            subscription={subscription}
            setSubscription={setSubscription}
            onReload={() => loadDashboard(false)}
          />
        )}

        {role === "owner" && (
          <OwnerDashboard
            activeSection={activeSection}
            dashboardData={dashboardData}
            gyms={gyms}
            setGyms={setGyms}
            recentCheckIns={recentCheckIns}
          />
        )}

        {role === "admin" && (
          <AdminDashboard
            activeSection={activeSection}
            adminStats={adminStats}
            recentCheckIns={recentCheckIns}
          />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
