import React, { useEffect, useState } from 'react';
import { Box, IconButton, Pagination } from '@mui/material';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import AddCommentOutlinedIcon from '@mui/icons-material/AddCommentOutlined';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import AdminLayout from '../../components/layout/AdminLayout';
import EditAnnouncementModal from '../../components/modals/EditAnnouncementModal';
import AddNewsModal from '../../components/modals/AddNewsModal';
import { createAnnouncement, deleteAnnouncement, getAllAnnouncements, updateAnnouncement } from '../../api';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import '../../css/allAnnouncements.css';

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
        setCurrentPage(1); 
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
      <IconButton sx={{
          position: "fixed",
          bottom: "40px",
          right: "40px",
          width: "70px",
          height: "70px",
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
        className="add-job-button"
        onClick={handleOpenModal}
      >
        <AddIcon fontSize='large' />
      </IconButton>
      <Box className="announcements-container">
        <TransitionGroup component={null}>
        {announcements.map((announcement) => (
          <CSSTransition
            key={announcement._id}
            timeout={500}
            classNames="announcements-card-transition"
          >
          <div key={announcement._id} className="announcement-card">
            <div
              className="card-image"
            >
              <img src={announcement.image.url} alt={announcement.title} />
            </div>
            <div className="card-content">
              <div className="card-header">
                <h3>{announcement.title}</h3>
              </div>
              <div className="card-data">
                <p>{announcement.content}</p>
                <p><strong>Location :</strong> {announcement.location}</p>
                <p><strong>Date & Time :</strong> {new Date(announcement.date).toLocaleString()}</p>
              </div>
              <div className="card-footer">
                <div className="likes-comments">
                  <div className='all-announcement-like'>
                    <ThumbUpOutlinedIcon />
                  <span>{announcement.likes.length}</span>
                  </div>
                  <div className='all-announcement-like'>
                  <AddCommentOutlinedIcon />
                  <span>{announcement.comment}</span>
                  </div>
                </div>
                <div className="card-buttons">
                  <IconButton onClick={() => handleEditNews(announcement)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(announcement._id)}>
                    <DeleteIcon />
                  </IconButton>
                </div>
              </div>
            </div>
          </div>
          </CSSTransition>
        ))}
        </TransitionGroup>
      </Box>
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
