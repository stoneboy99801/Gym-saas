import { NavLink } from 'react-router-dom'

export default function Index() {
  return (
    <>
      {/* Hero Section Begin */}
      <section className="hero-section">
        <div className="hs-slider owl-carousel">
          <div className="hs-item set-bg" data-setbg="img/hero/4722374.jpg">
            <div className="container">
              <div className="row">
                <div className="col-lg-6 offset-lg-6">
                  <div className="hi-text">
                    <span>One Membership. Every Gym.</span>
                    <h1>Access <strong>Any Gym</strong> in the City</h1>
                    <NavLink to="/signup" className="primary-btn">Get Started</NavLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="hs-item set-bg" data-setbg="img/hero/4722377.jpg">
            <div className="container">
              <div className="row">
                <div className="col-lg-6 offset-lg-6">
                  <div className="hi-text">
                    <span>Train Anywhere, Anytime</span>
                    <h1>Your City is <strong>Your Gym</strong></h1>
                    <NavLink to="/signup" className="primary-btn">Join Now</NavLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Hero Section End */}

      {/* ChoseUs Section Begin */}
      <section className="choseus-section spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-title">
                <span>Why GymHub?</span>
                <h2>ONE MEMBERSHIP, UNLIMITED ACCESS</h2>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-3 col-sm-6">
              <div className="cs-item">
                <span className="flaticon-034-stationary-bike"></span>
                <h4>Multi-Gym Access</h4>
                <p>One membership gives you access to all registered gyms in the city. Walk in, scan your QR, and train.</p>
              </div>
            </div>
            <div className="col-lg-3 col-sm-6">
              <div className="cs-item">
                <span className="flaticon-002-dumbell"></span>
                <h4>Instant QR Check-In</h4>
                <p>No cards, no paperwork. Just show your QR code at any partner gym and you're in within seconds.</p>
              </div>
            </div>
            <div className="col-lg-3 col-sm-6">
              <div className="cs-item">
                <span className="flaticon-014-heart-beat"></span>
                <h4>Track Your Attendance</h4>
                <p>View your full check-in history across all gyms from your personal dashboard anytime.</p>
              </div>
            </div>
            <div className="col-lg-3 col-sm-6">
              <div className="cs-item">
                <span className="flaticon-033-juice"></span>
                <h4>Flexible Plans</h4>
                <p>Choose from Basic, Intermediate, or Pro plans. Pay monthly, quarterly, or yearly — your choice.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* ChoseUs Section End */}

      {/* Classes Section Begin */}
      <section className="classes-section spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-title">
                <span>What You Get</span>
                <h2>TRAIN THE WAY YOU WANT</h2>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-4 col-md-6">
              <div className="class-item">
                <div className="ci-pic"><img src="/img/classes/class-1.jpg" alt="" /></div>
                <div className="ci-text">
                  <span>STRENGTH</span>
                  <h5>Weightlifting</h5>
                  <NavLink to="/signup"><i className="fa fa-angle-right"></i></NavLink>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="class-item">
                <div className="ci-pic"><img src="/img/classes/class-2.jpg" alt="" /></div>
                <div className="ci-text">
                  <span>CARDIO</span>
                  <h5>Indoor Cycling</h5>
                  <NavLink to="/signup"><i className="fa fa-angle-right"></i></NavLink>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="class-item">
                <div className="ci-pic"><img src="/img/classes/class-3.jpg" alt="" /></div>
                <div className="ci-text">
                  <span>POWER</span>
                  <h5>Kettlebell Training</h5>
                  <NavLink to="/signup"><i className="fa fa-angle-right"></i></NavLink>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-6">
              <div className="class-item">
                <div className="ci-pic"><img src="/img/classes/class-4.jpg" alt="" /></div>
                <div className="ci-text">
                  <span>HIIT</span>
                  <h4>High Intensity Training</h4>
                  <NavLink to="/signup"><i className="fa fa-angle-right"></i></NavLink>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="class-item">
                <div className="ci-pic"><img src="/img/classes/class-5.jpg" alt="" /></div>
                <div className="ci-text">
                  <span>COMBAT</span>
                  <h4>Boxing</h4>
                  <NavLink to="/signup"><i className="fa fa-angle-right"></i></NavLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Classes Section End */}

      {/* Banner Section Begin */}
      <section className="banner-section set-bg" data-setbg="img/banner-bg.jpg">
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

      {/* Pricing Section Begin */}
      <section className="pricing-section spad">
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

      {/* Gallery Section Begin */}
      <div className="gallery-section">
        <div className="gallery">
          <div className="grid-sizer"></div>
          <div className="gs-item grid-wide set-bg" data-setbg="img/gallery/gallery-1.jpg">
            <NavLink to="img/gallery/gallery-1.jpg" className="thumb-icon image-popup">
              <i className="fa fa-picture-o"></i>
            </NavLink>
          </div>
          <div className="gs-item set-bg" data-setbg="img/gallery/gallery-2.jpg">
            <NavLink to="img/gallery/gallery-2.jpg" className="thumb-icon image-popup">
              <i className="fa fa-picture-o"></i>
            </NavLink>
          </div>
          <div className="gs-item set-bg" data-setbg="img/gallery/gallery-3.jpg">
            <NavLink to="img/gallery/gallery-3.jpg" className="thumb-icon image-popup">
              <i className="fa fa-picture-o"></i>
            </NavLink>
          </div>
          <div className="gs-item set-bg" data-setbg="img/gallery/gallery-4.jpg">
            <NavLink to="img/gallery/gallery-4.jpg" className="thumb-icon image-popup">
              <i className="fa fa-picture-o"></i>
            </NavLink>
          </div>
          <div className="gs-item set-bg" data-setbg="img/gallery/gallery-5.jpg">
            <NavLink to="img/gallery/gallery-5.jpg" className="thumb-icon image-popup">
              <i className="fa fa-picture-o"></i>
            </NavLink>
          </div>
          <div className="gs-item grid-wide set-bg" data-setbg="img/gallery/gallery-6.jpg">
            <NavLink to="img/gallery/gallery-6.jpg" className="thumb-icon image-popup">
              <i className="fa fa-picture-o"></i>
            </NavLink>
          </div>
        </div>
      </div>
      {/* Gallery Section End */}

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
                <div className="ts-item set-bg" data-setbg="img/team/team-1.jpg">
                  <div className="ts_text">
                    <h4>PowerFit Arena</h4>
                    <span>Pro Tier Gym</span>
                  </div>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="ts-item set-bg" data-setbg="img/team/team-2.jpg">
                  <div className="ts_text">
                    <h4>IronZone Gym</h4>
                    <span>Intermediate Tier Gym</span>
                  </div>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="ts-item set-bg" data-setbg="img/team/team-3.jpg">
                  <div className="ts_text">
                    <h4>FitCore Studio</h4>
                    <span>Basic Tier Gym</span>
                  </div>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="ts-item set-bg" data-setbg="img/team/team-4.jpg">
                  <div className="ts_text">
                    <h4>EliteFit Club</h4>
                    <span>Pro Tier Gym</span>
                  </div>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="ts-item set-bg" data-setbg="img/team/team-5.jpg">
                  <div className="ts_text">
                    <h4>PulseFit Center</h4>
                    <span>Intermediate Tier Gym</span>
                  </div>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="ts-item set-bg" data-setbg="img/team/team-6.jpg">
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
