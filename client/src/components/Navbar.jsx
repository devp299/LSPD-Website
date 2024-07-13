import React, { startTransition, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { styled } from '@mui/system';
import {useNavigate} from "react-router-dom";

import LoginRoundedIcon from '@mui/icons-material/LoginRounded';

// Create a styled component for the title with custom styles
const Title = styled(Typography)(({ theme }) => ({
  fontFamily: 'Arial, sans-serif',  // Replace with GTA 5 font family if available
  flexGrow: 1,
  textAlign: 'left',
}));

const Navbar = () => {

  const navigate = useNavigate();
  
  const navigateToLogin = () => {
    startTransition(() => {
      navigate("/login");
    })
  }
  return (
      <AppBar position="fixed" sx={{ backgroundColor: 'transparent', boxShadow: 'none' }}>
        <Toolbar>
          <Title variant="h7" sx={{
            marginLeft: 6
          }}>
            {/* <a href="https://fontmeme.com/grand-theft-auto-font/"><img src="https://fontmeme.com/permalink/240703/d84927e9d628f5563e1c3181871cebc1.png" alt="grand-theft-auto-font" border="0" /></a> */}
          </Title>

          <Button color="inherit" 
            sx={{
              marginRight: 7,
              marginTop: 1,
              bgcolor: "white",
              borderRadius: "0.7rem",
              // borderBlockColor: "white",
              fontWeight: "bold",
              color: "primary.main",
              "&:hover": {
                color: "white",
                bgcolor: "#68C6E9"
              }
            }}
            startIcon={<LoginRoundedIcon />}
            onClick={navigateToLogin}
          >Login</Button>
        </Toolbar>
      </AppBar>
  );
};

export default Navbar;
