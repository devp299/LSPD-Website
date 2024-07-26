// ParallaxEffect.js
import React from 'react';
import { Parallax, ParallaxLayer } from '@react-spring/parallax';
import '../css/parallaxEffect.css';
import frontPhoto from '../components/img/layer-front.png';
import middlePhoto from '../components/img/layer-middle.png';

const ParallaxEffect = () => {
  return (
    <div className="wrapper">
      <Parallax pages={2}>
        {/* Background Layer */}
        <ParallaxLayer
          offset={0}
          speed={0.2}
          factor={2} // Adjust this factor to control the layer's height
          style={{
            backgroundImage: 'url(https://i.pinimg.com/originals/77/eb/85/77eb854815e6cfa0d6cb62c752a0a7eb.jpg)',
            backgroundSize: 'cover',
            // backgroundRepeat: 'no-repeat',
            backgroundPositionX: 'center',
            height: "70%"
          }}
        />

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
            height: "100%"
          }}
        />

        {/* Content Header */}
        <ParallaxLayer
          offset={0}
          speed={0.2}
          factor={1.5}
          style={{
            display: 'flex',
            marginTop: "30rem",
            // fontSize: '3em',
            // alignItems: 'center',
            // justifyContent: 'center',
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
        </ParallaxLayer>

      </Parallax>
    </div>
  );
};

export default ParallaxEffect;
