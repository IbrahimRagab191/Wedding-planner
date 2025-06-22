import React, { useState } from "react";
import { useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import "./Header.css";

function Header({ customClass }) {
    const userInfo = useSelector((state) => state.login.user);
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);

    const handleUsernameClick = () => {
        navigate("/UserProfile");
    };

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <header className={customClass}>
        <div className="container">
            <div className="logo">Wedding Planner</div>

            <button className="menu-toggle" onClick={toggleMenu}>
            ☰
            </button>

            <nav>
            <ul className={`nav-links ${menuOpen ? "open" : ""}`}>
                <li><NavLink to="/home">Home</NavLink></li>
                <li><NavLink to="/hallsPage">Wedding Halls</NavLink></li>
                <li><NavLink to="/foodsPage">Food Providers</NavLink></li>
                <li>
                <NavLink to={"/UserProfile"} className="username-btn" >
                    <FaUserCircle className="profile-icon" />
                    <span>{userInfo?.username || "Log in"}</span>
                </NavLink>
                </li>
            </ul>
            </nav>
        </div>
        </header>
    );
}

export default Header;
