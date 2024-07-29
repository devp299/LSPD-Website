import React, { useState, useEffect } from 'react';
import '../../css/addJobModal.css';

const AddJobModal = ({ open, onClose, onCreate }) => {
  const [jobDetails, setJobDetails] = useState({
    title: '',
    department: '',
    location: '',
    description: '',
    requirements: '',
    benefits: '',
  });

  const handleChange = (e) => {
    setJobDetails({ ...jobDetails, [e.target.name]: e.target.value });
  };

  const handleCreate = () => {
    onCreate(jobDetails);
    onClose();
    resetForm();
  };

  const resetForm = () => {
    setJobDetails({
      title: '',
      department: '',
      location: '',
      description: '',
      requirements: '',
      benefits: '',
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
        <h1 className="add-job-modal-title">Add New Job</h1>
        <div className="input-group">
          <div className="input-container">
            <label className="job-label">Job Title:</label>
            <input
              className="job-input"
              type="text"
              name="title"
              value={jobDetails.title}
              onChange={handleChange}
            />
          </div>
          <div className="input-container">
            <label className="job-label">Department:</label>
            <input
              className="job-input"
              type="text"
              name="department"
              value={jobDetails.department}
              onChange={handleChange}
            />
          </div>
          <div className="input-container">
            <label className="job-label">Location:</label>
            <input
              className="job-input"
              type="text"
              name="location"
              value={jobDetails.location}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="input-container">
          <label className="job-label">Description:</label>
          <textarea
            className="job-textarea"
            name="description"
            value={jobDetails.description}
            onChange={handleChange}
          />
        </div>
        <div className="input-group">
          <div className="input-container">
            <label className="job-label">Requirements:</label>
            <textarea
              className="job-textarea"
              name="requirements"
              value={jobDetails.requirements}
              onChange={handleChange}
            />
          </div>
          <div className="input-container">
            <label className="job-label">Benefits:</label>
            <textarea
              className="job-textarea"
              name="benefits"
              value={jobDetails.benefits}
              onChange={handleChange}
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

export default AddJobModal;
