import React, { useState } from 'react';
import '../../css/EditJobModal.css'

const EditJobModal = ({ job, onClose, onSave }) => {
  const [formData, setFormData] = useState({...job});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = () => {
    onSave(formData);
    onClose();
  };

  return (
    <div className="edit-modal">
      <div className="edit-modal-content">
        <div style={{ display: "flex", flexDirection: "row",}}>
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
          Department:
          <input
            type="text"
            name="department"
            value={formData.department}
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
          Summary:
          <textarea
            name="summary"
            value={formData.summary}
            onChange={handleChange}
          />
        </label>
        <label>
          Description:
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </label>
        <div className="devptel" style={{ display: "flex", flexDirection: "row"}}>
          <label>
            Requirements:
            <textarea
              name="requirements"
              value={formData.requirements}
              onChange={handleChange}
            />
          </label>
          <label>
            Benefits:
            <textarea
              name="benefits"
              value={formData.benefits}
              onChange={handleChange}
            />
          </label>
        </div>
        <div className="edit-modal-buttons">
          <button onClick={handleSave}>Update</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default EditJobModal;
