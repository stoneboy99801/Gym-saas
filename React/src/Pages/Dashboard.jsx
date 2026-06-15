import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";
import Sidebar from "../components/Sidebar";
import { Scanner } from "@yudiel/react-qr-scanner";
import QRCode from "react-qr-code";


// ─── ADMIN SUB-COMPONENTS ────────────────────────────────

const AdminMembersSection = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [msg, setMsg] = useState("");

  useEffect(() => {
    api.get("/admin/members").then((r) => {
      setMembers(r.data.data || []);
      setLoading(false);
    });
  }, []);

  const handleEdit = (member) => {
    setEditingId(member.id);
    setEditForm({
      tier: member.tier || "basic",
      is_active: member.is_active ? "1" : "0",
      subscription_expiry: member.subscription_expiry
        ? member.subscription_expiry.slice(0, 10)
        : "",
    });
  };

  const handleSave = async (id) => {
    try {
      const payload = {
        tier: editForm.tier,
        is_active: editForm.is_active === "1",
        subscription_expiry: editForm.subscription_expiry || null,
      };
      const res = await api.patch(`/admin/members/${id}`, payload);
      setMembers((prev) =>
        prev.map((m) => (m.id === id ? { ...m, ...payload } : m))
      );
      setEditingId(null);
      setMsg(res.data.message);
      setTimeout(() => setMsg(""), 3000);
    } catch (err) {
      setMsg(err.response?.data?.message || "Update fail ho gaya.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Is member ko delete karna chahte ho?")) return;
    await api.delete(`/admin/members/${id}`);
    setMembers((prev) => prev.filter((m) => m.id !== id));
  };

  if (loading) return <div className="dashboard-card"><p>Loading...</p></div>;

  return (
    <div className="dashboard-card">
      <h3>Members Management</h3>
      {msg && <div className="dashboard-banner success" style={{ marginBottom: 14 }}>{msg}</div>}
      <div className="dashboard-table-wrap">
        <table className="dashboard-table">
          <thead>
            <tr>
              <th>Name</th><th>Email</th><th>Tier</th>
              <th>Status</th><th>Expiry</th><th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {members.length === 0 ? (
              <tr><td colSpan="6">Koi member nahi mila.</td></tr>
            ) : members.map((m) => (
              <tr key={m.id}>
                <td>{m.name}</td>
                <td>{m.email}</td>
                <td>
                  {editingId === m.id ? (
                    <select
                      className="gym-form__input"
                      style={{ padding: "4px 8px" }}
                      value={editForm.tier}
                      onChange={(e) => setEditForm({ ...editForm, tier: e.target.value })}
                    >
                      <option value="basic">Basic</option>
                      <option value="intermediate">Intermediate</option>
                      <option value="pro">Pro</option>
                    </select>
                  ) : (m.tier || "basic")}
                </td>
                <td>
                  {editingId === m.id ? (
                    <select
                      className="gym-form__input"
                      style={{ padding: "4px 8px" }}
                      value={editForm.is_active}
                      onChange={(e) => setEditForm({ ...editForm, is_active: e.target.value })}
                    >
                      <option value="1">Active</option>
                      <option value="0">Inactive</option>
                    </select>
                  ) : (
                    <span style={{ color: m.is_active ? "#28a745" : "#e53637" }}>
                      {m.is_active ? "Active" : "Inactive"}
                    </span>
                  )}
                </td>
                <td>
                  {editingId === m.id ? (
                    <input
                      type="date"
                      className="gym-form__input"
                      style={{ padding: "4px 8px" }}
                      value={editForm.subscription_expiry}
                      onChange={(e) => setEditForm({ ...editForm, subscription_expiry: e.target.value })}
                    />
                  ) : (
                    m.subscription_expiry
                      ? new Date(m.subscription_expiry).toLocaleDateString()
                      : "—"
                  )}
                </td>
                <td>
                  {editingId === m.id ? (
                    <>
                      <button className="dashboard-btn" style={{ marginRight: 6 }} onClick={() => handleSave(m.id)}>Save</button>
                      <button className="dashboard-btn dashboard-btn--ghost" onClick={() => setEditingId(null)}>Cancel</button>
                    </>
                  ) : (
                    <>
                      <button className="dashboard-btn" style={{ marginRight: 6 }} onClick={() => handleEdit(m)}>Edit</button>
                      <button className="dashboard-btn dashboard-btn--ghost" onClick={() => handleDelete(m.id)}>Delete</button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const AdminOwnersSection = () => {
  const [owners, setOwners] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/admin/owners").then((r) => {
      setOwners(r.data.data || []);
      setLoading(false);
    });
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Is owner aur uske saare gyms delete karna chahte ho?")) return;
    await api.delete(`/admin/owners/${id}`);
    setOwners((prev) => prev.filter((o) => o.id !== id));
  };

  if (loading) return <div className="dashboard-card"><p>Loading...</p></div>;

  return (
    <div className="dashboard-card">
      <h3>Owners Management</h3>
      <div className="dashboard-table-wrap">
        <table className="dashboard-table">
          <thead>
            <tr><th>Name</th><th>Email</th><th>Gyms</th><th>Joined</th><th>Action</th></tr>
          </thead>
          <tbody>
            {owners.length === 0 ? (
              <tr><td colSpan="5">Koi owner nahi mila.</td></tr>
            ) : owners.map((o) => (
              <tr key={o.id}>
                <td>{o.name}</td>
                <td>{o.email}</td>
                <td>{o.gyms_count}</td>
                <td>{new Date(o.created_at).toLocaleDateString()}</td>
                <td>
                  <button className="dashboard-btn dashboard-btn--ghost" onClick={() => handleDelete(o.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const AdminGymsSection = () => {
  const [gyms, setGyms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/admin/gyms").then((r) => {
      setGyms(r.data.data || []);
      setLoading(false);
    });
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Is gym ko delete karna chahte ho?")) return;
    await api.delete(`/admin/gyms/${id}`);
    setGyms((prev) => prev.filter((g) => g.id !== id));
  };

  if (loading) return <div className="dashboard-card"><p>Loading...</p></div>;

  return (
    <div className="dashboard-card">
      <h3>All Gyms</h3>
      <div className="dashboard-table-wrap">
        <table className="dashboard-table">
          <thead>
            <tr><th>Gym Name</th><th>Area</th><th>Tier</th><th>Owner</th><th>Action</th></tr>
          </thead>
          <tbody>
            {gyms.length === 0 ? (
              <tr><td colSpan="5">Koi gym nahi mili.</td></tr>
            ) : gyms.map((g) => (
              <tr key={g.id}>
                <td>{g.gym_name}</td>
                <td>{g.area}</td>
                <td>{g.allowed_tier}</td>
                <td>{g.owner?.name || "—"}</td>
                <td>
                  <button className="dashboard-btn dashboard-btn--ghost" onClick={() => handleDelete(g.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
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
  const [showScanner, setShowScanner] = useState(false);
  const [scanStatus, setScanStatus] = useState(null);
  const [scanning, setScanning] = useState(false);

  // Add Gym Form states
  const [showAddGym, setShowAddGym] = useState(false);
  const [gymForm, setGymForm] = useState({
    gym_name: "",
    address: "",
    area: "",
    allowed_tier: "basic",
  });
  const [gymFormLoading, setGymFormLoading] = useState(false);
  const [gymFormError, setGymFormError] = useState("");
  const [gymFormSuccess, setGymFormSuccess] = useState("");

  // QR Preview states
  const [qrPreview, setQrPreview] = useState({
    open: false,
    gymName: "",
    qrValue: "",
    error: "",
  });

  const loadDashboard = async () => {
    try {
      setLoading(true);

      const configResponse = await api.get("/dashboard-config");
      const resolvedRole = configResponse.data.role || "member";

      setRole(resolvedRole);
      localStorage.setItem("role", resolvedRole);
      setActiveSection("dashboard");

      if (resolvedRole === "member") {
        const [memberDashRes, memberGymsRes, attendanceRes] = await Promise.all([
          api.get("/member/dashboard"),
          api.get("/member/gyms"),
          api.get("/member/check-in/attendance-summary"),
        ]);
        setDashboardData(memberDashRes.data);
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

  useEffect(() => {
    loadDashboard();
  }, []);

  // ─── QR SCAN ────────────────────────────────────────────
  const handleScanResult = async (detectedCodes) => {
    if (scanning) return;
    const scannedText = detectedCodes?.[0]?.rawValue?.trim();
    if (!scannedText) return;

    let gymId = scannedText;
    try {
      const parsed = JSON.parse(scannedText);
      if (parsed?.gym_id) gymId = parsed.gym_id;
    } catch (e) {}

    const resolvedGymId = Number(gymId);
    if (!resolvedGymId || Number.isNaN(resolvedGymId)) {
      setScanStatus({ type: "error", message: "QR code invalid hai." });
      return;
    }

    setScanning(true);
    setShowScanner(false);

    try {
      const res = await api.post("/member/check-in", { gym_id: resolvedGymId });
      setScanStatus({ type: "success", message: res.data.message });
      await loadDashboard();
    } catch (err) {
      setScanStatus({
        type: "error",
        message: err.response?.data?.message || "Check-in failed.",
      });
    } finally {
      setScanning(false);
    }
  };

  // ─── QR PRINT ───────────────────────────────────────────
  const handlePrintQr = (gym) => {
    if (!gym?.id) {
      setQrPreview({ open: true, gymName: gym?.gym_name || "", qrValue: "", error: "Gym ID nahi mila." });
      return;
    }
    setQrPreview({
      open: true,
      gymName: gym.gym_name,
      qrValue: String(gym.id),
      error: "",
    });
  };

  const closeQrPreview = () => {
    setQrPreview({ open: false, gymName: "", qrValue: "", error: "" });
  };

  // ─── ADD GYM FORM ───────────────────────────────────────
  const handleGymFormChange = (e) => {
    setGymForm({ ...gymForm, [e.target.name]: e.target.value });
  };

  const handleAddGymSubmit = async (e) => {
    e.preventDefault();
    setGymFormError("");
    setGymFormSuccess("");

    // Simple frontend validation
    if (!gymForm.gym_name.trim() || !gymForm.address.trim() || !gymForm.area.trim()) {
      setGymFormError("Sab fields fill karna zaroori hai.");
      return;
    }

    setGymFormLoading(true);
    try {
      const res = await api.post("/owner/gyms", gymForm);
      setGymFormSuccess(res.data.message || "Gym add ho gaya!");
      // Form reset
      setGymForm({ gym_name: "", address: "", area: "", allowed_tier: "basic" });
      // Gym list refresh karo
      const updatedGyms = await api.get("/owner/gyms");
      setGyms(updatedGyms.data.gyms || []);
      // 2 second baad form band karo
      setTimeout(() => {
        setShowAddGym(false);
        setGymFormSuccess("");
      }, 2000);
    } catch (err) {
      const msg = err.response?.data?.message || "Gym add nahi ho saka.";
      setGymFormError(msg);
    } finally {
      setGymFormLoading(false);
    }
  };

  // ─── HELPERS ────────────────────────────────────────────
  const memberVisitCount = attendance.reduce(
    (count, row) => count + Number(row.total_days || 0),
    0
  );

  const handleSectionChange = (sectionKey) => {
    setActiveSection(sectionKey);
    setShowScanner(false);
    setScanStatus(null);
    setShowAddGym(false);
    setGymFormError("");
    setGymFormSuccess("");
  };

  if (loading || !role) return <div className="dashboard-loading">Loading dashboard...</div>;

  const isMember = role === "member";
  const isOwner = role === "owner";
  const isAdmin = role === "admin";

  const roleTitle = isMember
    ? "Member Dashboard"
    : isOwner
    ? "Owner Dashboard"
    : "Admin Dashboard";

  const roleSummary = isMember
    ? "Scan QR, track your visits, and keep your membership active."
    : isOwner
    ? "Manage your gyms, print QR codes, and monitor check-ins."
    : "Review system health, accounts, and gym activity at a glance.";

  // ─── MEMBER SECTIONS ────────────────────────────────────
  const renderMemberSection = () => {
    if (activeSection === "scan-qr" || activeSection === "dashboard") {
      return (
        <div className="dashboard-card dashboard-card--split">
          <div>
            <h3>Gym Check-In</h3>
            <p className="dashboard-note">
              QR scan karke apni attendance save karein.
            </p>
            {!showScanner ? (
              <button
                className="dashboard-btn"
                onClick={() => { setScanStatus(null); setShowScanner(true); }}
                disabled={scanning}
              >
                {scanning ? "Processing..." : "Scan QR to Check-In"}
              </button>
            ) : (
              <div className="dashboard-qr-box">
                <Scanner
                  onScan={handleScanResult}
                  constraints={{ facingMode: "environment" }}
                />
                <button
                  className="dashboard-btn dashboard-btn--ghost"
                  style={{ marginTop: "10px" }}
                  onClick={() => setShowScanner(false)}
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
          <div className="dashboard-mini-card">
            <span className="dashboard-mini-card__label">Membership Status</span>
            <h4>{dashboardData?.message || "Welcome back"}</h4>
            <p>Apni membership active rakhein taake high-tier gyms mein access milta rahe.</p>
          </div>
        </div>
      );
    }

    if (activeSection === "attendance") {
      return (
        <div className="dashboard-card">
          <h3>Attendance History</h3>
          <div className="dashboard-table-wrap">
            <table className="dashboard-table">
              <thead>
                <tr>
                  <th>Gym Name</th>
                  <th>Days</th>
                  <th>Last Visit</th>
                </tr>
              </thead>
              <tbody>
                {attendance.length === 0 ? (
                  <tr><td colSpan="3">Abhi tak koi check-in nahi hua.</td></tr>
                ) : (
                  attendance.map((row) => (
                    <tr key={row.gym_id}>
                      <td>{row.gym_name}</td>
                      <td>{row.total_days}</td>
                      <td>{new Date(row.last_visit).toLocaleString()}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      );
    }

    if (activeSection === "membership") {
      return (
        <div className="dashboard-grid dashboard-grid--two">
          <div className="dashboard-card dashboard-stat-card">
            <span className="dashboard-stat-label">Current Tier</span>
            <strong className="dashboard-stat-value">{memberTier}</strong>
          </div>
          <div className="dashboard-card dashboard-stat-card">
            <span className="dashboard-stat-label">Total Visits</span>
            <strong className="dashboard-stat-value">{memberVisitCount}</strong>
          </div>
        </div>
      );
    }

    return (
      <>
        <div className="dashboard-grid dashboard-grid--three">
          <div className="dashboard-card dashboard-stat-card">
            <span className="dashboard-stat-label">Current Tier</span>
            <strong className="dashboard-stat-value">{memberTier}</strong>
          </div>
          <div className="dashboard-card dashboard-stat-card">
            <span className="dashboard-stat-label">Accessible Gyms</span>
            <strong className="dashboard-stat-value">{gyms.length}</strong>
          </div>
          <div className="dashboard-card dashboard-stat-card">
            <span className="dashboard-stat-label">Total Visits</span>
            <strong className="dashboard-stat-value">{memberVisitCount}</strong>
          </div>
        </div>

        <div className="dashboard-grid dashboard-grid--two">
          <div className="dashboard-card">
            <h3>Available Gyms</h3>
            <div className="dashboard-table-wrap">
              <table className="dashboard-table">
                <thead>
                  <tr><th>Gym Name</th><th>Tier</th></tr>
                </thead>
                <tbody>
                  {gyms.length === 0 ? (
                    <tr><td colSpan="2">No gyms available yet.</td></tr>
                  ) : (
                    gyms.map((gym) => (
                      <tr key={gym.id}>
                        <td>{gym.gym_name}</td>
                        <td>{gym.allowed_tier}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className="dashboard-card">
            <h3>Attendance Summary</h3>
            <div className="dashboard-table-wrap">
              <table className="dashboard-table">
                <thead>
                  <tr><th>Gym Name</th><th>Days</th><th>Last Visit</th></tr>
                </thead>
                <tbody>
                  {attendance.length === 0 ? (
                    <tr><td colSpan="3">Abhi tak koi check-in nahi hua.</td></tr>
                  ) : (
                    attendance.map((row) => (
                      <tr key={row.gym_id}>
                        <td>{row.gym_name}</td>
                        <td>{row.total_days}</td>
                        <td>{new Date(row.last_visit).toLocaleString()}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </>
    );
  };

  // ─── OWNER SECTIONS ─────────────────────────────────────
  const renderOwnerSection = () => {

    // ADD GYM FORM
    const addGymForm = showAddGym && (
      <div className="dashboard-card gym-form-card">
        <div className="gym-form-card__head">
          <h3>Naya Gym Add Karein</h3>
          <button
            className="dashboard-btn dashboard-btn--ghost"
            onClick={() => { setShowAddGym(false); setGymFormError(""); setGymFormSuccess(""); }}
          >
            Cancel
          </button>
        </div>

        {gymFormError && (
          <div className="dashboard-banner error" style={{ marginBottom: "16px" }}>
            {gymFormError}
          </div>
        )}
        {gymFormSuccess && (
          <div className="dashboard-banner success" style={{ marginBottom: "16px" }}>
            {gymFormSuccess}
          </div>
        )}

        <form className="gym-form" onSubmit={handleAddGymSubmit}>
          <div className="gym-form__group">
            <label className="gym-form__label">Gym Name</label>
            <input
              className="gym-form__input"
              type="text"
              name="gym_name"
              placeholder="e.g. PowerHouse Gulshan"
              value={gymForm.gym_name}
              onChange={handleGymFormChange}
            />
          </div>

          <div className="gym-form__group">
            <label className="gym-form__label">Address</label>
            <input
              className="gym-form__input"
              type="text"
              name="address"
              placeholder="e.g. Block 5, Main Road"
              value={gymForm.address}
              onChange={handleGymFormChange}
            />
          </div>

          <div className="gym-form__group">
            <label className="gym-form__label">Area</label>
            <input
              className="gym-form__input"
              type="text"
              name="area"
              placeholder="e.g. Gulshan-e-Iqbal"
              value={gymForm.area}
              onChange={handleGymFormChange}
            />
          </div>

          <div className="gym-form__group">
            <label className="gym-form__label">Allowed Tier</label>
            <select
              className="gym-form__input"
              name="allowed_tier"
              value={gymForm.allowed_tier}
              onChange={handleGymFormChange}
            >
              <option value="basic">Basic</option>
              <option value="intermediate">Intermediate</option>
              <option value="pro">Pro</option>
            </select>
          </div>

          <button
            type="submit"
            className="dashboard-btn"
            disabled={gymFormLoading}
            style={{ marginTop: "8px" }}
          >
            {gymFormLoading ? "Adding..." : "Add Gym"}
          </button>
        </form>
      </div>
    );

    // QR PREVIEW
    const qrCard = qrPreview.open && (
      <div className="dashboard-card qr-preview-card">
        <div className="qr-preview-card__head">
          <div>
            <p className="qr-preview-card__eyebrow">QR Print Center</p>
            <h3>{qrPreview.gymName}</h3>
          </div>
          <button className="dashboard-btn dashboard-btn--ghost" onClick={closeQrPreview}>
            Close
          </button>
        </div>
        {qrPreview.error ? (
          <div className="qr-modal__error">{qrPreview.error}</div>
        ) : (
          <div className="qr-modal__preview">
            <QRCode value={qrPreview.qrValue} size={220} />
          </div>
        )}
        <p className="dashboard-note" style={{ marginTop: "12px" }}>
          Yeh QR code print karke apni gym ki reception/wall par lagao. Members ise scan karke check-in karein ge.
        </p>
      </div>
    );

    // GYMS TABLE
    const gymsTable = (
      <div className="dashboard-card">
        <div className="gym-table-head">
          <h3>My Gyms</h3>
          {!showAddGym && (
            <button
              className="dashboard-btn"
              onClick={() => { setShowAddGym(true); setQrPreview({ open: false }); }}
            >
              + Add New Gym
            </button>
          )}
        </div>
        <div className="dashboard-table-wrap">
          <table className="dashboard-table">
            <thead>
              <tr>
                <th>Gym Name</th>
                <th>Area</th>
                <th>Tier</th>
                <th>QR Code</th>
              </tr>
            </thead>
            <tbody>
              {gyms.length === 0 ? (
                <tr><td colSpan="4">Abhi koi gym add nahi ki. "+ Add New Gym" button use karein.</td></tr>
              ) : (
                gyms.map((gym) => (
                  <tr key={gym.id}>
                    <td>{gym.gym_name}</td>
                    <td>{gym.area}</td>
                    <td>{gym.allowed_tier}</td>
                    <td>
                      <button className="dashboard-btn" onClick={() => handlePrintQr(gym)}>
                        Print QR
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    );

    if (activeSection === "my-gyms" || activeSection === "qr-center" || activeSection === "dashboard") {
      return (
        <>
          {addGymForm}
          {qrCard}
          {gymsTable}
        </>
      );
    }

    if (activeSection === "recent-checkins") {
      return (
        <div className="dashboard-card">
          <h3>Recent Check-Ins</h3>
          <div className="dashboard-table-wrap">
            <table className="dashboard-table">
              <thead>
                <tr><th>Member</th><th>Gym</th><th>Time</th></tr>
              </thead>
              <tbody>
                {recentCheckIns.length === 0 ? (
                  <tr><td colSpan="3">No recent check-ins found.</td></tr>
                ) : (
                  recentCheckIns.map((ci) => (
                    <tr key={ci.id}>
                      <td>{ci.user?.name}</td>
                      <td>{ci.gym?.gym_name}</td>
                      <td>{new Date(ci.checked_in_at).toLocaleString()}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      );
    }

    // Default owner dashboard view
    return (
      <>
        <div className="dashboard-grid dashboard-grid--three">
          <div className="dashboard-card dashboard-stat-card">
            <span className="dashboard-stat-label">Total Gyms</span>
            <strong className="dashboard-stat-value">
              {dashboardData?.analytics?.total_gyms || gyms.length}
            </strong>
          </div>
          <div className="dashboard-card dashboard-stat-card">
            <span className="dashboard-stat-label">Today's Check-Ins</span>
            <strong className="dashboard-stat-value">
              {dashboardData?.analytics?.today_check_ins || 0}
            </strong>
          </div>
          <div className="dashboard-card dashboard-stat-card">
            <span className="dashboard-stat-label">Recent Check-Ins</span>
            <strong className="dashboard-stat-value">{recentCheckIns.length}</strong>
          </div>
        </div>

        <div className="dashboard-grid dashboard-grid--two">
          {addGymForm}
          {qrCard}
          {gymsTable}

          <div className="dashboard-card">
            <h3>Recent Check-Ins</h3>
            <div className="dashboard-table-wrap">
              <table className="dashboard-table">
                <thead>
                  <tr><th>Member</th><th>Gym</th><th>Time</th></tr>
                </thead>
                <tbody>
                  {recentCheckIns.length === 0 ? (
                    <tr><td colSpan="3">No recent check-ins found.</td></tr>
                  ) : (
                    recentCheckIns.map((ci) => (
                      <tr key={ci.id}>
                        <td>{ci.user?.name}</td>
                        <td>{ci.gym?.gym_name}</td>
                        <td>{new Date(ci.checked_in_at).toLocaleString()}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </>
    );
  };

  // ─── ADMIN SECTIONS ─────────────────────────────────────
  const renderAdminSection = () => {

    if (activeSection === "overview" || activeSection === "dashboard") {
      return (
        <>
          <div className="dashboard-grid dashboard-grid--four">
            <div className="dashboard-card dashboard-stat-card">
              <span className="dashboard-stat-label">Members</span>
              <strong className="dashboard-stat-value">{adminStats?.members || 0}</strong>
            </div>
            <div className="dashboard-card dashboard-stat-card">
              <span className="dashboard-stat-label">Active Members</span>
              <strong className="dashboard-stat-value">{adminStats?.active_members || 0}</strong>
            </div>
            <div className="dashboard-card dashboard-stat-card">
              <span className="dashboard-stat-label">Owners</span>
              <strong className="dashboard-stat-value">{adminStats?.owners || 0}</strong>
            </div>
            <div className="dashboard-card dashboard-stat-card">
              <span className="dashboard-stat-label">Gyms</span>
              <strong className="dashboard-stat-value">{adminStats?.gyms || 0}</strong>
            </div>
          </div>

          <div className="dashboard-grid dashboard-grid--two">
            <div className="dashboard-card dashboard-stat-card">
              <span className="dashboard-stat-label">Total Check-Ins</span>
              <strong className="dashboard-stat-value">{adminStats?.check_ins || 0}</strong>
            </div>
            <div className="dashboard-card">
              <h3>Recent Check-Ins</h3>
              <div className="dashboard-table-wrap">
                <table className="dashboard-table">
                  <thead>
                    <tr><th>Member</th><th>Gym</th><th>Time</th></tr>
                  </thead>
                  <tbody>
                    {recentCheckIns.length === 0 ? (
                      <tr><td colSpan="3">Koi check-in nahi.</td></tr>
                    ) : (
                      recentCheckIns.map((ci) => (
                        <tr key={ci.id}>
                          <td>{ci.user?.name}</td>
                          <td>{ci.gym?.gym_name}</td>
                          <td>{new Date(ci.checked_in_at).toLocaleString()}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </>
      );
    }

    if (activeSection === "members") {
      return <AdminMembersSection />;
    }

    if (activeSection === "owners") {
      return <AdminOwnersSection />;
    }

    if (activeSection === "gyms") {
      return <AdminGymsSection />;
    }

    return null;
  };

  // ─── RENDER ──────────────────────────────────────────────
  return (
    <div className="dashboard-wrapper">
      <Sidebar
        role={role}
        activeSection={activeSection}
        onSectionChange={handleSectionChange}
      />

      <div className="dashboard-content">
        <div className="dashboard-hero">
          <div className="dashboard-hero__copy">
            <span className="dashboard-eyebrow">GymLife SaaS Console</span>
            <h1>{roleTitle}</h1>
            <p>{roleSummary}</p>
          </div>
          <div className="dashboard-hero__badge">{role.toUpperCase()}</div>
        </div>

        {scanStatus && isMember && (
          <div className={`dashboard-banner ${scanStatus.type}`}>
            {scanStatus.message}
          </div>
        )}

        {isMember && renderMemberSection()}
        {isOwner && renderOwnerSection()}
        {isAdmin && renderAdminSection()}
      </div>
    </div>
  );
};

export default Dashboard;