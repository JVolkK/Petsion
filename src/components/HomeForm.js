import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import "../styles/HomeForm.css";

function HomeForm() {
  return (
    <>
      <Container fluid className="backgroundImage p-5">
        <Row className="mt-3">
          <Col lg={6} xs={10} className="">
            <Card>
              <Card.Body>
                <Card.Title>¿Que servicio buscas el dia de hoy?</Card.Title>
                <Button variant="primary">Alojamiento</Button>
                <Button variant="primary">Alojamiento</Button>
                <Button variant="primary">Alojamiento</Button>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={4} xs={1}></Col>
        </Row>
      </Container>
    </>
  );
}

export default HomeForm;
