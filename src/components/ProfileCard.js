import React from "react";
import profileIcon from "../images/145857007_307ce493-b254-4b2d-8ba4-d12c080d6651.jpg";

const ProfileCard = ({ nombre, apellido, ubicacion }) => {
  return (
    <div style={styles.card}>
      {
        <img
          src={profileIcon}
          alt={`${nombre} ${apellido}`}
          style={styles.image}
        />
      }
      <div style={styles.content}>
        <h3>{`${nombre} ${apellido}`}</h3>
        <p>
          <strong>Ubicación:</strong> {ubicacion}
        </p>
      </div>
    </div>
  );
};

const styles = {
  card: {
    display: "flex",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    padding: "20px",
    marginBottom: "20px",
    backgroundColor: "#fff",
    width: "100%",
  },
  image: {
    width: "150px",
    height: "150px",
    borderRadius: "50%",
    marginRight: "20px",
  },
  content: {
    textAlign: "left",
  },
};

export default ProfileCard;
