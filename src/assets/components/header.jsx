import "../../styles/header.css";
import { useState } from "react";
import ProfileModal from "../../pages/profile";
import AdminLoginModal from "../../pages/adminmodal.jsx";
import EditModal from "../../pages/edit.jsx";


function Header() {
  const [showProfile, setShowProfile] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  
  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

   const openEditModal = () => {
    setShowProfile(false);
    setEditOpen(true);
  };

  return (
    <div>
      <div className="header">
        <div className="header-text">
          <h1>BOOKING SLOTS</h1>
        </div>
        <div className="header-actions">

          <button className="sidebar-button" onClick={() => setShowProfile(true)}>☰</button>
          <button className="admin-button" onClick={() => setShowAdmin(true)}>A</button>
         
        </div>
      </div>

     <ProfileModal
  isOpen={showProfile} onClose={() => setShowProfile(false)} onEdit={openEditModal}/>
      <AdminLoginModal isOpen={showAdmin} onClose={() => setShowAdmin(false)} />
      <EditModal isOpen={editOpen} onClose={() => setEditOpen(false)} />

    </div>

  );
}

export default Header;