import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProfilePage from './pages/ProfilePage';
import 'antd/dist/reset.css'; // Import Ant Design styles

const App = () => (
  <Router>
    <Routes>
      <Route path="*" element={<ProfilePage />} />
    </Routes>
  </Router>
);

export default App;
