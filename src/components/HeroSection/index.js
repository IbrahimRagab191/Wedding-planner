import React from "react";
import "./HeroSection.css";
import { useNavigate } from "react-router-dom";

function HeroSection() {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate("/hallsPage")
    }
    return (
        <main className="hero">
        <div className="hero-overlay" />
        <div className="hero-content">
            <h1>
            Welcome to <span>Wedding Planner</span>
            </h1>
            <p>Your all-in-one platform for planning your special day!</p>
            <button className="hero-btn" onClick={handleClick}>Reserve Now</button>
        </div>
        </main>
    );
}

export default HeroSection;
