import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addReservation } from "../../Redux/Action";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import "./WeddingHallDetails.css";

function WeddingHallDetails() {
    const { id } = useParams();
    const dispatch = useDispatch();

    // user info from redux
    const user = useSelector((state) => state.login.user);

    const [hall, setHall] = useState(null);

    useEffect(() => {
        const dummyData = [
        {
            id: "1",
            name: "Grand Palace Hall",
            rating: 4,
            price: 5000,
            location: "Cairo",
            badge: "Most Popular",
            description:
            "Majestic venue with grand ballroom and luxurious interiors perfect for royal weddings.",
            imageUrl: "https://via.placeholder.com/600x400?text=Grand+Palace",
            vendorEmail: "vendor1@wedding.com",      // 👈 مهم للربط مع الvendor
            serviceType: "Wedding Hall",
        },
        {
            id: "2",
            name: "Royal Garden Hall",
            rating: 5,
            price: 8000,
            location: "Giza",
            description:
            "Elegant outdoor venue surrounded by beautiful landscapes and modern amenities.",
            imageUrl: "https://via.placeholder.com/600x400?text=Royal+Garden",
            vendorEmail: "vendor2@wedding.com",
            serviceType: "Wedding Hall",
        },
        ];

        const foundHall = dummyData.find((h) => h.id === id);
        setHall(foundHall);
    }, [id]);

    const handleReserve = () => {
        if (!user) {
        alert("Please log in first to reserve this hall.");
        return;
        }

        const reservationData = {
        hallId: hall.id,
        hallName: hall.name,
        vendorEmail: hall.vendorEmail,
        userName: user.username,
        serviceType: hall.serviceType,
        reservedAt: new Date().toISOString(),
        };

        dispatch(addReservation(reservationData));
        alert("Reservation request sent successfully!");
    };

    if (!hall) return <div>Loading...</div>;

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
                {"⭐".repeat(hall.rating)}{"☆".repeat(5 - hall.rating)}
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

