import { useEffect, useState } from "react";
import api from "../utils/api";

const AdminMembersSection = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [msg, setMsg] = useState("");

  useEffect(() => {
    api.get("/admin/members").then((r) => { setMembers(r.data.data || []); setLoading(false); });
  }, []);

  const handleEdit = (member) => {
    setEditingId(member.id);
    setEditForm({
      tier: member.tier || "basic",
      is_active: member.is_active ? "1" : "0",
      subscription_expiry: member.subscription_expiry ? member.subscription_expiry.slice(0, 10) : "",
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
      setMembers((prev) => prev.map((m) => (m.id === id ? { ...m, ...payload } : m)));
      setEditingId(null);
      setMsg(res.data.message);
      setTimeout(() => setMsg(""), 3000);
    } catch (err) {
      setMsg(err.response?.data?.message || "Update failed.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Do you want to delete this member?")) return;
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
            <tr><th>Name</th><th>Email</th><th>Tier</th><th>Status</th><th>Expiry</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {members.length === 0 ? (
              <tr><td colSpan="6">No members found.</td></tr>
            ) : members.map((m) => (
              <tr key={m.id}>
                <td>{m.name}</td>
                <td>{m.email}</td>
                <td>
                  {editingId === m.id ? (
                    <select className="gym-form__input" style={{ padding: "4px 8px" }} value={editForm.tier} onChange={(e) => setEditForm({ ...editForm, tier: e.target.value })}>
                      <option value="basic">Basic</option>
                      <option value="intermediate">Intermediate</option>
                      <option value="pro">Pro</option>
                    </select>
                  ) : (m.tier || "basic")}
                </td>
                <td>
                  {editingId === m.id ? (
                    <select className="gym-form__input" style={{ padding: "4px 8px" }} value={editForm.is_active} onChange={(e) => setEditForm({ ...editForm, is_active: e.target.value })}>
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
                    <input type="date" className="gym-form__input" style={{ padding: "4px 8px" }} value={editForm.subscription_expiry} onChange={(e) => setEditForm({ ...editForm, subscription_expiry: e.target.value })} />
                  ) : (m.subscription_expiry ? new Date(m.subscription_expiry).toLocaleDateString() : "—")}
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
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "", password_confirmation: "" });
  const [formError, setFormError] = useState("");
  const [formSuccess, setFormSuccess] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    api.get("/admin/owners").then((r) => { setOwners(r.data.data || []); setLoading(false); });
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Is owner aur uske saare gyms delete karna chahte ho?")) return;
    await api.delete(`/admin/owners/${id}`);
    setOwners((prev) => prev.filter((o) => o.id !== id));
  };

  const handleCreateOwner = async (e) => {
    e.preventDefault();
    setFormError("");
    setFormSuccess("");
    if (form.password !== form.password_confirmation) {
      setFormError("Password aur confirm password match nahi kar rahe.");
      return;
    }
    setSubmitting(true);
    try {
      const res = await api.post("/admin/owners", form);
      setFormSuccess(res.data.message);
      setOwners((prev) => [
        { ...res.data.data, gyms_count: 0, created_at: new Date().toISOString(), is_active: true },
        ...prev,
      ]);
      setForm({ name: "", email: "", password: "", password_confirmation: "" });
      setShowForm(false);
    } catch (err) {
      setFormError(err.response?.data?.message || "Owner create nahi ho saka, dobara try karein.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="dashboard-card"><p>Loading...</p></div>;

  return (
    <div className="dashboard-card">
      <div className="dashboard-card__header-row">
        <h3>Owners Management</h3>
        <button type="button" className="dashboard-btn" onClick={() => { setShowForm((prev) => !prev); setFormError(""); setFormSuccess(""); }}>
          {showForm ? "Cancel" : "+ Add Owner"}
        </button>
      </div>

      {showForm && (
        <form className="gym-form" onSubmit={handleCreateOwner} style={{ marginBottom: 20 }}>
          <input type="text" placeholder="Owner ka naam" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
          <input type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
          <input type="password" placeholder="Password (kam se kam 6 characters)" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />
          <input type="password" placeholder="Password dobara likhein" value={form.password_confirmation} onChange={(e) => setForm({ ...form, password_confirmation: e.target.value })} required />
          {formError && <div className="dashboard-banner error">{formError}</div>}
          {formSuccess && <div className="dashboard-banner success">{formSuccess}</div>}
          <button type="submit" className="dashboard-btn" disabled={submitting}>
            {submitting ? "Ban raha hai..." : "Owner Account Banao"}
          </button>
        </form>
      )}

      <div className="dashboard-table-wrap">
        <table className="dashboard-table">
          <thead><tr><th>Name</th><th>Email</th><th>Gyms</th><th>Joined</th><th>Action</th></tr></thead>
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
                  <button className="dashboard-btn dashboard-btn--ghost" onClick={() => handleDelete(o.id)}>Delete</button>
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
    api.get("/admin/gyms").then((r) => { setGyms(r.data.data || []); setLoading(false); });
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Do you want to delete this gym?")) return;
    await api.delete(`/admin/gyms/${id}`);
    setGyms((prev) => prev.filter((g) => g.id !== id));
  };

  if (loading) return <div className="dashboard-card"><p>Loading...</p></div>;

  return (
    <div className="dashboard-card">
      <h3>All Gyms</h3>
      <div className="dashboard-table-wrap">
        <table className="dashboard-table">
          <thead><tr><th>Gym Name</th><th>Area</th><th>Tier</th><th>Owner</th><th>Action</th></tr></thead>
          <tbody>
            {gyms.length === 0 ? (
              <tr><td colSpan="5">No gyms found.</td></tr>
            ) : gyms.map((g) => (
              <tr key={g.id}>
                <td>{g.gym_name}</td>
                <td>{g.area}</td>
                <td>{g.allowed_tier}</td>
                <td>{g.owner?.name || "—"}</td>
                <td>
                  <button className="dashboard-btn dashboard-btn--ghost" onClick={() => handleDelete(g.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const ADMIN_STATS_CONFIG = [
  { key: "members",        label: "Total Members",   accent: "#f36100" },
  { key: "active_members", label: "Active Members",  accent: "#28a745" },
  { key: "owners",         label: "Gym Owners",      accent: "#e53637" },
  { key: "gyms",           label: "Total Gyms",      accent: "#f36100" },
  { key: "check_ins",      label: "Total Check-Ins", accent: "#e53637" },
];

export default function AdminDashboard({ activeSection, adminStats, recentCheckIns }) {
  if (activeSection === "overview" || activeSection === "dashboard") {
    return (
      <>
        <div className="admin-stats-grid">
          {ADMIN_STATS_CONFIG.map(({ key, label, accent }) => (
            <div key={key} className="admin-stat-card" style={{ "--accent": accent }}>
              <div className="admin-stat-card__top">
                <span className="admin-stat-card__label">{label}</span>
                <span className="admin-stat-card__dot" />
              </div>
              <strong className="admin-stat-card__value">{adminStats?.[key] ?? 0}</strong>
              <div className="admin-stat-card__footer">
                <div className="admin-stat-card__track">
                  <div className="admin-stat-card__fill" />
                </div>
                <span className="admin-stat-card__sub">Live</span>
              </div>
            </div>
          ))}
        </div>

        <div className="dashboard-card">
          <h3>Recent Check-Ins</h3>
          <div className="dashboard-table-wrap">
            <table className="dashboard-table">
              <thead><tr><th>Member</th><th>Gym</th><th>Time</th></tr></thead>
              <tbody>
                {recentCheckIns.length === 0 ? (
                  <tr><td colSpan="3">No check-ins found.</td></tr>
                ) : recentCheckIns.map((ci) => (
                  <tr key={ci.id}>
                    <td>{ci.user?.name}</td>
                    <td>{ci.gym?.gym_name}</td>
                    <td>{new Date(ci.checked_in_at).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </>
    );
  }

  if (activeSection === "members") return <AdminMembersSection />;
  if (activeSection === "owners") return <AdminOwnersSection />;
  if (activeSection === "gyms") return <AdminGymsSection />;

  return null;
}
