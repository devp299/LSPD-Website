import { AppBar, Badge, Box, IconButton, Toolbar, Tooltip, Typography } from '@mui/material'
import React, { useState } from 'react';
import {Announcement as AnnouncementIcon, Work as WorkIcon, Logout as LogoutIcon, Menu as MenuIcon,Group as GroupIcon, Search as SearchIcon, Group} from "@mui/icons-material"
import {useNavigate} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { userNotExists } from '../../redux/auth';
// import toast, { Toaster } from 'react-hot-toast';

const Header = () => {
    // const [isNews,setIsNews] = useState(false);
    const navigate = useNavigate();
    const dispatch  = useDispatch();
    const handleLogout = () => {
        localStorage.removeItem('user-token');
        // Dispatch logout action
        dispatch(userNotExists());
        // toast.success("Logged Out Successfully");
    }
    const openNewsAndAnnouncements = () => {
        // setIsNews(!isNews);
        navigate("/user/announcements");
    }
    const openCareerPage = () => {
        navigate("/user/career");
    }
  return (
    <>
        <Box sx={{flexGrow:1}} height={"4rem"}>
            <AppBar position="static" sx={{
                bgcolor: "black",
            }}>
                <Toolbar>
                    <Typography variant='h6'
                    sx={{
                        display: {xs: "none", sm: "block"},
                        fontFamily: "cursive"
                    }}
                    >
                    LOS SANTOS
                    </Typography>
                    <Box sx={{
                        display: { xs: "block", sm: "none"},
                    }}>
                        <IconButton color="inherit">
                            <MenuIcon />
                        </IconButton>
                    </Box>
                    <Box sx={{
                        flexGrow:1,
                    }}/>
                    <Box>
                    
                    {/* <IconBtn 
                        title={"Search"}
                        icon={<SearchIcon />}
                    />
                    <IconBtn 
                        title={"Notifications"}
                        icon={<NotificationsIcon />}
                        value={3}
                    /> */}
                    <IconBtn
                        title={"News and Announcements"}
                        icon={<AnnouncementIcon />}
                        onClick={openNewsAndAnnouncements}
                    />
                    <IconBtn 
                        title={"Career"}
                        icon={<WorkIcon />}
                        onClick={openCareerPage}
                    />
                    <IconBtn 
                        title={"Logout"}
                        icon={<LogoutIcon />}
                        onClick={handleLogout}
                    />
                    </Box>
                </Toolbar>
                {/* <Toaster/> */}
            </AppBar>
            {/* {isNews && <NewsAnnouncements/>} */}
        </Box> 
    </>
  )
}

const IconBtn = ({ title, icon, onClick, value }) => {
    return (
        <Tooltip title={title}>
            <IconButton color="inherit" size="large" onClick={onClick}>
                { value? <Badge badgeContent={value} color='error'> {icon} </Badge> : icon}
                
            </IconButton>
        </Tooltip>
    )
}

export default Header
