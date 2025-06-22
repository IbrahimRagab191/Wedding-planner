import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addReservation } from "../../Redux/Action";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import "./WeddingFoodsDetails.css";

function WeddingFoodsDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.login.user);
  const [food, setFood] = useState(null);

  useEffect(() => {
    const dummyFoods = [
      {
        id: "1",
        name: "Delicious Catering",
        rating: 5,
        price: 2000,
        location: "Cairo",
        badge: "Top Rated",
        description:
          "Premium catering service offering diverse menus and elegant presentations.",
        imageUrl: "https://via.placeholder.com/600x400?text=Food+1",
        vendorEmail: "vendor1@catering.com",
        serviceType: "Food Provider",
      },
      {
        id: "2",
        name: "Gourmet Delights",
        rating: 4,
        price: 1500,
        location: "Giza",
        description:
          "Elegant food presentation with a variety of dishes from international cuisines.",
        imageUrl: "https://via.placeholder.com/600x400?text=Food+2",
        vendorEmail: "vendor2@catering.com",
        serviceType: "Food Provider",
      },
    ];

    const foundFood = dummyFoods.find((f) => f.id === id);
    setFood(foundFood);
  }, [id]);

  const handleOrder = () => {
    if (!user) {
      alert("Please login to place an order.");
      return;
    }

    const reservationData = {
      foodId: food.id,
      foodName: food.name,
      vendorEmail: food.vendorEmail,
      userName: user.username,
      serviceType: food.serviceType,
      reservedAt: new Date().toISOString(),
    };

    dispatch(addReservation(reservationData));
    alert("Reservation sent to food provider successfully!");
  };

  if (!food) return <div>Loading...</div>;

  return (
    <>
      <Header customClass="header-light" />
      <section className="food-details">
        <div className="container">
          <div className="food-image">
            <img src={food.imageUrl} alt={food.name} />
          </div>
          <div className="food-info">
            <h1>{food.name}</h1>
            <div className="rating">
              {"⭐".repeat(food.rating)}{"☆".repeat(5 - food.rating)}
            </div>
            <p className="location">
              <strong>Location:</strong> {food.location}
            </p>
            <p className="description">{food.description}</p>
            <p className="price">Starting at: ${food.price}</p>
            <button className="order-btn" onClick={handleOrder}>
              Order This Service
            </button>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default WeddingFoodsDetails;
