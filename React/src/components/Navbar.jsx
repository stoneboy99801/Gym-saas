import { NavLink } from 'react-router-dom'
import logo from '../assets/img/logo.png'

export default function Navbar() {
  return (
    <>
      <div id="preloder">
        <div className="loader"></div>
      </div>

      <div className="offcanvas-menu-overlay"></div>
      <div className="offcanvas-menu-wrapper">
        <div className="canvas-close">
          <i className="fa fa-close"></i>
        </div>
        <div className="canvas-search search-switch">
          <i className="fa fa-search"></i>
        </div>
        <nav className="canvas-menu mobile-menu">
          <ul>
            <li><NavLink to="/">Home</NavLink></li>
            <li><NavLink to="/about-us">About Us</NavLink></li>
            <li><NavLink to="/classes">Classes</NavLink></li>
            <li><NavLink to="/services">Services</NavLink></li>
            <li><NavLink to="/team">Our Team</NavLink></li>
            <li><NavLink to="#">Pages</NavLink>
              <ul className="dropdown">
                <li><NavLink to="/about-us">About us</NavLink></li>
                <li><NavLink to="/class-timetable">Classes timetable</NavLink></li>
                <li><NavLink to="/bmi-calculator">Bmi calculate</NavLink></li>
                <li><NavLink to="/team">Our team</NavLink></li>
                <li><NavLink to="/gallery">Gallery</NavLink></li>
                <li><NavLink to="/blog">Our blog</NavLink></li>
                <li><NavLink to="/404">404</NavLink></li>
              </ul>
            </li>
            <li><NavLink to="/contact">Contact</NavLink></li>
          </ul>
        </nav>
        <div id="mobile-menu-wrap"></div>
        <div className="canvas-social" style={{marginBottom:'15px'}}>
          <NavLink to="/login" className="primary-btn btn-sm" style={{marginRight:'8px'}}>Login</NavLink>
          <NavLink to="/signup" className="primary-btn btn-sm btn-outline">Sign Up</NavLink>
        </div>
        <div className="canvas-social">
          <NavLink to="#"><i className="fa fa-facebook"></i></NavLink>
          <NavLink to="#"><i className="fa fa-twitter"></i></NavLink>
          <NavLink to="#"><i className="fa fa-youtube-play"></i></NavLink>
          <NavLink to="#"><i className="fa fa-instagram"></i></NavLink>
        </div>
      </div>

      <header className="header-section">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-3">
              <div className="logo">
                <NavLink to="/"><img src={logo} alt="" /></NavLink>
              </div>
            </div>
            <div className="col-lg-6">
              <nav className="nav-menu">
                <ul>
                  <li className="active"><NavLink to="/">Home</NavLink></li>
                  <li><NavLink to="/about-us">About Us</NavLink></li>
                  <li><NavLink to="/classes">Classes</NavLink></li>
                  <li><NavLink to="/services">Services</NavLink></li>
                  <li><NavLink to="/team">Our Team</NavLink></li>
                  <li><NavLink to="#">Pages</NavLink>
                    <ul className="dropdown">
                      <li><NavLink to="/about-us">About us</NavLink></li>
                      <li><NavLink to="/class-timetable">Classes timetable</NavLink></li>
                      <li><NavLink to="/bmi-calculator">Bmi calculate</NavLink></li>
                      <li><NavLink to="/team">Our team</NavLink></li>
                      <li><NavLink to="/gallery">Gallery</NavLink></li>
                      <li><NavLink to="/blog">Our blog</NavLink></li>
                      <li><NavLink to="/404">404</NavLink></li>
                    </ul>
                  </li>
                  <li><NavLink to="/contact">Contact</NavLink></li>
                </ul>
              </nav>
            </div>
            <div className="col-lg-3">
              <div className="top-option" style={{display:'flex', alignItems:'center', justifyContent:'flex-end', gap:'15px'}}>
                <div className="auth-buttons d-none d-lg-flex" style={{alignItems:'center', gap:'8px'}}>
                  <NavLink to="/login" className="primary-btn btn-sm">Login</NavLink>
                  <NavLink to="/signup" className="primary-btn btn-sm btn-outline">Sign Up</NavLink>
                </div>
                <div className="to-search search-switch d-none d-lg-flex" style={{alignItems:'center'}}>
                  <i className="fa fa-search"></i>
                </div>
                <div className="to-social d-none d-lg-flex" style={{alignItems:'center', gap:'8px'}}>
                  <NavLink to="#"><i className="fa fa-facebook"></i></NavLink>
                  <NavLink to="#"><i className="fa fa-twitter"></i></NavLink>
                  <NavLink to="#"><i className="fa fa-youtube-play"></i></NavLink>
                  <NavLink to="#"><i className="fa fa-instagram"></i></NavLink>
                </div>
              </div>
            </div>
          </div>
          <div className="canvas-open">
            <i className="fa fa-bars"></i>
          </div>
          <div className="d-lg-none" style={{position:'absolute', right:'110px', top:'67px'}}>
            <div className="to-search search-switch" style={{display:'flex', alignItems:'center', color:'#fff'}}>
              <i className="fa fa-search"></i>
            </div>
          </div>
        </div>
      </header>
    </>
  )
}
