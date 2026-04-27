import React from "react";
import "../../styles/modal.css";

function SlotDetailsModal({ isOpen, onClose, slot }) {
  if (!isOpen || !slot) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
    <div className="slot-modal" onClick={(e) => e.stopPropagation()}>
     
     
     <div className="stats"> 
        <h1>Slot Details</h1>
        <p><strong>Slot ID:</strong> {slot.id}</p>
        <p><strong>Slot Code:</strong> {slot.code}</p>
        <p><strong>Status:</strong> {slot.status}</p>
    </div>

        <div className="btngrp">
          <button className="out" onClick={onClose}>
            Close
          </button>
        </div>

      </div>
    </div>
  );
}

export default SlotDetailsModal;