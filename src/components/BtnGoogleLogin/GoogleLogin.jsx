import React from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';


function BtnGoogleLogin() {
  const handleLoginSuccess = (credentialResponse) => {
    console.log('Login Success:', credentialResponse);
    // Gửi mã thông báo (token) đến backend để xác thực
    fetch('http://localhost:8000/auth/google', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token: credentialResponse.credential }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log('Backend response:', data);
        // Xử lý response từ backend (ví dụ lưu JWT vào local storage)
      })
      .catch((error) => console.error('Login Failed:', error));
  };

  const handleLoginError = (error) => {
    console.error('Login Failed:', error);
  };

  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
      <div>
        <h1>Đăng nhập bằng Google</h1>
        <GoogleLogin
          onSuccess={handleLoginSuccess}
          onError={handleLoginError}
        />
      </div>
    </GoogleOAuthProvider>
  );
}

export default BtnGoogleLogin;