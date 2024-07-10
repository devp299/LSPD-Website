import { AppBar, Badge, Box, IconButton, Toolbar, Tooltip, Typography } from '@mui/material'
import React, { useState } from 'react';
import {Announcement as AnnouncementIcon, Work as WorkIcon, Notifications as NotificationsIcon, Logout as LogoutIcon, Menu as MenuIcon,Group as GroupIcon, Search as SearchIcon, Group} from "@mui/icons-material"
import {useNavigate} from 'react-router-dom';
import NewsAnnouncements from '../specific/NewsAnnouncements';

const Header = () => {
    const [isNews,setIsNews] = useState(false);
    const openNewsAndAnnouncements = () => {
        setIsNews(!isNews);
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
                    
                    <IconBtn 
                        title={"Search"}
                        icon={<SearchIcon />}
                    />
                    <IconBtn 
                        title={"Notifications"}
                        icon={<NotificationsIcon />}
                        value={3}
                    />
                    <IconBtn
                        title={"News and Announcements"}
                        icon={<AnnouncementIcon />}
                        value={3}
                        onClick={openNewsAndAnnouncements}
                    />
                    <IconBtn 
                        title={"Career"}
                        icon={<WorkIcon />}
                    />
                    <IconBtn 
                        title={"Logout"}
                        icon={<LogoutIcon />}
                    />
                    </Box>
                </Toolbar>
            </AppBar>
            {isNews && <NewsAnnouncements/>}
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
