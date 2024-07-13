import React, { useState } from 'react';
import { Box, Card, CardMedia, CardContent, Typography, IconButton, Modal } from '@mui/material';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import AddCommentOutlinedIcon from '@mui/icons-material/AddCommentOutlined';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AdminLayout from '../../components/layout/AdminLayout';
import EditAnnouncementModal from '../../components/modals/EditAnnouncementModal';
import '../../css/allAnnouncements.css';

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

  return (
    <AdminLayout>
      <Box className="announcements-container">
        {announcements.map((announcement) => (
          <Card key={announcement.id} className="announcement-card">
            <Box display="flex" flexDirection="column">
            <CardMedia
              component="img"
              height="140"
              image={announcement.photo}
              alt={announcement.title}
            />
            </Box>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {announcement.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {announcement.content}
              </Typography>
              <Box display="flex" flexDirection="column" mt={0}>
                <Typography variant="body2">
                  <strong>Location:</strong> {announcement.location}
                </Typography>
                <Typography variant="body2">
                <strong>Author:</strong> {announcement.author}
                </Typography>
                <Typography variant="body2">
                <strong>Date & Time:</strong> {new Date(announcement.date).toLocaleString()}
                </Typography>
              </Box>
              <Box display="flex" flexDirection="row">
                <Box display="flex" flexDirection="row" justifyContent="flex-end">
                    <IconButton>
                        <EditIcon onClick={() => handleEditNews(announcement)} />
                    </IconButton>
                    <IconButton>
                        <DeleteIcon onClick={() => handleEditNews(announcement)} />
                    </IconButton>
                </Box>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>
      {selectedAnnouncement && (
        <EditAnnouncementModal
          announcement={selectedAnnouncement}
          onUpdate={handleUpdate}
          onClose={handleClose}
        />
      )}
    </AdminLayout>
  );
};

export default AllAnnouncements;
