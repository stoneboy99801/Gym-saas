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
                        <span>What we do?</span>
                        <h2>PUSH YOUR LIMITS FORWARD</h2>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-lg-3 order-lg-1 col-md-6 p-0">
                    <div className="ss-pic">
                        <img src="img/services/services-1.jpg" alt=""/>
                    </div>
                </div>
                <div className="col-lg-3 order-lg-2 col-md-6 p-0">
                    <div className="ss-text">
                        <h4>Personal training</h4>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor ut dolore
                            facilisis.</p>
                        <NavLink to="#">Explore</NavLink>
                    </div>
                </div>
                <div className="col-lg-3 order-lg-3 col-md-6 p-0">
                    <div className="ss-pic">
                        <img src="img/services/services-2.jpg" alt=""/>
                    </div>
                </div>
                <div className="col-lg-3 order-lg-4 col-md-6 p-0">
                    <div className="ss-text">
                        <h4>Group fitness classes</h4>
                        <p>Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus.</p>
                        <NavLink to="#">Explore</NavLink>
                    </div>
                </div>
                <div className="col-lg-3 order-lg-8 col-md-6 p-0">
                    <div className="ss-pic">
                        <img src="img/services/services-4.jpg" alt=""/>
                    </div>
                </div>
                <div className="col-lg-3 order-lg-7 col-md-6 p-0">
                    <div className="ss-text second-row">
                        <h4>Body building</h4>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor ut dolore
                            facilisis.</p>
                        <NavLink to="#">Explore</NavLink>
                    </div>
                </div>
                <div className="col-lg-3 order-lg-6 col-md-6 p-0">
                    <div className="ss-pic">
                        <img src="img/services/services-3.jpg" alt=""/>
                    </div>
                </div>
                <div className="col-lg-3 order-lg-5 col-md-6 p-0">
                    <div className="ss-text second-row">
                        <h4>Strength training</h4>
                        <p>Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus.</p>
                        <NavLink to="#">Explore</NavLink>
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
                        <h2>Exercise until the body obeys.</h2>
                        <div className="bt-tips">Where health, beauty and fitness meet.</div>
                        <NavLink to="https://www.youtube.com/watch?v=EzKkl64rRbM" className="play-btn video-popup"><i
                                className="fa fa-caret-right"></i></NavLink>
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
                        <span>Our Plan</span>
                        <h2>Choose your pricing plan</h2>
                    </div>
                </div>
            </div>
            <div className="row justify-content-center">
                <div className="col-lg-4 col-md-8">
                    <div className="ps-item">
                        <h3>Class drop-in</h3>
                        <div className="pi-price">
                            <h2>$ 39.0</h2>
                            <span>SINGLE CLASS</span>
                        </div>
                        <ul>
                            <li>Free riding</li>
                            <li>Unlimited equipments</li>
                            <li>Personal trainer</li>
                            <li>Weight losing classes</li>
                            <li>Month to mouth</li>
                            <li>No time restriction</li>
                        </ul>
                        <NavLink to="#" className="primary-btn pricing-btn">Enroll now</NavLink>
                        <NavLink to="#" className="thumb-icon"><i className="fa fa-picture-o"></i></NavLink>
                    </div>
                </div>
                <div className="col-lg-4 col-md-8">
                    <div className="ps-item">
                        <h3>12 Month unlimited</h3>
                        <div className="pi-price">
                            <h2>$ 99.0</h2>
                            <span>SINGLE CLASS</span>
                        </div>
                        <ul>
                            <li>Free riding</li>
                            <li>Unlimited equipments</li>
                            <li>Personal trainer</li>
                            <li>Weight losing classes</li>
                            <li>Month to mouth</li>
                            <li>No time restriction</li>
                        </ul>
                        <NavLink to="#" className="primary-btn pricing-btn">Enroll now</NavLink>
                        <NavLink to="#" className="thumb-icon"><i className="fa fa-picture-o"></i></NavLink>
                    </div>
                </div>
                <div className="col-lg-4 col-md-8">
                    <div className="ps-item">
                        <h3>6 Month unlimited</h3>
                        <div className="pi-price">
                            <h2>$ 59.0</h2>
                            <span>SINGLE CLASS</span>
                        </div>
                        <ul>
                            <li>Free riding</li>
                            <li>Unlimited equipments</li>
                            <li>Personal trainer</li>
                            <li>Weight losing classes</li>
                            <li>Month to mouth</li>
                            <li>No time restriction</li>
                        </ul>
                        <NavLink to="#" className="primary-btn pricing-btn">Enroll now</NavLink>
                        <NavLink to="#" className="thumb-icon"><i className="fa fa-picture-o"></i></NavLink>
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
                        <p>333 Middle Winchendon Rd, Rindge,<br/> NH 03461</p>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="gt-text">
                        <i className="fa fa-mobile"></i>
                        <ul>
                            <li>125-711-811</li>
                            <li>125-668-886</li>
                        </ul>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="gt-text email">
                        <i className="fa fa-envelope"></i>
                        <p>Support.gymcenter@gmail.com</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    {/* Get In Touch Section End */}
    </>
  )
}
