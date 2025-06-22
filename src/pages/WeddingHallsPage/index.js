// import React, { useState, useEffect } from "react";
// import Header from "../../components/Header";
// import Footer from "../../components/Footer";
// import "./WeddingHallsPage.css";
// import { useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { addViewedHall } from "../../Redux/Action";
// import axios from "axios";

// function WeddingHallsPage() {
//     const [halls, setHalls] = useState([]);
//     const [priceFilter, setPriceFilter] = useState("");
//     const [locationFilter, setLocationFilter] = useState("");
//     const dispatch = useDispatch();
//     const navigate = useNavigate();

//     useEffect(() => {
//         const fetchHalls = async () => {
//         try {
//             console.log("📦 Raw data from API:", rawData);
//             const token = localStorage.getItem("token"); // أو من Redux لو بتخزن هناك

//             const response = await axios.get(
//             "http://localhost/route2/project/api/vendors/list.php?vendor_type=hall",
//             {
//                 headers: {
//                 Authorization: `Bearer ${token}`,
//                 "Content-Type": "application/json",
//                 },
//                 withCredentials: true, // مهم جدًا مع CORS لو السيرفر بيرد بـ Allow-Credentials
//             }
            
//             );

//             const rawData = response.data;

//             // Format البيانات القادمة من الباك اند
//             const formattedData = rawData.map((hall) => ({
//             id: hall.vendor_id,
//             name: `${hall.city} Hall`,
//             price: Math.floor(Math.random() * 6000 + 3000), // قيمة مؤقتة
//             location: hall.city,
//             badge:
//                 hall.city === "Cairo"
//                 ? "Most Popular"
//                 : hall.city === "Alexandria"
//                 ? "New"
//                 : null,
//             description: hall.description,
//             imageUrl:
//                 hall.image_url || "https://via.placeholder.com/400x250?text=Hall",
//             rating: 4,
//             }));

//             setHalls(formattedData);
//         } catch (error) {
//             console.error("❌ Failed to fetch halls:", error);
//         }
//         };

//         fetchHalls();
//     }, []);

//     const filteredHalls = halls.filter((hall) => {
//         const matchesPrice =
//         priceFilter === ""
//             ? true
//             : priceFilter === "low"
//             ? hall.price < 5000
//             : hall.price >= 5000;

//         const matchesLocation =
//         locationFilter === "" ? true : hall.location === locationFilter;

//         return matchesPrice && matchesLocation;
//     });

//     const handleCardClick = (id) => {
//         dispatch(addViewedHall(id));
//         navigate(`/halls/${id}`);
//     };

//     return (
//         <>
//         <Header customClass="header-light" />
//         <section className="wedding-halls-page">
//             <div className="container">
//             <div className="section-title">
//                 <h2>Wedding Halls</h2>
//                 <p>Explore all our amazing venues for your special day</p>
//             </div>

//             <div className="filter-bar">
//                 <select
//                 value={priceFilter}
//                 onChange={(e) => setPriceFilter(e.target.value)}
//                 >
//                 <option value="">Filter by Price</option>
//                 <option value="low">Less than $5000</option>
//                 <option value="high">$5000 or more</option>
//                 </select>

//                 <select
//                 value={locationFilter}
//                 onChange={(e) => setLocationFilter(e.target.value)}
//                 >
//                 <option value="">Filter by Location</option>
//                 <option value="Cairo">Cairo</option>
//                 <option value="Giza">Giza</option>
//                 <option value="Alexandria">Alexandria</option>
//                 </select>
//             </div>

