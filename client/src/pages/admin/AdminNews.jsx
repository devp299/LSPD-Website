import React, { useEffect, useState } from "react";
import Swiper from "swiper";
import "swiper/css";
import "swiper/css/free-mode";
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import EditIcon from '@mui/icons-material/Edit';
import "swiper/css/navigation"; 
import AddIcon from "@mui/icons-material/Add";
import AddCommentOutlinedIcon from '@mui/icons-material/AddCommentOutlined';
import { IconButton } from "@mui/material";
import { Delete as DeleteIcon } from "@mui/icons-material";
import AdminLayout from '../../components/layout/AdminLayout';
import "../../css/adminNews.css";
import EditAnnouncementModal from "../../components/modals/EditAnnouncementModal";
import { useNavigate } from "react-router-dom";
import { getAllAnnouncements, updateAnnouncement, deleteAnnouncement } from "../../api";
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const AdminNews = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAnnouncements = async () => {
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

  const handleClose = () => {
    setSelectedAnnouncement(null);
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

  return (
    <AdminLayout>
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
                        <i className="fas fa-thumbs-up"></i>
                        <ThumbUpOutlinedIcon />
                        <span>{announcement.likes.length}</span>
                      </div>
                      <div className="news-slider__stat">
                        <i className="fas fa-comment"></i>
                        <AddCommentOutlinedIcon />
                        <span>{announcement.comment}</span>
                      </div>
                    </div>
                    </div>
                  </div>
                  <div className="news-slider__actions">
                    {/* <button className="edit-btn" onClick={() => handleEditNews(announcement)}>Edit</button>
                    <button className="delete-btn" onClick={() => handleDelete(announcement._id)}>Delete</button> */}
                  </div>
                </div>
              </div>
              </CSSTransition>
            ))}
            </TransitionGroup>
          </div>
          <div className="swiper-button-next"></div>
          <div className="swiper-button-prev"></div>
          <div className="news-slider__pagination"></div>
        </div>
        { selectedAnnouncement && 
          <EditAnnouncementModal
            announcement={selectedAnnouncement}
            onUpdate={handleUpdate}
            onClose={handleClose}
          />
        }
      </div>
    </AdminLayout>
  );
}

export default AdminNews;