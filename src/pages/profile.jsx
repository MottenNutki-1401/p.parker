import React from 'react';
import '../styles/header.css';
import ParkingSlots from './parkingslots';  

function ProfileModal({ isOpen, onClose, onEdit }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>

        <h1>Profile</h1>

        <p className="slot-info">Parked in slot:
        #{ParkingSlots.selectedSlot?.id}</p>

        <div className="btngrp">
          
      <button className="edit" onClick={onEdit}>
            Update Profile </button>

          <button className="out" onClick={onClose}>
        Logout </button> 

         </div>

        </div>
    </div>
  );
}


export default ProfileModal;