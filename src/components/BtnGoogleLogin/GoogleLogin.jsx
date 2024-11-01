import React from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './GoogleLogin.css'

function BtnGoogleLogin() {
  const DomainApi = process.env.REACT_APP_DOMAIN_API;
  const navigate = useNavigate();
  const handleLoginSuccess = async (credentialResponse) => {
    try {
      const response = await axios.post(`${DomainApi}/user/auth/google`, {
        token: credentialResponse.credential,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log(response.data.data);
      localStorage.setItem('accessToken', response.data.data.accessToken);
      localStorage.setItem('refreshToken', response.data.data.refreshToken);
      navigate(`/chooseClass`);
    } catch (error) {
      console.error('Login Failed:', error);
    }
    
  };

  const handleLoginError = (error) => {
    console.error('Login Failed:', error);
  };

  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
      <div className='wrapBtnGG'>
        <GoogleLogin
          onSuccess={handleLoginSuccess}
          onError={handleLoginError}
        />
      </div>
    </GoogleOAuthProvider>
  );
}

export default BtnGoogleLogin;
