import React, { useEffect, useState } from 'react';
import { Modal, Box, Typography, IconButton, Button, Container, Paper } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import AddCommentOutlinedIcon from '@mui/icons-material/AddCommentOutlined';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import '../../css/event-page.css';
import gtaPhoto from '../../assets/gta-6-teaser-3840x2160-13559.png';

const NewsAnnouncements = () => {
    const [events, setEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [like, setLike] = useState(false);
    // const [view, setView] = useState(false);

    const handleOpenModal = (event) => {
        setSelectedEvent(event);
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
        setSelectedEvent(null);
    };
    const liked = () => {
        setLike(!like);
    }

    useEffect(() => {
        // Simulated response data
        const eventsData = [
            {
                eventName: "Tech Conference 2024",
                eventDescription: "Join us for a day of insightful talks and networking.",
                eventPoster: "gta-6-teaser-3840x2160-13559.png",
                speaker: "John Doe",
                isLiked: true,
                eventDate: "2024-08-15",
                eventTime: "10:00 AM",
                venue: "Convention Center",
                instaPostLink: "https://instagram.com/techconference2024"
            },
            {
                eventName: "Art Expo 2024",
                eventDescription: "Explore the latest trends in the art world.",
                eventPoster: "art-expo.jpg",
                isLiked: false,
                speaker: "Jane Smith",
                eventDate: "2024-09-10",
                eventTime: "2:00 PM",
                venue: "Art Gallery",
                instaPostLink: "https://instagram.com/artexpo2024"
            },
            {
                eventName: "Music Festival 2024",
                eventDescription: "Experience live performances from top artists.",
                eventPoster: "music-festival.jpg",
                speaker: "DJ Mike",
                isLiked: false,
                eventDate: "2024-07-20",
                eventTime: "6:00 PM",
                venue: "Open Grounds",
                instaPostLink: "https://instagram.com/musicfestival2024"
            },
            {
                eventName: "Literature Meet 2024",
                eventDescription: "Engage with renowned authors and poets.",
                eventPoster: "literature-meet.jpg",
                speaker: "Emily Clark",
                isLiked: true,
                eventDate: "2024-11-05",
                eventTime: "11:00 AM",
                venue: "City Library",
                instaPostLink: "https://instagram.com/literaturemeet2024"
            },
            {
                eventName: "Science Fair 2024",
                eventDescription: "Discover groundbreaking scientific innovations.",
                eventPoster: "science-fair.jpg",
                speaker: "Dr. Alan Turing",
                eventDate: "2024-10-15",
                isLiked: true,
                eventTime: "9:00 AM",
                venue: "University Hall",
                instaPostLink: "https://instagram.com/sciencefair2024"
            },
            {
                eventName: "Tech Conference 2024",
                eventDescription: "Join us for a day of insightful talks and networking.",
                eventPoster: "gta-6-teaser-3840x2160-13559.png",
                speaker: "John Doe",
                eventDate: "2024-08-15",
                eventTime: "10:00 AM",
                venue: "Convention Center",
                instaPostLink: "https://instagram.com/techconference2024"
            },
            {
                eventName: "Art Expo 2024",
                eventDescription: "Explore the latest trends in the art world.",
                eventPoster: "art-expo.jpg",
                speaker: "Jane Smith",
                eventDate: "2024-09-10",
                eventTime: "2:00 PM",
                venue: "Art Gallery",
                instaPostLink: "https://instagram.com/artexpo2024"
            },
            {
                eventName: "Music Festival 2024",
                eventDescription: "Experience live performances from top artists.",
                eventPoster: "music-festival.jpg",
                speaker: "DJ Mike",
                isLiked: true,
                eventDate: "2024-07-20",
                eventTime: "6:00 PM",
                venue: "Open Grounds",
                instaPostLink: "https://instagram.com/musicfestival2024"
            },
            {
                eventName: "Literature Meet 2024",
                eventDescription: "Engage with renowned authors and poets.",
                eventPoster: "literature-meet.jpg",
                speaker: "Emily Clark",
                eventDate: "2024-11-05",
                eventTime: "11:00 AM",
                venue: "City Library",
                instaPostLink: "https://instagram.com/literaturemeet2024"
            },
            {
                eventName: "Science Fair 2024",
                eventDescription: "Discover groundbreaking scientific innovations.Discover groundbreaking scientific innovations",
                eventPoster: "science-fair.jpg",
                speaker: "Dr. Alan Turing",
                eventDate: "2024-10-15",
                eventTime: "9:00 AM",
                venue: "University Hall",
                instaPostLink: "https://instagram.com/sciencefair2024"
            }
        ];

        eventsData.sort((a, b) => new Date(b.eventDate) - new Date(a.eventDate));
        setEvents(eventsData);
    }, []);
    
    return (
        <Container>
            <div className="heading">
                <h1>News & Announcements</h1>
            </div>
            <Box className="timeline-container">
                <Box className="timeline-line"/>
                <ul className="timeline">
                    {events.map((event, index) => {
                        const eventDate = new Date(event.eventDate);
                        const dateString = `${eventDate.getDate().toString().padStart(2, '0')}-${(eventDate.getMonth() + 1).toString().padStart(2, '0')}-${eventDate.getFullYear()}`;

                        return (
                            <li key={index} className="timeline-event">
                                <Paper className="event-card">
                                    <img src={`${gtaPhoto}`} alt={`${event.eventName} Poster`}/>
                                    <Box className="event-card-details">
                                        <Typography variant="h6" style={{ fontFamily: "Russo One", fontWeight: "bold"}}>{event.eventName}</Typography>
                                        <Typography variant="body2" sx={{ margin: '5px 0', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', textOverflow: 'ellipsis' }}>{event.eventDescription.length > 100 ? `${event.eventDescription.substring(0, 100)}...` : event.eventDescription}</Typography>
                                        <Typography variant="body2" sx={{ fontFamily: "Russo One" }}>{event.eventTime}</Typography>
                                        <Typography variant="body2" sx={{ fontFamily: "Russo One" }}>{event.speaker}</Typography>
                                        <Typography variant="body2"sx={{ fontFamily: "Russo One" }}>{event.venue}</Typography>
                                        <Box sx={{ display: 'flex', flexDirection: "row", alignItems: "center",justifyContent: "space-evenly", cursor: "pointer"}}>
                                            <button className="knowmore" onClick={() => handleOpenModal(event)}>Know More</button>
                                            {event.isLiked ? <ThumbUpIcon /> :
                                                <ThumbUpOutlinedIcon />
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
                <Box className="modal-content" >
                    <IconButton className="modal-close" onClick={handleCloseModal}>
                        <CloseIcon />
                    </IconButton>
                    {selectedEvent && (
                        <Box className="modal-container">
                            <Box className="div-img">
                                <img id="modalEventImage" src={`${gtaPhoto}`} alt="Event Image" />
                            </Box>
                            <Box className="modal-div">
                                <Box className="modal-eventname">
                                    <Typography id="modalEventName" variant="h5">{selectedEvent.eventName}</Typography>
                                </Box>
                                <Box className="div-text">
                                    <Typography id="modalEventDescription" variant="body2">{selectedEvent.eventDescription}</Typography>
                                    <Typography variant="body1" sx={{ fontFamily: "cursive"}}><strong>Speaker:</strong> <span id="modalSpeaker">{selectedEvent.speaker}</span></Typography>
                                    <Typography variant="body1" sx={{ fontFamily: "cursive"}}><strong>Date:</strong> <span id="modalEventDate">{selectedEvent.eventDate}</span></Typography>
                                    <Typography variant="body1" sx={{ fontFamily: "cursive"}}><strong>Time:</strong> <span id="modalEventTime">{selectedEvent.eventTime}</span></Typography>
                                    <Typography variant="body1" sx={{ fontFamily: "cursive"}}><strong>Place:</strong> <span id="modalVenue">{selectedEvent.venue}</span></Typography>
                                    <Button variant="contained" href={selectedEvent.instaPostLink} target="_blank"><Typography variant="body4" sx={{ fontFamily: "Russo One" }}>instagram post</Typography></Button>
                                </Box>
                            </Box>
                        </Box>
                    )}
                </Box>
            </Modal>
        </Container>
    );
};

export default NewsAnnouncements;
