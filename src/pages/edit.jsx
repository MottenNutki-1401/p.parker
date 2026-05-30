import React, { useState } from 'react';
import { updateProfile } from '../api/api';
import '../styles/edit.css';
import ParkingSlots from './parkingslots';

function EditModal({ isOpen, onClose }) {

      const [username, setUsername] =
      useState("");
      const [fullName, setFullName] =
        useState("");

      const [password, setPassword] =
        useState("");

      const [confirmPassword,
        setConfirmPassword] =
        useState("");

      if (!isOpen) return null;

      //update function
              const handleUpdate = async () => {

          if (
            password !==
            confirmPassword
          ) {

            alert(
              "Passwords do not match"
            );

            return;
          }

          try {

            const response =
              await updateProfile({

                full_name:
                  fullName,

                  username:
                   username,


                password:
                  password
              });

            alert(
              response.message
            );

            onClose();

          }

          catch (error) {

            console.error(error);

            alert(
              "Update failed"
            );
          }
        };  
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
     
     
        <h1>Edit Profile</h1>
       

              <input
            className="inputs"
            type="text"
            placeholder="Update Name"
            value={fullName}
            onChange={(e) =>
              setFullName(
                e.target.value
              )
            }
          />

          <input
            className="inputs"
            type="text"
            placeholder="New Username"
            value={username}
            onChange={(e) =>
              setUsername(
                e.target.value
              )
            }
          />

          <input
            className="inputs"
            type="password"
            placeholder="New Password"
            value={password}
            onChange={(e) =>
              setPassword(
                e.target.value
              )
            }
          />

          <input
            className="inputs"
            type="password"
            placeholder="Re-type Password"
            value={confirmPassword}
            onChange={(e) =>
              setConfirmPassword(
                e.target.value
              )
            }
          />
  
        <div className="btngrp">
          
              <button
            className="edit"
            onClick={handleUpdate}
          >
            Update Profile
          </button>
      

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