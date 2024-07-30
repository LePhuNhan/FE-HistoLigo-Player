import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import "antd/dist/reset.css"; // Import Ant Design styles
import LoginPage from "./pages/LoginPage/LoginPage";
import NotFound404 from "./pages/NotFound/NotFound404";
import SignUpPage from "./pages/SignUpPage/SignUpPage";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import UpdatePassword from "./pages/ForgotPassword/UpdatePassword";
import ChooseCountry from "./pages/ChooseCountry/ChooseCountry";
import Learn from "./pages/Learn/Learn";
const App = () => (
  <Router>
    <Routes>
      <Route path="*" element={<Learn />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/profile/:accessToken" element={<ProfilePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/404" element={<NotFound404 />} />
      <Route path="/signUp" element={<SignUpPage />} />
      <Route path="/forgotPassword" element={<ForgotPassword />} />
      <Route path="/updatePassword" element={<UpdatePassword />} />
      <Route path="/chooseCountry" element={<ChooseCountry />} />
      <Route path="/learn" element={<Learn />} />
    </Routes>
  </Router>
);

export default App;
