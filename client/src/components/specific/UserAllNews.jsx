import React, { useEffect, useState } from 'react';
import { Box, IconButton, Pagination, Modal, Paper, Typography } from '@mui/material';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import AddCommentOutlinedIcon from '@mui/icons-material/AddCommentOutlined';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import CloseIcon from '@mui/icons-material/Close';
import UserLayout from '../../components/layout/UserLayout';
import EditAnnouncementModal from '../../components/modals/EditAnnouncementModal';
import AddNewsModal from '../../components/modals/AddNewsModal';
import { createAnnouncement, deleteAnnouncement, getAllAnnouncements, updateAnnouncement, likeNews, getComments, giveComment, checkUserLike, getAllUserNews } from '../../api';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import '../../css/userAllNews.css';
import moment from 'moment';
import { Close, Send as SendIcon} from '@mui/icons-material';
import { InputBox } from '../styles/StyledComponent';
import toast, { Toaster } from 'react-hot-toast';

const AllAnnouncements = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const announcementsPerPage = 6;
  const [modalOpen, setModalOpen] = useState(false);
  const [likes, setLikes] = useState({});
  const [comments, setComments] = useState([]);
  const [commentModalOpen, setCommentModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [newComment, setNewComment] = useState("");
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [selectedImageUrl, setSelectedImageUrl] = useState("");

  useEffect(() => {
    const fetchAnnouncements = async () => {
      setLoading(true);
      try {
        const response = await getAllUserNews();
        if (response && response.data && Array.isArray(response.data)) {
          const sortedAnnouncements = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          setAnnouncements(sortedAnnouncements);

          const likeStatus = {};
          for (const announcement of sortedAnnouncements) {
            try {
              const { liked } = await checkUserLike(announcement._id);
              likeStatus[announcement._id] = liked;
            } catch (error) {
              console.error(`Error checking like status for announcement ${announcement._id}:`, error);
              likeStatus[announcement._id] = false;
            }
          }
          setLikes(likeStatus);
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

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };
  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleLike = async (announcementId) => {
    setLoading(true);
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
    setLoading(false);
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

  const handleImageClick = (imageUrl) => {
    setSelectedImageUrl(imageUrl);
    setImageModalOpen(true);
  };

  const handleCloseImageModal = () => {
    setImageModalOpen(false);
    setSelectedImageUrl("");
  };

  return (
    <UserLayout>
      <h1>All Events</h1>
      {/* <video autoPlay muted loop>
          <source src={'https://motionbgs.com/media/2534/gta-5-night-city.960x540.mp4'} type="video/mp4" />
          Your browser does not support the video tag.
        </video> */}
      {loading && <div className="loader"></div>} {/* Show loader */}
      <Box className="user-announcements-container">
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
              onClick={() => handleImageClick(announcement.image.url)}
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
                    {likes[announcement._id] ?
                      <ThumbUpIcon onClick={() => handleLike(announcement._id)} /> :
                      <ThumbUpOutlinedIcon onClick={() => handleLike(announcement._id)} />
                    }
                    <span>{announcement.likes.length}</span>
                  </div>
                  <div className='all-announcement-comment'>
                    <AddCommentOutlinedIcon onClick={() => handleCommentClick(announcement._id)} />
                    <span>{announcement.comments.length}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          </CSSTransition>
        ))}
        </TransitionGroup>
      </Box>
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
      <Modal open={imageModalOpen} onClose={handleCloseImageModal}>
            <Box className="modal-image-content">
              <IconButton className="modal-image-close" onClick={handleCloseImageModal}>
                <Close />
              </IconButton>
              <img src={selectedImageUrl} alt="Full-size" className="modal-full-image" />
            </Box>
          </Modal>
      <Toaster />
    </UserLayout>
  );
};

export default AllAnnouncements;
