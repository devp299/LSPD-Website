// components/modals/AddJobModal.jsx
import React, { useState } from 'react';
import { Box, Button, Modal, TextField, Typography } from '@mui/material';

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
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: "40rem",
          height: "30rem",
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <Typography fontFamily= "Russo One" textAlign="center" variant="h6" component="h2">
          Add New Job
        </Typography>
        <Box sx={{
            display: 'flex',
            flexDirection: 'row',
            fontFamily: "Russo One",
        }}>
        <TextField
          fullWidth
          margin="normal"
          fontFamily="Russo One"
          name="title"
          label="Job Title"
          value={jobDetails.title}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          margin="normal"
          name="department"
          label="Department"
          value={jobDetails.department}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          margin="normal"
          name="location"
          label="Location"
          value={jobDetails.location}
          onChange={handleChange}
        />
        </Box>
        <TextField
          fullWidth
          margin="normal"
          name="description"
          label="Description"
          value={jobDetails.description}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          margin="normal"
          name="requirements"
          label="Requirements"
          value={jobDetails.requirements}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          margin="normal"
          name="benefits"
          label="Benefits"
          value={jobDetails.benefits}
          onChange={handleChange}
        />
        <Box mt={2} display="flex" justifyContent="end">
          <Button sx={{
            marginRight: "2rem",
            backgroundColor: "#4CAF50",
            boxShadow:" 0 2px 10px rgba(0, 0, 0, 0.2)",
            zIndex: "1000",
            transition: "background-color 0.3s ease, transform 0.2s ease-out",
            '&:hover': {
                backgroundColor: "#3CEA00",
                transition:  "scale(1.5)"
            }
          }} variant="contained" onClick={handleCreate}>
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

export default AddJobModal;
