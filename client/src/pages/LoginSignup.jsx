import React, { useState } from 'react';
import '../css/loginstyle.css';
import GTA5_logo from '../assets/pngimg.com - gta_PNG13.png';
import backgroundVideo from '../components/img/ZGU2vMWUx7gAp94_Dodge-Demon-170-4K_1_5_111956.mp4'; // Import the video
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { adminExists, userExists } from '../redux/auth';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { server } from '../constants/config';

const LoginSignup = () => {
  const [activeForm, setActiveForm] = useState('login'); 
  const [role, setRole] = useState(null);
  const [showPasskeyContainer, setShowPasskeyContainer] = useState(false);
  const [passkeyError, setPasskeyError] = useState('');
  const [signupError, setSignupError] = useState('');
  const [respectVisible, setRespectVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const toggleForm = () => {
    setActiveForm(activeForm === 'login' ? 'signup' : 'login');
  };

  const selectRole = (role) => {
    setRole(role);
    if (role === 'admin') {
      setShowPasskeyContainer(true);
    }
  };

  const handleSignupSubmit = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const email = event.target.email.value;
    const password = event.target.password.value;
    const confirmPassword = event.target.confirmPassword.value;

    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      setIsLoading(true);
      const response = await axios.post(`${server}/api/v1/user/new`, { username, email, password, confirmPassword }, config);
      if (response.data.token) {
        localStorage.setItem('user-token', response.data.token);
        showRespectPlus();
        dispatch(userExists(response.data.user));
        navigate('/login');
        toast.success("Welcome to LSPD World");
      } else {
        setSignupError('No token received');
      }
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    const username = event.target.username.value;
    const password = event.target.password.value;

    try {
      const response = await axios.post(`${server}/api/v1/user/login`, { username, password });
      const token = response.data.token;
      if (token) {
        localStorage.setItem('user-token', token);
        dispatch(userExists(response.data.user));
        navigate('/user');
        toast.success("Logged in Successfully.");
      } else {
        setPasskeyError('No token received');
      }
    } catch (error) {
      toast.error("Invalid Username or Password");
      setPasskeyError(error.response?.data?.message || 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAdminPasskeySubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    const secretKey = event.target.adminPasskey.value;
    try {
      const response = await axios.post(`${server}/api/v1/admin/verify`, { secretKey });
      if (response.data.success) {
        localStorage.setItem('lspd-admin-token', response.data.token);
        dispatch(adminExists());
        navigate('/admin');
      } else {
        setPasskeyError('No token received');
      }
    } catch (error) {
      toast.error("Invalid SecretKey");
      setPasskeyError(error.response?.data?.message || 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const showRespectPlus = () => {
    setRespectVisible(true);
    setTimeout(() => {
      setRespectVisible(false);
    }, 2000);
  };

  return (
    <div className="login-signup">
      <div className="background-video">
        <video autoPlay muted loop>
          <source src={'https://www.desktophut.com/files/ZGU2vMWUx7gAp94_Dodge-Demon-170-4K_1_5_111956.mp4'} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      {!role && (
        <div className="selection-container active">
          <h2>Select Role</h2>
          <button className="selectSubmit" onClick={() => selectRole('user')}>User</button>
          <button className="selectSubmit" onClick={() => selectRole('admin')}>Admin</button>
        </div>
      )}
      {showPasskeyContainer && (
        <div className="passkey-container active">
          <h2>Admin Passkey</h2>
          <form onSubmit={handleAdminPasskeySubmit}>
            <div style={{ display: 'flex', flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
              <input className="passKeyInput" type="password" name="adminPasskey" placeholder="Enter Passkey" required />
              <button className='adminSubmit' type="submit">Submit</button>
              {passkeyError && <div className="error">{passkeyError}</div>}
            </div>
          </form>
        </div>
      )}
      {role && !showPasskeyContainer && (
        <div className="container active" id="mainContainer">
          <div className="form-container">
            <div className="logo">
              <img src={GTA5_logo} alt="GTA 5 Logo" />
            </div>
            <div className={`form-box ${activeForm === 'login' ? 'active' : ''}`} id="loginForm">
              <h2>Login</h2>
              <form onSubmit={handleLoginSubmit}>
                <input className="commonInput" type="text" name="username" placeholder="Username" required />
                <input className="commonInput" type="password" name="password" placeholder="Password" required />
                <div className="remember-me">
                  <input className="commonInput" type="checkbox" id="rememberMe" />
                  <label htmlFor="rememberMe">Remember me</label>
                </div>
                <button className='loginButton' type="submit">Enter Los Santos</button>
                {isLoading && <div className="loading-spinner" id="loadingSpinner"></div>}
                {passkeyError && <div className="error" id="loginError">{passkeyError}</div>}
              </form>
              <div className="switch">
                Don't have an account? <a onClick={toggleForm}>Sign Up</a>
              </div>
            </div>
            <div className={`form-box ${activeForm === 'signup' ? 'active' : ''}`} id="signupForm">
              <h2>Sign Up</h2>
              <form onSubmit={handleSignupSubmit}>
                <input className="commonInput" type="text" name="username" placeholder="Username" required />
                <input className="commonInput" type="email" name="email" placeholder="Email" required />
                <input className="commonInput" type="password" name="password" placeholder="Password" required />
                <input className="commonInput" type="password" name="confirmPassword" placeholder="Confirm Password" required />
                <button className='loginButton' type="submit">Join Los Santos</button>
                {isLoading && <div className="loading-spinner" id="loadingSpinnerSignup"></div>}
                {signupError && <div className="error" id="signupError">{signupError}</div>}
              </form>
              <div className="switch">
                Already have an account? <a onClick={toggleForm}>Login</a>
              </div>
            </div>
          </div>
        </div>
      )}
      {respectVisible && <div className="respect-plus" id="respectPlus">Respect +</div>}
      <Toaster/>
    </div>
  );
};

export default LoginSignup;
