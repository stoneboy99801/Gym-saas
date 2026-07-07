import { NavLink } from "react-router-dom";
import React from 'react'

export default function Services() {
  return (
    <>
      {/* Breadcrumb Section Begin */}
      <section className="breadcrumb-section set-bg" data-setbg="img/breadcrumb-bg.jpg">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 text-center">
              <div className="breadcrumb-text">
                <h2>Services</h2>
                <div className="bt-option">
                  <NavLink to="/">Home</NavLink>
                  <span>Services</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Breadcrumb Section End */}

      {/* Services Section Begin */}
      <section className="services-section spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-title">
                <span>What We Offer</span>
                <h2>EVERYTHING YOU NEED TO TRAIN</h2>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-3 order-lg-1 col-md-6 p-0">
              <div className="ss-pic">
                <img src="img/services/services-1.jpg" alt="" />
              </div>
            </div>
            <div className="col-lg-3 order-lg-2 col-md-6 p-0">
              <div className="ss-text">
                <h4>QR Check-In</h4>
                <p>Walk into any partner gym, scan your unique QR code, and you're in. No cards, no paperwork, no waiting.</p>
                <NavLink to="/signup">Get Started</NavLink>
              </div>
            </div>
            <div className="col-lg-3 order-lg-3 col-md-6 p-0">
              <div className="ss-pic">
                <img src="img/services/services-2.jpg" alt="" />
              </div>
            </div>
            <div className="col-lg-3 order-lg-4 col-md-6 p-0">
              <div className="ss-text">
                <h4>Multi-Gym Access</h4>
                <p>One membership gives you access to all registered partner gyms in the city based on your tier level.</p>
                <NavLink to="/signup">Get Started</NavLink>
              </div>
            </div>
            <div className="col-lg-3 order-lg-8 col-md-6 p-0">
              <div className="ss-pic">
                <img src="img/services/services-4.jpg" alt="" />
              </div>
            </div>
            <div className="col-lg-3 order-lg-7 col-md-6 p-0">
              <div className="ss-text second-row">
                <h4>Attendance Tracking</h4>
                <p>Every check-in is recorded. View your full workout history across all gyms from your personal dashboard.</p>
                <NavLink to="/signup">Get Started</NavLink>
              </div>
            </div>
            <div className="col-lg-3 order-lg-6 col-md-6 p-0">
              <div className="ss-pic">
                <img src="img/services/services-3.jpg" alt="" />
              </div>
            </div>
            <div className="col-lg-3 order-lg-5 col-md-6 p-0">
              <div className="ss-text second-row">
                <h4>Gym Owner Dashboard</h4>
                <p>Register your gym, set your tier, and manage all incoming members and check-ins from one place.</p>
                <NavLink to="/signup">Get Started</NavLink>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Services Section End */}

      {/* Banner Section Begin */}
      <section className="banner-section set-bg" data-setbg="img/banner-bg.jpg">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 text-center">
              <div className="bs-text service-banner">
                <h2>Train at Any Gym. Pay Once.</h2>
                <div className="bt-tips">Pakistan's first multi-gym membership platform.</div>
                <NavLink to="/signup" className="primary-btn btn-normal">Join GymHub</NavLink>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Banner Section End */}

      {/* Pricing Section Begin */}
      <section className="pricing-section service-pricing spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-title">
                <span>Our Plans</span>
                <h2>Choose Your Membership</h2>
              </div>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-lg-4 col-md-8">
              <div className="ps-item">
                <h3>Basic</h3>
                <div className="pi-price">
                  <h2>Rs. 1,100</h2>
                  <span>PER MONTH</span>
                </div>
                <ul>
                  <li>Access to Basic tier gyms</li>
                  <li>QR check-in at partner gyms</li>
                  <li>Attendance history</li>
                  <li>1 month / 3 months / 1 year</li>
                  <li>JazzCash / Easypaisa / Card</li>
                  <li>Cancel anytime</li>
                </ul>
                <NavLink to="/signup" className="primary-btn pricing-btn">Get Started</NavLink>
              </div>
            </div>
            <div className="col-lg-4 col-md-8">
              <div className="ps-item">
                <h3>Intermediate</h3>
                <div className="pi-price">
                  <h2>Rs. 2,500</h2>
                  <span>PER MONTH</span>
                </div>
                <ul>
                  <li>Access to Basic + Intermediate gyms</li>
                  <li>QR check-in at partner gyms</li>
                  <li>Attendance history</li>
                  <li>1 month / 3 months / 1 year</li>
                  <li>JazzCash / Easypaisa / Card</li>
                  <li>Cancel anytime</li>
                </ul>
                <NavLink to="/signup" className="primary-btn pricing-btn">Get Started</NavLink>
              </div>
            </div>
            <div className="col-lg-4 col-md-8">
              <div className="ps-item">
                <h3>Pro</h3>
                <div className="pi-price">
                  <h2>Rs. 4,000</h2>
                  <span>PER MONTH</span>
                </div>
                <ul>
                  <li>Access to ALL gyms (Basic + Pro)</li>
                  <li>QR check-in at partner gyms</li>
                  <li>Attendance history</li>
                  <li>1 month / 3 months / 1 year</li>
                  <li>JazzCash / Easypaisa / Card</li>
                  <li>Cancel anytime</li>
                </ul>
                <NavLink to="/signup" className="primary-btn pricing-btn">Get Started</NavLink>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Pricing Section End */}

      {/* Get In Touch Section Begin */}
      <div className="gettouch-section">
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <div className="gt-text">
                <i className="fa fa-map-marker"></i>
                <p>GymHub HQ, Lahore,<br /> Punjab, Pakistan</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="gt-text">
                <i className="fa fa-mobile"></i>
                <ul>
                  <li>+92-300-1234567</li>
                  <li>+92-321-7654321</li>
                </ul>
              </div>
            </div>
            <div className="col-md-4">
              <div className="gt-text email">
                <i className="fa fa-envelope"></i>
                <p>support@gymhub.pk</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Get In Touch Section End */}
    </>
  )
}
