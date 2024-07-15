import React, { useState } from 'react';
import { Box, Button, Modal, TextField, Typography } from '@mui/material';

const AddWantedModal = ({ open, onClose, onCreate }) => {
  const [wantedDetails, setWantedDetails] = useState({
    name: '',
    alias: '',
    description: '',
    lastSeen: '',
    crimes: '',
    caution: '',
    photo: ''
  });

  const handleChange = (e) => {
    setWantedDetails({ ...wantedDetails, [e.target.name]: e.target.value });
  };

  const handleCreate = () => {
    onCreate({ ...wantedDetails, crimes: wantedDetails.crimes.split(',') });
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: "50rem",
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <Typography fontFamily="Russo One" textAlign="center" variant="h6" component="h2">
          Add New Wanted Person
        </Typography>
        <TextField
          fullWidth
          margin="normal"
          name="name"
          label="Name"
          value={wantedDetails.name}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          margin="normal"
          name="alias"
          label="Alias"
          value={wantedDetails.alias}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          margin="normal"
          name="description"
          label="Description"
          value={wantedDetails.description}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          margin="normal"
          name="lastSeen"
          label="Last Seen"
          value={wantedDetails.lastSeen}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          margin="normal"
          name="crimes"
          label="Crimes (comma-separated)"
          value={wantedDetails.crimes}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          margin="normal"
          name="caution"
          label="Caution"
          value={wantedDetails.caution}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          margin="normal"
          name="photo"
          label="Photo URL"
          value={wantedDetails.photo}
          onChange={handleChange}
        />
        <Box mt={2} display="flex" justifyContent="end">
          <Button
            sx={{
              marginRight: "2rem",
              backgroundColor: "#4CAF50",
              boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)",
              zIndex: "1000",
              transition: "background-color 0.3s ease, transform 0.2s ease-out",
              '&:hover': {
                backgroundColor: "#3CEA00",
                transform: "scale(1.05)"
              }
            }}
            variant="contained"
            onClick={handleCreate}
          >
            Create
          </Button>
          <Button variant="outlined" onClick={onClose}>
            Cancel
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default AddWantedModal;
