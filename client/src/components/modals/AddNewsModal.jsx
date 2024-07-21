import React, { useState } from 'react';
import { Box, Button, Modal, TextField, Typography } from '@mui/material';

const AddNewsModal = ({ open, onClose, onCreate }) => {
  const [newsDetails, setNewsDetails] = useState({
    title: '',
    content: '',
    location: '',
    author: '',
    date: '',
    image: null,
  });

  const handleChange = (e) => {
    setNewsDetails({ ...newsDetails, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setNewsDetails({ ...newsDetails, image: e.target.files[0] });
  };

  const handleCreate = () => {
    onCreate(newsDetails);
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
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <Typography fontFamily= "Russo One" textAlign="center" variant="h6" component="h2">
          Add New Announcement
        </Typography>
        <TextField
          fullWidth
          margin="normal"
          fontFamily="Russo One"
          name="title"
          label="Title"
          value={newsDetails.title}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          margin="normal"
          name="content"
          label="Content"
          value={newsDetails.content}
          onChange={handleChange}
        />
        <Box sx={{
            display: 'flex',
            flexDirection: 'row',
            gap: 2,
        }}>
          <TextField
            fullWidth
            margin="normal"
            name="location"
            label="Location"
            value={newsDetails.location}
            onChange={handleChange}
          />
        </Box>
        <TextField
          fullWidth
          margin="normal"
          name="date"
          label="Date & Time"
          type="datetime-local"
          value={newsDetails.date}
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
        />
        <input
          accept="image/*"
          type="file"
          onChange={handleImageChange}
          style={{ margin: '1rem 0' }}
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

export default AddNewsModal;
