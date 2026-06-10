import { NavLink } from "react-router-dom";
import React from 'react'

export default function Ourblog() {
  return (
    <>
     {/* <!-- Breadcrumb Section Begin --> */}
    <section className="breadcrumb-section set-bg" style={{backgroundImage: "url(img/breadcrumb-bg.jpg)"}} >
        <div className="container">
            <div className="row">
                <div className="col-lg-12 text-center">
                    <div className="breadcrumb-text">
                        <h2>Our Blog</h2>
                        <div className="bt-option">
                            <NavLink to="/">Home</NavLink>
                            <NavLink to="/#">Pages</NavLink>
                            <span>Blog</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    {/* <!-- Breadcrumb Section End --> */}

    {/* <!-- Blog Section Begin --> */}
    <section className="blog-section spad">
        <div className="container">
            <div className="row">
                <div className="col-lg-8 p-0">
                    <div className="blog-item">
                        <div className="bi-pic">
                            <img src="img/blog/blog-1.jpg" alt=""/>
                        </div>
                        <div className="bi-text">
                            <h5><NavLink to="/blog-details">Vegan White Peach Mug Cobbler With Cardam Vegan White Peach Mug
                                    Cobbler...</NavLink></h5>
                            <ul>
                                <li>by Admin</li>
                                <li>Aug,15, 2019</li>
                                <li>20 Comment</li>
                            </ul>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed eiusmod tempor incididunt ut
                                labore et dolore magna aliqua accumsan lacus facilisis.</p>
                        </div>
                    </div>
                    <div className="blog-item">
                        <div className="bi-pic">
                            <img src="img/blog/blog-2.jpg" alt=""/>
                        </div>
                        <div className="bi-text">
                            <h5><NavLink to="/blog-details">Vegan White Peach Mug Cobbler With Cardam Vegan White Peach Mug
                                    Cobbler...</NavLink></h5>
                            <ul>
                                <li>by Admin</li>
                                <li>Aug,15, 2019</li>
                                <li>20 Comment</li>
                            </ul>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed eiusmod tempor incididunt ut
                                labore et dolore magna aliqua accumsan lacus facilisis.</p>
                        </div>
                    </div>
                    <div className="blog-item">
                        <div className="bi-pic">
                            <img src="img/blog/blog-3.jpg" alt=""/>
                        </div>
                        <div className="bi-text">
                            <h5><NavLink to="/blog-details">Vegan White Peach Mug Cobbler With Cardam Vegan White Peach Mug
                                    Cobbler...</NavLink></h5>
                            <ul>
                                <li>by Admin</li>
                                <li>Aug,15, 2019</li>
                                <li>20 Comment</li>
                            </ul>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed eiusmod tempor incididunt ut
                                labore et dolore magna aliqua accumsan lacus facilisis.</p>
                        </div>
                    </div>
                    <div className="blog-item">
                        <div className="bi-pic">
                            <img src="img/blog/blog-4.jpg" alt=""/>
                        </div>
                        <div className="bi-text">
                            <h5><NavLink to="/blog-details">Vegan White Peach Mug Cobbler With Cardam Vegan White Peach Mug
                                    Cobbler...</NavLink></h5>
                            <ul>
                                <li>by Admin</li>
                                <li>Aug,15, 2019</li>
                                <li>20 Comment</li>
                            </ul>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed eiusmod tempor incididunt ut
                                labore et dolore magna aliqua accumsan lacus facilisis.</p>
                        </div>
                    </div>
                    <div className="blog-item">
                        <div className="bi-pic">
                            <img src="img/blog/blog-5.jpg" alt=""/>
                        </div>
                        <div className="bi-text">
                            <h5><NavLink to="/blog-details">Vegan White Peach Mug Cobbler With Cardam Vegan White Peach Mug
                                    Cobbler...</NavLink></h5>
                            <ul>
                                <li>by Admin</li>
                                <li>Aug,15, 2019</li>
                                <li>20 Comment</li>
                            </ul>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed eiusmod tempor incididunt ut
                                labore et dolore magna aliqua accumsan lacus facilisis.</p>
                        </div>
                    </div>
                    <div className="blog-pagination">
                        <NavLink to="/#">1</NavLink>
                        <NavLink to="/#">2</NavLink>
                        <NavLink to="/#">3</NavLink>
                        <NavLink to="/#">Next</NavLink>
                    </div>
                </div>
                <div className="col-lg-4 col-md-8 p-0">
                    <div className="sidebar-option">
                        <div className="so-categories">
                            <h5 className="title">Categories</h5>
                            <ul>
                                <li><NavLink to="/#">Yoga <span>12</span></NavLink></li>
                                <li><NavLink to="/#">Runing <span>32</span></NavLink></li>
                                <li><NavLink to="/#">Weightloss <span>86</span></NavLink></li>
                                <li><NavLink to="/#">Cario <span>25</span></NavLink></li>
                                <li><NavLink to="/#">Body buiding <span>36</span></NavLink></li>
                                <li><NavLink to="/#">Nutrition <span>15</span></NavLink></li>
                            </ul>
                        </div>
                        <div className="so-latest">
                            <h5 className="title">Feature posts</h5>
                            <div className="latest-large set-bg" style={{backgroundImage: "url(img/letest-blog/latest-1.jpg)"}} >
                                <div className="ll-text">
                                    <h5><NavLink to="/blog-details">This Japanese Way of Making Iced Coffee Is a Game...</NavLink></h5>
                                    <ul>
                                        <li>Aug 20, 2019</li>
                                        <li>20 Comment</li>
                                    </ul>
                                </div>
                            </div>
                            <div className="latest-item">
                                <div className="li-pic">
                                    <img src="img/letest-blog/latest-2.jpg" alt=""/>
                                </div>
                                <div className="li-text">
                                    <h6><NavLink to="/blog-details">Grilled Potato and Green Bean Salad</NavLink></h6>
                                    <span className="li-time">Aug 15, 2019</span>
                                </div>
                            </div>
                            <div className="latest-item">
                                <div className="li-pic">
                                    <img src="img/letest-blog/latest-3.jpg" alt=""/>
                                </div>
                                <div className="li-text">
                                    <h6><NavLink to="/blog-details">The $8 French Rosé I Buy in Bulk Every Summer</NavLink></h6>
                                    <span className="li-time">Aug 15, 2019</span>
                                </div>
                            </div>
                            <div className="latest-item">
                                <div className="li-pic">
                                    <img src="img/letest-blog/latest-4.jpg" alt=""/>
                                </div>
                                <div className="li-text">
                                    <h6><NavLink to="/blog-details">Ina Garten's Skillet-Roasted Lemon Chicken</NavLink></h6>
                                    <span className="li-time">Aug 15, 2019</span>
                                </div>
                            </div>
                            <div className="latest-item">
                                <div className="li-pic">
                                    <img src="img/letest-blog/latest-5.jpg" alt=""/>
                                </div>
                                <div className="li-text">
                                    <h6><NavLink to="/blog-details">The Best Weeknight Baked Potatoes, 3 Creative Ways</NavLink></h6>
                                    <span className="li-time">Aug 15, 2019</span>
                                </div>
                            </div>
                        </div>
                        <div className="so-tags">
                            <h5 className="title">Popular tags</h5>
                            <NavLink to="/#">Gyming</NavLink>
                            <NavLink to="/#">Body buidling</NavLink>
                            <NavLink to="/#">Yoga</NavLink>
                            <NavLink to="/#">Weightloss</NavLink>
                            <NavLink to="/#">Proffeponal</NavLink>
                            <NavLink to="/#">Streching</NavLink>
                            <NavLink to="/#">Cardio</NavLink>
                            <NavLink to="/#">Karate</NavLink>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    {/* <!-- Blog Section End --> */}

    {/* <!-- Get In Touch Section Begin --> */}
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
    {/* <!-- Get In Touch Section End --> */}
    </>
  )
}
