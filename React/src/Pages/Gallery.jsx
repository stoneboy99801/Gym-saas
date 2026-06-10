import { NavLink } from "react-router-dom";
import React from 'react'

export default function Gallery() {
  return (
    <>
        {/* Breadcrumb Section Begin */}
    <section className="breadcrumb-section set-bg" style={{backgroundImage: "url(img/breadcrumb-bg.jpg)"}}>
        <div className="container">
            <div className="row">
                <div className="col-lg-12 text-center">
                    <div className="breadcrumb-text">
                        <h2>Gallery</h2>
                        <div className="bt-option">
                            <NavLink to="/">Home</NavLink>
                            <NavLink to="#">Pages</NavLink>
                            <span>Gallery</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    {/* Breadcrumb Section End */}

    {/* Gallery Section Begin */}
    <div className="gallery-section gallery-page">
        <div className="gallery">
            <div className="grid-sizer"></div>
            <div className="gs-item grid-wide set-bg" style={{backgroundImage: "url(img/gallery/gallery-1.jpg)"}}>
                <NavLink to="img/gallery/gallery-1.jpg" className="thumb-icon image-popup"><i className="fa fa-picture-o"></i></NavLink>
            </div>
            <div className="gs-item set-bg" style={{backgroundImage: "url(img/gallery/gallery-2.jpg)"}}>
                <NavLink to="img/gallery/gallery-2.jpg" className="thumb-icon image-popup"><i className="fa fa-picture-o"></i></NavLink>
            </div>
            <div className="gs-item set-bg" style={{backgroundImage: "url(img/gallery/gallery-3.jpg)"}}>
                <NavLink to="img/gallery/gallery-3.jpg" className="thumb-icon image-popup"><i className="fa fa-picture-o"></i></NavLink>
            </div>
            <div className="gs-item set-bg" style={{backgroundImage: "url(img/gallery/gallery-4.jpg)"}}>
                <NavLink to="img/gallery/gallery-4.jpg" className="thumb-icon image-popup"><i className="fa fa-picture-o"></i></NavLink>
            </div>
            <div className="gs-item set-bg" style={{backgroundImage: "url(img/gallery/gallery-5.jpg)"}}>
                <NavLink to="img/gallery/gallery-5.jpg" className="thumb-icon image-popup"><i className="fa fa-picture-o"></i></NavLink>
            </div>
            <div className="gs-item grid-wide set-bg" style={{backgroundImage: "url(img/gallery/gallery-6.jpg)"}}>
                <NavLink to="img/gallery/gallery-6.jpg" className="thumb-icon image-popup"><i className="fa fa-picture-o"></i></NavLink>
            </div>
            <div className="gs-item grid-wide set-bg" style={{backgroundImage: "url(img/gallery/gallery-7.jpg)"}}>
                <NavLink to="img/gallery/gallery-7.jpg" className="thumb-icon image-popup"><i className="fa fa-picture-o"></i></NavLink>
            </div>
            <div className="gs-item set-bg" style={{backgroundImage: "url(img/gallery/gallery-8.jpg)"}}>
                <NavLink to="img/gallery/gallery-8.jpg" className="thumb-icon image-popup"><i className="fa fa-picture-o"></i></NavLink>
            </div>
            <div className="gs-item set-bg" style={{backgroundImage: "url(img/gallery/gallery-9.jpg)"}}>
                <NavLink to="img/gallery/gallery-9.jpg" className="thumb-icon image-popup"><i className="fa fa-picture-o"></i></NavLink>
            </div>
        </div>
    </div>
    {/* Gallery Section End */}

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
