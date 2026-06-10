import { NavLink } from "react-router-dom";
import React from 'react'

export default function BmiCalculator() {
  return (
    <>
    {/* Breadcrumb Section Begin */}
    <section className="breadcrumb-section set-bg" style={{backgroundImage: "url(img/breadcrumb-bg.jpg)"}}>
        <div className="container">
            <div className="row">
                <div className="col-lg-12 text-center">
                    <div className="breadcrumb-text">
                        <h2>BMI calculator</h2>
                        <div className="bt-option">
                            <NavLink to="/">Home</NavLink>
                            <NavLink to="#">Pages</NavLink>
                            <span>BMI calculator</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    {/* Breadcrumb Section End */}

    {/* BMI Calculator Section Begin */}
    <section className="bmi-calculator-section spad">
        <div className="container">
            <div className="row">
                <div className="col-lg-6">
                    <div className="section-title chart-title">
                        <span>check your body</span>
                        <h2>BMI CALCULATOR CHART</h2>
                    </div>
                    <div className="chart-table">
                        <table>
                            <thead>
                                <tr>
                                    <th>Bmi</th>
                                    <th>WEIGHT STATUS</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="point">Below 18.5</td>
                                    <td>Underweight</td>
                                </tr>
                                <tr>
                                    <td className="point">18.5 - 24.9</td>
                                    <td>Healthy</td>
                                </tr>
                                <tr>
                                    <td className="point">25.0 - 29.9</td>
                                    <td>Overweight</td>
                                </tr>
                                <tr>
                                    <td className="point">30.0 - and Above</td>
                                    <td>Obese</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="col-lg-6">
                    <div className="section-title chart-calculate-title">
                        <span>check your body</span>
                        <h2>CALCULATE YOUR BMI</h2>
                    </div>
                    <div className="chart-calculate-form">
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                            labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo
                            viverra maecenas accumsan lacus vel facilisis.</p>
                        <form action="#">
                            <div className="row">
                                <div className="col-sm-6">
                                    <input type="text" placeholder="Height / cm"/>
                                </div>
                                <div className="col-sm-6">
                                    <input type="text" placeholder="Weight / kg"/>
                                </div>
                                <div className="col-sm-6">
                                    <input type="text" placeholder="Age"/>
                                </div>
                                <div className="col-sm-6">
                                    <input type="text" placeholder="Sex"/>
                                </div>
                                <div className="col-lg-12">
                                    <button type="submit">Calculate</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </section>
    {/* BMI Calculator Section End */}

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
