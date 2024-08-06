import React, { useEffect, useState } from 'react';
import { Box, Drawer, Grid, IconButton, Stack, Typography, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import { Dashboard as DashboardIcon, Close as CloseIcon, Menu as MenuIcon, Work as WorkIcon, ManageAccounts as ManageAccountsIcon, Groups as GroupsIcon, ExitToApp as ExitToAppIcon } from '@mui/icons-material';
import { useLocation, Link as RouterLink, useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { useDispatch, useSelector } from 'react-redux';
import { userNotExists } from '../../redux/auth';

const StyledLink = styled(RouterLink)`
  text-decoration: none;
  border-radius: 1rem;
  padding: 1rem;
  color: #fff;
  transition: background-color 0.3s ease, color 0.3s ease;
  &:hover {
    background-color: #222;
    color: #ffb463;
  }
`;

const adminTabs = [
  {
    name: "Wanted List",
    path: "/user",
    icon: <GroupsIcon />
  },
  {
    name: "News & Announcements",
    path: "/user/announcements",
    icon: <ManageAccountsIcon />,
    alternatePaths: ["/user/all-announcements"]
  },
  {
    name: "Careers",
    path: "/user/career",
    icon: <WorkIcon />
  }
];

const SideBar = ({ w }) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const user = useSelector(state => state.auth.user);
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);

  const logoutHandler = () => {
    dispatch(userNotExists());
  };

  const handleOpenLogoutDialog = () => {
    setLogoutDialogOpen(true);
  };

  const handleCloseLogoutDialog = () => {
    setLogoutDialogOpen(false);
  };

  const isSelected = (path, alternatePaths = []) => {
    return location.pathname === path || alternatePaths.includes(location.pathname);
  };

  return (
    <Stack width={w} direction={"column"} p={"2rem"} spacing={"4rem"} bgcolor="#1a1a1a" minHeight="100vh">
      <Typography position={"fixed"} fontFamily={"Russo One"} variant='h5' color="#ffb463" textTransform={"uppercase"}>LSPD</Typography>
      <Stack position={"fixed"} spacing={"2rem"} mt="2rem">
        {adminTabs.map((tab) => (
          <StyledLink
            key={tab.path}
            to={tab.path}
            style={
              isSelected(tab.path, tab.alternatePaths) ? {
                backgroundColor: "#ffb463",
                color: "#000",
                ":hover": { color: "#000" },
              } : {}
            }
          >
            <Stack direction={"row"} alignItems={"center"} spacing={"1rem"}>
              {React.cloneElement(tab.icon, {
                style: {
                  color: isSelected(tab.path, tab.alternatePaths) ? "#000" : "#ffb463",
                },
              })}
              <Typography fontFamily={"Russo One"}>{tab.name}</Typography>
            </Stack>
          </StyledLink>
        ))}
        <StyledLink as="div" onClick={handleOpenLogoutDialog}>
          <Stack direction={"row"} alignItems={"center"} spacing={"1rem"}>
            <ExitToAppIcon style={{ color: '#ffb463' }} />
            <Typography fontFamily={"Russo One"}>Logout</Typography>
          </Stack>
        </StyledLink>

        {user && (
          <Stack direction={"column"} alignItems={"center"} spacing={"1rem"} mb={"2rem"} p={"1rem"} bgcolor={"#222"} borderRadius={"1rem"}>
            <Typography variant="h6" color="#ffb463" fontFamily={"Russo One"}>
              userName : {user.username}
            </Typography>
            <Typography variant="body2" color="#ffb463" fontFamily={"Russo One"}>
              email : {user.email}
            </Typography>
          </Stack>
        )}
      </Stack>

      <Dialog
        open={logoutDialogOpen}
        onClose={handleCloseLogoutDialog}
        PaperProps={{
          style: {
            backgroundColor: '#1a1a1a',
            color: '#fff',
            borderRadius: '10px',
            padding: '2rem',
            boxShadow: '0 0 10px rgba(0,0,0,0.5)',
          },
        }}
      >
        <h1 style={{
          fontSize: '2em',
          fontFamily: "Russo One",
          color: "#ffb463"
        }}>
          Confirm Logout
        </h1>
        <DialogContent>
          <Typography fontFamily={"Russo One"}>
            Are you sure you want to logout?
          </Typography>
        </DialogContent>
        <DialogActions>
          <button className="cancel-btn" style={{
            padding: "10px 20px",
            border: "none",
            borderRadius: "10px",
            cursor: "pointer",
            fontWeight: "bold",
            textTransform: "uppercase",
            transition: "background-color 0.3s ease, transform 0.3s ease",
            letterSpacing: "1px",
            "background": "#111",
            color: "#fff",
          }} onClick={handleCloseLogoutDialog}>Cancel</button>
          <button className="save-btn" style={{
            padding: "10px 20px",
            border: "none",
            borderRadius: "10px",
            cursor: "pointer",
            fontWeight: "bold",
            textTransform: "uppercase",
            transition: "backgroundColor 0.3s ease, transform 0.3s ease",
            letterSpacing: "1px",
            "background": "#ffb463",
            color: "#000",
          }} onClick={logoutHandler}>Logout</button>
        </DialogActions>
      </Dialog>
    </Stack>
  );
};

const AdminLayout = ({ children }) => {
  const [isMobile, setIsMobile] = useState(false);
  const handleMobile = () => setIsMobile(!isMobile);
  const handleClose = () => setIsMobile(false);

  return (
    <Grid container minHeight={"100vh"}>
      <Box
        sx={{
          display: { xs: "block", md: "block" },
          position: "fixed",
          left: "2rem",
          top: "1rem",
          zIndex: 1000,
        }}
      >
        <IconButton onClick={handleMobile} style={{ color: '#ffb463' }}>
          {isMobile ? <CloseIcon /> : <MenuIcon />}
        </IconButton>
      </Box>
      <Grid
        item
        xs={12}
        md={12}
        lg={12}
        sx={{
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.5)',
            zIndex: 1,
          },
        }}
      >
        <video autoPlay muted loop style={{ position: 'fixed', width: '100vw', height: '100vh', objectFit: 'cover', zIndex: -1 }}>
          <source src='https://motionbgs.com/media/2534/gta-5-night-city.960x540.mp4' type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <Box sx={{ position: 'relative', zIndex: 2 }}>
          {children}
        </Box>
      </Grid>
      <Drawer
        open={isMobile}
        onClose={handleClose}
        PaperProps={{
          sx: {
            width: {md: "30vw",xs: "80vw",},
            backgroundColor: "#1a1a1a",
          },
        }}
      >
        <SideBar width="100vw" />
      </Drawer>
      {/* <Box
        sx={{
          display: { xs: "none", md: "block" },
          width: { md: "20vw" },
          position: "fixed",
          top: 0,
          left: 0,
          bottom: 0,
          backgroundColor: "#1a1a1a",
        }}
      >
        <SideBar width="20vw" />
      </Box> */}
    </Grid>
  );
};

export default AdminLayout;
