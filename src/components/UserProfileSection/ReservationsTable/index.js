import React from "react";
import { useSelector } from "react-redux";
import "./ReservationsTable.css";
const ReservationsTable = () => {
  const reservations = useSelector((state) => state.reservation.reservations);

  return (
    <div className="reservations-table">
      <h2>Current Reservations</h2>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Vendor's Name</th>
              <th>Reservation Date</th>
            </tr>
          </thead>
          <tbody>
            {reservations.length > 0 ? (
              reservations.map((res, index) => (
                <tr key={index}>
                  <td>{res.vendor}</td>
                  <td>{res.date}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2">No reservations yet.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReservationsTable;
