import { NavLink, useNavigate, useSearchParams } from 'react-router-dom';
import { useState } from 'react';
import logo from '../assets/img/logo.png';
import API from '../utils/api';

export default function ResetPassword() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState('');
  const [formData, setFormData] = useState({
    email:                 searchParams.get('email') || '',
    token:                 searchParams.get('token') || '',
    password:              '',
    password_confirmation: '',
  });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await API.post('/reset-password', formData);
      navigate('/login', { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || 'Password reset failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundImage: 'url(/img/hero/hero-2.jpg)', backgroundSize: 'cover', backgroundPosition: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '30px 0' }}>
      <div style={{ background: 'rgba(0,0,0,0.75)', padding: '40px 35px', width: '100%', maxWidth: '400px', borderRadius: '4px' }}>

        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <NavLink to="/"><img src={logo} alt="Logo" style={{ height: '50px' }} /></NavLink>
        </div>

        <p style={{ color: '#ccc', textAlign: 'center', marginBottom: '20px', fontSize: '13px' }}>
          Set a new password for your account. Minimum 6 characters.
        </p>

        {error && <p style={{ color: '#ff4d4d', textAlign: 'center', marginBottom: '15px' }}>{error}</p>}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '12px' }}>
            <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} required style={{ width: '100%', height: '44px', padding: '0 15px', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.3)', color: '#fff', outline: 'none', borderRadius: '3px' }} />
          </div>

          <div style={{ marginBottom: '12px' }}>
            <input type="text" name="token" placeholder="Reset Token" value={formData.token} onChange={handleChange} required style={{ width: '100%', height: '44px', padding: '0 15px', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.3)', color: '#fff', outline: 'none', borderRadius: '3px' }} />
          </div>

          <div style={{ marginBottom: '12px' }}>
            <input type="password" name="password" placeholder="New Password" value={formData.password} onChange={handleChange} required style={{ width: '100%', height: '44px', padding: '0 15px', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.3)', color: '#fff', outline: 'none', borderRadius: '3px' }} />
          </div>

          <div style={{ marginBottom: '12px' }}>
            <input type="password" name="password_confirmation" placeholder="Confirm New Password" value={formData.password_confirmation} onChange={handleChange} required style={{ width: '100%', height: '44px', padding: '0 15px', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.3)', color: '#fff', outline: 'none', borderRadius: '3px' }} />
          </div>

          <button type="submit" disabled={loading} style={{ width: '100%', height: '44px', background: '#f34e3a', color: '#fff', fontWeight: 'bold', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
            {loading ? 'Resetting...' : 'Reset Password'}
          </button>
        </form>

        <p style={{ textAlign: 'center', color: '#ccc', fontSize: '13px', marginTop: '20px' }}>
          <NavLink to="/login" style={{ color: '#e53637', fontWeight: '700' }}>Back to Login</NavLink>
        </p>

      </div>
    </div>
  );
}
