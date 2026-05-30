import React, { useState, useEffect } from "react";
import "../styles/admin.css";
import topview from "../assets/topview2.png";
import Report from "../assets/components/report.jsx";
import vector from "../assets/vector.svg";
import SlotDetailsModal from "../assets/components/SlotDetailsModal.jsx";

import { getParkingSlots } from "../api/api";

function AdminDashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);

  const [tick, setTick] = useState(0);
  const [pendingUpdate, setPendingUpdate] = useState(null);

  //real db data
  const [slots, setSlots] = useState([]);
  const layout = [
    { type: "row", slots: [1, 2, 3, 4, null, 5, 6, 7, 8] },
    { type: "road" },
    { type: "row", slots: [9, 10, 11, 12, null, 13, 14, 15, 16] },
    { type: "road" },
    { type: "row", slots: [17, 18, 19, 20, null, 21, 22, 23, 24] },
    { type: "road" },
    { type: "row", slots: [25, 26, 27, 28, null, 29, 30, 31, 32] },
  ];

  //load slots
  const loadSlots = async () => {

  try {

    const response =
      await getParkingSlots();

    if (
      response.status ===
      "success"
    ) {

      setSlots(
        response.data
      );
                console.log(
                    slots.map(
                      s => s.id
                    )
                  );
            }

  }

  catch (error) {

    console.error(error);
  }
};

  // ---------------- TIMER ----------------
  useEffect(() => {
    const interval = setInterval(() => {
      setTick((t) => t + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setSlots((prev) =>
      prev.map((s) =>
        s.status.toLowerCase() === "occupied" && (s.timeLeft ?? 0) > 0
          ? { ...s, timeLeft: s.timeLeft - 1 }
          : s
      )
    );
  }, [tick]);
//useEffect
useEffect(() => {

  loadSlots();

}, []);
  // ---------------- BLINK LOGIC ----------------
  const isBlinking = (slot) => {
    return (
      slot.status === "Occupied" &&
      (slot.timeLeft ?? 0) <= 30 &&
      (slot.timeLeft ?? 0) > 0
    );
  };

  // ---------------- MODALS ----------------
  const openModal = (slot) => {
    setSelectedSlot(slot);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedSlot(null);
  };

  // ---------------- STATUS UPDATE ----------------
  const updateStatus = (id, newStatus) => {
    setSlots((prev) =>
      prev.map((s) =>
        s.id === id ? { ...s, status: newStatus } : s
      )
    );
  };

  const askUpdateStatus = (slot, newStatus) => {
    setPendingUpdate({ slot, newStatus });
  };

  const confirmUpdate = () => {
    updateStatus(pendingUpdate.slot.id, pendingUpdate.newStatus);
    setPendingUpdate(null);
  };

  return (
    <div className="parking-wrapper">

      <Report />

      <img src={vector} className="yellow" alt="yellow" />

      <div className="parking-lot">

        {layout.map((item, i) => {
          if (item.type === "road") {
            return <div key={i} className="road" />;
          }

          return (
            <div key={i} className="parking-row">

              {item.slots.map((id, j) => {
              if (!id)
                    return (
                      <div
                        key={`gap-${i}-${j}`}
                        className="gap"
                      />
                    );      

               //sql backend return
               const slot = slots.find(
                    (s) => Number(s.id) === id
                  );
                  //prevent crash
                  if (!slot) {

                    return (
                      <div
                        key={j}
                        className="slot"
                      >
                        Loading...
                      </div>
                    );
                  }
                return (
                  <div
                    key={`${i}-${j}-${slot.id}`}
                    className={`slot ${slot.status} ${isBlinking(slot) ? "blink" : ""}`}
                    onClick={() => openModal(slot)}
                  >

                    <div className="slot-number">
                      Slot#{slot.code}
                    </div>

                    {slot.status.toLowerCase() === "occupied" ? (
                      <img src={topview} className="topview2" />
                    ) : (
                      <h3>{slot.status}</h3>
                    )}

                    {/* DROPDOWN */}
                    <select
                      className={`meow ${slot.status.toLowerCase()}`}
                      value={slot.status}
                      onClick={(e) => e.stopPropagation()}
                      onChange={(e) =>
                        askUpdateStatus(slot, e.target.value)
                      }
                    >
                      <option value="Available">Available</option>
                      <option value="Occupied">Occupied</option>
                      <option value="Maintenance">Maintenance</option>
                    </select>

                  </div>
                );
              })}

            </div>
          );
        })}

      </div>

      {/* CONFIRM MODAL */}
      {pendingUpdate && (
        <div
          className="modal-overlay"
          onClick={() => setPendingUpdate(null)}
        >
          <div
            className="confirm-modal"
            onClick={(e) => e.stopPropagation()}
          >

            <h3>Confirm Change</h3>

            <p>
              Change Slot #{pendingUpdate.slot.code} to{" "}
              <b>{pendingUpdate.newStatus}</b>?
            </p>

            <div className="confirm-buttons">

              <button onClick={() => setPendingUpdate(null)}>
                Cancel
              </button>

              <button onClick={confirmUpdate}>
                Confirm
              </button>

            </div>

          </div>
        </div>
      )}

      <SlotDetailsModal
        isOpen={isModalOpen}
        onClose={closeModal}
        slot={selectedSlot}
      />

    </div>
  );
}

export default AdminDashboard;