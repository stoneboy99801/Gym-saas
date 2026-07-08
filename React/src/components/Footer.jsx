import React from 'react'
import { NavLink } from 'react-router-dom'
export default function Footer() {
    const year = new Date().getFullYear()
  return (
    <>
        {/* Footer Section Begin */}
    <section className="footer-section">
        <div className="container">
            <div className="row">
                <div className="col-lg-4">
                    <div className="fs-about">
                        <div className="fa-logo">
                            <NavLink to="/" className="brand-logo" aria-label="GymHub home">
                                <span className="brand-logo__mark"><span>GH</span></span>
                                <span className="brand-logo__text">Gym<span>Hub</span></span>
                            </NavLink>
                        </div>
                        <p>Pakistan's first multi-gym membership platform. One membership, every gym in the city.</p>
                        <div className="fa-social">
                            <NavLink to="#"><i className="fa fa-facebook"></i></NavLink>
                            <NavLink to="#"><i className="fa fa-twitter"></i></NavLink>
                            <NavLink to="#"><i className="fa fa-youtube-play"></i></NavLink>
                            <NavLink to="#"><i className="fa fa-instagram"></i></NavLink>
                            <NavLink to="#"><i className="fa  fa-envelope-o"></i></NavLink>
                        </div>
                    </div>
                </div>
                <div className="col-lg-2 col-md-3 col-sm-6">
                    <div className="fs-widget">
                        <h4>Useful links</h4>
                        <ul>
                            <li><NavLink to="#">About</NavLink></li>
                            <li><NavLink to="#">Blog</NavLink></li>
                            <li><NavLink to="#">Classes</NavLink></li>
                            <li><NavLink to="#">Contact</NavLink></li>
                        </ul>
                    </div>
                </div>
                <div className="col-lg-2 col-md-3 col-sm-6">
                    <div className="fs-widget">
                        <h4>Support</h4>
                        <ul>
                            <li><NavLink to="#">Login</NavLink></li>
                            <li><NavLink to="#">My account</NavLink></li>
                            <li><NavLink to="#">Subscribe</NavLink></li>
                            <li><NavLink to="#">Contact</NavLink></li>
                        </ul>
                    </div>
                </div>
                <div className="col-lg-4 col-md-6">
                    <div className="fs-widget">
                        <h4>Tips & Guides</h4>
                        <div className="fw-recent">
                            <h6><NavLink to="#">Physical fitness may help prevent depression, anxiety</NavLink></h6>
                            <ul>
                                <li>3 min read</li>
                                <li>20 Comment</li>
                            </ul>
                        </div>
                        <div className="fw-recent">
                            <h6><NavLink to="#">Fitness: The best exercise to lose belly fat and tone up...</NavLink></h6>
                            <ul>
                                <li>3 min read</li>
                                <li>20 Comment</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-lg-12 text-center">
                    <div className="copyright-text">
                        
                    </div>
                </div>
            </div>
        </div>
    </section>
    {/* Footer Section End */}

    {/* Search model Begin */}
    <div className="search-model">
        <div className="h-100 d-flex align-items-center justify-content-center">
            <div className="search-close-switch">+</div>
            <form className="search-model-form">
                <input type="text" id="search-input" placeholder="Search here....."/>
            </form>
        </div>
    </div>
    {/* Search model end */}
    </>
  )
}
