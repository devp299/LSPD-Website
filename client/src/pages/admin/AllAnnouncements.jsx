import React, { useEffect, useState } from 'react';
import { Box, Card, CardMedia, CardContent, Typography, IconButton, Modal, Pagination } from '@mui/material';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import AddCommentOutlinedIcon from '@mui/icons-material/AddCommentOutlined';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from "@mui/icons-material/Add";
import AdminLayout from '../../components/layout/AdminLayout';
import EditAnnouncementModal from '../../components/modals/EditAnnouncementModal';
import '../../css/allAnnouncements.css';
import AddNewsModal from '../../components/modals/AddNewsModal';
import { createAnnouncement, deleteAnnouncement, getAllAnnouncements, updateAnnouncement } from '../../api';

const AllAnnouncements = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const announcementsPerPage = 6;
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const response = await getAllAnnouncements();
        if (response && response.data && Array.isArray(response.data)) {
          // Sort announcements by createdAt, newest first
          const sortedAnnouncements = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          setAnnouncements(sortedAnnouncements);
        } else {
          console.error('Unexpected data format:', response);
        }
      } catch (error) {
        console.error('Error fetching announcements:', error);
      }
    };

    fetchAnnouncements();
  }, []);

  const handleEditNews = (announcement) => {
    setSelectedAnnouncement(announcement);
  };

  const handleUpdate = async (updatedAnnouncement) => {
    try {
      const response = await updateAnnouncement(updatedAnnouncement._id, updatedAnnouncement);
      if (response.success) {
        const updatedAnnouncements = announcements.map(a => 
          a._id === updatedAnnouncement._id ? response.data : a
        );
        setAnnouncements(updatedAnnouncements);
        setSelectedAnnouncement(null);
      } else {
        console.error("Error updating news:", response.message);
      }
    } catch (error) {
      console.error('Error updating announcement:', error);
    }
  };

  const handleCreateNews = async (newNews) => {
    try {
      const response = await createAnnouncement(newNews);
      if (response.success) {
        setAnnouncements([response.data, ...announcements]);
        setCurrentPage(1); // Set to the first page to show the newest announcement
        handleCloseModal();
      } else {
        console.error("Error creating news:", response.message);
      }
    } catch (error) {
      console.error('Error creating announcement:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await deleteAnnouncement(id);
      if (response.success) {
        setAnnouncements(announcements.filter(a => a._id !== id));
      } else {
        console.error("Error deleting news:", response.message);
      }
    } catch (error) {
      console.error('Error deleting announcement:', error);
    }
  };

  const handleClose = () => {
    setSelectedAnnouncement(null);
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const indexOfLastAnnouncement = currentPage * announcementsPerPage;
  const indexOfFirstAnnouncement = indexOfLastAnnouncement - announcementsPerPage;
  const currentAnnouncements = announcements.slice(indexOfFirstAnnouncement, indexOfLastAnnouncement);

  const handleOpenModal = () => {
    setModalOpen(true);
  };
  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <AdminLayout>
      <IconButton
        sx={{
          position: "fixed",
          bottom: "40px",
          right: "40px",
          width: "60px",
          height: "60px",
          backgroundColor: "#4CAF50",
          color: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "50%",
          boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)",
          zIndex: "1000",
          transition: "background-color 0.3s ease, transform 0.2s ease-out",
          '&:hover': {
            backgroundColor: "#4CAD12",
            transform: "scale(1.1)",
          },
        }}
        onClick={handleOpenModal}
      >
        <AddIcon fontSize='large' />
      </IconButton>
      <Box className="announcements-container">
        {currentAnnouncements.map((announcement) => (
          <Card key={announcement._id} className="announcement-card">
            <Box className="card-content">
              <CardMedia
                className="card-image"
                image={announcement.image.url}
                alt={announcement.title}
              />
              <CardContent className="card-data">
                <Box className="card-header">
                  <Typography sx={{ fontFamily: "Russo One" }} gutterBottom variant="h5" component="div">
                    {announcement.title}
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ marginBottom: "0.5rem" }}>
                  {announcement.content}
                </Typography>
                <Typography color="text.secondary" sx={{ fontFamily: "Russo One", marginBottom: "0.5rem" }} variant="body2">
                  <strong>Location :</strong> {announcement.location}
                </Typography>
                <Typography color="text.secondary" sx={{ fontFamily: "Russo One", marginBottom: "0.5rem" }} variant="body2">
                  <strong>Date & Time :</strong> {new Date(announcement.date).toLocaleString()}
                </Typography>
                <Box className="card-footer">
                  <Box className="likes-comments">
                    <IconButton>
                      <ThumbUpOutlinedIcon />
                    </IconButton>
                    <Typography>{announcement.likes.length}</Typography>
                    <IconButton>
                      <AddCommentOutlinedIcon />
                    </IconButton>
                    <Typography>{announcement.comment}</Typography>
                  </Box>
                  <Box className="card-buttons">
                    <IconButton onClick={() => handleEditNews(announcement)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(announcement._id)}>
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </Box>
              </CardContent>
            </Box>
          </Card>
        ))}
      </Box>
      <Pagination
        count={Math.ceil(announcements.length / announcementsPerPage)}
        page={currentPage}
        onChange={handlePageChange}
        className="pagination"
      />
      {selectedAnnouncement && (
        <EditAnnouncementModal
          announcement={selectedAnnouncement}
          onUpdate={handleUpdate}
          onClose={handleClose}
        />
      )}
      <AddNewsModal open={modalOpen} onClose={handleCloseModal} onCreate={handleCreateNews} />
    </AdminLayout>
  );
};

export default AllAnnouncements;
