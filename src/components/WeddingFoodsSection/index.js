import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./WeddingFoodsSection.css";

function WeddingFoodsSection() {
  const [foods, setFoods] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          "http://localhost/route2/project/api/vendors/list.php?vendor_type=food_provider",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        const rawFoods = res.data.slice(0, 3);

        const formattedFoods = rawFoods.map((food) => ({
          id: food.vendor_id,
          name: food.name || `${food.city} Food Provider`,
          rating: 4 + Math.floor(Math.random() * 2), // 4 or 5
          price: Math.floor(Math.random() * 3000 + 1500),
          badge: food.city === "Cairo" ? "Top Rated" : food.city === "Giza" ? "New" : null,
          description: food.description,
          imageUrl:
            food.image_url ||
            "https://th.bing.com/th/id/OIP.xRwHrHpM1CVeUpX2x-12EQHaE8?rs=1&pid=ImgDetMain&cb=idpwebpc2",
        }));

        setFoods(formattedFoods);
      } catch (err) {
        console.error("❌ Failed to fetch food providers:", err);
      }
    };

    fetchFoods();
  }, []);

  const handleClick = (id) => {
    navigate(`/foods/${id}`);
  };

  return (
    <section className="foods-section">
      <div className="section-title">
        <h2>Food Providers</h2>
        <p>Explore the finest catering services for your wedding day</p>
      </div>

      <div className="gallery">
        {foods.map((food) => (
          <div className="card" key={food.id} onClick={() => handleClick(food.id)} style={{ cursor: "pointer" }}>
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
