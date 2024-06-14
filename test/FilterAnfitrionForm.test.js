import React, { useContext } from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { expect } from "chai";
import sinon from "sinon";
import jsdomGlobal from "jsdom-global";
import { AppContext } from "../src/contexts/AppContext";
import { Form, Container, Row, Col, Button } from "react-bootstrap"; // Asegúrate de ajustar la ruta a react-bootstrap si es necesario

jsdomGlobal();

const FilterAnfitrionForm = ({ loading, setLoading }) => {
  const { homeFormValue } = useContext(AppContext);

  const initialForm = {
    admitePerro: true,
    admiteGato: false,
    admiteAlltypesMascotas: false,
    disponibilidadAlojamiento: true,
    disponibilidadPaseo: false,
    disponibilidadVisita: false,
    disponibilidadlunes: true,
    disponibilidadmartes: false,
    disponibilidadmiercoles: false,
    disponibilidadjueves: false,
    disponibilidadviernes: false,
    disponibilidadsabado: false,
    disponibilidaddomingo: false,
    disponibilidadHoraria: "Mañana",
  };

  const { handleSubmit, handleChange } = useForm(initialForm, setLoading);

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Container>
          <Row className="justify-content-center">
            <Col xl="3" md="6">
              <Form.Group controlId="formServicios">
                <Form.Label>Servicios</Form.Label>
                <Form.Control
                  as="select"
                  name="servicio"
                  defaultValue={homeFormValue}
                  onChange={handleChange}
                  disabled={loading}
                >
                  <option value="alojamiento">Alojamiento</option>
                  <option value="cuidado-dia">Cuidado de día</option>
                  <option value="paseo">Paseo</option>
                </Form.Control>
              </Form.Group>
            </Col>
            <Col xl="3" md="6">
              <Form.Group controlId="formMascotas">
                <Form.Label>Mascotas</Form.Label>
                <Form.Control
                  as="select"
                  name="tipoMascotaAdmite"
                  onChange={handleChange}
                  disabled={loading}
                >
                  <option value="admitePerro">Perro</option>
                  <option value="admiteGato">Gato</option>
                  <option value="admiteAlltypesMascotas">Otros</option>
                </Form.Control>
              </Form.Group>
            </Col>
            <Col xl="3" md="6">
              <Form.Group controlId="formDiaSemana">
                <Form.Label>¿En qué día de la semana?</Form.Label>
                <Form.Control
                  as="select"
                  name="disponibilidadSemana"
                  onChange={handleChange}
                  disabled={loading}
                >
                  <option value="lunes">Lunes</option>
                  <option value="martes">Martes</option>
                  <option value="miercoles">Miércoles</option>
                  <option value="jueves">Jueves</option>
                  <option value="viernes">Viernes</option>
                  <option value="sabado">Sábado</option>
                  <option value="domingo">Domingo</option>
                </Form.Control>
              </Form.Group>
            </Col>
            <Col xl="3" md="6">
              <Form.Group controlId="formDiaSemana">
                <Form.Label>Disponibilidad horaria</Form.Label>
                <Form.Control
                  as="select"
                  name="disponibilidadHoraria"
                  onChange={handleChange}
                  disabled={loading}
                >
                  <option value="Mañana">Mañana</option>
                  <option value="Tarde">Tarde</option>
                  <option value="Noche">Noche</option>
                  <option value="Fulltime">Fulltime</option>
                  <option value="Variable">Variable</option>
                </Form.Control>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col className="d-flex justify-content-center m-auto pt-3">
              <Button type="submit" className="buttonPetsion">
                Buscar
              </Button>
            </Col>
          </Row>
        </Container>
      </Form>
    </div>
  );
};

// Suponiendo que useForm está definido en algún lugar, necesitamos una implementación simulada para nuestras pruebas.
const useForm = (initialForm, setLoading) => {
  const handleSubmit = sinon.spy((e) => {
    e.preventDefault();
    setLoading(true);
  });

  const handleChange = sinon.spy(() => {});

  return { handleSubmit, handleChange };
};

describe("FilterAnfitrionForm Component", () => {
  let setLoadingStub, contextValue;

  beforeEach(() => {
    setLoadingStub = sinon.stub();

    contextValue = {
      homeFormValue: "alojamiento",
    };
  });

  it("should call handleChange on select change", () => {
    render(
      <AppContext.Provider value={contextValue}>
        <FilterAnfitrionForm loading={false} setLoading={setLoadingStub} />
      </AppContext.Provider>
    );

    fireEvent.change(screen.getByLabelText(/Servicios/i), { target: { value: 'paseo' } });
    expect(useForm().handleChange.calledOnce).to.be.true;

    fireEvent.change(screen.getByLabelText(/Mascotas/i), { target: { value: 'admiteGato' } });
    expect(useForm().handleChange.calledTwice).to.be.true;
  });

  it("should call handleSubmit on form submit", () => {
    render(
      <AppContext.Provider value={contextValue}>
        <FilterAnfitrionForm loading={false} setLoading={setLoadingStub} />
      </AppContext.Provider>
    );

    fireEvent.submit(screen.getByText(/Buscar/i));
    expect(useForm().handleSubmit.calledOnce).to.be.true;
  });

  it("should disable selects when loading is true", () => {
    render(
      <AppContext.Provider value={contextValue}>
        <FilterAnfitrionForm loading={true} setLoading={setLoadingStub} />
      </AppContext.Provider>
    );

    const selects = screen.getAllByRole("combobox");
    selects.forEach(select => {
      expect(select).to.be.disabled;
    });
  });

  it("should enable selects when loading is false", () => {
    render(
      <AppContext.Provider value={contextValue}>
        <FilterAnfitrionForm loading={false} setLoading={setLoadingStub} />
      </AppContext.Provider>
    );

    const selects = screen.getAllByRole("combobox");
    selects.forEach(select => {
      expect(select).to.not.be.disabled;
    });
  });
});
