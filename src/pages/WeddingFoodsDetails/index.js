// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { addReservation } from "../../Redux/Action";
// import Header from "../../components/Header";
// import Footer from "../../components/Footer";
// import "./WeddingFoodsDetails.css";
// import axios from "axios";

// function WeddingFoodsDetails() {
//   const { id } = useParams();
//   const dispatch = useDispatch();
//   const user = useSelector((state) => state.login.user);
//   const [food, setFood] = useState(null);

//   useEffect(() => {
//     const fetchFood = async () => {
//       try {
//         const token = localStorage.getItem("token");

//         const response = await axios.get(
//           "http://localhost/route2/project/api/vendors/list.php?vendor_type=food_provider",
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//               "Content-Type": "application/json",
//             },
//           }
//         );

//         const foundFood = response.data.find(
//           (f) => f.vendor_id.toString() === id
//         );

//         if (foundFood) {
//           const formattedFood = {
//             id: foundFood.vendor_id,
//             name: foundFood.name || `${foundFood.city} Food Provider`,
//             rating: 4 + Math.floor(Math.random() * 2), // 4 or 5
//             price: Math.floor(Math.random() * 3000 + 1500),
//             location: foundFood.city,
//             description: foundFood.description,
//             imageUrl:
//               foundFood.image_url ||
//               "https://th.bing.com/th/id/OIP.xRwHrHpM1CVeUpX2x-12EQHaE8?rs=1&pid=ImgDetMain&cb=idpwebpc2",
//             vendorEmail: foundFood.email,
//             serviceType: "Food Provider",
//           };
//           setFood(formattedFood);
//         } else {
//           setFood(null);
//         }
//       } catch (err) {
//         console.error("❌ Failed to fetch food provider:", err);
//       }
//     };

//     fetchFood();
//   }, [id]);

//   const handleOrder = () => {
//     if (!user) {
//       alert("Please login to place an order.");
//       return;
//     }

//     const reservationData = {
//       foodId: food.id,
//       foodName: food.name,
//       vendorEmail: food.vendorEmail,
//       userName: user.username,
//       serviceType: food.serviceType,
//       reservedAt: new Date().toISOString(),
//     };

//     dispatch(addReservation(reservationData));
//     alert("Reservation sent to food provider successfully!");
//   };

//   if (!food) return <div>Loading or not found...</div>;

//   return (
//     <>
//       <Header customClass="header-light" />
//       <section className="food-details">
//         <div className="container">
//           <div className="food-image">
//             <img src={food.imageUrl} alt={food.name} />
//           </div>
//           <div className="food-info">
//             <h1>{food.name}</h1>
//             <div className="rating">
//               {"⭐".repeat(food.rating)}{"☆".repeat(5 - food.rating)}
//             </div>
//             <p className="location">
//               <strong>Location:</strong> {food.location}
//             </p>
//             <p className="description">{food.description}</p>
//             <p className="price">Starting at: ${food.price}</p>
//             <button className="order-btn" onClick={handleOrder}>
//               Order This Service
//             </button>
//           </div>
//         </div>
//       </section>
//       <Footer />
//     </>
//   );
// }

// export default WeddingFoodsDetails;
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addReservation } from "../../Redux/Action";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import "./WeddingFoodsDetails.css";
import axios from "axios";

function WeddingFoodsDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.login.user);
  const [food, setFood] = useState(null);

  useEffect(() => {
    const fetchFood = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.get(
          "http://localhost/route2/project/api/vendors/list.php?vendor_type=food_provider",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        const foundFood = response.data.find(
          (f) => f.vendor_id.toString() === id
        );

        if (foundFood) {
          const formattedFood = {
            id: foundFood.vendor_id,
            name: foundFood.name || `${foundFood.city} Food Provider`,
            rating: 4 + Math.floor(Math.random() * 2), // 4 or 5
            price: Math.floor(Math.random() * 3000 + 1500),
            location: foundFood.city,
            description: foundFood.description,
            imageUrl:
              foundFood.image_url ||
              "https://th.bing.com/th/id/OIP.xRwHrHpM1CVeUpX2x-12EQHaE8?rs=1&pid=ImgDetMain&cb=idpwebpc2",
            vendorEmail: foundFood.email,
            serviceType: "Food Provider",
          };
          setFood(formattedFood);
        } else {
          setFood(null);
        }
      } catch (err) {
        console.error("❌ Failed to fetch food provider:", err);
      }
    };

    fetchFood();
  }, [id]);

  const handleOrder = () => {
    if (!user) {
      alert("Please login to place an order.");
      return;
    }
  
    const reservationData = {
      vendor: food.name,
      date: new Date().toLocaleString(),
    };
  
    dispatch(addReservation(reservationData));
    alert("Reservation sent to food provider successfully!");
  };
  

  if (!food) return <div>Loading or not found...</div>;

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
