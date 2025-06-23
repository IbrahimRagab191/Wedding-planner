import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addReservation } from "../../Redux/Action";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import "./WeddingHallDetails.css";
import axios from "axios";

function WeddingHallDetails() {
    const { id } = useParams();
    const dispatch = useDispatch();

    const user = useSelector((state) => state.login.user);

    const [hall, setHall] = useState(null);

    useEffect(() => {
        const fetchHall = async () => {
        try {
            const token = localStorage.getItem("token");
            const res = await axios.get(
            "http://localhost/route2/project/api/vendors/list.php?vendor_type=hall",
            {
                headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
                },
            }
            );

            const hallData = res.data.find((h) => h.vendor_id.toString() === id);

            if (hallData) {
            const formattedHall = {
                id: hallData.vendor_id,
                name: `${hallData.city} Hall`,
                rating: 4,
                price: Math.floor(Math.random() * 6000 + 3000),
                location: hallData.city,
                description: hallData.description,
                imageUrl:
                hallData.image_url ||
                "https://lh3.googleusercontent.com/gps-cs-s/AC9h4nqNklVJVZDODgByvisOkg_pXC8qsY0n5BiX1fEqX43HcrHxHR4IOfM8yJ3ZBNUxNKE5M-OHJMk5pwIOK_r1HTduyR3AhowSqmaag3h2ThH6mKW8tWvg6rm8VffaGIslyGfpRKntKQ=s3072-v1",
                vendorEmail: hallData.email,
                serviceType: "Wedding Hall",
            };
            setHall(formattedHall);
            } else {
            setHall(null);
            }
        } catch (error) {
            console.error("❌ Failed to fetch hall:", error);
        }
        };

        fetchHall();
    }, [id]);

    const handleReserve = () => {
        if (!user) {
        alert("Please log in first to reserve this hall.");
        return;
        }
    
        const reservationData = {
        vendor: hall.name, 
        date: new Date().toLocaleString(), 
        };
    
        dispatch(addReservation(reservationData));
        alert("Reservation request sent successfully!");
    };
    

    if (!hall) return <div>Loading or not found...</div>;

    return (
        <>
        <Header customClass="header-light" />
        <section className="hall-details">
            <div className="container">
            <div className="hall-image">
                <img src={hall.imageUrl} alt={hall.name} />
            </div>
            <div className="hall-info">
                <h1>{hall.name}</h1>
                <div className="rating">
                {"⭐".repeat(hall.rating)}
                {"☆".repeat(5 - hall.rating)}
                </div>
                <p className="location">
                <strong>Location:</strong> {hall.location}
                </p>
                <p className="description">{hall.description}</p>
                <p className="price">Price: ${hall.price}</p>
                <button className="reserve-btn" onClick={handleReserve}>
                Reserve This Hall
                </button>
            </div>
            </div>
        </section>
        <Footer />
        </>
    );
}

export default WeddingHallDetails;
