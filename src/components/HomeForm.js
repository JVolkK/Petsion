import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../styles/HomeForm.css";
import ToggleButton from "react-bootstrap/ToggleButton";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";

function HomeForm() {
  return (
    <>
      <Container fluid className="backgroundImage p-5">
        <Row>
          <Col lg={7} xl={5}>
            <Container className="bg-light text-dark p-3 border rounded">
              <Row className="p-3 formTitle ">
                Que servicio buscas el dia de hoy?
              </Row>
              <Row className="p-3">
                <ToggleButtonGroup
                  className="border p-0"
                  type="radio"
                  name="options"
                  defaultValue={1}
                >
                  <ToggleButton
                    id="tbg-radio-1"
                    value={1}
                    variant="light"
                    size="lg"
                  >
                    Alojamiento
                  </ToggleButton>
                  <ToggleButton
                    id="tbg-radio-2"
                    value={2}
                    variant="light"
                    size="lg"
                  >
                    Guarderia de dia
                  </ToggleButton>
                  <ToggleButton
                    id="tbg-radio-3"
                    value={3}
                    variant="light"
                    size="lg"
                  >
                    Paseo
                  </ToggleButton>
                </ToggleButtonGroup>
              </Row>
              <Row className="justify-content-center">
                <Col
                  className="d-flex justify-content-center pt-3 pb-3  "
                  xl={7}
                  lg={7}
                  xs={8}
                >
                  <Button className="w-100" variant="secondary">
                    Buscar
                  </Button>
                </Col>
              </Row>
            </Container>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default HomeForm;
