import React from 'react';
import Modal from '@mui/material/Modal';
// import '../../css/announcementDetailsModal.css';

const AnnouncementDetailsModal = ({ announcement, onClose }) => {
  return (
    <Modal open={!!announcement} onClose={onClose} className="announcement-details-modal">
      <div className="modal-content">
        <h2>{announcement.title}</h2>
        <p>{announcement.description}</p>
        <button className="close-btn" onClick={onClose}>
          Close
        </button>
      </div>
    </Modal>
  );
};

export default AnnouncementDetailsModal;
