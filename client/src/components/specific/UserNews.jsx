import React, { useEffect, useState } from "react";
import Swiper from "swiper";
import "swiper/css";
import "swiper/css/free-mode";
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import AddCommentOutlinedIcon from '@mui/icons-material/AddCommentOutlined';
import { Box, IconButton, Modal, Paper, Typography } from "@mui/material";
import { Delete as DeleteIcon,Send as SendIcon } from "@mui/icons-material";
import CloseIcon from '@mui/icons-material/Close';
import UserLayout from '../../components/layout/UserLayout';
import "../../css/userNews.css";
import EditAnnouncementModal from "../../components/modals/EditAnnouncementModal";
import { InputBox } from '../styles/StyledComponent';
import { useNavigate } from "react-router-dom";
import { checkUserLike, getAllUserNews, getComments, giveComment, likeNews } from "../../api";
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import toast, { Toaster } from "react-hot-toast";
import moment from "moment";

const UserNews = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [likes, setLikes] = useState({});
  const [comments, setComments] = useState([]);
  const [commentModalOpen, setCommentModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [newComment, setNewComment] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchAnnouncements = async () => {
      setLoading(true);
      try {
        const response = await getAllUserNews();
        if (response && response.data) {
          setAnnouncements(response.data);

          const likeStatusPromises = response.data.map(async (announcement) => {
            const { liked } = await checkUserLike(announcement._id);
            return { [announcement._id]: liked };
          });

          const likeStatuses = await Promise.all(likeStatusPromises);
          const combinedLikeStatus = likeStatuses.reduce((acc, curr) => ({ ...acc, ...curr }), {});

          setLikes(combinedLikeStatus);
          setIsLoading(false);
        } else {
          console.error('Unexpected data format:', response);
        }
      } catch (error) {
        console.error('Error fetching announcements:', error);
      }
      setLoading(false);
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
    navigate('/user/all-announcements');
  };

  const handleClose = () => {
    setSelectedAnnouncement(null);
  };

  const handleLike = async (announcementId) => {
    try {
      const response = await likeNews(announcementId);
      setAnnouncements(announcements.map(announcement =>
        announcement._id === announcementId
          ? { ...announcement, isLiked: !announcement.isLiked }
          : announcement
      ));
      setLikes(prevLikes => ({
        ...prevLikes,
        [announcementId]: !prevLikes[announcementId]
      }));
      toast.success('Liked successfully!');
    } catch (error) {
      toast.error('You have already liked this announcement');
    }
  };
  const fetchComments = async (announcementId) => {
    setLoading(true);
    try {
      setComments([]);
      const response = await getComments(announcementId);
      setComments(response);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
    setLoading(false);
  };

  const handleCommentClick = (announcementId) => {
    fetchComments(announcementId);
    setSelectedAnnouncement(announcementId);
    setCommentModalOpen(true);
  };

  const handleCloseCommentModal = () => {
    setCommentModalOpen(false);
    setNewComment("");
    setComments([]);
    setSelectedAnnouncement(null);
  };

  const handleCommentSubmit = async () => {
    setLoading(true);
    try {
      if (newComment.trim()) {
        await giveComment({ newsId: selectedAnnouncement, comment: newComment });
        fetchComments(selectedAnnouncement);
        setNewComment("");
        toast.success('Comment added!');
      } else {
        toast.error('Comment cannot be empty');
      }
    } catch (error) {
      console.error('Error adding comment:', error);
      toast.error('Failed to add comment');
    }
    setLoading(false);
  };
  const getUpcomingEvents = () => {
    const sortedAnnouncements = announcements.sort((a, b) => new Date(a.date) - new Date(b.date));
    const currentDate = new Date();
    return sortedAnnouncements.filter(announcement => new Date(announcement.date) > currentDate).slice(0, 5);
  };

  return (
    <UserLayout>
      <h1>Upcoming Events</h1>
      {/* <video autoPlay muted loop>
          <source src={'https://motionbgs.com/media/2534/gta-5-night-city.960x540.mp4'} type="video/mp4" />
          Your browser does not support the video tag.
        </video> */}
      {loading && <div className="loader-news"></div>} {/* Show loader */}
      <div className="gta-news-container">
        <button className="view-all-btn" onClick={handleViewAll}>
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
                    <div className="news-slider__img">
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
                              {likes[announcement._id] ?
                                <ThumbUpIcon sx={{ cursor: "pointer"}} onClick={() => handleLike(announcement._id)} /> :
                                <ThumbUpOutlinedIcon sx={{ cursor: "pointer"}} onClick={() => handleLike(announcement._id)} />
                              }
                              <span>{announcement.likes.length}</span>
                            </div>
                            <div className="news-slider__stat">
                              <AddCommentOutlinedIcon sx={{ cursor: "pointer"}} onClick={() => handleCommentClick(announcement._id)} />
                              <span>{announcement.comments.length}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="news-slider__actions">
                        {/* Edit and delete buttons if needed */}
                      </div>
                    </div>
                  </div>
                </CSSTransition>
              ))}
            </TransitionGroup>
          </div>
          <Modal open={commentModalOpen} onClose={handleCloseCommentModal}>
        <Box className="modal-comment-content">
          <IconButton className="modal-comment-close" onClick={handleCloseCommentModal}>
            <CloseIcon />
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
          <Box className="comment-input">
            <InputBox
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment..."
            />
            <IconButton onClick={handleCommentSubmit}>
              <SendIcon />
            </IconButton>
          </Box>
        </Box>
      </Modal>
          <div className="swiper-button-next"></div>
          <div className="swiper-button-prev"></div>
          <div className="news-slider__pagination"></div>
        </div>
      </div>
      <Toaster/>
    </UserLayout>
  );
}

export default UserNews;
