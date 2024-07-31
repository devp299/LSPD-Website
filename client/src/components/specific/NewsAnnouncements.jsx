import React, { useEffect, useState } from 'react';
import { Modal, Box, Typography, IconButton, Container, Paper } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import AddCommentOutlinedIcon from '@mui/icons-material/AddCommentOutlined';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import '../../css/event-page.css';
import toast, { Toaster } from 'react-hot-toast'; // Import react-hot-toast
import { getAllUserNews, checkUserLike, likeNews } from '../../api';
import UserLayout from '../layout/UserLayout';

const NewsAnnouncements = () => {
    const [events, setEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [likes, setLikes] = useState({});

    const handleOpenModal = (event) => {
        setSelectedEvent(event);
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
        setSelectedEvent(null);
    };

    const handleLike = async (eventId) => {
        try {
            const response = await likeNews(eventId); // Call the API to like the news
            // Assuming `response` contains the new like status or data
            setEvents(events.map(event =>
                event._id === eventId
                    ? { ...event, isLiked: !event.isLiked }
                    : event
            ));
            // Update local state to reflect the like status
            setLikes(prevLikes => ({
                ...prevLikes,
                [eventId]: !prevLikes[eventId]
            }));
            toast.success('Liked successfully!');
        } catch (error) {
            // console.error('Error liking the news:', error);
            toast.error('You have already liked news');
        }
    };

    useEffect(() => {
        const fetchAnnouncements = async () => {
            try {
                const response = await getAllUserNews();
                const sortedEvents = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                setEvents(sortedEvents);
        
                // Check if user has liked each announcement
                const likeStatus = {};
                for (const event of sortedEvents) {
                    try {
                        const { liked } = await checkUserLike(event._id);
                        likeStatus[event._id] = liked;
                    } catch (error) {
                        console.error(`Error checking like status for event ${event._id}:`, error);
                        likeStatus[event._id] = false; // Default to false if there's an error
                    }
                }
                setLikes(likeStatus);
            } catch (error) {
                console.error('Error fetching announcements:', error);
            }
        };

        fetchAnnouncements();
    }, []);

    return (
        <UserLayout>
        <Container>
            <div className="heading">
                <h1>News & Announcements</h1>
            </div>
            <Box className="timeline-container">
                <Box className="timeline-line"/>
                <ul className="timeline">
                    {events.map((event, index) => {
                        const eventDate = new Date(event.date);
                        const dateString = `${eventDate.getDate().toString().padStart(2, '0')}-${(eventDate.getMonth() + 1).toString().padStart(2, '0')}-${eventDate.getFullYear()}`;

                        return (
                            <li key={index} className="timeline-event">
                                <Paper className="event-card">
                                    <img src={`${event.image.url}`} alt={`${event.title} Poster`}/>
                                    <Box className="event-card-details">
                                        <Typography variant="h6" style={{ fontFamily: "Russo One", fontWeight: "bold"}}>{event.title}</Typography>
                                        <Typography variant="body2" sx={{ fontFamily: "Russo One" }}>{event.content}</Typography>
                                        <Typography variant="body2" sx={{ fontFamily: "Russo One" }}>{event.eventDate}</Typography>
                                        <Typography variant="body1" sx={{ fontFamily: "Russo One" }}>Location: {event.location}</Typography>
                                        <Box sx={{ display: 'flex', flexDirection: "row", alignItems: "center", justifyContent: "space-evenly", cursor: "pointer"}}>
                                            <button className="knowmore" onClick={() => handleOpenModal(event)}>Know More</button>
                                            {likes[event._id] ? 
                                                <ThumbUpIcon onClick={() => handleLike(event._id)} /> :
                                                <ThumbUpOutlinedIcon onClick={() => handleLike(event._id)} />
                                            }
                                            <AddCommentOutlinedIcon />
                                        </Box>
                                    </Box>
                                </Paper>
                                <Box className="event-date">
                                    {dateString}
                                </Box>
                            </li>
                        );
                    })}
                </ul>
            </Box>

            <Modal open={modalOpen} onClose={handleCloseModal}>
                <Box className="modal-user-content">
                    <IconButton className="modal-user-close" onClick={handleCloseModal}>
                        <CloseIcon />
                    </IconButton>
                    {selectedEvent && (
                        <Box className="modal-user-container">
                            <Box className="div-img">
                                <img id="modalEventImage" src={`${selectedEvent.image.url}`} alt="Event Image" />
                            </Box>
                            <Box className="modal-user-div">
                                <Box className="modal-user-eventname">
                                    <Typography id="modalEventName" variant="h5">{selectedEvent.title}</Typography>
                                </Box>
                                <Box className="div-text">
                                    <Typography id="modalEventDescription" variant="body2">{selectedEvent.content}</Typography>
                                    <Typography variant="body1" sx={{ fontFamily: "cursive"}}><strong>Date:</strong> <span id="modalEventDate">{new Date(selectedEvent.date).toLocaleString()}</span></Typography>
                                    <Typography variant="body1" sx={{ fontFamily: "cursive"}}><strong>Time:</strong> <span id="modalEventTime">{selectedEvent.eventTime}</span></Typography>
                                    <Typography variant="body1" sx={{ fontFamily: "cursive"}}><strong>Place:</strong> <span id="modalVenue">{selectedEvent.location}</span></Typography>
                                </Box>
                            </Box>
                        </Box>
                    )}
                </Box>
            </Modal>
            <Toaster/>
        </Container>
        </UserLayout>
    );
};

export default NewsAnnouncements;
