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
      <Container fluid className="backgroundImage p-5 ">
        <Row>
          <Col lg={7}>
            <Container className="bg-light text-dark p-3">
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
                  <ToggleButton id="tbg-radio-1" value={1} variant="light">
                    Radio 1 (pre-checked)
                  </ToggleButton>
                  <ToggleButton id="tbg-radio-2" value={2} variant="light">
                    Radio 2
                  </ToggleButton>
                  <ToggleButton id="tbg-radio-3" value={3} variant="light">
                    Radio 3
                  </ToggleButton>
                </ToggleButtonGroup>
              </Row>
              <Row>
                <Col className="d-flex justify-content-center pt-3 pb-3 ">
                  <Button className="w-50" variant="secondary">
                    Boton 1
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
