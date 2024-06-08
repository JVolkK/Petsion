import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Spinner from "react-bootstrap/Spinner";
import "../styles/LoadingOverlay.css";

const LoadingOverlay = ({ loading }) => {
  return (
    loading && (
      <div className="loading-overlay h-100 d-flex justify-content-center align-items-center w-100 vh-100">
        <Spinner animation="border" variant="primary" />
      </div>
    )
  );
};

export default LoadingOverlay;
