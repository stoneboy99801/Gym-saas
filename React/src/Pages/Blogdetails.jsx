import { NavLink } from "react-router-dom";
import React from 'react'

export default function Blogdetails() {
  return (
    <>
    {/* Blog Details Hero Section Begin */}
    <section className="blog-details-hero set-bg" style={{backgroundImage: "url(img/blog/details/details-hero.jpg)"}}>
        <div className="container">
            <div className="row">
                <div className="col-lg-8 p-0 m-auto">
                    <div className="bh-text">
                        <h3>Workout nutrition explained. What to eat before, during, and after exercise.</h3>
                        <ul>
                            <li>by Admin</li>
                            <li>Aug,15, 2019</li>
                            <li>20 Comment</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </section>
    {/* Blog Details Hero Section End */}

    {/* Blog Details Section Begin */}
    <section className="blog-details-section spad">
        <div className="container">
            <div className="row">
                <div className="col-lg-8 p-0 m-auto">
                    <div className="blog-details-text">
                        <div className="blog-details-title">
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
                                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
                                incididunt ut labore et dolore magna aliqua accusantium doloremque laudantium. Excepteur
                                sint occaecat cupidatat non proident sculpa .</p>
                            <p>laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure Lorem ipsum dolor sit
                                amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore
                                magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                aliquip ex ea commodo consequat anim id est laborum.</p>
                            <h5>You Can Buy For Less Than A College Degree</h5>
                            <p>Dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore
                                et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                                laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit
                                in voluptate velit esse cillum dolore eu fugiat nulla pariatur officia deserunt mollit.</p>
                        </div>
                        <div className="blog-details-pic">
                            <div className="blog-details-pic-item">
                                <img src="img/blog/details/details-1.jpg" alt=""/>
                            </div>
                            <div className="blog-details-pic-item">
                                <img src="img/blog/details/details-2.jpg" alt=""/>
                            </div>
                        </div>
                        <div className="blog-details-desc">
                            <p>Dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore
                                et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                                laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit
                                in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                                cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                        </div>
                        <div className="blog-details-quote">
                            <div className="quote-icon">
                                <img src="img/blog/details/quote-left.png" alt=""/>
                            </div>
                            <h5>The whole family of tiny legumes, whether red, green, yellow, or black, offers so many
                                possibilities to create an exciting lunch.</h5>
                            <span>MEIKE PETERS</span>
                        </div>
                        <div className="blog-details-more-desc">
                            <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                                commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
                                dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt
                                in. . Sed ut perspiciatis unde omnis iste natus error sit voluptatem.</p>
                            <p>laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure Lorem ipsum dolor sit
                                amet, consectetur adipisicing elit, sed eiusmod tempor incididunt laboris nisi ut
                                aliquip commodo consequat.</p>
                        </div>
                        <div className="blog-details-tag-share">
                            <div className="tags">
                                <NavLink to="#">Body buiding</NavLink>
                                <NavLink to="#">Yoga</NavLink>
                                <NavLink to="#">Weightloss</NavLink>
                                <NavLink to="#">Streching</NavLink>
                            </div>
                            <div className="share">
                                <span>Share</span>
                                <NavLink to="#"><i className="fa fa-facebook"></i> 82</NavLink>
                                <NavLink to="#"><i className="fa fa-twitter"></i> 24</NavLink>
                                <NavLink to="#"><i className="fa fa-envelope"></i> 08</NavLink>
                            </div>
                        </div>
                        <div className="blog-details-author">
                            <div className="ba-pic">
                                <img src="img/blog/details/blog-profile.jpg" alt=""/>
                            </div>
                            <div className="ba-text">
                                <h5>Lena Mollein.</h5>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
                                    incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                                    exercitation.</p>
                                <div className="bp-social">
                                    <NavLink to="#"><i className="fa fa-facebook"></i></NavLink>
                                    <NavLink to="#"><i className="fa fa-twitter"></i></NavLink>
                                    <NavLink to="#"><i className="fa fa-google-plus"></i></NavLink>
                                    <NavLink to="#"><i className="fa fa-instagram"></i></NavLink>
                                    <NavLink to="#"><i className="fa fa-youtube-play"></i></NavLink>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-6">
                                <div className="comment-option">
                                    <h5 className="co-title">Comment</h5>
                                    <div className="co-item">
                                        <div className="co-widget">
                                            <NavLink to="#"><i className="fa fa-heart-o"></i></NavLink>
                                            <NavLink to="#"><i className="fa fa-share-square-o"></i></NavLink>
                                        </div>
                                        <div className="co-pic">
                                            <img src="img/blog/details/comment-1.jpg" alt=""/>
                                            <h5>Brandon Kelley</h5>
                                        </div>
                                        <div className="co-text">
                                            <p>Neque porro quisquam est, qui dolorem ipsum dolor sit amet, consectetur,
                                                adipisci velit dolore.</p>
                                        </div>
                                    </div>
                                    <div className="co-item reply-comment">
                                        <div className="co-widget">
                                            <NavLink to="#"><i className="fa fa-heart-o"></i></NavLink>
                                            <NavLink to="#"><i className="fa fa-share-square-o"></i></NavLink>
                                        </div>
                                        <div className="co-pic">
                                            <img src="img/blog/details/comment-2.jpg" alt=""/>
                                            <h5>Brandon Kelley</h5>
                                        </div>
                                        <div className="co-text">
                                            <p>Neque porro quisquam est, qui dolorem ipsum dolor sit amet, consectetur,
                                                adipisci velit dolore.</p>
                                        </div>
                                    </div>
                                    <div className="co-item">
                                        <div className="co-widget">
                                            <NavLink to="#"><i className="fa fa-heart-o"></i></NavLink>
                                            <NavLink to="#"><i className="fa fa-share-square-o"></i></NavLink>
                                        </div>
                                        <div className="co-pic">
                                            <img src="img/blog/details/comment-3.jpg" alt=""/>
                                            <h5>Brandon Kelley</h5>
                                        </div>
                                        <div className="co-text">
                                            <p>Neque porro quisquam est, qui dolorem ipsum dolor sit amet, consectetur,
                                                adipisci velit dolore.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="leave-comment">
                                    <h5>Leave a comment</h5>
                                    <form action="#">
                                        <input type="text" placeholder="Name"/>
                                        <input type="text" placeholder="Email"/>
                                        <input type="text" placeholder="Website"/>
                                        <textarea placeholder="Comment"></textarea>
                                        <button type="submit">Submit</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    {/* Blog Details Section End */}

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
