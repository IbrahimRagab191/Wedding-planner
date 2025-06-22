// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import "./WeddingHallsSection.css";

// function WeddingHallsSection() {
//   const [halls, setHalls] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchHalls = async () => {
//       try {
//         const res = await fetch("http://localhost:5000/recommend?ids=2,4,6&n=3&same_city=true");
//         const data = await res.json();

//         if (Array.isArray(data)) {
//           setHalls(data);
//         } else {
//           console.error("Unexpected response format:", data);
//         }
//       } catch (error) {
//         console.error("Error fetching halls:", error);
//       }
//     };

//     fetchHalls();
//   }, []);

//   return (
//     <section className="wedding-halls-section">
//       <div className="section-title">
//         <h2>Wedding Halls</h2>
//         <p>Discover our exquisite collection of premium wedding venues</p>
//       </div>

//       <div className="gallery">
//         {halls.map((hall) => (
//           <div className="card" key={hall.id}>
//             {hall.tags && hall.tags.length > 0 && (
//               <div className="card-badge">{hall.tags[0]}</div> // أول وسم كـ badge
//             )}
//             <div className="card-img">
//               <img
//                 src="https://via.placeholder.com/400x250?text=Wedding+Hall"
//                 alt={hall.name}
//               />
//             </div>
//             <div className="card-content">
//               <h3 className="card-title">{hall.name}</h3>
//               <div className="card-rating">
//                 {"⭐".repeat(Math.round(hall.score * 5)) || "☆☆☆☆☆"}
//                 {"☆".repeat(5 - Math.round(hall.score * 5))}
//               </div>
//               <p className="card-desc">Location: {hall.location}</p>
//               <div className="card-tags">
//                 {hall.tags && hall.tags.map((tag, index) => (
//                   <span className="tag" key={index}>{tag}</span>
//                 ))}
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       <div className="see-more-wrapper">
//         <button className="see-more-btn" onClick={() => navigate("/hallsPage")}>
//           See All Wedding Halls
//         </button>
//       </div>
//     </section>
//   );
// }

// export default WeddingHallsSection;
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./WeddingHallsSection.css";

function WeddingHallsSection() {
  const [halls, setHalls] = useState([]);
  const navigate = useNavigate();

  // ✅ جلب آخر 3 IDs من Redux
  const viewedHalls = useSelector((state) => state.viewedHalls.viewed);

  useEffect(() => {
    const fetchHalls = async () => {
      if (viewedHalls.length === 0) return;

      try {
        const idsParam = viewedHalls.join(",");
        const res = await fetch(`http://localhost:5000/recommend?ids=${idsParam}&n=3&same_city=true`);
        const data = await res.json();

        if (Array.isArray(data)) {
          setHalls(data);
        } else {
          console.error("Unexpected response format:", data);
        }
      } catch (error) {
        console.error("Error fetching recommended halls:", error);
      }
    };

    fetchHalls();
  }, [viewedHalls]);

  return (
    <section className="wedding-halls-section">
      <div className="section-title">
        <h2>Recommended Halls</h2>
        <p>Based on your recent visits</p>
      </div>

      <div className="gallery">
        {halls.map((hall) => (
          <div className="card" key={hall.id} onClick={() => navigate(`/halls/${hall.id}`)}>
            {hall.tags && hall.tags.length > 0 && (
              <div className="card-badge">{hall.tags[0]}</div> // أول وسم كـ badge
            )}
            <div className="card-img">
              <img
                src={hall.image_url}
                alt={hall.name}
              />
            </div>
            <div className="card-content">
              <h3 className="card-title">{hall.name}</h3>
              <div className="card-rating">
                {"⭐".repeat(Math.round(hall.score * 5))}
                {"☆".repeat(5 - Math.round(hall.score * 5))}
              </div>
              <p className="card-desc">Location: {hall.location}</p>
              <div className="card-tags">
                {hall.tags && hall.tags.map((tag, index) => (
                  <span className="tag" key={index}>{tag}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="see-more-wrapper">
        <button className="see-more-btn" onClick={() => navigate("/hallsPage")}>
          See All Wedding Halls
        </button>
      </div>
    </section>
  );
}

export default WeddingHallsSection;
