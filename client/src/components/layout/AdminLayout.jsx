import React, { useEffect, useState } from 'react';
import { Box, Drawer, Grid, IconButton, Stack, Typography, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import { Dashboard as DashboardIcon, Close as CloseIcon, Menu as MenuIcon, Work as WorkIcon, ManageAccounts as ManageAccountsIcon, Groups as GroupsIcon, ExitToApp as ExitToAppIcon } from '@mui/icons-material';
import { useLocation, Link as RouterLink, useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { adminNotExists } from '../../redux/auth';
import { useDispatch } from 'react-redux';
import toast, { Toaster } from 'react-hot-toast';

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
    name: "Dashboard",
    path: "/admin",
    icon: <DashboardIcon />
  },
  {
    name: "News & Announcements",
    path: "/admin/news",
    icon: <ManageAccountsIcon />,
    alternatePaths: ["/admin/all-announcements"]
  },
  {
    name: "Careers",
    path: "/admin/career",
    icon: <WorkIcon />
  },
  {
    name: "Wanted List",
    path: "/admin/list",
    icon: <GroupsIcon />
  },
];

const SideBar = ({ w = "100%" }) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);

  const logoutHandler = () => {
    dispatch(adminNotExists());
    navigate('/login');
    toast.success("Logged out Successfully.");
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
    <Stack width={w} direction={"column"} p={"2rem"} spacing={"3rem"} bgcolor="#1a1a1a" minHeight="100vh">
      <Typography position={"fixed"} fontFamily={"Russo One"} variant='h5' color="#ffb463" textTransform={"uppercase"}>LSPD</Typography>
      <Stack position={"fixed"} spacing={"1.5rem"} mt="3rem">
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
      </Stack>

      {/* Logout Confirmation Dialog */}
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
          <button onClick={handleCloseLogoutDialog} className='cancel-btn'>Cancel</button>
          <button onClick={logoutHandler} className='save-btn'>Logout</button>
        </DialogActions>
      </Dialog>
      {/* <Toaster/> */}
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
          display: { xs: "block", md: "none" },
          position: "fixed",
          right: "1rem",
          top: "1rem",
          zIndex: 1000,
        }}
      >
        <IconButton onClick={handleMobile} style={{ color: '#1a1a1a' }}>
          {isMobile ? <CloseIcon /> : <MenuIcon />}
        </IconButton>
      </Box>
      <Grid
        item
        md={4}
        lg={3}
        sx={{
          display: {
            xs: "none",
            md: "block",
          },
          backgroundColor: "#1a1a1a",
        }}
      >
        <SideBar />
      </Grid>
      <Grid
        item
        xs={12}
        md={8}
        lg={9}
        sx={{
          position: 'relative',
          backgroundImage: 'url(https://c4.wallpaperflare.com/wallpaper/749/593/95/the-sky-clouds-sunset-mountains-wallpaper-preview.jpg)',
          backgroundAttachment: 'fixed',
          backgroundSize: "cover",
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
        <Box sx={{ position: 'relative', zIndex: 2 }}>
          {children}
        </Box>
      </Grid>
      <Drawer
        open={isMobile}
        onClose={handleClose}
        PaperProps={{
          sx: {
            backgroundColor: "#1a1a1a",
          },
        }}
      >
        <SideBar w="80vw" />
      </Drawer>
      <Toaster/>
    </Grid>
  );
};

export default AdminLayout;
