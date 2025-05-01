
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useReactToPrint } from "react-to-print";

import '../css/home.css'

export default function Footer() {
  return (
    <div className="footer">
      <section className="footer pti-bg-light_blue">
        <div className="container d-flex gap-5 justify-content-center pt-5">
            <div className="d-flex flex-column gap-2">
                <div className="footer-logo"></div>
                <div className="footer-test pti-text-p">Lorem ipsum dolor sit amet, <br /> consectetur adipiscing elit. </div>
                <div className="d-flex gap-4">
                  <div><i className="fa-brands fa-facebook" ></i></div>
                  <div><i className="fa-brands fa-instagram" ></i></div>
                  <div><i className="fa-brands fa-twitter" ></i></div>
                  <div><i className="fa-brands fa-linkedin" ></i></div>
                </div>
            </div>
            <div>
              <div>
                <ol className="pti-footer-ol">
                  <li className="pti-text-h3 pti-bold">Our catergorize</li>
                  <li className="pti-text-p pt-2">Factory Uniforms</li>
                  <li className="pti-text-p">School Uniforms</li>
                  <li className="pti-text-p">Military Uniforms</li>
                  <li className="pti-text-p">Military Uniforms</li>
                  <li className="pti-text-p">Towels</li>
                </ol>
              </div>
            </div>
            <div>
            <div>
                <ol className="pti-footer-ol">
                  <li className="pti-text-h3 pti-bold">Our Services</li>
                  <li className="pti-text-p pt-2">Online Marketplace</li>
                  <li className="pti-text-p">Free Delivery</li>
                  <li className="pti-text-p">Packaging</li>
                </ol>
              </div>
            </div>
            <div>
            <ol className="pti-footer-ol">
                  <li className="pti-text-h3 pti-bold">Contact Us</li>
                  <li className="pti-text-p pt-2">info@pti.com</li>
                  <li className="pti-text-p">No 623, Piliyandala Road, Katubedda</li>
                </ol>
            </div>
        </div>
      </section>
    </div>
  );
}
