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
import Result from "./pages/Result/ResultPage";
import ChooseClass from "./pages/ChooseClass/ChooseClass";
import Leaderboard from "./pages/Leaderboard/Leaderboard";
import './App.css'
import { DarkModeProvider } from "./DarkModeContext";
import Help from "./pages/Help/Help";
import Introduce from "./pages/Introduce/Introduce";
import Effectiveness from "./pages/Effectiveness/Effectiveness";
import Job from "./pages/Job/Job";
import Investors from "./pages/Investors/Investors";
import Rules from "./pages/Rules/Rules";
import Privacy from "./pages/Privacy/Privacy";
import Setting from "./pages/Setting/Setting";

const App = () => (
  <DarkModeProvider>
    <Router>
      <Routes>
        <Route path="*" element={<LoginPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/help" element={<Help />} />
        <Route path="/introduce" element={<Introduce />} />
        <Route path="/effectiveness" element={<Effectiveness />} />
        <Route path="/job" element={<Job />} />
        <Route path="/settings" element={<Setting />} />
        <Route path="/investors" element={<Investors />} />
        <Route path="/rules" element={<Rules />} />
        <Route path="/privacy" element={<Privacy />} />
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
  </DarkModeProvider>
);

export default App;
