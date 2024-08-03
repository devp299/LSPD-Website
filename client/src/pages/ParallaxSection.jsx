// ParallaxEffect.js
import React, { useEffect, useState } from 'react';
import { Parallax, ParallaxLayer } from '@react-spring/parallax';
import { useNavigate } from 'react-router-dom';
import '../css/parallaxEffect.css';
import homepage from '../css/homepage_bg.jpg';
import frontPhoto from '../components/img/layer-front.png';
import middlePhoto from '../components/img/layer-middle.png';
import Navbar from '../components/Navbar';
import MostWantedList from '../components/specific/MostWantedList';
import LoginSignup from './LoginSignup';
import Transition from '../hooks/Transition';

const ParallaxEffect = () => {
  const navigate = useNavigate();
  const [showTransition, setShowTransition] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTransition(false);
    }, 3000); // 2 seconds duration for the transition

    return () => clearTimeout(timer); // Clear the timeout if the component unmounts
  }, []);

  const handleArrowClick = () => {
    const wrapper = document.querySelector('.wrapper');
    wrapper.classList.add('swipe-left');
    
    // Optionally, add fade-out effect to content
    const contentElements = document.querySelectorAll('.main-header, .arrow-container');
    contentElements.forEach(element => {
      element.classList.add('content-fade-out');
    });
    // Navigate to the new page after the animation ends
    setTimeout(() => {
      // setOpenList(true);
      navigate('/list'); // Replace '/login' with your target route
    }, 200); // Match the timeout duration with the animation duration
  };

  if (showTransition) {
    return <Transition />;
  }

  return (
    <div className="wrapper">
      <Navbar/>
      <Parallax pages={2}>
        {/* Background Layer */}
        <ParallaxLayer
          offset={0}
          speed={0.2}
          factor={2} // Adjust this factor to control the layer's height
          style={{
            backgroundImage: `url(${homepage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            height: "130vh"
          }}
        >
          {/* <div className="arrow-container">
            <div className="arrow" onClick={handleArrowClick}></div>
          </div> */}
        </ParallaxLayer>

        {/* Middle Layer */}
        <ParallaxLayer
          offset={0}
          speed={0.4}
          factor={2}
          style={{
            backgroundImage: `url(${middlePhoto})`,
            backgroundSize: '130%',
            backgroundPosition: 'bottom',
            height: "110%",
            width: "140%"
          }}
        />

        {/* Foreground Layer */}
        <ParallaxLayer
          offset={0}
          speed={0.6}
          factor={2}
          style={{
            backgroundImage: `url(${frontPhoto})`,
            backgroundSize: 'cover',
            backgroundPosition: 'bottom',
          }}
        />

        {/* Content Header */}
        <ParallaxLayer
          offset={0}
          speed={0.2}
          factor={1.5}
          style={{
            display: 'flex',
            alignItems: "center",
            justifyContent: "center",
            marginTop: "2rem",
            flexDirection: 'column',
            color: 'white',
          }}
        >
          <div className="main-header">
            <h1 className="layers__caption">Welcome to</h1>
            <h1 className="layers__title">GTA 5 World</h1>
          </div>
          
        </ParallaxLayer>
      

        {/* Article Content */}
        <ParallaxLayer
          offset={1}
          speed={0.7}
          factor={1}
          style={{
            backgroundImage: 'url(https://i.pinimg.com/originals/34/bb/62/34bb6218a484161b4f9fb62b43da41f4.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            color: 'white',
          }}
        >
          <div className="arrow-container">
            <div className="arrow" onClick={handleArrowClick}></div>
          </div>
        </ParallaxLayer>

      </Parallax>

      {/* {openList && <LoginSignup/>} */}
    </div>
  );
};

export default ParallaxEffect;
