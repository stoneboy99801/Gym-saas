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
                            <NavLink href="#"><img src="img/logo.png" alt=""/></NavLink>
                        </div>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                            labore dolore magna aliqua endisse ultrices gravida lorem.</p>
                        <div className="fa-social">
                            <NavLink href="#"><i className="fa fa-facebook"></i></NavLink>
                            <NavLink href="#"><i className="fa fa-twitter"></i></NavLink>
                            <NavLink href="#"><i className="fa fa-youtube-play"></i></NavLink>
                            <NavLink href="#"><i className="fa fa-instagram"></i></NavLink>
                            <NavLink href="#"><i className="fa  fa-envelope-o"></i></NavLink>
                        </div>
                    </div>
                </div>
                <div className="col-lg-2 col-md-3 col-sm-6">
                    <div className="fs-widget">
                        <h4>Useful links</h4>
                        <ul>
                            <li><NavLink href="#">About</NavLink></li>
                            <li><NavLink href="#">Blog</NavLink></li>
                            <li><NavLink href="#">Classes</NavLink></li>
                            <li><NavLink href="#">Contact</NavLink></li>
                        </ul>
                    </div>
                </div>
                <div className="col-lg-2 col-md-3 col-sm-6">
                    <div className="fs-widget">
                        <h4>Support</h4>
                        <ul>
                            <li><NavLink href="#">Login</NavLink></li>
                            <li><NavLink href="#">My account</NavLink></li>
                            <li><NavLink href="#">Subscribe</NavLink></li>
                            <li><NavLink href="#">Contact</NavLink></li>
                        </ul>
                    </div>
                </div>
                <div className="col-lg-4 col-md-6">
                    <div className="fs-widget">
                        <h4>Tips & Guides</h4>
                        <div className="fw-recent">
                            <h6><NavLink href="#">Physical fitness may help prevent depression, anxiety</NavLink></h6>
                            <ul>
                                <li>3 min read</li>
                                <li>20 Comment</li>
                            </ul>
                        </div>
                        <div className="fw-recent">
                            <h6><NavLink href="#">Fitness: The best exercise to lose belly fat and tone up...</NavLink></h6>
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
                        <p> Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0.
  Copyright &copy;{year} All rights reserved | This template is made with <i className="fa fa-heart" aria-hidden="true"></i> by <NavLink to="https://colorlib.com/" target="_blank">Colorlib</NavLink>
  {/* Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. */}</p>
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
