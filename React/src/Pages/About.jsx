import React from 'react'
import { NavLink } from 'react-router-dom'

export default function About() {
  return (
    <>
      {/* Breadcrumb Section Begin */}
      <section className="breadcrumb-section set-bg" style={{ backgroundImage: "url('/img/breadcrumb-bg.jpg')" }}>
        <div className="container">
          <div className="row">
            <div className="col-lg-12 text-center">
              <div className="breadcrumb-text">
                <h2>About Us</h2>
                <div className="bt-option">
                  <NavLink to="/">Home</NavLink>
                  <span>About</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Breadcrumb Section End */}

      {/* ChoseUs Section Begin */}
      <section className="choseus-section spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-title">
                <span>Why GymHub?</span>
                <h2>FREEDOM TO TRAIN ANYWHERE</h2>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-3 col-sm-6">
              <div className="cs-item">
                <span className="flaticon-034-stationary-bike"></span>
                <h4>Multi-Gym Access</h4>
                <p>One membership unlocks every partner gym in the city. No separate fees, no extra sign-ups.</p>
              </div>
            </div>
            <div className="col-lg-3 col-sm-6">
              <div className="cs-item">
                <span className="flaticon-002-dumbell"></span>
                <h4>QR Check-In</h4>
                <p>Instant entry at any partner gym using your personal QR code. Fast, secure, and contactless.</p>
              </div>
            </div>
            <div className="col-lg-3 col-sm-6">
              <div className="cs-item">
                <span className="flaticon-014-heart-beat"></span>
                <h4>Attendance Tracking</h4>
                <p>Every check-in is logged. Monitor your workout consistency across all gyms from one dashboard.</p>
              </div>
            </div>
            <div className="col-lg-3 col-sm-6">
              <div className="cs-item">
                <span className="flaticon-033-juice"></span>
                <h4>Tier-Based Plans</h4>
                <p>Pick the plan that fits your lifestyle — Basic, Intermediate, or Pro. Upgrade anytime.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* ChoseUs Section End */}

      {/* About US Section Begin */}
      <section className="aboutus-section">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-6 p-0">
              <div className="about-video set-bg" style={{ backgroundImage: "url('/img/about-us.jpg')" }}>
                <a href="https://www.youtube.com/watch?v=EzKkl64rRbM" className="play-btn video-popup" target="_blank" rel="noreferrer">
                  <i className="fa fa-caret-right"></i>
                </a>
              </div>
            </div>
            <div className="col-lg-6 p-0">
              <div className="about-text">
                <div className="section-title">
                  <span>Our Story</span>
                  <h2>What is GymHub?</h2>
                </div>
                <div className="at-desc">
                  <p>GymHub is Pakistan's first multi-gym membership platform. We believe fitness should be
                    flexible — not locked to a single location. With one GymHub membership, you can walk into
                    any of our partner gyms across the city, scan your QR code, and start training. No
                    paperwork, no waiting, no extra fees. Whether you're a daily lifter or a weekend warrior,
                    GymHub gives you the freedom to train on your terms.</p>
                </div>
                <div className="about-bar">
                  <div className="ab-item">
                    <p>Partner Gyms</p>
                    <div id="bar1" className="barfiller">
                      <span className="fill" data-percentage="85"></span>
                      <div className="tipWrap"><span className="tip"></span></div>
                    </div>
                  </div>
                  <div className="ab-item">
                    <p>Active Members</p>
                    <div id="bar2" className="barfiller">
                      <span className="fill" data-percentage="90"></span>
                      <div className="tipWrap"><span className="tip"></span></div>
                    </div>
                  </div>
                  <div className="ab-item">
                    <p>Member Satisfaction</p>
                    <div id="bar3" className="barfiller">
                      <span className="fill" data-percentage="95"></span>
                      <div className="tipWrap"><span className="tip"></span></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* About US Section End */}

      {/* Team Section Begin */}
      <section className="team-section spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="team-title">
                <div className="section-title">
                  <span>Our Network</span>
                  <h2>PARTNER GYMS ACROSS THE CITY</h2>
                </div>
                <NavLink to="/signup" className="primary-btn btn-normal appoinment-btn">Join Now</NavLink>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="ts-slider owl-carousel">
              <div className="col-lg-4">
                <div className="ts-item set-bg" style={{ backgroundImage: "url('/img/team/team-1.jpg')" }}>
                  <div className="ts_text">
                    <h4>PowerFit Arena</h4>
                    <span>Pro Tier Gym</span>
                  </div>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="ts-item set-bg" style={{ backgroundImage: "url('/img/team/team-2.jpg')" }}>
                  <div className="ts_text">
                    <h4>IronZone Gym</h4>
                    <span>Intermediate Tier Gym</span>
                  </div>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="ts-item set-bg" style={{ backgroundImage: "url('/img/team/team-3.jpg')" }}>
                  <div className="ts_text">
                    <h4>FitCore Studio</h4>
                    <span>Basic Tier Gym</span>
                  </div>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="ts-item set-bg" style={{ backgroundImage: "url('/img/team/team-4.jpg')" }}>
                  <div className="ts_text">
                    <h4>EliteFit Club</h4>
                    <span>Pro Tier Gym</span>
                  </div>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="ts-item set-bg" style={{ backgroundImage: "url('/img/team/team-5.jpg')" }}>
                  <div className="ts_text">
                    <h4>PulseFit Center</h4>
                    <span>Intermediate Tier Gym</span>
                  </div>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="ts-item set-bg" style={{ backgroundImage: "url('/img/team/team-6.jpg')" }}>
                  <div className="ts_text">
                    <h4>ActiveZone Gym</h4>
                    <span>Basic Tier Gym</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Team Section End */}

      {/* Banner Section Begin */}
      <section className="banner-section set-bg" style={{ backgroundImage: "url('/img/banner-bg.jpg')" }}>
        <div className="container">
          <div className="row">
            <div className="col-lg-12 text-center">
              <div className="bs-text">
                <h2>Own a Gym? Partner with GymHub</h2>
                <div className="bt-tips">Register your gym and start receiving members today.</div>
                <NavLink to="/signup" className="primary-btn btn-normal">Register Your Gym</NavLink>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Banner Section End */}

      {/* Testimonial Section Begin */}
      <section className="testimonial-section spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-title">
                <span>Testimonials</span>
                <h2>What Our Members Say</h2>
              </div>
            </div>
          </div>
          <div className="ts_slider owl-carousel">
            <div className="ts_item">
              <div className="row">
                <div className="col-lg-12 text-center">
                  <div className="ti_pic">
                    <img src="/img/testimonial/testimonial-1.jpg" alt="" />
                  </div>
                  <div className="ti_text">
                    <p>GymHub completely changed how I work out. I travel between DHA and Gulberg every week —
                      now I just scan my QR at whichever gym is closest. One membership, zero hassle.</p>
                    <h5>Ahmed Raza</h5>
                    <div className="tt-rating">
                      <i className="fa fa-star"></i>
                      <i className="fa fa-star"></i>
                      <i className="fa fa-star"></i>
                      <i className="fa fa-star"></i>
                      <i className="fa fa-star"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="ts_item">
              <div className="row">
                <div className="col-lg-12 text-center">
                  <div className="ti_pic">
                    <img src="/img/testimonial/testimonial-2.jpg" alt="" />
                  </div>
                  <div className="ti_text">
                    <p>As a gym owner, GymHub brought us new members we never would have reached on our own.
                      The QR check-in system is smooth and the dashboard makes managing everything easy.</p>
                    <h5>Sara Khan — Gym Owner</h5>
                    <div className="tt-rating">
                      <i className="fa fa-star"></i>
                      <i className="fa fa-star"></i>
                      <i className="fa fa-star"></i>
                      <i className="fa fa-star"></i>
                      <i className="fa fa-star"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Testimonial Section End */}

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
