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
import { Box, IconButton, Modal } from "@mui/material";
import { Delete as DeleteIcon } from "@mui/icons-material";
import EditAnnouncementModal from "../../components/modals/EditAnnouncementModal";
import {useNavigate} from "react-router-dom";
// import "../../css/event-page.css";
const data = [
  {
    id: 1,
    photo:
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
    title: 'New Community Outreach Program',
    location: 'Washington',
    content: 'We are excited to announce a new community outreach program to help foster better relationships between the police and the community.',
    date: '2024-07-01T10:00',
    author: 'Chief Williams',
    likes: 34,
    comment: 10,
  },
  {
    id: 2,
    photo:
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
    title: 'Crime Prevention Tips',
    location: 'Washington',
    content: 'Here are some important crime prevention tips to keep you and your family safe.',
    date: '2024-07-02T14:30',
    author: 'Officer Brown',
    likes: 21,
    comment: 24,
  },
  {
    id: 3,
    photo:
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
    title: 'Join the LSPD',
    location: 'Washington',
    content: 'We are hiring! Join the Los Santos Police Department and make a difference in your community.',
    date: '2024-07-03T09:15',
    author: 'Recruitment Team',
    likes: 50,
    comment: 23,
  },
  {
    id: 4,
    photo:
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
    title: 'Public Safety Announcement',
    location: 'Washington',
    content: 'Be aware of recent scam activities in the Los Santos area. Do not share your personal information with unknown callers.',
    date: '2024-07-04T16:00',
    author: 'Detective Garcia',
    likes: 28,
    comment: 12,
  },
  {
    id: 5,
    photo:
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
    title: 'Traffic Advisory',
    location: 'Washington',
    content: 'There will be road closures this weekend due to the annual marathon. Plan your travel accordingly.',
    date: '2024-07-05T08:00',
    author: 'Traffic Division',
    likes: 15,
    comment: 8,
  }
];

const AdminNews = () => {
  const [isEdit,setIsEdit] = useState(false);
  const [isViewAll,setIsViewAll] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [announcements, setAnnouncements] = useState(data);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);
  const navigate = useNavigate();  // Initialize useNavigate

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleEdit = () => {
    setIsEdit(true);
    setModalOpen(true);
  }
  const handleViewAll = () => {
    navigate('/admin/all-announcements');
    setIsViewAll(true);
  }

  const handleEditNews = (announcement) => {
    setSelectedAnnouncement(announcement);
  };

  const handleUpdate = (updatedAnnouncement) => {
    setAnnouncements(announcements.map(a => a.id === updatedAnnouncement.id ? updatedAnnouncement : a));
    setSelectedAnnouncement(null);
  };

  const handleClose = () => {
    setSelectedAnnouncement(null);
  };
  
  useEffect(() => {
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
    console.log("Swiper instance:", swiper);

    return () => {
      swiper.destroy();
    };
  }, []);

  return (
    <AdminLayout>
      <IconButton sx={{
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
          boxShadow:" 0 2px 10px rgba(0, 0, 0, 0.2)",
          zIndex: "1000",
          transition: "background-color 0.3s ease, transform 0.2s ease-out",
          '&: hover': {
            backgroundColor: "#4CAD12",
            transform: "scale(1.1)"
          }
        }}>
          <AddIcon fontSize='large' />
        </IconButton>
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
            {/* ----- Map Announcements Data---- */}
            {announcements.map((announcement) => (
              <div key={announcement.id} className="blog-slider__item swiper-slide">
                <div className="blog-slider__img">
                  <img src={announcement.photo} alt="" />
                </div>
                <div className="blog-slider__content">
                  <div style={{ display: "flex", flexDirection: "row", justifyContent: "flex-end", alignItems: "flex-end"}}>
                    <IconButton sx={{ marginRight: "0.5rem"}} onClick={() => handleEditNews(announcement)}>
                      <EditIcon/>
                    </IconButton>
                    <IconButton sx={{ marginRight: "0.5rem"}}>
                      <DeleteIcon/>
                    </IconButton>
                  </div>
                  <div className="blog-slider__title">{announcement.title}</div>
                  <div className="blog-slider__text">{announcement.content}</div>
                  <div style={{ display: "flex", flexDirection: "row"}}>
                    <div>
                      <div className="blog-slider__code">Location: {announcement.location}</div>
                      <div className="blog-slider__code">Chief Guest: {announcement.author}</div>
                      <div className="blog-slider__code">
                        Date & Time: {new Date(announcement.date).toLocaleString()}
                      </div>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column",justifyContent: "space-evenly", marginLeft: "5rem"}}>
                      <div style={{ display: "flex", flexDirection: "column", alignItems: "center"}}>
                        <ThumbUpOutlinedIcon />
                        <p className="blog-slider__code">{announcement.likes}</p>
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
            {/* ----- Map Announcements Data---- */}
            
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
