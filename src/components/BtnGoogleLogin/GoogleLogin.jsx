import React from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import axios from "axios";

function BtnGoogleLogin() {
  const DomainApi = process.env.REACT_APP_DOMAIN_API;

  const handleLoginSuccess = async (credentialResponse) => {
    console.log('Login Success:', credentialResponse);
    // Send the token to the backend for verification
    try {
      const response = await axios.post(`${DomainApi}/user/auth/google`, {
        token: credentialResponse.credential,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('Backend response:', response.data); // No need to call res.json()
      // Store JWT in local storage
      localStorage.setItem('token', response.data.token);
    } catch (error) {
      console.error('Login Failed:', error);
    }
  };

  const handleLoginError = (error) => {
    console.error('Login Failed:', error);
  };

  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
      <div>
        <GoogleLogin
          onSuccess={handleLoginSuccess}
          onError={handleLoginError}
        />
      </div>
    </GoogleOAuthProvider>
  );
}

export default BtnGoogleLogin;
