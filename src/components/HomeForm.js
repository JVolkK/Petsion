import React, { useContext } from "react";
import { AppContext } from "../contexts/AppContext";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import ToggleButton from "react-bootstrap/ToggleButton";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import "../styles/HomeForm.css";
import { Link } from "react-router-dom";

function HomeForm() {
  const { setHomeFormValue } = useContext(AppContext);
  return (
    <>
      <div className="backgroundImage">
        <div className="serviceContainer">
          <Container fluid className="serviceContent">
            <h2 className="question">¿Qué servicio buscas hoy?</h2>
            <div className="buttonContainer">
              <ToggleButtonGroup
                type="radio"
                id="ToggleButtonGroup"
                name="options"
                defaultValue={1}
              >
                <ToggleButton
                  className="border"
                  variant="light"
                  id="tbg-radio-1"
                  value={1}
                  onClick={() => {
                    setHomeFormValue("alojamiento");
                  }}
                  size="lg"
                >
                  <span id="servicioSelectTXT">Alojamiento</span>
                </ToggleButton>
                <ToggleButton
                  className="border"
                  variant="light"
                  id="tbg-radio-2"
                  value={2}
                  onClick={() => {
                    setHomeFormValue("cuidado-dia");
                  }}
                  size="lg"
                >
                  <span id="servicioSelectTXT">Cuidado de día</span>
                </ToggleButton>
                <ToggleButton
                  className="border"
                  variant="light"
                  id="tbg-radio-3"
                  value={3}
                  onClick={() => {
                    setHomeFormValue("paseo");
                  }}
                  size="lg"
                >
                  <span id="servicioSelectTXT">Paseo</span>
                </ToggleButton>
              </ToggleButtonGroup>
            </div>
            <div className="d-flex justify-content-center pt-2 pb-1">
              <Button
                as={Link}
                to="/buscar-cuidador"
                className="btn-search"
                variant="secondary"
              >
                Buscar
              </Button>
            </div>
          </Container>
        </div>
      </div>
    </>
  );
}

export default HomeForm;
