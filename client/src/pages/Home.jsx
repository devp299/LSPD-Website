import { React } from "react";
import Navbar from "../components/Navbar";
import { Parallax, ParallaxLayer } from '@react-spring/parallax'
import '../css/homepage.css';
import { Box,Typography } from "@mui/material";
import WantedCriminals from "../components/WantedCriminals";

const Home = () => {
    return (
        <div>
            <div className="background-container">
                <Navbar />
                    <Box className="background-section">
                        <Typography variant="h2" component="h2" sx={{ fontSize: '5rem' }}>
                            Welcome to
                        </Typography>
                        {/* <Typography variant="h1" component="h1" sx={{ fontSize: '4.6rem' }}>
                            Los Santos Police Department
                        </Typography> */}
                        <a href="https://fontmeme.com/grand-theft-auto-font/"><img src="https://fontmeme.com/permalink/240703/eb6c29269ee3a610f288c9238cd9c45d.png" alt="grand-theft-auto-font" border="0"/></a>
                    </Box>
            </div>
            <div className="container">
                <WantedCriminals />
            </div>
        </div>
    )
}

export default Home;