import React from 'react';
import { Link } from 'react-router-dom';
import '../../StyleCSS/LoginPage.css';

const LoginPage = () => {
  return (
    <div className="bodyofPage">
      <div className="containerOfLogin">
        <div className="containerOfButton">
          <Link className="loginBtn" to="/userlogin" role="button">User Login</Link>
          <Link className="loginBtn" to="/adminlogin" role="button">Admin Login</Link>
          <Link className="loginBtn" to="/AdminSignup" role="button">Admin Signup</Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