//             <div className="gallery">
//                 {filteredHalls.map((hall) => (
//                 <div
//                     className="card"
//                     key={hall.id}
//                     onClick={() => handleCardClick(hall.id)}
//                     style={{ cursor: "pointer" }}
//                 >
//                     {hall.badge && (
//                     <div className="card-badge">{hall.badge}</div>
//                     )}
//                     <div className="card-img">
//                     <img src={hall.imageUrl} alt={hall.name} />
//                     </div>
//                     <div className="card-content">
//                     <h3 className="card-title">{hall.name}</h3>
//                     <div className="card-rating">
//                         {"⭐".repeat(hall.rating)}
//                         {"☆".repeat(5 - hall.rating)}
//                     </div>
//                     <p className="card-desc">{hall.description}</p>
//                     <div className="card-price">From ${hall.price}</div>
//                     </div>
//                 </div>
//                 ))}
//             </div>
//             </div>
//         </section>
//         <Footer />
//         </>
//     );
// }

// export default WeddingHallsPage;
import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import "./WeddingHallsPage.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addViewedHall } from "../../Redux/Action";
import axios from "axios";

function WeddingHallsPage() {
    const [halls, setHalls] = useState([]);
    const [priceFilter, setPriceFilter] = useState("");
    const [locationFilter, setLocationFilter] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchHalls = async () => {
        try {
            const token = localStorage.getItem("token");

            const response = await axios.get(
            "http://localhost/route2/project/api/vendors/list.php?vendor_type=hall",
            {
                headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
                },
                withCredentials: true,
            }
            );

            const rawData = response.data;
            console.log("📦 Raw data from API:", rawData);

            const formattedData = rawData.map((hall) => ({
            id: hall.vendor_id,
            name: `${hall.city} Hall`,
            price: Math.floor(Math.random() * 6000 + 3000),
            location: hall.city,
            badge:
                hall.city === "Cairo"
                ? "Most Popular"
                : hall.city === "Alexandria"
                ? "New"
                : null,
            description: hall.description,
            imageUrl:
                hall.image_url || "https://via.placeholder.com/400x250?text=Hall",
            rating: 4,
            }));

            setHalls(formattedData);
        } catch (error) {
            console.error("❌ Failed to fetch halls:", error);
        }
        };

        fetchHalls();
    }, []);

    const filteredHalls = halls.filter((hall) => {
        const matchesPrice =
        priceFilter === ""
            ? true
            : priceFilter === "low"
            ? hall.price < 5000
            : hall.price >= 5000;

        const matchesLocation =
        locationFilter === "" ? true : hall.location === locationFilter;

        return matchesPrice && matchesLocation;
    });

    const handleCardClick = (id) => {
        dispatch(addViewedHall(id));
        navigate(`/halls/${id}`);
    };

    return (
        <>
        <Header customClass="header-light" />
        <section className="wedding-halls-page">
            <div className="container">
            <div className="section-title">
                <h2>Wedding Halls</h2>
                <p>Explore all our amazing venues for your special day</p>
            </div>

            <div className="filter-bar">
                <select
                value={priceFilter}
                onChange={(e) => setPriceFilter(e.target.value)}
                >
                <option value="">Filter by Price</option>
                <option value="low">Less than $5000</option>
                <option value="high">$5000 or more</option>
                </select>

                <select
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
                >
                <option value="">Filter by Location</option>
                <option value="Cairo">Cairo</option>
                <option value="Giza">Giza</option>
                <option value="Alexandria">Alexandria</option>
                </select>
            </div>

            <div className="gallery">
                {filteredHalls.map((hall) => (
                <div
                    className="card"
                    key={hall.id}
                    onClick={() => handleCardClick(hall.id)}
                    style={{ cursor: "pointer" }}
                >
                    {hall.badge && (
                    <div className="card-badge">{hall.badge}</div>
                    )}
                    <div className="card-img">
                    <img src={hall.imageUrl} alt={hall.name} />
                    </div>
                    <div className="card-content">
                    <h3 className="card-title">{hall.name}</h3>
                    <div className="card-rating">
                        {"⭐".repeat(hall.rating)}
                        {"☆".repeat(5 - hall.rating)}
                    </div>
                    <p className="card-desc">{hall.description}</p>
                    <div className="card-price">From ${hall.price}</div>
                    </div>
                </div>
                ))}
            </div>
            </div>
        </section>
        <Footer />
        </>
    );
}

export default WeddingHallsPage;
