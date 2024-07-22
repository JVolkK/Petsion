import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card, Col } from "react-bootstrap";
import "../styles/profileCard.css";
import { GiGrass } from "react-icons/gi";
import { FaHouse } from "react-icons/fa6";
import { FaBuilding } from "react-icons/fa";
import { GiCancel } from "react-icons/gi";
import CustomAvatar from "./CustomAvatar";
import Rating from "@mui/material/Rating";

const ProfileCard = ({
  nombre,
  apellido,
  onClick,
  tipoDeVivienda,
  conPatio,
  rating,
  numberOfRatings,
}) => {
  return (
    <Card
      onClick={onClick}
      className="d-flex flex-row w-100 profile-card"
      onMouseOver={(e) => e.currentTarget.classList.add("profile-card-hover")}
      onMouseOut={(e) => e.currentTarget.classList.remove("profile-card-hover")}
    >
      <Col xs={3} className="d-flex align-items-center justify-content-center">
        <CustomAvatar
          width="6rem"
          height="6rem"
          fontSize="2rem"
          nombre={nombre}
          apellido={apellido}
          onClick={onClick}
        />
      </Col>
      <Col xs={9}>
        <Card.Body>
          <Card.Title>{`${nombre} ${apellido}`}</Card.Title>
          {rating !== undefined && numberOfRatings !== undefined && (
            <div className="d-flex">
              <Rating name="read-only" value={rating} readOnly />
              {"  "}({numberOfRatings})
            </div>
          )}
          {conPatio ? (
            <div className="d-flex align-items-center">
              <GiGrass color="green" className="align-items-center" size={30} />
              <Card.Text>Tiene patio</Card.Text>
            </div>
          ) : (
            <div className="d-flex align-items-center">
              <GiCancel color="#D83939" size={30} />
              <Card.Text>Sin patio</Card.Text>
            </div>
          )}
          {tipoDeVivienda === "casa" ? (
            <div className="d-flex align-items-center">
              <FaHouse size={30} />
              <Card.Text>Vive en una casa</Card.Text>
            </div>
          ) : (
            <div className="d-flex align-items-center">
              <FaBuilding size={30} />
              <Card.Text>Vive en un departamento</Card.Text>
            </div>
          )}
        </Card.Body>
      </Col>
    </Card>
  );
};

export default ProfileCard;
