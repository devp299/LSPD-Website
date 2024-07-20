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
    <div className="modal">
      <div className="modal-content">
        <form>
        <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-evenly"}}>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={editedWanted.name}
              onChange={handleChange}
            />
          </label>
          <label>
            Crimes:
            <input
              type="text"
              name="crimes"
              value={editedWanted.crimes}
              onChange={(e) => handleChange({ target: { name: 'crimes', value: e.target.value.split(', ') } })}
              />
          </label>
          </div>
          <label>
            Description:
            <textarea
              name="description"
              value={editedWanted.description}
              onChange={handleChange}
            />
          </label>
          <label>
            Alias:
            <input
              type="text"
              name="alias"
              value={editedWanted.alias}
              onChange={handleChange}
            />
          </label>
          <label>
            Last Seen:
            <input
              type="text"
              name="lastSeen"
              value={editedWanted.lastSeen}
              onChange={handleChange}
            />
          </label>
        </form>
        <div className="modal-buttons">
          <button onClick={handleSubmit}>Edit</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default EditWantedListModal;
