import React from 'react';
// import '../../css/announcementCard.css';
import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';

const AnnouncementCard = ({ announcement, onViewDetails, onEdit, onDelete }) => {
  return (
    <div className="announcement-card">
      <h3>{announcement.title}</h3>
      <p>{announcement.description}</p>
      <div className="button-group">
        <button className="view-details-btn" onClick={() => onViewDetails(announcement)}>
          <VisibilityIcon style={{ marginRight: '5px' }} />
          View Details
        </button>
        <div className="icon-buttons">
          <IconButton className="edit-btn" onClick={() => onEdit(announcement)}>
            <EditIcon />
          </IconButton>
          <IconButton className="delete-btn" onClick={() => onDelete(announcement._id)}>
            <DeleteIcon />
          </IconButton>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementCard;
