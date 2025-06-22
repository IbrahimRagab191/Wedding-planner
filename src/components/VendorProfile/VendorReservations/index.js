import React from "react";
import "./VendorReservations.css";

const VendorReservations = () => {
  const reservations = [
    { id: 1, user: "Ahmed Mostafa", date: "2025-07-15" },
    { id: 2, user: "Laila Nour", date: "2025-08-01" },
    { id: 3, user: "Youssef Hassan", date: "2025-09-10" },
  ];

  return (
    <div className="vendor-reservations-section">
      <h2>Current Reservations</h2>
      <table className="reservation-table">
        <thead>
          <tr>
            <th>User's Name</th>
            <th>Reservation Date</th>
          </tr>
        </thead>
        <tbody>
          {reservations.map((reservation) => (
            <tr key={reservation.id}>
              <td>{reservation.user}</td>
              <td>{reservation.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VendorReservations;
