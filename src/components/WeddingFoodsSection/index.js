import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./WeddingFoodsSection.css";

function WeddingFoodsSection() {
  const [foods, setFoods] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const dummyFoods = [
      {
        id: 1,
        name: "Gourmet Catering",
        rating: 5,
        price: 2000,
        badge: "Top Rated",
        description: "Elegant gourmet catering with customizable menu options for any size wedding.",
        imageUrl: "https://via.placeholder.com/400x250?text=Food+1",
      },
      {
        id: 2,
        name: "Luxury Banquet",
        rating: 4,
        price: 1800,
        description: "Luxurious food experience offering international cuisine for your special day.",
        imageUrl: "https://via.placeholder.com/400x250?text=Food+2",
      },
      {
        id: 3,
        name: "Classic Dishes Co.",
        rating: 4,
        price: 1500,
        badge: "New",
        description: "Classic dishes and traditional flavors crafted to perfection.",
        imageUrl: "https://via.placeholder.com/400x250?text=Food+3",
      },
    ];

    setFoods(dummyFoods);
  }, []);

  return (
    <section className="foods-section">
      <div className="section-title">
        <h2>Food Providers</h2>
        <p>Explore the finest catering services for your wedding day</p>
      </div>

      <div className="gallery">
        {foods.map((food) => (
          <div className="card" key={food.id}>
            {food.badge && <div className="card-badge">{food.badge}</div>}
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
        ))}
      </div>

      <div className="see-more-wrapper">
        <button className="see-more-btn" onClick={() => navigate("/foodsPage")}>
          See All Food Providers
        </button>
      </div>
    </section>
  );
}

export default WeddingFoodsSection;
