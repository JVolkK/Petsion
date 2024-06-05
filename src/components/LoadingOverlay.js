import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Spinner from "react-bootstrap/Spinner";
import "../styles/LoadingOverlay.css";

const LoadingOverlay = ({ loading }) => {
  return (
    loading && (
      <div className="loading-overlay">
        <Spinner animation="border" variant="primary" />
      </div>
    )
  );
};

export default LoadingOverlay;
