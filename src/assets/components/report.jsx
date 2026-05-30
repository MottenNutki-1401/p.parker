import { useEffect, useState } from "react";
import "../../styles/rev.css";
import {
  getParkingSlots,getBookings
} from "../../api/api";
/**
 * REPORT DASHBOARD COMPONENT
 * ---------------------------------------
 * This component displays:
 * 1. Occupancy Report (from parking slots data)
 * 2. Revenue Report (from transactions)
 * 3. Bookings Table (transaction history)
 *
 * - Currently uses localStorage as mock database
 */

function Report({ isOpen, onClose }) {


  
  // =========================
  // OCCUPANCY DATA
  // =========================
  // SOURCE: parking slots (mock localStorage)
  // API: /api/admin/parking-slots
  const [slots, setSlots] = useState([]);

  const [occupancy, setOccupancy] = useState({
    total: 0,
    occupied: 0,
    available: 0,
    maintenance: 0,
  });

        //data from backend
        useEffect(() => {

        const loadSlots = async () => {

          try {

            const response =
              await getParkingSlots();

            if (
              response.status ===
              "success"
            ) {

              const slots =
                response.data;

              setSlots(slots);

              setOccupancy({

                total:
                  slots.length,

                occupied:
                  slots.filter(
                    s =>
                      s.status ===
                      "occupied"
                  ).length,

                available:
                  slots.filter(
                    s =>
                      s.status ===
                      "available"
                  ).length,

                maintenance:
                  slots.filter(
                    s =>
                      s.status ===
                      "maintenance"
                  ).length
              });
            }

          }

          catch (error) {

            console.error(error);
          }
        };

        loadSlots();

      }, []);

  // API: /api/admin/bookings
  const [bookings, setBookings] = useState([]);

  useEffect(() => {

  const loadBookings =
    async () => {

      try {

        const response =
          await getBookings();
          console.log(
          "BOOKINGS RESPONSE:",
          response
        );

        if (
          response.status ===
          "success"
        ) {

          setBookings(
            response.data
          );
        }

      }

      catch (error) {

        console.error(
          error
        );
      }
    };

  loadBookings();

}, []);

  
  // API: /api/reports/revenue
  const [revenue, setRevenue] = useState(0);

  useEffect(() => {

  const total =
    bookings.reduce(

      (sum, booking) =>

        sum +

        Number(
          booking.total_amount
        ),

      0
    );

  setRevenue(total);

}, [bookings]);

 //pagination table
  const [page, setPage] = useState(1);
  const perPage = 10;

  const start = (page - 1) * perPage;
  const paginated = bookings.slice(start, start + perPage);
  const totalPages = Math.ceil(bookings.length / perPage);

  useEffect(() => {
    if (isOpen) setPage(1);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="report-modal1"
        onClick={(e) => e.stopPropagation()}
      >


        {/* =========================
            OCCUPANCY REPORT UI
        ========================== */}
        <div className="report-box">
          <h3>Occupancy Report</h3>
          <p>Total Slots: {occupancy.total}</p>
          <p>Occupied: {occupancy.occupied}</p>
          <p>Available: {occupancy.available}</p>
          <p>Maintenance: {occupancy.maintenance}</p>
        </div>


        {/* =========================
            REVENUE REPORT UI
        ========================== */}
        <div className="report-box">
          <h3>Revenue Report</h3>
          <h1>₱{revenue}</h1>
        </div>

        {/* =========================
            BOOKINGS TABLE UI
        ========================== */}
       <div className="report-box bookings-report">
        <h3>Bookings</h3>

          {bookings.length === 0 ? (
            <p>No bookings yet</p>
          ) : (
            <>
           
             <table className="tx-table">
                <thead>
                  <tr>
                    <th>Slot</th>
                    <th>Date</th>
                    <th>Amount</th>
                  </tr>
                </thead>

                <tbody>
                  {paginated.map((b) => (
                    <tr key={b.id}>
                     <td>#{b.parking_slot_id}</td>

                      <td>{b.created_at}</td>

                      <td>
                        ₱{b.total_amount}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* PAGINATION CONTROLS */}
                  <div className="report-pagination">
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
          >
            Prev
          </button>

          <span>
            Page {page} / {totalPages || 1}
          </span>

          <button
            disabled={page === totalPages}
            onClick={() => setPage((p) => p + 1)}
          >
            Next
          </button>
        </div>
            </>
          )}
        </div>

      </div>
    </div>
  );
}

export default Report;