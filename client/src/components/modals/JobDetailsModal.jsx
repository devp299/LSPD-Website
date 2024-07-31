import React from 'react';
import '../../css/JobDetailsModal.css';

const JobDetailsModal = ({ job, onClose, onApply }) => {
  return (
    <div className="carer-modal">
      <div className="carer-modal-content">
        <h1 className="title-career">{job.title}</h1>
        <p><strong>Department: </strong>{job.department}</p>
        <p><strong>Location: </strong>{job.location}</p>
        <p><strong>Description: </strong>{job.description}</p>
        <p><strong>Requirements: </strong>{job.requirements}</p>
        <p><strong>Benefits: </strong>{job.benefits}</p>
        <div className="career-modal-buttons">
          <button className="apply-career" onClick={onApply}>Apply</button>
          <button className="close-career" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default JobDetailsModal;
