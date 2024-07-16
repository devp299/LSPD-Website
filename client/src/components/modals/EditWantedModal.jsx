import React, { useState } from 'react';
import { Modal, Box, Typography, TextField, Button } from '@mui/material';

const EditWantedModal = ({ open, onClose, wanted, onEdit }) => {
  const [editedWanted, setEditedWanted] = useState(wanted);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedWanted({ ...editedWanted, [name]: value });
  };

  const handleSubmit = () => {
    onEdit(editedWanted);
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{ width: 400 }}>
        <TextField
          label="Name"
          name="name"
          value={editedWanted.name}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Alias"
          name="alias"
          value={editedWanted.alias}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Description"
          name="description"
          value={editedWanted.description}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Last Seen"
          name="lastSeen"
          value={editedWanted.lastSeen}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Crimes"
          name="crimes"
          value={editedWanted.crimes.join(', ')}
          onChange={(e) => handleChange({ target: { name: 'crimes', value: e.target.value.split(', ') } })}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Caution"
          name="caution"
          value={editedWanted.caution}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 2 }}>
          <Button onClick={handleSubmit} variant="contained" color="primary" sx={{ marginRight: 1 }}>
            Save
          </Button>
          <Button onClick={onClose} variant="outlined" color="secondary">
            Cancel
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default EditWantedModal;
