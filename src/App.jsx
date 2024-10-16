import React from "react";
import './App.css'
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
import Result from "./pages/Result/ResultPage";
import ChooseClass from "./pages/ChooseClass/ChooseClass";
import Leaderboard from "./pages/Leaderboard/Leaderboard";

const App = () => (
  <Router>
    <Routes>
      <Route path="*" element={<LoginPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/leaderboard" element={<Leaderboard />} />
      <Route path="/profile/:accessToken" element={<ProfilePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/404" element={<NotFound404 />} />
      <Route path="/signUp" element={<SignUpPage />} />
      <Route path="/forgotPassword" element={<ForgotPassword />} />
      <Route path="/updatePassword" element={<UpdatePassword />} />
      <Route path="/chooseCountry" element={<ChooseCountry />} />
      <Route path="/chooseClass" element={<ChooseClass />} />
      <Route path="/learn" element={<Learn />} />
      <Route path="/learn/test/:selectedTopicId" element={<Test />} />
      <Route path="/learn/document/:selectedTopicId" element={<Document />} />
      <Route path="/documentDetail/:id" element={<DocumentDetail />} />
      <Route path="/test/:testId" element={<QuestionPage />} />
      <Route path="/test/result" element={<Result />} />
    </Routes>
  </Router>
);

export default App;
