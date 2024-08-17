import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import "antd/dist/reset.css";
import LoginPage from "./pages/LoginPage/LoginPage";
import NotFound404 from "./pages/NotFound/NotFound404";
import SignUpPage from "./pages/SignUpPage/SignUpPage";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import UpdatePassword from "./pages/ForgotPassword/UpdatePassword";
import ChooseCountry from "./pages/ChooseCountry/ChooseCountry";
import Learn from "./pages/Learn/LearnPage";
import Test from "./pages/TestPage/TestPage";
import Document from "./pages/Document/DocumentPage";
import DocumentDetail from "./pages/DocumentDetail/DocumentDetailPage";
import QuestionPage from "./pages/Questions/QuestionPage";

const App = () => (
  <Router>
    <Routes>
      <Route path="*" element={<LoginPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/profile/:accessToken" element={<ProfilePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/404" element={<NotFound404 />} />
      <Route path="/signUp" element={<SignUpPage />} />
      <Route path="/forgotPassword" element={<ForgotPassword />} />
      <Route path="/updatePassword" element={<UpdatePassword />} />
      <Route path="/chooseCountry" element={<ChooseCountry />} />
      <Route path="/learn" element={<Learn />} />
      <Route path="/test" element={<Test />} />
      <Route path="/document" element={<Document />} />
      <Route path="/documentDetail" element={<DocumentDetail />} />
      <Route path="/question" element={<QuestionPage />} />
    </Routes>
  </Router>
);

export default App;
