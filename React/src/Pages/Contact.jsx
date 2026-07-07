import { NavLink } from "react-router-dom";
import React from 'react'

export default function Contact() {
  return (
    <>
      {/* Breadcrumb Section Begin */}
      <section className="breadcrumb-section set-bg" data-setbg="img/breadcrumb-bg.jpg">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 text-center">
              <div className="breadcrumb-text">
                <h2>Contact Us</h2>
                <div className="bt-option">
                  <NavLink to="/">Home</NavLink>
                  <span>Contact Us</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Breadcrumb Section End */}

      {/* Contact Section Begin */}
      <section className="contact-section spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="section-title contact-title">
                <span>Contact Us</span>
                <h2>GET IN TOUCH</h2>
              </div>
              <div className="contact-widget">
                <div className="cw-text">
                  <i className="fa fa-map-marker"></i>
                  <p>GymHub HQ, Lahore,<br /> Punjab, Pakistan</p>
                </div>
                <div className="cw-text">
                  <i className="fa fa-mobile"></i>
                  <ul>
                    <li>+92-300-1234567</li>
                    <li>+92-321-7654321</li>
                  </ul>
                </div>
                <div className="cw-text email">
                  <i className="fa fa-envelope"></i>
                  <p>support@gymhub.pk</p>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="leave-comment">
                <form action="#">
                  <input type="text" placeholder="Your Name" />
                  <input type="text" placeholder="Your Email" />
                  <input type="text" placeholder="Subject" />
                  <textarea placeholder="Your Message"></textarea>
                  <button type="submit">Send Message</button>
                </form>
              </div>
            </div>
          </div>
          <div className="map">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d108882.04523614!2d74.2363718!3d31.5203696!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39190483e58107d9%3A0xc23abe9765f0b7f4!2sLahore%2C%20Punjab%2C%20Pakistan!5e0!3m2!1sen!2s!4v1700000000000"
              height="550" style={{ border: 0 }} allowFullScreen></iframe>
          </div>
        </div>
      </section>
      {/* Contact Section End */}

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
