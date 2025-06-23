import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import "./WeddingFoodsPage.css";
import axios from "axios";

function WeddingFoodsPage() {
  const [foods, setFoods] = useState([]);
  const [priceFilter, setPriceFilter] = useState("");

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.get(
          "http://localhost/route2/project/api/vendors/list.php?vendor_type=food_provider",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );

        const rawData = response.data;
        console.log("🍽️ API Data:", rawData);

        const formattedData = rawData.map((item) => ({
          id: item.vendor_id,
          name: item.name || `${item.city} Catering`,
          rating: Math.floor(Math.random() * 2) + 4, 
          price: Math.floor(Math.random() * 6000 + 3000), 
          description: item.description || "Excellent catering service.",
          imageUrl:
            item.image_url || "https://th.bing.com/th/id/OIP.xRwHrHpM1CVeUpX2x-12EQHaE8?rs=1&pid=ImgDetMain&cb=idpwebpc2",
        }));

        setFoods(formattedData);
      } catch (error) {
        console.error("❌ Failed to fetch food vendors:", error);
      }
    };

    fetchFoods();
  }, []);

  const filteredFoods = foods.filter((food) => {
    return priceFilter === ""
      ? true
      : priceFilter === "low"
      ? food.price < 5000
      : food.price >= 5000;
  });

  return (
    <>
      <Header customClass="header-light" />
      <section className="wedding-foods-page">
        <div className="container">
          <div className="section-title">
            <h2>Food Providers</h2>
            <p>Explore our delicious wedding food packages</p>
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
          </div>

          <div className="gallery">
            {filteredFoods.map((food) => (
              <Link
                to={`/foods/${food.id}`}
                key={food.id}
                className="card-link"
              >
                <div className="card">
                  <div className="card-img">
                    <img src={food.imageUrl} alt={food.name} />
                  </div>
                  <div className="card-content">
                    <h3 className="card-title">{food.name}</h3>
                    <div className="card-rating">
                      {"⭐".repeat(food.rating)}{"☆".repeat(5 - food.rating)}
                    </div>
                    <p className="card-desc">{food.description}</p>
                    <div className="card-price">From ${food.price}</div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default WeddingFoodsPage;
