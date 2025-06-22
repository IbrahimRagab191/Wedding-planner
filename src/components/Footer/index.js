import React from "react";
import "./Footer.css";
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import { Link } from "react-router-dom";

function Footer() {
    return (
        <footer className="footer">
        <div className="footer-section">
            <h3>Account</h3>
            <ul>
            <li>My Profile</li>
            <li>My Bookings</li>
            <li>Favorites</li>
            <li>Settings</li>
            </ul>
        </div>

        <div className="footer-section">
            <h3>Support</h3>
            <ul>
            <li>Contact Us</li>
            <li>FAQ</li>
            <li>Privacy Policy</li>
            <li>Terms of Service</li>
            </ul>
        </div>

        <div className="footer-section">
            <h3>Follow Us</h3>
            <div className="social-icons">
            <span><FaFacebookF /></span>
            <span><FaInstagram /></span>
            <span><FaTwitter /></span>
            <span><FaLinkedinIn /></span>
            </div>
            <p className="footer-note">© {new Date().getFullYear()} Wedding Planner. All rights reserved.</p>
        </div>
        </footer>
    );
}

export default Footer;
