import React from 'react';
import EditIcon from '@mui/icons-material/Edit';
import { Delete as DeleteIcon } from "@mui/icons-material";
import { IconButton } from '@mui/material';

const truncateDescription = (description, maxLength = 100) => {
  if (!description) return '';
  if (description.length <= maxLength) return description;
  return `${description.substring(0, maxLength)}...`;
};

const JobCard = ({ job, onViewDetails,onEdit,onDelete }) => {
  return (
    <div className="job-card">
      <h3>{job.title}</h3>
      <p><strong>Department:</strong> {job.department}</p>
      <p><strong>Location:</strong> {job.location}</p>
      <p>{truncateDescription(job.description, 100)}</p>
      <div style={{ display:"flex",flexDirection: "row", justifyContent: "space-between"}}>
        <button style={{
          backgroundColor: "#4CAF50",
          color: "white",
          border: "none",
          padding: "10px 15px",
          borderRadius: "4px",
          cursor: "pointer",
          transition: "background-color 0.2s",
        }} onClick={() => onViewDetails(job)}>View Details</button>
        <div style={{ backgroundColor: "#f5f5f5", display: 'flex',flexDirection: "row",justifyContent:"flex-end", backgroundColor: "white"}}>
          <IconButton onClick={() => onEdit(job)}><EditIcon /></IconButton>
          <IconButton onClick={() => onDelete(job._id)}><DeleteIcon /></IconButton>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
