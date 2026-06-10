import { NavLink } from "react-router-dom";
import React, { useState } from 'react'
import logo from '../assets/img/logo.png'

export default function Login() {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div style={{
      minHeight: '100vh',
      backgroundImage: 'url(/img/hero/hero-1.jpg)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <div style={{
        background: 'rgba(0,0,0,0.75)',
        padding: '40px 35px',
        width: '100%',
        maxWidth: '400px',
        borderRadius: '4px'
      }}>
        {/* Logo */}
        <div style={{textAlign:'center', marginBottom:'30px'}}>
          <NavLink to="/"><img src={logo} alt="Logo" style={{height:'50px'}}/></NavLink>
        </div>

        {/* Form */}
        <form action="#">
          <div style={{marginBottom:'12px'}}>
            <input type="email" placeholder="Email Address" style={{
              width:'100%', height:'44px', padding:'0 15px',
              background:'rgba(255,255,255,0.1)', border:'1px solid rgba(255,255,255,0.3)',
              color:'#fff', fontSize:'14px', outline:'none', borderRadius:'3px'
            }}/>
          </div>
          <div style={{marginBottom:'12px', position:'relative'}}>
            <input type={showPassword ? "text" : "password"} placeholder="Password" style={{
              width:'100%', height:'44px', padding:'0 45px 0 15px',
              background:'rgba(255,255,255,0.1)', border:'1px solid rgba(255,255,255,0.3)',
              color:'#fff', fontSize:'14px', outline:'none', borderRadius:'3px'
            }}/>
            <span onClick={() => setShowPassword(!showPassword)} style={{
              position:'absolute', right:'15px', top:'50%', transform:'translateY(-50%)',
              cursor:'pointer', color:'#ccc', fontSize:'16px'
            }}>
              <i className={`fa ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
            </span>
          </div>
          <button type="submit" className="primary-btn" style={{
            width:'100%', height:'44px', fontSize:'14px', letterSpacing:'1px', marginBottom:'15px'
          }}>Login</button>
          <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'15px'}}>
            <label style={{color:'#ccc', fontSize:'13px', cursor:'pointer'}}>
              <input type="checkbox" style={{marginRight:'6px'}}/> Remember me
            </label>
            <NavLink to="/forgot-password" style={{color:'#e53637', fontSize:'13px'}}>Forgot Password?</NavLink>
          </div>
        </form>

        {/* Divider */}
        <div style={{display:'flex', alignItems:'center', marginBottom:'15px'}}>
          <div style={{flex:1, height:'1px', background:'rgba(255,255,255,0.2)'}}></div>
          <span style={{color:'#ccc', padding:'0 10px', fontSize:'13px'}}>OR</span>
          <div style={{flex:1, height:'1px', background:'rgba(255,255,255,0.2)'}}></div>
        </div>

        {/* Social */}
        <div style={{display:'flex', gap:'10px', marginBottom:'20px'}}>
          <NavLink to="#" style={{flex:1, height:'44px', display:'flex', alignItems:'center', justifyContent:'center', background:'#3b5998', color:'#fff', fontSize:'18px', borderRadius:'4px', transition:'opacity 0.3s'}} onMouseOver={e=>e.currentTarget.style.opacity='0.85'} onMouseOut={e=>e.currentTarget.style.opacity='1'}>
            <i className="fa fa-facebook"></i>
          </NavLink>
          <NavLink to="#" style={{flex:1, height:'44px', display:'flex', alignItems:'center', justifyContent:'center', background:'#dd4b39', color:'#fff', fontSize:'18px', borderRadius:'4px', transition:'opacity 0.3s'}} onMouseOver={e=>e.currentTarget.style.opacity='0.85'} onMouseOut={e=>e.currentTarget.style.opacity='1'}>
            <i className="fa fa-google"></i>
          </NavLink>
          <NavLink to="#" style={{flex:1, height:'44px', display:'flex', alignItems:'center', justifyContent:'center', background:'#1da1f2', color:'#fff', fontSize:'18px', borderRadius:'4px', transition:'opacity 0.3s'}} onMouseOver={e=>e.currentTarget.style.opacity='0.85'} onMouseOut={e=>e.currentTarget.style.opacity='1'}>
            <i className="fa fa-twitter"></i>
          </NavLink>
        </div>

        {/* Redirect */}
        <p style={{textAlign:'center', color:'#ccc', fontSize:'13px', margin:0}}>
          Don't have an account? <NavLink to="/signup" style={{color:'#e53637', fontWeight:'700'}}>Sign Up</NavLink>
        </p>
      </div>
    </div>
  )
}
