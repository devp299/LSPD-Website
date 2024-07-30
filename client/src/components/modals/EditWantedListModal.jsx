import React, { useState } from 'react';
import '../../css/editAnnouncementModal.css';

const EditWantedListModal = ({ onClose, wanted, onEdit }) => {
  const [editedWanted, setEditedWanted] = useState(wanted);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedWanted({ ...editedWanted, [name]: value });
  };

  const handleSubmit = () => {
    onEdit(editedWanted);
    onClose();
  };

  return (
    <div className="edit-modal">
      <div className="edit-modal-content">
        <h1 className='edit-title1'>Edit Wanted Criminal</h1>
        <form>
          <div className="list-input-row">
            <div className="list-input-group">
              <label>Name:</label>
              <input
                type="text"
                name="name"
                value={editedWanted.name}
                onChange={handleChange}
              />
            </div>
            <div className="list-input-group">
              <label>Alias:</label>
              <input
                type="text"
                name="alias"
                value={editedWanted.alias}
                onChange={handleChange}
              />
            </div>
            <div className="list-input-group">
              <label>Last Seen:</label>
              <input
                type="text"
                name="lastSeen"
                value={editedWanted.lastSeen}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="list-input-group">
              <label>Crimes:</label>
              <input
                type="text"
                name="crimes"
                value={editedWanted.crimes}
                onChange={handleChange}
              />
          </div>
          <div className="list-input-group">
            <label>Description:</label>
            <textarea
              name="description"
              value={editedWanted.description}
              onChange={handleChange}
            />
          </div>
        </form>
        <div className="edit-modal-buttons">
          <button className="save-btn" onClick={handleSubmit}>Save Changes</button>
          <button className="cancel-btn" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default EditWantedListModal;
