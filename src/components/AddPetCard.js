import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { IoIosAddCircleOutline } from "react-icons/io";
import { Container, Row } from "react-bootstrap";
import "../styles/addPetCard.css";
import AddPetModal from "./AddPetModal";

const AddPetCard = ({ handleRerender }) => {
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
        className="clickable-card border rounded m-3 p-0 ActionCard bg-secondary d-flex justify-content-center align-items-center"
        onClick={handleShow}
      >
        <Row>
          <IoIosAddCircleOutline size={80} className="hoverIcon" />
        </Row>
      </Container>
      <div>
        <AddPetModal
          show={show}
          handleClose={handleClose}
          handleRerender={handleRerender}
        />
      </div>
    </>
  );
};

export default AddPetCard;