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
        <div className="canvas-social">
          <a href="#"><i className="fa fa-facebook"></i></a>
          <a href="#"><i className="fa fa-twitter"></i></a>
          <a href="#"><i className="fa fa-youtube-play"></i></a>
          <a href="#"><i className="fa fa-instagram"></i></a>
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
              <div className="top-option">
                <div className="to-search search-switch">
                  <i className="fa fa-search"></i>
                </div>
                <div className="to-social">
                  <a href="#"><i className="fa fa-facebook"></i></a>
                  <a href="#"><i className="fa fa-twitter"></i></a>
                  <a href="#"><i className="fa fa-youtube-play"></i></a>
                  <a href="#"><i className="fa fa-instagram"></i></a>
                </div>
              </div>
            </div>
          </div>
          <div className="canvas-open">
            <i className="fa fa-bars"></i>
          </div>
        </div>
      </header>
    </>
  )
}
