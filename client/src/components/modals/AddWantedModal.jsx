import React, { useState, useEffect } from 'react';
import '../../css/addJobModal.css'; // Assuming similar CSS file can be used

const AddWantedModal = ({ open, onClose, onCreate }) => {
  const [wantedDetails, setWantedDetails] = useState({
    name: '',
    alias: '',
    description: '',
    lastSeen: '',
    crimes: '',
    image: null,
  });

  const handleChange = (e) => {
    setWantedDetails({ ...wantedDetails, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setWantedDetails({ ...wantedDetails, image: e.target.files[0] });
  };

  const handleCreate = () => {
    onCreate(wantedDetails);
    onClose();
    resetForm();
  };

  const resetForm = () => {
    setWantedDetails({
      name: '',
      alias: '',
      description: '',
      lastSeen: '',
      crimes: '',
      image: null,
    });
  };

  useEffect(() => {
    if (!open) {
      resetForm();
    }
  }, [open]);

  return (
    <div className={`add-modal ${open ? 'open' : ''}`}>
      <div className="add-modal-content">
        <h1 className="add-job-modal-title">Add New Wanted Person</h1>
        <div className="input-group">
          <div className="input-container">
            <label className="job-label">Name:</label>
            <input
              className="job-input"
              type="text"
              name="name"
              value={wantedDetails.name}
              onChange={handleChange}
            />
          </div>
          <div className="input-container">
            <label className="job-label">Alias:</label>
            <input
              className="job-input"
              type="text"
              name="alias"
              value={wantedDetails.alias}
              onChange={handleChange}
            />
          </div>
          <div className="input-container">
            <label className="job-label">Last Seen:</label>
            <input
              className="job-input"
              type="text"
              name="lastSeen"
              value={wantedDetails.lastSeen}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="input-container">
          <label className="job-label">Description:</label>
          <textarea
            className="job-textarea"
            name="description"
            value={wantedDetails.description}
            onChange={handleChange}
          />
        </div>
        <div className="input-group">
          <div className="input-container">
            <label className="job-label">Crimes (comma-separated):</label>
            <textarea
              className="job-textarea"
              name="crimes"
              value={wantedDetails.crimes}
              onChange={handleChange}
            />
          </div>
          <div className="input-container">
            <label className="job-label">Upload Image:</label>
            <input
              className="job-input"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
          </div>
        </div>
        <div className="add-job-modal-buttons">
          <button className="cancel-btn" onClick={onClose}>Cancel</button>
          <button className="create-btn" onClick={handleCreate}>Create</button>
        </div>
      </div>
    </div>
  );
};

export default AddWantedModal;
