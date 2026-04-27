import React from 'react';
import '../styles/edit.css';
import ParkingSlots from './parkingslots';

function EditModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
     
     
        <h1>Edit Profile</h1>
        <p className="slot-info"> Parked in slot:
        #{ParkingSlots.selectedSlot?.id}</p>

        <input  className="inputs" type="text" placeholder="New email" />
        <input className="inputs" type="password" placeholder="New password" />
        <input className="inputs" type="password" placeholder="Re-type password" />
  
        <div className="btngrp">
          
      <button className="edit" onClick={onClose}>
        Done </button> 

          <button className="cancel" onClick={onClose}>
        Cancel </button> 

        <button className="delete-btn" onClick={onClose}>
          Delete Account </button>
          
        
        
         </div>

        </div>
    </div>
  );
}


export default EditModal;