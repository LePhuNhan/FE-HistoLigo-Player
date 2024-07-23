import React from "react";
import "./NF.style.css";

const NotFoundPage = () => {
  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <h1 className="not-found-title">404</h1>
        <p className="not-found-message">
          Oops! The page you’re looking for doesn’t exist.
        </p>
        <a href="/" className="not-found-link">
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFoundPage;
