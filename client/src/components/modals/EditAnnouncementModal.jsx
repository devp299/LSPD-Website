import React, { useState, useEffect } from 'react';
import '../../css/editAnnouncementModal.css';
// import '../../css/EditJobModal.css'

// Function to format date for `datetime-local` input
const formatDateForInput = (date) => {
  if (!date) return '';
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  const hours = String(d.getHours()).padStart(2, '0');
  const minutes = String(d.getMinutes()).padStart(2, '0');
  return `${year}-${month}-${day}T${hours}:${minutes}`;
};

const EditAnnouncementModal = ({ announcement, onUpdate, onClose }) => {
  const [formData, setFormData] = useState({ ...announcement });

  useEffect(() => {
    // Update formData when announcement prop changes
    setFormData({ ...announcement });
  }, [announcement]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleUpdate = () => {
    // Convert date back to ISO format for consistency
    onUpdate(formData);
    onClose();
  };

  return (
    <div className="edit-modal">
      <div className="edit-modal-content">
      <h1 className="edit-title1">Edit News Details</h1>
      <div className="edit-field-group">
          <label>
            Title:
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
            />
          </label>
          <label>
              Location:
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
              />
            </label>
            </div>
          <label>
            Description:
            <textarea
              name="content"
              value={formData.content}
              onChange={handleChange}
            />
          </label>
          <label>
            Date:
            <input
              type="datetime-local"
              name="date"
              value={formatDateForInput(formData.date)}
              onChange={handleChange}
            />
          </label>
        <div className="edit-modal-buttons">
          <button className="save-btn" onClick={handleUpdate}>Update</button>
          <button className="cancel-btn" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default EditAnnouncementModal;
