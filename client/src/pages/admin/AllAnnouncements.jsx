import React, { useState } from 'react';
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
    },
    {
      id: 6,
      photo:
        "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
      title: 'New Police Station Opening',
      location: 'Washington',
      content: 'We are proud to announce the opening of a new police station in the downtown area to better serve our community.',
      date: '2024-07-06T12:45',
      author: 'Mayor\'s Office',
      likes: 45,
      comment: 17,
    },
    {
      id: 7,
      photo:
        "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
      title: 'Emergency Response Drill',
      location: 'Washington',
      content: 'There will be an emergency response drill this Thursday. Do not be alarmed by the increased police presence.',
      date: '2024-07-07T11:30',
      author: 'Emergency Services',
      likes: 18,
      comment: 21,
    },
    {
      id: 8,
      photo:
        "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
      title: 'Neighborhood Watch Program',
      location: 'Washington',
      content: 'Join your local neighborhood watch program to help keep your community safe.',
      date: '2024-07-08T17:20',
      author: 'Community Liaison',
      likes: 23,
      comment: 4,
    },
    {
      id: 9,
      photo:
        "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
      title: 'Annual Police Fundraiser',
      location: 'Washington',
      content: 'Support your local police department by attending our annual fundraiser. All proceeds go to community programs.',
      date: '2024-07-09T13:40',
      author: 'Fundraising Committee',
      likes: 60,
      comment: 35,
    },
    {
      id: 10,
      photo:
        "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
      title: 'Back to School Safety',
      location: 'Washington',
      content: 'As the new school year approaches, here are some safety tips for students and parents.',
      date: '2024-07-10T07:30',
      author: 'School Resource Officer',
      likes: 33,
      comment: 29,
    },
  ];

const AllAnnouncements = () => {
  const [announcements, setAnnouncements] = useState(data);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const announcementsPerPage = 6;
  const [modalOpen, setModalOpen] = useState(false);

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

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const indexOfLastAnnouncement = currentPage * announcementsPerPage;
  const indexOfFirstAnnouncement = indexOfLastAnnouncement - announcementsPerPage;
  const currentAnnouncements = announcements.slice(indexOfFirstAnnouncement, indexOfLastAnnouncement);

  const handleOpenModal = () => {
    setModalOpen(true);
  }
  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleCreateNews = (newNews) => {
    newNews.id = announcements.length + 1;
    const updatedAnnouncements = [newNews, ...announcements];
    setAnnouncements(updatedAnnouncements);
    setCurrentPage(1); // Set to the first page to show the newest announcement
    handleCloseModal();
  };

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
        }} onClick={handleOpenModal}>
          <AddIcon fontSize='large' />
        </IconButton>
      <Box className="announcements-container">
        {currentAnnouncements.map((announcement) => (
          <Card key={announcement.id} className="announcement-card">
            <Box className="card-content">
              <CardMedia
                className="card-image"
                image={announcement.image ? URL.createObjectURL(announcement.image) : announcement.photo}
                alt={announcement.title}
              />
              <CardContent className="card-data">
                <Box className="card-header">
                  <Typography sx={{ fontFamily: "Russo One"}} gutterBottom variant="h5" component="div">
                    {announcement.title}
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ marginBottom: "0.5rem"}}>
                  {announcement.content}
                </Typography>
                <Typography  color="text.secondary" sx={{ fontFamily: "Russo One", marginBottom: "0.5rem"}} variant="body2">
                  <strong>Location :</strong> {announcement.location}
                </Typography>
                <Typography  color="text.secondary" sx={{ fontFamily: "Russo One", marginBottom: "0.5rem"}} variant="body2">
                  <strong>Author :</strong> {announcement.author}
                </Typography>
                <Typography  color="text.secondary" sx={{ fontFamily: "Russo One", marginBottom: "0.5rem"}} variant="body2">
                  <strong>Date & Time :</strong> {new Date(announcement.date).toLocaleString()}
                </Typography>
                <Box className="card-footer">
                  <Box className="likes-comments">
                    <IconButton>
                      <ThumbUpOutlinedIcon />
                    </IconButton>
                    <Typography>{announcement.likes}</Typography>
                    <IconButton>
                      <AddCommentOutlinedIcon />
                    </IconButton>
                    <Typography>{announcement.comment}</Typography>
                  </Box>
                  <Box className="card-buttons">
                    <IconButton onClick={() => handleEditNews(announcement)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton>
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
      <AddNewsModal open={modalOpen} onClose={handleCloseModal} onCreate={handleCreateNews}/>
    </AdminLayout>
  );
};

export default AllAnnouncements;
