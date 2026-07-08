import { useEffect, useState } from "react";
import { Scanner } from "@yudiel/react-qr-scanner";
import api from "../utils/api";

const TIER_LEVELS = { basic: 1, intermediate: 2, pro: 3 };

const DURATIONS = [
  { days: 30,  label: "1 Month",   multiplier: 1    },
  { days: 90,  label: "3 Months",  multiplier: 2.7  },
  { days: 365, label: "1 Year",    multiplier: 10   },
];

const PLANS = [
  {
    key: "basic",
    name: "Basic",
    monthlyPrice: 1100,
    tagline: "Neighborhood gyms whenever you want",
    perks: ["Basic-tier partner gyms", "Unlimited check-ins", "Attendance tracking"],
  },
  {
    key: "intermediate",
    name: "Intermediate",
    monthlyPrice: 2500,
    tagline: "A larger network, more options",
    perks: ["Basic + Intermediate gyms", "Priority support", "Attendance tracking"],
  },
  {
    key: "pro",
    name: "Pro",
    monthlyPrice: 4000,
    tagline: "A full network, no restrictions",
    perks: ["Access to partner gyms across Karachi", "Priority support", "Attendance tracking"],
  },
];

const PAY_METHODS = [
  { key: "jazzcash",  label: "JazzCash"           },
  { key: "easypaisa", label: "Easypaisa"           },
  { key: "card",      label: "Debit / Credit Card" },
];

