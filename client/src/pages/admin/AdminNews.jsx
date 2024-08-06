import React, { useEffect, useState } from "react";
import Swiper from "swiper";
import "swiper/css";
import "swiper/css/free-mode";
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import EditIcon from '@mui/icons-material/Edit';
import "swiper/css/navigation"; 
import AddIcon from "@mui/icons-material/Add";
import AddCommentOutlinedIcon from '@mui/icons-material/AddCommentOutlined';
import { Box, IconButton, Modal, Paper, Typography } from "@mui/material";
import { Close, Delete as DeleteIcon } from "@mui/icons-material";
import AdminLayout from '../../components/layout/AdminLayout';
import "../../css/adminNews.css";
import EditAnnouncementModal from "../../components/modals/EditAnnouncementModal";
import { useNavigate } from "react-router-dom";
import { getAllAnnouncements, updateAnnouncement, deleteAnnouncement, getAdminComment } from "../../api";
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import moment from "moment";

const AdminNews = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loading, setLoading] = useState(true);
  const [commentModalOpen, setCommentModalOpen] = useState(false);
  const [comments, setComments] = useState([]);
  const [commentAnnouncement, setCommentAnnouncement] = useState(null);
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [selectedImageUrl, setSelectedImageUrl] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchAnnouncements = async () => {
      setLoading(true); // Start loading
      try {
        const response = await getAllAnnouncements();
        if (response && response.data) {
          setAnnouncements(response.data);
          setIsLoading(false);
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

  useEffect(() => {
    if (!isLoading) {
      const swiper = new Swiper(".news-slider", {
        spaceBetween: 30,
        effect: "fade",
        loop: false,
        mousewheel: {
          invert: false,
        },
        freeMode: true,
        pagination: {
          el: ".news-slider__pagination",
          clickable: true,
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
      });

      return () => {
        swiper.destroy();
      };
    }
  }, [isLoading]);

  const handleViewAll = () => {
    navigate('/admin/all-announcements');
  };

  const handleEditNews = (announcement) => {
    setSelectedAnnouncement(announcement);
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
    setLoading(false);
  };

  const handleClose = () => {
    setSelectedAnnouncement(null);
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

  const getUpcomingEvents = () => {
    const sortedAnnouncements = announcements.sort((a, b) => new Date(a.date) - new Date(b.date));
    const currentDate = new Date();
    return sortedAnnouncements.filter(announcement => new Date(announcement.date) > currentDate).slice(0, 5);
  };

  const handleImageClick = (imageUrl) => {
    setSelectedImageUrl(imageUrl);
    setImageModalOpen(true);
  };

  const handleCloseImageModal = () => {
    setImageModalOpen(false);
    setSelectedImageUrl("");
  };

  return (
    <AdminLayout>
      <h1>Upcoming Events</h1>
      {loading && <div className="loader-admin"></div>} {/* Show loader */}
      <div className="gta-news-container">
        <button className="view-all-admin-btn" onClick={handleViewAll}>
          View All
        </button>
        <div className="news-slider">
          <div className="news-slider__wrp swiper-wrapper">
            <TransitionGroup component={null}>
              {!isLoading && getUpcomingEvents().map((announcement) => (
                <CSSTransition
                  key={announcement._id}
                  timeout={500}
                  classNames="announcements-card-transition"
                >
                  <div key={announcement._id} className="news-slider__item swiper-slide">
                    <div className="news-slider__img" onClick={() => handleImageClick(announcement.image.url)}>
                      <img src={announcement.image.url} alt="" />
                    </div>
                    <div className="news-slider__content">
                      <div className="news-slider__title">{announcement.title}</div>
                      <div className="news-slider__text">{announcement.content}</div>
                      <div className="news-slider__info">
                        <div className="news-slider__details">
                          <div className="news-slider__code">Location: {announcement.location}</div>
                          <div className="news-slider__code">
                            Date & Time: {new Date(announcement.date).toLocaleString()}
                          </div>
                          <div className="news-slider__stats">
                            <div className="news-slider__stat">
                              <ThumbUpOutlinedIcon />
                              <span>{announcement.likes.length}</span>
                            </div>
                            <div className="news-slider__stat">
                              <AddCommentOutlinedIcon sx={{ cursor: "pointer" }} onClick={() => handleCommentClick(announcement._id)} />
                              <span>{announcement.comments.length}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* Add your action buttons here */}
                    </div>
                  </div>
                </CSSTransition>
              ))}
            </TransitionGroup>
          </div>
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
                    <Typography variant="caption" className='comment-time'>
                      {moment(comment.createdAt).fromNow()}
                    </Typography>
                  </Paper>
                ))}
              </Box>
            </Box>
          </Modal>
          <Modal open={imageModalOpen} onClose={handleCloseImageModal}>
            <Box className="modal-image-content">
              <IconButton className="modal-image-close" onClick={handleCloseImageModal}>
                <Close />
              </IconButton>
              <img src={selectedImageUrl} alt="Full-size" className="modal-full-image" />
            </Box>
          </Modal>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminNews;
