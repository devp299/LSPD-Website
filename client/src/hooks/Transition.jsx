// Transition.jsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/loader.css'; // Make sure to include your styles here

const Transition = () => {
  return (
    <div className='transition-body'>
    <div className="overlay" id='overlay'>
      <div className="alert-header">alert</div>
      <div className="horizontal-line"></div>
      <div className="alert-body">Welcome to the city of gangsters.</div>
      <div className="horizontal-line"></div>
    </div>
    </div>
  );
};

export default Transition;
