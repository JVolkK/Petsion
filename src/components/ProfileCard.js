import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import profileIcon from "../images/145857007_307ce493-b254-4b2d-8ba4-d12c080d6651.jpg";
import { Card } from "react-bootstrap";
import "../styles/profileCard.css";
import { GiGrass } from "react-icons/gi";
import { FaHouse } from "react-icons/fa6";
import { FaBuilding } from "react-icons/fa";
import { GiCancel } from "react-icons/gi";

const ProfileCard = ({
  nombre,
  apellido,
  onClick,
  tipoDeVivienda,
  conPatio,
}) => {
  return (
    <Card onClick={onClick} className="d-flex flex-row w-100">
      <img src={profileIcon} className="image w-25 h-25" alt="asd" />
      <Card.Body>
        <Card.Title>{`${nombre} ${apellido}`}</Card.Title>
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
    </Card>
  );
};

export default ProfileCard;
