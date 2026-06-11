import { NavLink, useNavigate } from "react-router-dom";
import React, { useState } from 'react';
import logo from '../assets/img/logo.png';
import API from '../utils/api';

export default function Signup() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    portal: 'member'
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      await API.post('/signup', formData);
      alert('Signup Kamyab! Ab Login karein.');
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundImage: 'url(/img/hero/hero-2.jpg)', backgroundSize: 'cover', backgroundPosition: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '30px 0' }}>
      <div style={{ background: 'rgba(0,0,0,0.75)', padding: '40px 35px', width: '100%', maxWidth: '400px', borderRadius: '4px' }}>
        
        <div style={{textAlign:'center', marginBottom:'30px'}}>
          <NavLink to="/"><img src={logo} alt="Logo" style={{height:'50px'}}/></NavLink>
        </div>

        {error && <p style={{ color: '#ff4d4d', textAlign: 'center', marginBottom: '15px' }}>{error}</p>}

        <form onSubmit={handleSubmit}>
          {/* Name Field (First + Last ko handle karne ke liye simple input) */}
          <div style={{marginBottom:'12px'}}>
            <input type="text" name="name" placeholder="Full Name" onChange={handleChange} required style={{ width:'100%', height:'44px', padding:'0 15px', background:'rgba(255,255,255,0.1)', border:'1px solid rgba(255,255,255,0.3)', color:'#fff', outline:'none', borderRadius:'3px' }}/>
          </div>
          <div style={{marginBottom:'12px'}}>
            <input type="email" name="email" placeholder="Email Address" onChange={handleChange} required style={{ width:'100%', height:'44px', padding:'0 15px', background:'rgba(255,255,255,0.1)', border:'1px solid rgba(255,255,255,0.3)', color:'#fff', outline:'none', borderRadius:'3px' }}/>
          </div>
          
          {/* Password Fields */}
          <div style={{marginBottom:'12px', position:'relative'}}>
            <input type={showPassword ? "text" : "password"} name="password" placeholder="Password" onChange={handleChange} required style={{ width:'100%', height:'44px', padding:'0 45px 0 15px', background:'rgba(255,255,255,0.1)', border:'1px solid rgba(255,255,255,0.3)', color:'#fff', borderRadius:'3px' }}/>
          </div>
          <div style={{marginBottom:'12px', position:'relative'}}>
            <input type={showConfirmPassword ? "text" : "password"} name="password_confirmation" placeholder="Confirm Password" onChange={handleChange} required style={{ width:'100%', height:'44px', padding:'0 45px 0 15px', background:'rgba(255,255,255,0.1)', border:'1px solid rgba(255,255,255,0.3)', color:'#fff', borderRadius:'3px' }}/>
          </div>

          <button type="submit" disabled={loading} style={{ width:'100%', height:'44px', background:'#f34e3a', color:'#fff', fontWeight:'bold', border:'none', borderRadius:'4px', cursor:'pointer' }}>
            {loading ? 'Creating...' : 'Create Account'}
          </button>
        </form>

        {/* Divider & Socials wapas aa gaye */}
        <div style={{display:'flex', alignItems:'center', margin:'20px 0'}}>
          <div style={{flex:1, height:'1px', background:'rgba(255,255,255,0.2)'}}></div>
          <span style={{color:'#ccc', padding:'0 10px', fontSize:'13px'}}>OR</span>
          <div style={{flex:1, height:'1px', background:'rgba(255,255,255,0.2)'}}></div>
        </div>

        <div style={{display:'flex', gap:'10px', marginBottom:'20px'}}>
          <NavLink to="#" style={{flex:1, height:'44px', display:'flex', alignItems:'center', justifyContent:'center', background:'#3b5998', color:'#fff', borderRadius:'4px'}}>FB</NavLink>
          <NavLink to="#" style={{flex:1, height:'44px', display:'flex', alignItems:'center', justifyContent:'center', background:'#dd4b39', color:'#fff', borderRadius:'4px'}}>G+</NavLink>
        </div>

        <p style={{textAlign:'center', color:'#ccc', fontSize:'13px'}}>
          Already have an account? <NavLink to="/login" style={{color:'#e53637', fontWeight:'700'}}>Login</NavLink>
        </p>
      </div>
    </div>
  )
}