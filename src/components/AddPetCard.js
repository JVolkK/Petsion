import React, { useState } from "react";
import { IoIosAddCircleOutline } from "react-icons/io";
import { Container, Row } from "react-bootstrap";
import "../styles/addPetCard.css";
import AddPetModal from "./AddPetModal";

const AddPetCard = ({ setUsuarioLogeado }) => {
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => {
    setShow(true);
  };

  return (
    <>
      <Container
        fluid
        className="clickable-card border rounded m-3 p-0 ActionCard"
        onClick={handleShow}
      >
        <Row>
          <IoIosAddCircleOutline size={80} className="w-100 hoverIcon" />
        </Row>
        <Row>
          <h5 className=" w-100 addPetCardTitle justify-content-center align-items-center d-flex ">
            Añadir mascota
          </h5>
        </Row>
      </Container>
      <div>
        <AddPetModal show={show} handleClose={handleClose} />
      </div>
    </>
  );
};

export default AddPetCard;
