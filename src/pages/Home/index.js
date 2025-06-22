import React from "react";
import Header from "../../components/Header"; 
import HeroSection from "../../components/HeroSection";
import WeddingHallsSection from "../../components/WeddingHallsSection";
import WeddingFoodsSection from "../../components/WeddingFoodsSection";
import Footer from "../../components/Footer";
import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
    return (
        <>
        <Header />
        <HeroSection />
        <WeddingHallsSection />
        <WeddingFoodsSection />
        <Link to="/chatbot" className="floating-chatbot-button">
            <img src="/images/bot.png" alt="Chat with us" />
        </Link>
        <Footer/>
        </>
    );
}

export default Home;
