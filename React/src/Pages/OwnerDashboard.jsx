import { useState } from "react";
import QRCode from "react-qr-code";
import api from "../utils/api";

export default function OwnerDashboard({
  activeSection,
  dashboardData,
  gyms,
  setGyms,
  recentCheckIns,
}) {
  const [showAddGym, setShowAddGym] = useState(false);
  const [gymForm, setGymForm] = useState({ gym_name: "", address: "", area: "", allowed_tier: "basic" });
  const [gymFormLoading, setGymFormLoading] = useState(false);
  const [gymFormError, setGymFormError] = useState("");
  const [gymFormSuccess, setGymFormSuccess] = useState("");
  const [qrPreview, setQrPreview] = useState({ open: false, gymName: "", qrValue: "", error: "" });

  const handleGymFormChange = (e) => setGymForm({ ...gymForm, [e.target.name]: e.target.value });

  const handleAddGymSubmit = async (e) => {
    e.preventDefault();
    setGymFormError("");
    setGymFormSuccess("");
    if (!gymForm.gym_name.trim() || !gymForm.address.trim() || !gymForm.area.trim()) {
      setGymFormError("All fields are required.");
      return;
    }
    setGymFormLoading(true);
    try {
      const res = await api.post("/owner/gyms", gymForm);
      setGymFormSuccess(res.data.message || "Gym added successfully!");
      setGymForm({ gym_name: "", address: "", area: "", allowed_tier: "basic" });
      const updatedGyms = await api.get("/owner/gyms");
      setGyms(updatedGyms.data.gyms || []);
      setTimeout(() => { setShowAddGym(false); setGymFormSuccess(""); }, 2000);
    } catch (err) {
      setGymFormError(err.response?.data?.message || "The gym could not be added.");
    } finally {
      setGymFormLoading(false);
    }
  };

  const handlePrintQr = (gym) => {
    if (!gym?.id) {
      setQrPreview({ open: true, gymName: gym?.gym_name || "", qrValue: "", error: "Gym ID not found." });
      return;
    }
    setQrPreview({ open: true, gymName: gym.gym_name, qrValue: String(gym.id), error: "" });
  };

  const closeQrPreview = () => setQrPreview({ open: false, gymName: "", qrValue: "", error: "" });

  const addGymForm = showAddGym && (
    <div className="dashboard-card gym-form-card">
      <div className="gym-form-card__head">
        <h3>Add a New Gym</h3>
        <button
          className="dashboard-btn dashboard-btn--ghost"
          onClick={() => { setShowAddGym(false); setGymFormError(""); setGymFormSuccess(""); }}
        >
          Cancel
        </button>
      </div>
      {gymFormError && <div className="dashboard-banner error" style={{ marginBottom: "16px" }}>{gymFormError}</div>}
      {gymFormSuccess && <div className="dashboard-banner success" style={{ marginBottom: "16px" }}>{gymFormSuccess}</div>}
      <form className="gym-form" onSubmit={handleAddGymSubmit}>
        <div className="gym-form__group">
          <label className="gym-form__label">Gym Name</label>
          <input className="gym-form__input" type="text" name="gym_name" placeholder="e.g. PowerHouse Gulshan" value={gymForm.gym_name} onChange={handleGymFormChange} />
        </div>
        <div className="gym-form__group">
          <label className="gym-form__label">Address</label>
          <input className="gym-form__input" type="text" name="address" placeholder="e.g. Block 5, Main Road" value={gymForm.address} onChange={handleGymFormChange} />
        </div>
        <div className="gym-form__group">
          <label className="gym-form__label">Area</label>
          <input className="gym-form__input" type="text" name="area" placeholder="e.g. Gulshan-e-Iqbal" value={gymForm.area} onChange={handleGymFormChange} />
        </div>
        <div className="gym-form__group">
          <label className="gym-form__label">Allowed Tier</label>
          <select className="gym-form__input" name="allowed_tier" value={gymForm.allowed_tier} onChange={handleGymFormChange}>
            <option value="basic">Basic</option>
            <option value="intermediate">Intermediate</option>
            <option value="pro">Pro</option>
          </select>
        </div>
        <button type="submit" className="dashboard-btn" disabled={gymFormLoading} style={{ marginTop: "8px" }}>
          {gymFormLoading ? "Adding..." : "Add Gym"}
        </button>
      </form>
    </div>
  );

  const qrCard = qrPreview.open && (
    <div className="dashboard-card qr-preview-card">
      <div className="qr-preview-card__head">
        <div>
          <p className="qr-preview-card__eyebrow">QR Print Center</p>
          <h3>{qrPreview.gymName}</h3>
        </div>
        <button className="dashboard-btn dashboard-btn--ghost" onClick={closeQrPreview}>Close</button>
      </div>
      {qrPreview.error ? (
        <div className="qr-modal__error">{qrPreview.error}</div>
      ) : (
        <div className="qr-modal__preview"><QRCode value={qrPreview.qrValue} size={220} /></div>
      )}
      <p className="dashboard-note" style={{ marginTop: "12px" }}>
        Print this QR code and place it at your gym reception or wall. Members can scan it to check in.
      </p>
    </div>
  );

  const TIER_COLORS = { basic: "#888", intermediate: "#f36100", pro: "#e53637" };

  const gymsTable = (
    <div className="dashboard-card">
      <div className="gym-table-head">
        <h3>My Gyms</h3>
        {!showAddGym && (
          <button className="dashboard-btn" onClick={() => { setShowAddGym(true); setQrPreview({ open: false }); }}>
            + Add New Gym
          </button>
        )}
      </div>
      {gyms.length === 0 ? (
        <p className="dashboard-note">No gyms added yet. Use "+ Add New Gym" to get started.</p>
      ) : (
        <div className="gym-cards-grid">
          {gyms.map((gym, idx) => (
            <div key={gym.id} className="gym-card">
              <div className="gym-card__accent-bar" />
              <div className="gym-card__body">
                <div className="gym-card__header">
                  <span
                    className="gym-card__tier-badge"
                    style={{ borderColor: TIER_COLORS[gym.allowed_tier], color: TIER_COLORS[gym.allowed_tier] }}
                  >
                    {gym.allowed_tier}
                  </span>
                  <span className="gym-card__number">#{String(idx + 1).padStart(2, '0')}</span>
                </div>
                <h4 className="gym-card__name">{gym.gym_name}</h4>
                <div className="gym-card__divider" />
                <div className="gym-card__meta">
                  <div className="gym-card__meta-row">
                    <span className="gym-card__meta-label">Area</span>
                    <span className="gym-card__meta-value">{gym.area}</span>
                  </div>
                  <div className="gym-card__meta-row">
                    <span className="gym-card__meta-label">Tier</span>
                    <span className="gym-card__meta-value" style={{ color: TIER_COLORS[gym.allowed_tier] }}>{gym.allowed_tier}</span>
                  </div>
                </div>
                <button className="dashboard-btn gym-card__qr-btn" onClick={() => handlePrintQr(gym)}>
                  Print QR Code
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  if (activeSection === "my-gyms" || activeSection === "dashboard") {
    return <>{addGymForm}{qrCard}{gymsTable}</>;
  }

  if (activeSection === "qr-center") {
    return (
      <div className="dashboard-card">
        <h3>QR Print Center</h3>
        <p className="dashboard-note">Select a gym to generate and print its QR code for member check-ins.</p>
        {qrCard}
        <div className="gym-cards-grid">
          {gyms.length === 0 ? (
            <p className="dashboard-note">No gyms found. Add a gym first from My Gyms.</p>
          ) : gyms.map((gym, idx) => (
            <div key={gym.id} className="gym-card">
              <div className="gym-card__accent-bar" />
              <div className="gym-card__body">
                <div className="gym-card__header">
                  <span
                    className="gym-card__tier-badge"
                    style={{ borderColor: TIER_COLORS[gym.allowed_tier], color: TIER_COLORS[gym.allowed_tier] }}
                  >
                    {gym.allowed_tier}
                  </span>
                  <span className="gym-card__number">#{String(idx + 1).padStart(2, '0')}</span>
                </div>
                <h4 className="gym-card__name">{gym.gym_name}</h4>
                <div className="gym-card__divider" />
                <div className="gym-card__meta">
                  <div className="gym-card__meta-row">
                    <span className="gym-card__meta-label">Area</span>
                    <span className="gym-card__meta-value">{gym.area}</span>
                  </div>
                </div>
                <button className="dashboard-btn gym-card__qr-btn" onClick={() => handlePrintQr(gym)}>
                  Generate QR
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (activeSection === "recent-checkins") {
    return (
      <div className="dashboard-card">
        <h3>Recent Check-Ins</h3>
        <div className="dashboard-table-wrap">
          <table className="dashboard-table">
            <thead><tr><th>Member</th><th>Gym</th><th>Time</th></tr></thead>
            <tbody>
              {recentCheckIns.length === 0 ? (
                <tr><td colSpan="3">No recent check-ins found.</td></tr>
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
    );
  }

  // Default owner overview
  return (
    <>
      <div className="dashboard-grid dashboard-grid--three">
        <div className="dashboard-card dashboard-stat-card">
          <span className="dashboard-stat-label">Total Gyms</span>
          <strong className="dashboard-stat-value">{dashboardData?.analytics?.total_gyms || gyms.length}</strong>
        </div>
        <div className="dashboard-card dashboard-stat-card">
          <span className="dashboard-stat-label">Today's Check-Ins</span>
          <strong className="dashboard-stat-value">{dashboardData?.analytics?.today_check_ins || 0}</strong>
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
              <thead><tr><th>Member</th><th>Gym</th><th>Time</th></tr></thead>
              <tbody>
                {recentCheckIns.length === 0 ? (
                  <tr><td colSpan="3">No recent check-ins found.</td></tr>
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
      </div>
    </>
  );
}
