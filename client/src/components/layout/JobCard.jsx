import React from 'react';
import EditIcon from '@mui/icons-material/Edit';
import { Delete as DeleteIcon } from "@mui/icons-material";
import { IconButton } from '@mui/material';

const truncateDescription = (description, maxLength = 100) => {
  if (!description) return '';
  if (description.length <= maxLength) return description;
  return `${description.substring(0, maxLength)}...`;
};

const JobCard = ({ job, onViewDetails, onEdit, onDelete }) => {
  return (
    <div className="job-card">
      <h3>{job.title}</h3>
      <p><strong>Department:</strong> {job.department}</p>
      <p><strong>Location:</strong> {job.location}</p>
      <p>{truncateDescription(job.description, 100)}</p>
      <div className="button-group">
        <button className="view-details-btn" onClick={() => onViewDetails(job)}>View Details</button>
        <div className="icon-buttons">
          <IconButton className="edit-btn" onClick={() => onEdit(job)}><EditIcon /></IconButton>
          <IconButton className="delete-btn" onClick={() => onDelete(job._id)}><DeleteIcon /></IconButton>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
