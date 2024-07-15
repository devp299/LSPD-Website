import React, { useState } from 'react';
import '../../css/editAnnouncementModal.css';

const EditAnnouncementModal = ({ announcement, onUpdate, onClose }) => {
  const [formData, setFormData] = useState({ ...announcement });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleUpdate = () => {
    onUpdate(formData);
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <form>
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
            Description:
            <textarea
              name="content"
              value={formData.content}
              onChange={handleChange}
            />
          </label>
          <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-evenly"}}>
          <label>
            Location:
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
            />
          </label>
          <label>
            Cheif-Guest:
            <input
              type="text"
              name="author"
              value={formData.author}
              onChange={handleChange}
            />
          </label>
        </div>
          <label>
            Date:
            <input
              type="datetime-local"
              name="date"
              value={formData.date}
              onChange={handleChange}
            />
          </label>
        </form>
        <div className="modal-buttons">
          <button onClick={handleUpdate}>Update</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default EditAnnouncementModal;
