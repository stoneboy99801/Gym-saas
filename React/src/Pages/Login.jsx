import { NavLink, useNavigate } from "react-router-dom";
import React, { useState } from 'react';
import logo from '../assets/img/logo.png';
import API from '../utils/api';

export default function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await API.post('/login', { ...formData, portal: 'member' });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      localStorage.setItem(
  "role",
  response.data.role
);
      alert('Login Kamyab!');
      
      // Role check aur redirection
      if (response.data.role === 'member') navigate('/member/dashboard');
      else if (response.data.role === 'owner') navigate('/owner/dashboard');
      
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundImage: 'url(/img/hero/hero-1.jpg)', backgroundSize: 'cover', backgroundPosition: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ background: 'rgba(0,0,0,0.75)', padding: '40px 35px', width: '100%', maxWidth: '400px', borderRadius: '4px' }}>
        
        <div style={{textAlign:'center', marginBottom:'30px'}}>
          <NavLink to="/"><img src={logo} alt="Logo" style={{height:'50px'}}/></NavLink>
        </div>

        {error && <p style={{ color: '#ff4d4d', textAlign: 'center', marginBottom: '15px' }}>{error}</p>}

        <form onSubmit={handleSubmit}>
          <div style={{marginBottom:'12px'}}>
            <input type="email" name="email" placeholder="Email Address" onChange={handleChange} required style={{ width:'100%', height:'44px', padding:'0 15px', background:'rgba(255,255,255,0.1)', border:'1px solid #333', color:'#fff' }}/>
          </div>
          <div style={{marginBottom:'20px', position:'relative'}}>
            <input type={showPassword ? "text" : "password"} name="password" placeholder="Password" onChange={handleChange} required style={{ width:'100%', height:'44px', padding:'0 15px', background:'rgba(255,255,255,0.1)', border:'1px solid #333', color:'#fff' }}/>
          </div>

          <button type="submit" disabled={loading} style={{ width:'100%', height:'44px', background:'#f34e3a', color:'#fff', fontWeight:'bold', border:'none', borderRadius:'4px', cursor:'pointer' }}>
            {loading ? 'Logging in...' : 'Sign In'}
          </button>
        </form>

        <div style={{display:'flex', alignItems:'center', margin:'20px 0'}}>
          <div style={{flex:1, height:'1px', background:'rgba(255,255,255,0.2)'}}></div>
          <span style={{color:'#ccc', padding:'0 10px', fontSize:'13px'}}>OR</span>
          <div style={{flex:1, height:'1px', background:'rgba(255,255,255,0.2)'}}></div>
        </div>

        <p style={{textAlign:'center', color:'#ccc', fontSize:'13px'}}>
          Don't have an account? <NavLink to="/signup" style={{color:'#e53637', fontWeight:'700'}}>Signup</NavLink>
        </p>
      </div>
    </div>
  )
}