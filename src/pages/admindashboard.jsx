import React, { useState, useEffect } from "react";
import "../styles/admin.css";
import topview from "../assets/topview2.png";
import RevenueReport from "../assets/components/revenuereport";
import vector from "../assets/vector.svg";
import SlotDetailsModal from "../assets/components/SlotDetailsModal.jsx";

function AdminDashboard() {
  const [savedSlots, setSavedSlots] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);
  
  const [slots, setSlots] = useState([
  { id: 1, code: "001", status: "Available" },
  { id: 2, code: "002", status: "Occupied" },
  { id: 3, code: "003", status: "Available" },
  { id: 4, code: "004", status: "Occupied" },
  { id: 5, code: "005", status: "Occupied" },
  { id: 6, code: "006", status: "Available" },
  { id: 7, code: "007", status: "Available" },
  { id: 8, code: "008", status: "Occupied" },
  { id: 9, code: "009", status: "Occupied" },
  { id: 10, code: "010", status: "Available" },
  { id: 11, code: "011", status: "Occupied" },
  { id: 12, code: "012", status: "Occupied" },
  { id: 13, code: "013", status: "Available" },
  { id: 14, code: "014", status: "Occupied" },
  { id: 15, code: "015", status: "Occupied" },
  { id: 16, code: "016", status: "Available" },
  { id: 17, code: "017", status: "Available" },
  { id: 18, code: "018", status: "Occupied" },
  { id: 19, code: "019", status: "Maintenance" },
  { id: 20, code: "020", status: "Occupied" },
  { id: 21, code: "021", status: "Occupied" },
  { id: 22, code: "022", status: "Occupied" },
  { id: 23, code: "023", status: "Available" },
  { id: 24, code: "024", status: "Occupied" },
  { id: 25, code: "025", status: "Occupied" },
  { id: 26, code: "026", status: "Available" },
  { id: 27, code: "027", status: "Available" },
  { id: 28, code: "028", status: "Available" },
  { id: 29, code: "029", status: "Available" },
  { id: 30, code: "030", status: "Available" },
  { id: 31, code: "031", status: "Available" },
  { id: 32, code: "032", status: "Available" },
]);

  const layout = [
    { type: "row", slots: [1, 2, 3, 4, null, 5, 6, 7, 8] },
    { type: "road" },
    { type: "row", slots: [9, 10, 11, 12, null, 13, 14, 15, 16] },
    { type: "road" },
    { type: "row", slots: [17, 18, 19, 20, null, 21, 22, 23, 24] },
    { type: "road" },
    { type: "row", slots: [25, 26, 27, 28, null, 29, 30, 31, 32] },
  ];

      const openModal = (slot) => {
      setSelectedSlot(slot);
      setIsModalOpen(true);
    };

    const closeModal = () => {
      setIsModalOpen(false);
      setSelectedSlot(null);
    };
      
  useEffect(() => {
    const stored = localStorage.getItem("slots");
    if (stored) setSlots(JSON.parse(stored));
  }, []);

  const saveChanges = () => {
    setSavedSlots(slots);
    localStorage.setItem("slots", JSON.stringify(slots));
    alert("Changes saved!");
  };

  const updateStatus = (id, newStatus) => {
    setSlots((prev) =>
      prev.map((s) =>
        s.id === id ? { ...s, status: newStatus } : s
      )
    );
  };

  return (
    <div className="parking-wrapper">
    <h1 className="rev">Revenue Report</h1>

      <RevenueReport />
   
   <img src={vector} className="yellow" alt="yellow" /> 
      <div className="parking-lot">
        {layout.map((item, i) => {
          if (item.type === "road") {
            return <div key={i} className="road" />;
          }

          return (
            <div key={i} className="parking-row">
              {item.slots.map((id, j) => {
                if (!id) return <div key={j} className="gap" />;

                const slot = slots.find((s) => s.id === id);

                return (
    
         <div
          key={slot.id}
          className={`slot ${slot.status}`}
          onClick={() => openModal(slot)}
        >
                    <div className="slot-number">Slot#{slot.code}</div>
                    {slot.status === "Occupied" ? (
                      <img src={topview} className="topview2" />
                    ) : (
                      <h3>{slot.status}</h3>
                    )}

                    <div className="admin-btns">
                     <button
                          onClick={(e) => {
                            e.stopPropagation();
                            updateStatus(slot.id, "Available");
                          }}
                        >
                        Available
                      </button>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          updateStatus(slot.id, "Occupied");
                        }}
                      >
                        Occupied
                      </button>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          updateStatus(slot.id, "Maintenance");
                        }}
                      >
                        Maintenance
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
                <SlotDetailsModal
            isOpen={isModalOpen}
            onClose={closeModal}
            slot={selectedSlot}
          />
    </div>
  );
}

export default AdminDashboard;