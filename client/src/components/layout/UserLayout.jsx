import React, { useEffect, useState } from 'react';
import { Box, Drawer, Grid, IconButton, Stack, Typography, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import { Dashboard as DashboardIcon, Close as CloseIcon, Menu as MenuIcon, Work as WorkIcon, ManageAccounts as ManageAccountsIcon, Groups as GroupsIcon, ExitToApp as ExitToAppIcon } from '@mui/icons-material';
import { useLocation, Link as RouterLink, useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
// import { adminNotExists } from '../../redux/auth';
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
    color: #ffcc00;
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
  },
];



const SideBar = ({ w = "100%" }) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const user = useSelector(state => state.auth.user);
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);

  const logoutHandler = () => {
        // Dispatch logout action
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
      <Typography position={"fixed"} fontFamily={"Russo One"} variant='h5' color="#ffcc00" textTransform={"uppercase"}>LSPD</Typography>
      <Stack position={"fixed"} spacing={"2rem"} mt="2rem">
        {adminTabs.map((tab) => (
          <StyledLink
            key={tab.path}
            to={tab.path}
            style={
              isSelected(tab.path, tab.alternatePaths) ? {
                backgroundColor: "#ffcc00",
                color: "#000",
                ":hover": { color: "#000" },
              } : {}
            }
          >
            <Stack direction={"row"} alignItems={"center"} spacing={"1rem"}>
              {React.cloneElement(tab.icon, {
                style: {
                  color: isSelected(tab.path, tab.alternatePaths) ? "#000" : "#ffcc00",
                },
              })}
              <Typography fontFamily={"Russo One"}>{tab.name}</Typography>
            </Stack>
          </StyledLink>
        ))}
        <StyledLink as="div" onClick={handleOpenLogoutDialog}>
          <Stack direction={"row"} alignItems={"center"} spacing={"1rem"}>
            <ExitToAppIcon style={{ color: '#ffcc00' }} />
            <Typography fontFamily={"Russo One"}>Logout</Typography>
          </Stack>
        </StyledLink>

        {user && (
          <Stack direction={"column"} alignItems={"center"} spacing={"1rem"} mb={"2rem"} p={"1rem"} bgcolor={"#222"} borderRadius={"1rem"}>
            <Typography variant="h6" color="#ffcc00" fontFamily={"Russo One"}>
              userName : {user.username}
            </Typography>
            <Typography variant="body2" color="#ffcc00" fontFamily={"Russo One"}>
              email : {user.email}
            </Typography>
          </Stack>
        )}
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
          color: "#ffcc00"
        }}>
            Confirm Logout
        </h1>
        <DialogContent>
          <Typography fontFamily={"Russo One"}>
            Are you sure you want to logout?
          </Typography>
        </DialogContent>
        <DialogActions>
          <button style={{
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
          <button style={{
            padding: "10px 20px",
            border: "none",
            borderRadius: "10px",
            cursor: "pointer",
            fontWeight: "bold",
            textTransform: "uppercase",
            transition: "backgroundColor 0.3s ease, transform 0.3s ease",
            letterSpacing: "1px",
            "background": "#ffcc00",
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
          right: "1rem",
          top: "1rem",
          zIndex: 1000,
        }}
      >
        <IconButton onClick={handleMobile} style={{ color: '#ffcc00' }}>
          {isMobile ? <CloseIcon /> : <MenuIcon />}
        </IconButton>
      </Box>
      {/* <Grid
        item
        md={4}
        lg={3}
        sx={{
          display: {
            xs: "block",
            md: "block",
          },
          backgroundColor: "#1a1a1a",
        }}
      >
        <SideBar />
      </Grid> */}
      <Grid
        item
        xs={12}
        md={12}
        lg={12}
        sx={{
          // width: "100vw",
          position: 'relative',
          backgroundImage: 'url(https://steamuserimages-a.akamaihd.net/ugc/938338722784427995/AD9C418299AF12D29EF02D37BBB24BA91CB00772/?imw=637&imh=358&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=true)',
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
        <SideBar w="30vw" />
      </Drawer>
    </Grid>
  );
};

export default AdminLayout;
