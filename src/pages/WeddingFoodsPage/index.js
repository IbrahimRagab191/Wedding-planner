// import React, { useState, useEffect } from "react";
// import Header from "../../components/Header";
// import Footer from "../../components/Footer";
// import "./WeddingFoodsPage.css";

// function WeddingFoodsPage() {
//   const [foods, setFoods] = useState([]);
//   const [priceFilter, setPriceFilter] = useState("");

//   useEffect(() => {
//     const dummyData = [
//       {
//         id: 1,
//         name: "Gourmet Catering",
//         rating: 5,
//         price: 4500,
//         description: "Premium catering with diverse international cuisines.",
//         imageUrl: "https://via.placeholder.com/400x250?text=Food+1",
//       },
//       {
//         id: 2,
//         name: "Classic Wedding Buffet",
//         rating: 4,
//         price: 6000,
//         description: "Traditional wedding dishes with a modern twist.",
//         imageUrl: "https://via.placeholder.com/400x250?text=Food+2",
//       },
//       {
//         id: 3,
//         name: "Luxury Banquet Service",
//         rating: 5,
//         price: 9000,
//         description: "Full-service banquet with 5-star quality.",
//         imageUrl: "https://via.placeholder.com/400x250?text=Food+3",
//       },
//     ];
//     setFoods(dummyData);
//   }, []);

//   const filteredFoods = foods.filter((food) => {
//     return priceFilter === ""
//       ? true
//       : priceFilter === "low"
//       ? food.price < 5000
//       : food.price >= 5000;
//   });

//   return (
//     <>
//     <Header customClass="header-light" />
//       <section className="wedding-foods-page">
//         <div className="container">
//           <div className="section-title">
//             <h2>Food Providers</h2>
//             <p>Explore our delicious wedding food packages</p>
//           </div>

//           <div className="filter-bar">
//             <select
//               value={priceFilter}
//               onChange={(e) => setPriceFilter(e.target.value)}
//             >
//               <option value="">Filter by Price</option>
//               <option value="low">Less than $5000</option>
//               <option value="high">$5000 or more</option>
//             </select>
//           </div>

//           <div className="gallery">
//             {filteredFoods.map((food) => (
//               <div className="card" key={food.id}>
//                 <div className="card-img">
//                   <img src={food.imageUrl} alt={food.name} />
//                 </div>
//                 <div className="card-content">
//                   <h3 className="card-title">{food.name}</h3>
//                   <div className="card-rating">
//                     {"⭐".repeat(food.rating)}{"☆".repeat(5 - food.rating)}
//                   </div>
//                   <p className="card-desc">{food.description}</p>
//                   <div className="card-price">From ${food.price}</div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>
//       <Footer />
//     </>
//   );
// }

// export default WeddingFoodsPage;
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import "./WeddingFoodsPage.css";

function WeddingFoodsPage() {
  const [foods, setFoods] = useState([]);
  const [priceFilter, setPriceFilter] = useState("");

  useEffect(() => {
    const dummyData = [
      {
        id: 1,
        name: "Gourmet Catering",
        rating: 5,
        price: 4500,
        description: "Premium catering with diverse international cuisines.",
        imageUrl: "https://via.placeholder.com/400x250?text=Food+1",
      },
      {
        id: 2,
        name: "Classic Wedding Buffet",
        rating: 4,
        price: 6000,
        description: "Traditional wedding dishes with a modern twist.",
        imageUrl: "https://via.placeholder.com/400x250?text=Food+2",
      },
      {
        id: 3,
        name: "Luxury Banquet Service",
        rating: 5,
        price: 9000,
        description: "Full-service banquet with 5-star quality.",
        imageUrl: "https://via.placeholder.com/400x250?text=Food+3",
      },
    ];
    setFoods(dummyData);
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