export default function MemberDashboard({
  activeSection,
  dashboardData,
  gyms,
  setGyms,
  attendance,
  memberTier,
  setMemberTier,
  subscription,
  setSubscription,
  onReload,
}) {
  // QR scan states
  const [showScanner, setShowScanner] = useState(false);
  const [scanStatus, setScanStatus]   = useState(null);
  const [scanning, setScanning]       = useState(false);

  // Membership states
  const [selectedDuration, setSelectedDuration] = useState(30);

  // Checkout states
  const [checkout,      setCheckout]      = useState(null); // { plan, price }
  const [payMethod,     setPayMethod]     = useState("jazzcash");
  const [payForm,       setPayForm]       = useState({ name: "", account: "", expiry: "", cvv: "" });
  const [payFormError,  setPayFormError]  = useState("");
  const [payStep,       setPayStep]       = useState("form"); // form | processing | success
  const [reviewItems, setReviewItems] = useState([]);
  const [reviewForm, setReviewForm] = useState({});
  const [reviewStatus, setReviewStatus] = useState(null);

  const memberVisitCount = attendance.reduce(
    (sum, row) => sum + Number(row.total_days || 0), 0
  );
  const subscriptionExpiryDate = subscription?.subscription_expiry ? new Date(subscription.subscription_expiry) : null;
  const subscriptionDaysLeft = subscriptionExpiryDate
    ? Math.max(0, Math.ceil((subscriptionExpiryDate - new Date()) / 86400000))
    : null;
  const showExpiryNotice = Boolean(subscription?.is_active && subscriptionDaysLeft !== null && subscriptionDaysLeft <= 7);

  useEffect(() => {
    // Load reviews when the Reviews section is active
    if (activeSection !== "reviews") return;

    const loadReviews = async () => {
      try {
        const res = await api.get("/member/reviews");
        const items = res.data.data || [];
        setReviewItems(items);
        setReviewForm(items.reduce((acc, item) => ({
          ...acc,
          [item.gym_id]: {
            rating: item.my_review?.rating || 5,
            comment: item.my_review?.comment || "",
          },
        }), {}));
      } catch (err) {
        setReviewStatus({ type: "error", message: err.response?.data?.message || "Unable to load gym reviews." });
      }
    };

    loadReviews();
  }, [activeSection]);

  const handleReviewChange = (gymId, field, value) => {
    setReviewForm((prev) => ({ ...prev, [gymId]: { ...prev[gymId], [field]: value } }));
  };

  const handleReviewSave = async (gymId) => {
    setReviewStatus(null);
    try {
      const payload = reviewForm[gymId] || { rating: 5, comment: '' };
      const res = await api.post(`/member/gyms/${gymId}/review`, payload);
      setReviewStatus({ type: 'success', message: res.data.message || 'Review saved.' });
      // Refresh list
      const refreshed = await api.get('/member/reviews');
      const items = refreshed.data.data || [];
      setReviewItems(items);
      setReviewForm(items.reduce((acc, item) => ({
        ...acc,
        [item.gym_id]: {
          rating: item.my_review?.rating || 5,
          comment: item.my_review?.comment || '',
        },
      }), {}));
    } catch (err) {
      setReviewStatus({ type: 'error', message: err.response?.data?.message || 'Unable to save review.' });
    }
  };

  // ── QR Scan ──────────────────────────────────────────────
  const handleScanResult = async (detectedCodes) => {
    if (scanning) return;
    const scannedText = detectedCodes?.[0]?.rawValue?.trim();
    if (!scannedText) return;

    let gymId = scannedText;
    try { const p = JSON.parse(scannedText); if (p?.gym_id) gymId = p.gym_id; } catch (e) {}

    const resolvedGymId = Number(gymId);
    if (!resolvedGymId || Number.isNaN(resolvedGymId)) {
      setScanStatus({ type: "error", message: "The QR code is invalid." });
      return;
    }

    setScanning(true);
    setShowScanner(false);
    try {
      const res = await api.post("/member/check-in", { gym_id: resolvedGymId });
      setScanStatus({ type: "success", message: res.data.message });
      await onReload();
    } catch (err) {
      setScanStatus({ type: "error", message: err.response?.data?.message || "Check-in failed." });
    } finally {
      setScanning(false);
    }
  };

  // ── Checkout ─────────────────────────────────────────────
  const openCheckout = (plan, price) => {
    setCheckout({ plan, price });
    setPayMethod("jazzcash");
    setPayForm({ name: "", account: "", expiry: "", cvv: "" });
    setPayFormError("");
    setPayStep("form");
  };

  const closeCheckout = () => {
    if (payStep === "processing") return;
    setCheckout(null);
    setPayStep("form");
  };

  const handlePaySubmit = async (e) => {
    e.preventDefault();
    setPayFormError("");

    const account = payForm.account.replace(/\s/g, "");

    if (!payForm.name.trim()) {
      return setPayFormError(payMethod === "card" ? "Cardholder name required." : "Account holder name required.");
    }
    if (payMethod === "card") {
      if (!/^\d{16}$/.test(account))
        return setPayFormError("Valid 16-digit card number required.");
      if (!/^(0[1-9]|1[0-2])\s?\/\s?\d{2}$/.test(payForm.expiry.trim()))
        return setPayFormError("Valid expiry required in MM/YY format.");
      if (!/^\d{3,4}$/.test(payForm.cvv.trim()))
        return setPayFormError("Valid CVV required.");
    } else {
      if (!/^03\d{9}$/.test(account))
        return setPayFormError("Valid Pakistani mobile number required (03XXXXXXXXX).");
    }

    setPayStep("processing");
    await new Promise((r) => setTimeout(r, 2000));

    try {
      const res = await api.post("/member/subscribe", {
        plan: checkout.plan.key,
        duration_days: selectedDuration,
      });
      setMemberTier(res.data.data.tier);
      setSubscription({
        tier: res.data.data.tier,
        is_active: res.data.data.is_active,
        subscription_expiry: res.data.data.subscription_expiry,
      });
      const gymsRes = await api.get("/member/gyms");
      setGyms(gymsRes.data.data || []);
      setPayStep("success");
    } catch (err) {
      setPayFormError(err.response?.data?.message || "Payment failed. Please try again.");
      setPayStep("form");
    }
  };

  if (activeSection === "my-gyms") {
    const memberLevel = TIER_LEVELS[memberTier] || 1;
    const TIER_COLORS = { basic: "#0ea5e9", intermediate: "#f59e0b", pro: "#a855f7" };
    const allTiers = ["basic", "intermediate", "pro"];

    // Group gyms by tier
    const gymsByTier = allTiers.reduce((acc, tier) => {
      acc[tier] = gyms.filter((g) => g.allowed_tier === tier);
      return acc;
    }, {});

    return (
      <>
        {/* Member tier info banner */}
        <div className="dashboard-hero" style={{ marginBottom: 24 }}>
          <div className="dashboard-hero__copy">
            <span className="dashboard-eyebrow">Your Access Level</span>
            <h1>{memberTier} Plan</h1>
            <p>
              You can access all <strong>Basic</strong>
              {memberLevel >= 2 && <>, <strong>Intermediate</strong></>}
              {memberLevel >= 3 && <>, <strong>Pro</strong></>}
              {" "}tier gyms. Upgrade your plan to unlock more gyms.
            </p>
          </div>
          <div className="dashboard-hero__badge">{memberTier.toUpperCase()}</div>
        </div>

        {allTiers.map((tier) => {
          const tierLevel = TIER_LEVELS[tier];
          const isAccessible = memberLevel >= tierLevel;
          const tierGyms = gymsByTier[tier];
          const color = TIER_COLORS[tier];

          return (
            <div key={tier} className="dashboard-card" style={{ marginBottom: 24, opacity: isAccessible ? 1 : 0.5 }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
                <h3 style={{ margin: 0, padding: 0, border: "none", textTransform: "uppercase", color: isAccessible ? color : "#555" }}>
                  {tier} Tier Gyms
                </h3>
                <span style={{
                  fontSize: 11, fontFamily: "Oswald", letterSpacing: 1.5, textTransform: "uppercase",
                  padding: "4px 12px", borderRadius: 20,
                  border: `1px solid ${isAccessible ? color : "#333"}`,
                  color: isAccessible ? color : "#555",
                }}>
                  {isAccessible ? "✓ Accessible" : "🔒 Upgrade Required"}
                </span>
              </div>

              {tierGyms.length === 0 ? (
                <p className="dashboard-note">No {tier} tier gyms registered yet.</p>
              ) : (
                <div className="gym-cards-grid">
                  {tierGyms.map((gym, idx) => (
                    <div key={gym.id} className="gym-card" style={{ opacity: isAccessible ? 1 : 0.4, pointerEvents: isAccessible ? "auto" : "none" }}>
                      <div className="gym-card__accent-bar" style={{ background: isAccessible ? color : "#333" }} />
                      <div className="gym-card__body">
                        <div className="gym-card__header">
                          <span className="gym-card__tier-badge" style={{ borderColor: color, color }}>{gym.allowed_tier}</span>
                          <span className="gym-card__number">#{String(idx + 1).padStart(2, "0")}</span>
                        </div>
                        <h4 className="gym-card__name">{gym.gym_name}</h4>
                        <div className="gym-card__divider" />
                        <div className="gym-card__meta">
                          <div className="gym-card__meta-row">
                            <span className="gym-card__meta-label">Area</span>
                            <span className="gym-card__meta-value">{gym.area}</span>
                          </div>
                          <div className="gym-card__meta-row">
                            <span className="gym-card__meta-label">Address</span>
                            <span className="gym-card__meta-value">{gym.address || "—"}</span>
                          </div>
                        </div>
                        {isAccessible && (
                          <div style={{ marginTop: "auto", paddingTop: 12, fontSize: 11, color: "#0ea5e9", fontFamily: "Oswald", letterSpacing: 1, textTransform: "uppercase" }}>
                            ✓ You can check in here
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {!isAccessible && (
                <div style={{ marginTop: 16, padding: "12px 16px", borderRadius: 8, background: "rgba(255,255,255,0.03)", border: "1px solid #222", fontSize: 13, color: "#555" }}>
                  Upgrade to <strong style={{ color }}>{tier.charAt(0).toUpperCase() + tier.slice(1)}</strong> plan or higher to access these gyms.
                </div>
              )}
            </div>
          );
        })}
      </>
    );
  }

  if (activeSection === "scan-qr" || activeSection === "dashboard") {
    return (
      <>
        {showExpiryNotice && (
          <div className="dashboard-banner warning" style={{ marginBottom: 16 }}>
            ⚠️ Your <strong>{memberTier}</strong> membership expires in <strong>{subscriptionDaysLeft} day(s)</strong> on {subscriptionExpiryDate?.toLocaleDateString()}. Renew now to keep your access.
          </div>
        )}
        {scanStatus && (
          <div className={`dashboard-banner ${scanStatus.type}`}>{scanStatus.message}</div>
        )}
        <div className="dashboard-card dashboard-card--split">
          <div>
            <h3>Gym Check-In</h3>
            <p className="dashboard-note">Scan the QR code to save your attendance.</p>
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
                <Scanner onScan={handleScanResult} constraints={{ facingMode: "environment" }} />
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
            <p>Keep your membership active to access high-tier gyms.</p>
          </div>
        </div>
      </>
    );
  }

  if (activeSection === "attendance") {
    return (
      <div className="dashboard-card">
        <h3>Attendance History</h3>
        <div className="dashboard-table-wrap">
          <table className="dashboard-table">
            <thead><tr><th>Gym Name</th><th>Days</th><th>Last Visit</th></tr></thead>
            <tbody>
              {attendance.length === 0 ? (
                <tr><td colSpan="3">No check-ins yet.</td></tr>
              ) : attendance.map((row) => (
                <tr key={row.gym_id}>
                  <td>{row.gym_name}</td>
                  <td>{row.total_days}</td>
                  <td>{new Date(row.last_visit).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  if (activeSection === "membership") {
    const expiryDate  = subscription?.subscription_expiry ? new Date(subscription.subscription_expiry) : null;
    const daysLeft    = expiryDate ? Math.max(0, Math.ceil((expiryDate - new Date()) / 86400000)) : null;
    const durationInfo = DURATIONS.find((d) => d.days === selectedDuration);

    return (
      <>
        {showExpiryNotice && (
          <div className="dashboard-banner warning" style={{ marginBottom: 16 }}>
            ⚠️ Membership expires in <strong>{subscriptionDaysLeft} day(s)</strong>. Renew below.
          </div>
        )}
        {/* Status Strip */}
        <div className="membership-status">
          <div>
            <span className="dashboard-stat-label">Current Plan</span>
            <h3 className="membership-status__tier">{memberTier}</h3>
          </div>
          <div className="membership-status__divider" />
          <div>
            <span className="dashboard-stat-label">{subscription?.is_active ? "Active Until" : "Status"}</span>
            <p className="membership-status__value">
              {subscription?.is_active
                ? `${expiryDate?.toLocaleDateString()} · ${daysLeft} days remaining`
                : "Inactive — please select a plan"}
            </p>
          </div>
          <div className="membership-status__divider" />
          <div>
            <span className="dashboard-stat-label">Total Visits</span>
            <p className="membership-status__value">{memberVisitCount}</p>
          </div>
        </div>

        {/* Duration Toggle */}
        <div className="duration-toggle">
          <span className="duration-toggle__label">Duration:</span>
          {DURATIONS.map((d) => (
            <button
              key={d.days}
              type="button"
              className={`duration-chip ${selectedDuration === d.days ? "active" : ""}`}
              onClick={() => setSelectedDuration(d.days)}
            >
              {d.label}
            </button>
          ))}
        </div>

        {/* Plan Cards */}
        <div className="membership-plans">
          {PLANS.map((plan) => {
            const isCurrent  = memberTier === plan.key && subscription?.is_active;
            const price      = Math.round(plan.monthlyPrice * durationInfo.multiplier);
            const planLevel  = TIER_LEVELS[plan.key];
            return (
              <div key={plan.key} className={`plan-card ${isCurrent ? "plan-card--current" : ""}`}>
                {isCurrent && <span className="plan-card__badge">Current Plan</span>}
                <h4 className="plan-card__name">{plan.name}</h4>
                <p className="plan-card__tagline">{plan.tagline}</p>
                <div className="access-bar">
                  {[1, 2, 3].map((seg) => (
                    <span key={seg} className={`access-bar__segment ${seg <= planLevel ? "filled" : ""}`} />
                  ))}
                </div>
                <span className="access-bar__label">Network Reach: {planLevel}/3</span>
                <div className="plan-card__price">
                  <span className="plan-card__price-amount">Rs {price.toLocaleString()}</span>
                  <span className="plan-card__price-period">/ {durationInfo.label.toLowerCase()}</span>
                </div>
                <ul className="plan-card__perks">
                  {plan.perks.map((perk) => <li key={perk}>{perk}</li>)}
                </ul>
                <button
                  type="button"
                  className={`dashboard-btn ${isCurrent ? "dashboard-btn--ghost" : ""}`}
                  style={{ width: "100%" }}
                  disabled={isCurrent}
                  onClick={() => !isCurrent && openCheckout(plan, price)}
                >
                  {isCurrent ? "Current Plan" : `Choose ${plan.name}`}
                </button>
              </div>
            );
          })}
        </div>

        {/* Checkout Modal */}
        {checkout && (
          <div className="checkout-backdrop" onClick={closeCheckout}>
            <div className="checkout-modal" onClick={(e) => e.stopPropagation()}>

              {payStep === "success" ? (
                <div className="checkout-success">
                  <div className="checkout-success__icon">✓</div>
                  <span className="checkout-modal__eyebrow">Payment complete</span>
                  <h3>Payment Successful!</h3>
                  <p>Your <strong>{checkout.plan.name}</strong> plan is now active for {DURATIONS.find(d => d.days === selectedDuration)?.label}.</p>
                  <div className="checkout-success__summary">
                    <span>Total paid</span>
                    <strong>Rs {checkout.price.toLocaleString()}</strong>
                  </div>
                  <button className="dashboard-btn" style={{ width: "100%", marginTop: 24 }} onClick={closeCheckout}>
                    Back to Dashboard
                  </button>
                </div>
              ) : (
                <>
                  <div className="checkout-modal__header">
                    <div>
                      <span className="checkout-modal__eyebrow">Demo checkout</span>
                      <h3>{checkout.plan.name} Plan</h3>
                    </div>
                    <button className="checkout-modal__close" onClick={closeCheckout} disabled={payStep === "processing"}>×</button>
                  </div>

                  <div className="checkout-steps" aria-label="Checkout steps">
                    <span className={`checkout-step ${payStep === "form" ? "active" : ""}`}>1 Form</span>
                    <span className={`checkout-step ${payStep === "processing" ? "active" : ""}`}>2 Processing</span>
                    <span className="checkout-step">3 Success</span>
                  </div>

                  {/* Order Summary */}
                  <div className="checkout-summary">
                    <div className="checkout-summary__row">
                      <span>Plan</span><span>{checkout.plan.name}</span>
                    </div>
                    <div className="checkout-summary__row">
                      <span>Duration</span><span>{DURATIONS.find(d => d.days === selectedDuration)?.label}</span>
                    </div>
                    <div className="checkout-summary__row checkout-summary__row--total">
                      <span>Total</span><span>Rs {checkout.price.toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Payment Method Tabs */}
                  <div className="pay-tabs">
                    {PAY_METHODS.map((m) => (
                      <button
                        key={m.key}
                        type="button"
                        className={`pay-tab ${payMethod === m.key ? "active" : ""}`}
                        onClick={() => {
                          setPayMethod(m.key);
                          setPayForm({ name: payForm.name, account: "", expiry: "", cvv: "" });
                          setPayFormError("");
                        }}
                        disabled={payStep === "processing"}
                      >
                        {m.label}
                      </button>
                    ))}
                  </div>

                  {/* Payment Form */}
                  <form onSubmit={handlePaySubmit}>
                    <div className="checkout-fields">
                      <div className="gym-form__group">
                        <label className="gym-form__label">
                          {payMethod === "card" ? "Cardholder Name" : "Account Holder Name"}
                        </label>
                        <input
                          className="gym-form__input"
                          type="text"
                          placeholder="Full name"
                          value={payForm.name}
                          onChange={(e) => setPayForm({ ...payForm, name: e.target.value })}
                          disabled={payStep === "processing"}
                          autoComplete="name"
                        />
                      </div>

                      <div className="gym-form__group">
                        <label className="gym-form__label">
                          {payMethod === "card" ? "Card Number" : "Mobile Number"}
                        </label>
                        <input
                          className="gym-form__input"
                          type="text"
                          placeholder={payMethod === "card" ? "1234 5678 9012 3456" : "03XXXXXXXXX"}
                          value={payForm.account}
                          onChange={(e) => setPayForm({ ...payForm, account: e.target.value })}
                          disabled={payStep === "processing"}
                          maxLength={payMethod === "card" ? 19 : 11}
                          inputMode="numeric"
                        />
                      </div>

                      {payMethod === "card" && (
                        <div className="checkout-fields__row">
                          <div className="gym-form__group">
                            <label className="gym-form__label">Expiry</label>
                            <input
                              className="gym-form__input"
                              type="text"
                              placeholder="MM/YY"
                              value={payForm.expiry}
                              onChange={(e) => setPayForm({ ...payForm, expiry: e.target.value })}
                              maxLength={5}
                              disabled={payStep === "processing"}
                              inputMode="numeric"
                            />
                          </div>
                          <div className="gym-form__group">
                            <label className="gym-form__label">CVV</label>
                            <input
                              className="gym-form__input"
                              type="password"
                              placeholder="***"
                              value={payForm.cvv}
                              onChange={(e) => setPayForm({ ...payForm, cvv: e.target.value })}
                              maxLength={4}
                              disabled={payStep === "processing"}
                              inputMode="numeric"
                            />
                          </div>
                        </div>
                      )}
                    </div>

                    {payFormError && (
                      <div className="dashboard-banner error" style={{ marginBottom: 16 }}>{payFormError}</div>
                    )}

                    <button
                      type="submit"
                      className="dashboard-btn"
                      style={{ width: "100%" }}
                      disabled={payStep === "processing"}
                    >
                      {payStep === "processing" ? "Processing payment..." : `Pay Rs ${checkout.price.toLocaleString()}`}
                    </button>

                    {payStep === "processing" && (
                      <div className="checkout-processing">
                        <span className="checkout-processing__spinner" />
                        <span>Processing payment...</span>
                      </div>
                    )}
                  </form>

                  <p className="checkout-note">🔒 Demo checkout. No real payment is processed.</p>
                </>
              )}
            </div>
          </div>
        )}
      </>
    );
  }

  if (activeSection === 'reviews') {
    return (
      <div>
        <h3>My Gym Reviews</h3>
        {reviewStatus && <div className={`dashboard-banner ${reviewStatus.type}`}>{reviewStatus.message}</div>}
        {reviewItems.length === 0 ? (
          <div className="dashboard-card"><p className="dashboard-note">No visited gyms found to review.</p></div>
        ) : (
          <div className="dashboard-grid">
            {reviewItems.map((item) => (
              <div key={item.gym_id} className="dashboard-card review-card">
                <div className="review-card__head">
                  <h4>{item.gym_name}</h4>
                  <div className="review-card__meta">
                    <span>Avg: {item.average_rating ?? '—'}</span>
                    <span> · {item.reviews_count} reviews</span>
                  </div>
                </div>
                <div className="review-card__body">
                  <label className="gym-form__label">Rating</label>
                  <select className="gym-form__input" value={reviewForm[item.gym_id]?.rating || 5} onChange={(e) => handleReviewChange(item.gym_id, 'rating', Number(e.target.value))}>
                    {[5,4,3,2,1].map((r) => <option key={r} value={r}>{r} ★</option>)}
                  </select>
                  <label className="gym-form__label" style={{ marginTop: 8 }}>Comment</label>
                  <textarea className="gym-form__input" rows={3} value={reviewForm[item.gym_id]?.comment || ''} onChange={(e) => handleReviewChange(item.gym_id, 'comment', e.target.value)} />
                  <div style={{ marginTop: 8 }}>
                    <button className="dashboard-btn" onClick={() => handleReviewSave(item.gym_id)}>Save Review</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  // Default overview
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
              <thead><tr><th>Gym Name</th><th>Tier</th></tr></thead>
              <tbody>
                {gyms.length === 0 ? (
                  <tr><td colSpan="2">No gyms available yet.</td></tr>
                ) : gyms.map((gym) => (
                  <tr key={gym.id}>
                    <td>{gym.gym_name}</td>
                    <td>{gym.allowed_tier}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="dashboard-card">
          <h3>Attendance Summary</h3>
          <div className="dashboard-table-wrap">
            <table className="dashboard-table">
              <thead><tr><th>Gym Name</th><th>Days</th><th>Last Visit</th></tr></thead>
              <tbody>
                {attendance.length === 0 ? (
                  <tr><td colSpan="3">No check-ins yet.</td></tr>
                ) : attendance.map((row) => (
                  <tr key={row.gym_id}>
                    <td>{row.gym_name}</td>
                    <td>{row.total_days}</td>
                    <td>{new Date(row.last_visit).toLocaleString()}</td>
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
