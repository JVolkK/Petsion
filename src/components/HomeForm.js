import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import ToggleButton from "react-bootstrap/ToggleButton";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import "../styles/HomeForm.css";

function HomeForm() {
  const [homeFormValue, setHomeFormValue] = useState(1);

  const handleToggleButtonClick = (value) => {
    setHomeFormValue(value);
  };

  return (
    <>
      <div className="backgroundImage">
        <div className="serviceContainer">
          <Container fluid className="serviceContent">
            <h2 className="question">¿Qué servicio buscas hoy?</h2>
            <div className="buttonContainer">
              <ToggleButtonGroup type="radio" id="ToggleButtonGroup" name="options" defaultValue={1}>
                <ToggleButton
                  className="border"
                  variant="light"
                  id="tbg-radio-1"
                  value={1}
                  onClick={() => handleToggleButtonClick(1)}
                  size="lg"
                >
                  <span id="servicioSelectTXT">Alojamiento</span>
                </ToggleButton>
                <ToggleButton
                  className="border"
                  variant="light"
                  id="tbg-radio-2"
                  value={2}
                  onClick={() => handleToggleButtonClick(2)}
                  size="lg"
                >
                  <span id="servicioSelectTXT">Cuidado de día</span>
                </ToggleButton>
                <ToggleButton
                  className="border"
                  variant="light"
                  id="tbg-radio-3"
                  value={3}
                  onClick={() => handleToggleButtonClick(3)}
                  size="lg"
                >
                  <span id="servicioSelectTXT">Paseo</span>
                </ToggleButton>
              </ToggleButtonGroup>
            </div>
            <div className="d-flex justify-content-center pt-2 pb-1">
              <Button className="btn-search" variant="secondary">
                <span>Buscar</span>
              </Button>
            </div>
          </Container>
        </div>
      </div>
    </>
  );
}

export default HomeForm;
