import React, { useEffect, useState } from "react";
import Swiper from "swiper";
import "swiper/css";
import "swiper/css/free-mode";
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import AddCommentOutlinedIcon from '@mui/icons-material/AddCommentOutlined';
import { IconButton } from "@mui/material";
import { Delete as DeleteIcon } from "@mui/icons-material";
import UserLayout from '../../components/layout/UserLayout';
import "../../css/userNews.css";
import EditAnnouncementModal from "../../components/modals/EditAnnouncementModal";
import { useNavigate } from "react-router-dom";
import { checkUserLike, getAllUserNews, likeNews } from "../../api";
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import toast, { Toaster } from "react-hot-toast";

const UserNews = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [likes, setLikes] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAnnouncements = async () => {
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

  const getUpcomingEvents = () => {
    const sortedAnnouncements = announcements.sort((a, b) => new Date(a.date) - new Date(b.date));
    const currentDate = new Date();
    return sortedAnnouncements.filter(announcement => new Date(announcement.date) > currentDate).slice(0, 5);
  };

  return (
    <UserLayout>
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
                                <ThumbUpIcon onClick={() => handleLike(announcement._id)} /> :
                                <ThumbUpOutlinedIcon onClick={() => handleLike(announcement._id)} />
                              }
                              <span>{announcement.likes.length}</span>
                            </div>
                            <div className="news-slider__stat">
                              <AddCommentOutlinedIcon />
                              <span>{announcement.comment}</span>
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
          <div className="swiper-button-next"></div>
          <div className="swiper-button-prev"></div>
          <div className="news-slider__pagination"></div>
        </div>
        {selectedAnnouncement &&
          <EditAnnouncementModal
            announcement={selectedAnnouncement}
            onUpdate={handleUpdate}
            onClose={handleClose}
          />
        }
      </div>
      <Toaster/>
    </UserLayout>
  );
}

export default UserNews;
