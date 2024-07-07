import React, { useState } from 'react';
import '../css/loginstyle.css';
import GTA5_logo from '../assets/pngimg.com - gta_PNG13.png';
import {useInputValidation} from '6pp';
import { usernameValidator } from '../utils/validators';

const LoginSignup = () => {
  const [activeForm, setActiveForm] = useState('login');
  const [role, setRole] = useState(null);
  const [showPasskeyContainer, setShowPasskeyContainer] = useState(false);
  const [passkeyError, setPasskeyError] = useState('');
  const [signupError, setSignupError] = useState('');
  const [respectVisible, setRespectVisible] = useState(false);


  const username = useInputValidation("",usernameValidator);
  const password = useInputValidation("");
  const passkey = useInputValidation("");
  const email = useInputValidation("");
  const confirmPassword = useInputValidation("");

  const toggleForm = () => {
    setActiveForm(activeForm === 'login' ? 'signup' : 'login');
  };

  const selectRole = (role) => {
    setRole(role);
    if (role === 'admin') {
      setShowPasskeyContainer(true);
    }
  };

  const validatePasskey = () => {
    const passkey = document.getElementById('adminPasskey').value;
    if (passkey === 'admin123') {
      setShowPasskeyContainer(false);
    } else {
      setPasskeyError('Invalid passkey. Please try again.');
    }
  };

  const handleSignupSubmit = (event) => {
    event.preventDefault();
    const username = username;
    const email = email;
    const password = password;
    const confirmPassword = confirmPassword;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!username || !email || !password || !confirmPassword) {
      setSignupError('All fields are required.');
    } else if (!emailPattern.test(email)) {
      setSignupError('Invalid email format.');
    } else if (password.length < 6) {
      setSignupError('Password must be at least 6 characters.');
    } else if (password !== confirmPassword) {
      setSignupError('Passwords do not match.');
    } else {
      setSignupError('');
      showRespectPlus();
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
      <div className="background"></div>
      {!role && (
        <div className="selection-container active">
          <h2>Select Role</h2>
          <button onClick={() => selectRole('user')}>User</button>
          <button onClick={() => selectRole('admin')}>Admin</button>
        </div>
      )}
      {showPasskeyContainer && (
        <div className="passkey-container active">
          <h2>Admin Passkey</h2>
          <input type="password" id="adminPasskey" placeholder="Enter Passkey" required />
          <button onClick={validatePasskey}>Submit</button>
          {passkeyError && <div className="error">{passkeyError}</div>}
        </div>
      )}
      {role && !showPasskeyContainer && (
        <div className="container active" id="mainContainer">
          <div className="form-container">
            <div className="logo">
              <img src={`${GTA5_logo}`} alt="GTA 5 Logo" />
            </div>
            <div className={`form-box ${activeForm === 'login' ? 'active' : ''}`} id="loginForm">
              <h2>Login</h2>
              <form id="loginFormElement">
                <input type="text" name='username' id="loginUsername" placeholder="Username" required />
                <input type="password" name='password' id="loginPassword" placeholder="Password" required />
                <div className="remember-me">
                  <input type="checkbox" id="rememberMe" />
                  <label htmlFor="rememberMe">Remember me</label>
                </div>
                <button type="submit">Enter Los Santos</button>
                <div className="loading-spinner" id="loadingSpinner" style={{ display: 'none' }}></div>
                <div className="error" id="loginError" style={{ display: 'none' }}></div>
              </form>
              <div className="switch">
                Don't have an account? <a onClick={toggleForm}>Sign Up</a>
              </div>
            </div>
            <div className={`form-box ${activeForm === 'signup' ? 'active' : ''}`} id="signupForm">
              <h2>Sign Up</h2>
              <form id="signupFormElement" onSubmit={handleSignupSubmit}>
                <input type="text" name='username' id="signupUsername" placeholder="Username" required />
                <input type="email" name='email' id="signupEmail" placeholder="Email" required />
                <input type="password" name='password' id="signupPassword" placeholder="Password" required />
                <input type="password" name='confirmPassword' id="signupConfirmPassword" placeholder="Confirm Password" required />
                <button type="submit">Join Los Santos</button>
                <div className="loading-spinner" id="loadingSpinnerSignup" style={{ display: 'none' }}></div>
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
    </div>
  );
};

export default LoginSignup;
