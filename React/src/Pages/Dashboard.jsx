import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";
import Sidebar from "../components/Sidebar";
import { Scanner } from "@yudiel/react-qr-scanner";
import QRCode from "react-qr-code";

const Dashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState(null);
  const [activeSection, setActiveSection] = useState('dashboard');
  const [dashboardData, setDashboardData] = useState(null);
  const [gyms, setGyms] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [recentCheckIns, setRecentCheckIns] = useState([]);
  const [adminStats, setAdminStats] = useState(null);
  const [memberTier, setMemberTier] = useState('basic');
  const [showScanner, setShowScanner] = useState(false);
  const [scanStatus, setScanStatus] = useState(null);
  const [scanning, setScanning] = useState(false);
  const [qrPreview, setQrPreview] = useState({
    open: false,
    loading: false,
    gymName: '',
    qrValue: '',
    error: '',
  });

  const loadDashboard = async () => {
    try {
      setLoading(true);

      const configResponse = await api.get('/dashboard-config');
      const resolvedRole = configResponse.data.role || 'member';

      setRole(resolvedRole);
      localStorage.setItem('role', resolvedRole);
      setActiveSection('dashboard');

      if (resolvedRole === 'member') {
        const [memberDashboardResponse, memberGymsResponse, attendanceResponse] = await Promise.all([
          api.get('/member/dashboard'),
          api.get('/member/gyms'),
          api.get('/member/check-in/attendance-summary'),
        ]);

        setDashboardData(memberDashboardResponse.data);
        setGyms(memberGymsResponse.data.data || []);
        setAttendance(attendanceResponse.data.data || []);
        setMemberTier(memberGymsResponse.data.member_tier || 'basic');
        setRecentCheckIns([]);
        setAdminStats(null);
      } else if (resolvedRole === 'owner') {
        const [ownerDashboardResponse, ownerGymsResponse] = await Promise.all([
          api.get('/owner/dashboard'),
          api.get('/owner/gyms'),
        ]);

        setDashboardData(ownerDashboardResponse.data);
        setGyms(ownerGymsResponse.data.gyms || []);
        setAttendance([]);
        setRecentCheckIns(ownerDashboardResponse.data.recent_check_ins || []);
        setAdminStats(null);
      } else if (resolvedRole === 'admin') {
        const adminDashboardResponse = await api.get('/admin/dashboard');

        setDashboardData(adminDashboardResponse.data);
        setGyms([]);
        setAttendance([]);
        setRecentCheckIns(adminDashboardResponse.data.recent_check_ins || []);
        setAdminStats(adminDashboardResponse.data.stats || null);
      }
    } catch (error) {
      if (error?.response?.status === 401) {
        navigate('/login', { replace: true });
        return;
      }

      console.error('Dashboard load error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  const handleScanResult = async (detectedCodes) => {
    if (scanning) return;

    const scannedText = detectedCodes?.[0]?.rawValue?.trim();
    if (!scannedText) return;

    let gymId = scannedText;

    try {
      const parsed = JSON.parse(scannedText);
      if (parsed?.gym_id) {
        gymId = parsed.gym_id;
      }
    } catch (error) {
      // plain text QR accepted
    }

    const resolvedGymId = Number(gymId);

    if (!resolvedGymId || Number.isNaN(resolvedGymId)) {
      setScanStatus({ type: 'error', message: 'QR code invalid hai.' });
      return;
    }

    setScanning(true);
    setShowScanner(false);

    try {
      const response = await api.post('/member/check-in', { gym_id: resolvedGymId });
      setScanStatus({ type: 'success', message: response.data.message });
      await loadDashboard();
    } catch (error) {
      setScanStatus({
        type: 'error',
        message: error.response?.data?.message || 'Check-in failed.',
      });
    } finally {
      setScanning(false);
    }
  };

  const closeQrPreview = () => {
    setQrPreview({
      open: false,
      loading: false,
      gymName: '',
      qrValue: '',
      error: '',
    });
  };

  const handlePrintQr = (gym) => {
    if (!gym?.id) {
      setQrPreview({
        open: true,
        loading: false,
        gymName: gym?.gym_name || 'Unknown Gym',
        qrValue: '',
        error: 'Gym ID nahi mila, QR generate nahi ho saka.',
      });
      return;
    }

    setQrPreview({
      open: true,
      loading: false,
      gymName: gym.gym_name,
      qrValue: JSON.stringify({ gym_id: gym.id }),
      error: '',
    });
  };

  const memberVisitCount = attendance.reduce((count, row) => count + Number(row.total_days || 0), 0);

  const roleSections = {
    member: [
      { key: 'dashboard', label: 'Dashboard' },
      { key: 'scan-qr', label: 'Scan QR / Check-In' },
      { key: 'attendance', label: 'Attendance History' },
      { key: 'membership', label: 'My Membership' },
    ],
    owner: [
      { key: 'dashboard', label: 'Dashboard' },
      { key: 'my-gyms', label: 'My Gyms' },
      { key: 'qr-center', label: 'QR Print Center' },
      { key: 'recent-checkins', label: 'Recent Check-Ins' },
    ],
    admin: [
      { key: 'dashboard', label: 'Dashboard' },
      { key: 'overview', label: 'System Overview' },
      { key: 'members', label: 'Members' },
      { key: 'owners', label: 'Owners' },
      { key: 'gyms', label: 'Gyms' },
    ],
  };

  const handleSectionChange = (sectionKey) => {
    setActiveSection(sectionKey);
    setShowScanner(false);
    setScanStatus(null);
  };

  if (loading || !role) return <div className="dashboard-loading">Loading dashboard...</div>;

  const isMember = role === 'member';
  const isOwner = role === 'owner';
  const isAdmin = role === 'admin';

  const roleTitle = isMember ? 'Member Dashboard' : isOwner ? 'Owner Dashboard' : 'Admin Dashboard';
  const roleSummary = isMember
    ? 'Scan QR, track your visits, and keep your membership active.'
    : isOwner
      ? 'Manage your gyms, print QR codes, and monitor check-ins.'
      : 'Review system health, accounts, and gym activity at a glance.';

  const renderMemberSection = () => {
    if (activeSection === 'scan-qr' || activeSection === 'dashboard') {
      return (
        <div className="dashboard-card dashboard-card--split">
          <div>
            <h3>Gym Check-In</h3>
            <p className="dashboard-note">Member dashboard par QR scan karke attendance save karein.</p>
            {!showScanner ? (
              <button className="dashboard-btn" onClick={() => setShowScanner(true)} disabled={scanning}>
                {scanning ? 'Processing...' : 'Scan QR to Check-In'}
              </button>
            ) : (
              <div className="dashboard-qr-box">
                <Scanner onScan={handleScanResult} constraints={{ facingMode: 'environment' }} />
                <button className="dashboard-btn dashboard-btn--ghost" onClick={() => setShowScanner(false)}>
                  Cancel
                </button>
              </div>
            )}
          </div>

          <div className="dashboard-mini-card">
            <span className="dashboard-mini-card__label">Membership Status</span>
            <h4>{dashboardData?.message || 'Welcome back'}</h4>
            <p>Apni membership active rakhein taake high-tier gyms mein access milta rahe.</p>
          </div>
        </div>
      );
    }

    if (activeSection === 'attendance') {
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
                  <tr>
                    <td colSpan="3">Abhi tak koi check-in nahi hua.</td>
                  </tr>
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

    if (activeSection === 'membership') {
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
                  <tr>
                    <th>Gym Name</th>
                    <th>Tier</th>
                  </tr>
                </thead>
                <tbody>
                  {gyms.length === 0 ? (
                    <tr>
                      <td colSpan="2">No gyms available yet.</td>
                    </tr>
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
                  <tr>
                    <th>Gym Name</th>
                    <th>Days</th>
                    <th>Last Visit</th>
                  </tr>
                </thead>
                <tbody>
                  {attendance.length === 0 ? (
                    <tr>
                      <td colSpan="3">Abhi tak koi check-in nahi hua.</td>
                    </tr>
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

  const renderOwnerSection = () => {
    if (activeSection === 'my-gyms' || activeSection === 'qr-center' || activeSection === 'dashboard') {
      return (
        <>
          {qrPreview.open && (
            <div className="dashboard-card qr-preview-card">
              <div className="qr-preview-card__head">
                <div>
                  <p className="qr-preview-card__eyebrow">QR Print Center</p>
                  <h3>{qrPreview.gymName}</h3>
                </div>
                <button type="button" className="dashboard-btn dashboard-btn--ghost" onClick={closeQrPreview}>
                  Close Preview
                </button>
              </div>

              {qrPreview.loading ? (
                <div className="qr-modal__loading">QR load ho raha hai...</div>
              ) : qrPreview.error ? (
                <div className="qr-modal__error">{qrPreview.error}</div>
              ) : (
                <div className="qr-modal__preview">
                  <QRCode value={qrPreview.qrValue} size={220} />
                </div>
              )}

              <div className="qr-preview-card__actions">
                <button type="button" className="dashboard-btn" onClick={closeQrPreview}>
                  Close Preview
                </button>
              </div>
            </div>
          )}

          <div className="dashboard-card">
            <h3>My Gyms</h3>
            <div className="dashboard-table-wrap">
              <table className="dashboard-table">
                <thead>
                  <tr>
                    <th>Gym Name</th>
                    <th>Area</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {gyms.length === 0 ? (
                    <tr>
                      <td colSpan="3">No gyms added yet.</td>
                    </tr>
                  ) : (
                    gyms.map((gym) => (
                      <tr key={gym.id}>
                        <td>{gym.gym_name}</td>
                        <td>{gym.area}</td>
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
        </>
      );
    }

    if (activeSection === 'recent-checkins') {
      return (
        <div className="dashboard-card">
          <h3>Recent Check-Ins</h3>
          <div className="dashboard-table-wrap">
            <table className="dashboard-table">
              <thead>
                <tr>
                  <th>Member</th>
                  <th>Gym</th>
                  <th>Time</th>
                </tr>
              </thead>
              <tbody>
                {recentCheckIns.length === 0 ? (
                  <tr>
                    <td colSpan="3">No recent check-ins found.</td>
                  </tr>
                ) : (
                  recentCheckIns.map((checkIn) => (
                    <tr key={checkIn.id}>
                      <td>{checkIn.user?.name}</td>
                      <td>{checkIn.gym?.gym_name}</td>
                      <td>{new Date(checkIn.checked_in_at).toLocaleString()}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      );
    }

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
          <div className="dashboard-card">
            <h3>My Gyms</h3>
            <div className="dashboard-table-wrap">
              <table className="dashboard-table">
                <thead>
                  <tr>
                    <th>Gym Name</th>
                    <th>Area</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {gyms.length === 0 ? (
                    <tr>
                      <td colSpan="3">No gyms added yet.</td>
                    </tr>
                  ) : (
                    gyms.map((gym) => (
                      <tr key={gym.id}>
                        <td>{gym.gym_name}</td>
                        <td>{gym.area}</td>
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

          <div className="dashboard-card">
            <h3>Recent Check-Ins</h3>
            <div className="dashboard-table-wrap">
              <table className="dashboard-table">
                <thead>
                  <tr>
                    <th>Member</th>
                    <th>Gym</th>
                    <th>Time</th>
                  </tr>
                </thead>
                <tbody>
                  {recentCheckIns.length === 0 ? (
                    <tr>
                      <td colSpan="3">No recent check-ins found.</td>
                    </tr>
                  ) : (
                    recentCheckIns.map((checkIn) => (
                      <tr key={checkIn.id}>
                        <td>{checkIn.user?.name}</td>
                        <td>{checkIn.gym?.gym_name}</td>
                        <td>{new Date(checkIn.checked_in_at).toLocaleString()}</td>
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

  const renderAdminSection = () => {
    if (activeSection === 'overview' || activeSection === 'dashboard') {
      return (
        <div className="dashboard-grid dashboard-grid--four">
          <div className="dashboard-card dashboard-stat-card">
            <span className="dashboard-stat-label">Members</span>
            <strong className="dashboard-stat-value">{adminStats?.members || 0}</strong>
          </div>
          <div className="dashboard-card dashboard-stat-card">
            <span className="dashboard-stat-label">Owners</span>
            <strong className="dashboard-stat-value">{adminStats?.owners || 0}</strong>
          </div>
          <div className="dashboard-card dashboard-stat-card">
            <span className="dashboard-stat-label">Gyms</span>
            <strong className="dashboard-stat-value">{adminStats?.gyms || 0}</strong>
          </div>
          <div className="dashboard-card dashboard-stat-card">
            <span className="dashboard-stat-label">Check-Ins</span>
            <strong className="dashboard-stat-value">{adminStats?.check_ins || 0}</strong>
          </div>
        </div>
      );
    }

    if (activeSection === 'members') {
      return (
        <div className="dashboard-card">
          <h3>Members</h3>
          <div className="dashboard-mini-card">
            <span className="dashboard-mini-card__label">Total Members</span>
            <h4>{adminStats?.members || 0}</h4>
            <p>Members are managed from the users table. Use the admin panel later for CRUD.</p>
          </div>
        </div>
      );
    }

    if (activeSection === 'owners') {
      return (
        <div className="dashboard-card">
          <h3>Owners</h3>
          <div className="dashboard-mini-card">
            <span className="dashboard-mini-card__label">Total Owners</span>
            <h4>{adminStats?.owners || 0}</h4>
            <p>Owner accounts are already role-based and secured by Sanctum abilities.</p>
          </div>
        </div>
      );
    }

    if (activeSection === 'gyms') {
      return (
        <div className="dashboard-card">
          <h3>Gyms</h3>
          <div className="dashboard-mini-card">
            <span className="dashboard-mini-card__label">Total Gyms</span>
            <h4>{adminStats?.gyms || 0}</h4>
            <p>Gym level management stays on the owner side for now.</p>
          </div>
        </div>
      );
    }

    return (
      <div className="dashboard-grid dashboard-grid--two">
        <div className="dashboard-card">
          <h3>System Overview</h3>
          <p className="dashboard-note">Yeh admin console system-wide health aur activity ka quick snapshot deta hai.</p>
          <div className="dashboard-mini-card">
            <span className="dashboard-mini-card__label">Message</span>
            <h4>{dashboardData?.message || 'Welcome to Super Admin Master Control'}</h4>
          </div>
        </div>

        <div className="dashboard-card">
          <h3>Recent Check-Ins</h3>
          <div className="dashboard-table-wrap">
            <table className="dashboard-table">
              <thead>
                <tr>
                  <th>Member</th>
                  <th>Gym</th>
                  <th>Time</th>
                </tr>
              </thead>
              <tbody>
                {recentCheckIns.length === 0 ? (
                  <tr>
                    <td colSpan="3">No recent check-ins found.</td>
                  </tr>
                ) : (
                  recentCheckIns.map((checkIn) => (
                    <tr key={checkIn.id}>
                      <td>{checkIn.user?.name}</td>
                      <td>{checkIn.gym?.gym_name}</td>
                      <td>{new Date(checkIn.checked_in_at).toLocaleString()}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="dashboard-wrapper">
      <Sidebar role={role} activeSection={activeSection} onSectionChange={handleSectionChange} />
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