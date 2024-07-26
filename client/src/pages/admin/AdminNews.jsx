import React, { useEffect, useState } from "react";
import Swiper from "swiper";
import "swiper/css";
import "swiper/css/free-mode";
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import EditIcon from '@mui/icons-material/Edit';
import "swiper/css/navigation"; 
import AdminLayout from '../../components/layout/AdminLayout';
import AddIcon from "@mui/icons-material/Add";
import AddCommentOutlinedIcon from '@mui/icons-material/AddCommentOutlined';
import "../../css/adminNews.css";
import { IconButton } from "@mui/material";
import { Delete as DeleteIcon } from "@mui/icons-material";
import EditAnnouncementModal from "../../components/modals/EditAnnouncementModal";
import { useNavigate } from "react-router-dom";
import { getAllAnnouncements, updateAnnouncement, deleteAnnouncement } from "../../api";

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
          setIsLoading(false); // Data fetching complete
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
      const swiper = new Swiper(".blog-slider", {
        spaceBetween: 30,
        effect: "fade",
        loop: false,
        mousewheel: {
          invert: false,
        },
        freeMode: true,
        pagination: {
          el: ".blog-slider__pagination",
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

  const handleEdit = () => {
    setIsEdit(true);
    setModalOpen(true);
  };

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
      <div className="body-container">
        <button style={{
          position: 'absolute',
          top: '3rem',
          right: '3rem',
          height: '2rem',
          width: '6rem',
          backgroundColor: 'white',
          borderRadius: '4px'
        }} onClick={handleViewAll}>
          View All
        </button>
        <div className="blog-slider">
          <div className="blog-slider__wrp swiper-wrapper">
            {/* ----- Map Upcoming Events Data ---- */}
            {!isLoading && getUpcomingEvents().map((announcement) => (
              <div key={announcement._id} className="blog-slider__item swiper-slide">
                <div className="blog-slider__img">
                  <img src={announcement.image.url} alt="" />
                </div>
                <div className="blog-slider__content">
                  <div style={{ display: "flex", flexDirection: "row", justifyContent: "flex-end", alignItems: "flex-end"}}>
                    {/* <IconButton sx={{ marginRight: "0.5rem"}} onClick={() => handleEditNews(announcement)}>
                      <EditIcon/>
                    </IconButton>
                    <IconButton sx={{ marginRight: "0.5rem"}} onClick={() => handleDelete(announcement._id)}>
                      <DeleteIcon/>
                    </IconButton> */}
                  </div>
                  <div className="blog-slider__title">{announcement.title}</div>
                  <div className="blog-slider__text">{announcement.content}</div>
                  <div style={{ display: "flex", flexDirection: "row"}}>
                    <div>
                      <div className="blog-slider__code">Location: {announcement.location}</div>
                      <div className="blog-slider__code">
                        Date & Time: {new Date(announcement.date).toLocaleString()}
                      </div>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column",justifyContent: "space-evenly", marginLeft: "5rem"}}>
                      <div style={{ display: "flex", flexDirection: "column", alignItems: "center"}}>
                        <ThumbUpOutlinedIcon />
                        <p className="blog-slider__code">{announcement.likes.length}</p>
                      </div>
                      <div style={{ display: "flex", flexDirection: "column", alignItems: "center"}}>
                        <AddCommentOutlinedIcon />
                      <p className="blog-slider__code">{announcement.comment}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {/* ----- Map Announcements Data ---- */}
            
          </div>
          <div className="swiper-button-next"></div>
          <div className="swiper-button-prev"></div>
          <div className="blog-slider__pagination"></div>
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
