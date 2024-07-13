import React from 'react';
import '../../css/JobDetailsModal.css';

const JobDetailsModal = ({ job, onClose, onApply }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <h2>{job.title}</h2>
        <p><strong>Department : </strong> {job.department}</p>
        <p><strong>Location : </strong> {job.location}</p>
        <p><strong>Description : </strong> {job.description}</p>
        <p><strong>Requirements : </strong> {job.requirements}</p>
        <p><strong>Benefits : </strong> {job.benefits}</p>
        <div className="modal-buttons">
          <button onClick={onApply}>Apply</button>
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default JobDetailsModal;
