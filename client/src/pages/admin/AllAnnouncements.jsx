import React, { useEffect, useState } from 'react';
import { Box, IconButton, Modal, Pagination, Paper, Typography } from '@mui/material';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import AddCommentOutlinedIcon from '@mui/icons-material/AddCommentOutlined';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import AdminLayout from '../../components/layout/AdminLayout';
import EditAnnouncementModal from '../../components/modals/EditAnnouncementModal';
import AddNewsModal from '../../components/modals/AddNewsModal';
import { createAnnouncement, deleteAnnouncement, getAdminComment, getAllAnnouncements, updateAnnouncement } from '../../api';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import '../../css/allAnnouncements.css';
import { Close } from '@mui/icons-material';
import moment from 'moment';

const AllAnnouncements = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const announcementsPerPage = 6;
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [commentModalOpen, setCommentModalOpen] = useState(false);
  const [comments, setComments] = useState([]);
  const [commentAnnouncement, setCommentAnnouncement] = useState(null);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      setLoading(true); // Start loading
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
      setLoading(false); // Stop loading
    };

    fetchAnnouncements();
  }, []);

  const handleEditNews = (announcement) => {
    setSelectedAnnouncement(announcement);
  };

  const fetchComments = async (announcementId) => {
    setLoading(true);
    try {
      setComments([]);
      const response = await getAdminComment(announcementId);
      setComments(response);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
    setLoading(false);
  };

  const handleCommentClick = (announcementId) => {
    fetchComments(announcementId);
    setCommentAnnouncement(announcementId);
    setCommentModalOpen(true);
  };

  const handleCloseCommentModal = () => {
    setCommentModalOpen(false);
    setCommentAnnouncement(null);
    setComments([]);
  };

  const handleUpdate = async (updatedAnnouncement) => {
    setLoading(true); // Start loading
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
    setLoading(false); // Stop loading
  };

  const handleCreateNews = async (newNews) => {
    setLoading(true); // Start loading
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
    setLoading(false); // Stop loading
  };

  const handleDelete = async (id) => {
    setLoading(true); // Start loading
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
    setLoading(false); // Stop loading
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
      {loading && <div className="loader-admin"></div>} {/* Show loader */}
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
            <div className="card-image">
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
                    <AddCommentOutlinedIcon sx={{ cursor: "pointer"}} onClick={() => handleCommentClick(announcement._id)} />
                    <span>{announcement.comments.length}</span>
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
      <Pagination
        count={Math.ceil(announcements.length / announcementsPerPage)}
        page={currentPage}
        onChange={handlePageChange}
      />
      <Modal open={commentModalOpen} onClose={handleCloseCommentModal}>
        <Box className="modal-comment-content">
          <IconButton className="modal-comment-close" onClick={handleCloseCommentModal}>
            <Close />
          </IconButton>
          <Box className="comment-list">
            {comments.map((comment, index) => (
              <Paper key={index} className="comment-item">
                <Typography variant="caption" className="comment-username">{comment.userId.username}</Typography>
                <Typography variant="body1" className='comment-text'>{comment.comment}</Typography>
                <Typography variant="caption" className='comment-time' >
                  {moment(comment.createdAt).fromNow()}
                </Typography>
              </Paper>
            ))}
          </Box>
        </Box>
      </Modal>
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
