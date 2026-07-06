import { NavLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import logo from '../assets/img/logo.png';
import API from '../utils/api';

const inputStyle = {
  width: '100%', height: '44px', padding: '0 15px',
  background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.3)',
  color: '#fff', outline: 'none', borderRadius: '3px',
};
const btnStyle = {
  width: '100%', height: '44px', background: '#f34e3a',
  color: '#fff', fontWeight: 'bold', border: 'none', borderRadius: '4px', cursor: 'pointer',
};

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [step, setStep]       = useState(1); // 1=email, 2=otp, 3=new password
  const [email, setEmail]     = useState('');
  const [otp, setOtp]         = useState('');
  const [password, setPassword]             = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState('');
  const [success, setSuccess] = useState('');

  // Step 1 — Send OTP
  const handleSendOtp = async (e) => {
    e.preventDefault();
    setLoading(true); setError('');
    try {
      await API.post('/forgot-password', { email });
      setSuccess('OTP sent to your email. Check your inbox.');
      setStep(2);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to send OTP.');
    } finally {
      setLoading(false);
    }
  };

  // Step 2 — Verify OTP
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setLoading(true); setError(''); setSuccess('');
    try {
      await API.post('/verify-otp', { email, otp });
      setSuccess('OTP verified! Now set your new password.');
      setStep(3);
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid OTP.');
    } finally {
      setLoading(false);
    }
  };

  // Step 3 — Reset Password
  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (password !== passwordConfirm) { setError('Passwords do not match.'); return; }
    setLoading(true); setError(''); setSuccess('');
    try {
      await API.post('/reset-password', {
        email,
        otp,
        password,
        password_confirmation: passwordConfirm,
      });
      setSuccess('Password reset successfully!');
      setTimeout(() => navigate('/login'), 1500);
    } catch (err) {
      setError(err.response?.data?.message || 'Password reset failed.');
    } finally {
      setLoading(false);
    }
  };

  const stepLabel = ['Enter Email', 'Verify OTP', 'New Password'];

  return (
    <div style={{ minHeight: '100vh', backgroundImage: 'url(/img/hero/hero-1.jpg)', backgroundSize: 'cover', backgroundPosition: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '30px 0' }}>
      <div style={{ background: 'rgba(0,0,0,0.75)', padding: '40px 35px', width: '100%', maxWidth: '400px', borderRadius: '4px' }}>

        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <NavLink to="/"><img src={logo} alt="Logo" style={{ height: '50px' }} /></NavLink>
        </div>

        {/* Step indicator */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '24px' }}>
          {[1, 2, 3].map(s => (
            <div key={s} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <div style={{
                width: '28px', height: '28px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: step >= s ? '#f34e3a' : 'rgba(255,255,255,0.15)',
                color: '#fff', fontSize: '12px', fontWeight: 'bold',
              }}>{s}</div>
              {s < 3 && <div style={{ width: '30px', height: '1px', background: step > s ? '#f34e3a' : 'rgba(255,255,255,0.2)' }} />}
            </div>
          ))}
        </div>

        <p style={{ color: '#ccc', textAlign: 'center', marginBottom: '20px', fontSize: '13px' }}>
          {step === 1 && 'Enter your email to receive a 6-digit OTP.'}
          {step === 2 && `Enter the OTP sent to ${email}`}
          {step === 3 && 'Choose a new password (min 6 characters).'}
        </p>

        {error   && <p style={{ color: '#ff4d4d', textAlign: 'center', marginBottom: '15px', fontSize: '13px' }}>{error}</p>}
        {success && <p style={{ color: '#4caf50', textAlign: 'center', marginBottom: '15px', fontSize: '13px' }}>{success}</p>}

        {/* Step 1 — Email */}
        {step === 1 && (
          <form onSubmit={handleSendOtp}>
            <div style={{ marginBottom: '12px' }}>
              <input type="email" value={email} placeholder="Email Address" onChange={e => setEmail(e.target.value)} required style={inputStyle} />
            </div>
            <button type="submit" disabled={loading} style={btnStyle}>
              {loading ? 'Sending OTP...' : 'Send OTP'}
            </button>
          </form>
        )}

        {/* Step 2 — OTP */}
        {step === 2 && (
          <form onSubmit={handleVerifyOtp}>
            <div style={{ marginBottom: '12px' }}>
              <input
                type="text" value={otp} placeholder="Enter 6-digit OTP"
                onChange={e => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                maxLength={6} required
                style={{ ...inputStyle, textAlign: 'center', fontSize: '22px', letterSpacing: '8px' }}
              />
            </div>
            <button type="submit" disabled={loading} style={btnStyle}>
              {loading ? 'Verifying...' : 'Verify OTP'}
            </button>
            <button type="button" onClick={() => { setStep(1); setError(''); setSuccess(''); }} style={{ ...btnStyle, background: 'transparent', border: '1px solid rgba(255,255,255,0.3)', marginTop: '8px' }}>
              ← Change Email
            </button>
          </form>
        )}

        {/* Step 3 — New Password */}
        {step === 3 && (
          <form onSubmit={handleResetPassword}>
            <div style={{ marginBottom: '12px' }}>
              <input type="password" value={password} placeholder="New Password" onChange={e => setPassword(e.target.value)} required style={inputStyle} />
            </div>
            <div style={{ marginBottom: '12px' }}>
              <input type="password" value={passwordConfirm} placeholder="Confirm New Password" onChange={e => setPasswordConfirm(e.target.value)} required style={inputStyle} />
            </div>
            <button type="submit" disabled={loading} style={btnStyle}>
              {loading ? 'Resetting...' : 'Reset Password'}
            </button>
          </form>
        )}

        <p style={{ textAlign: 'center', color: '#ccc', fontSize: '13px', marginTop: '20px' }}>
          <NavLink to="/login" style={{ color: '#e53637', fontWeight: '700' }}>Back to Login</NavLink>
        </p>

      </div>
    </div>
  );
}
