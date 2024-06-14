import React, { useContext, useEffect } from "react";
import { render, screen } from "@testing-library/react";
import { expect } from "chai";
import sinon from "sinon";
import jsdomGlobal from "jsdom-global";
import { Link, NavLink } from "react-router-dom";
import { AppContext } from "../src/contexts/AppContext";
import { Navbar, Nav, Container } from "react-bootstrap"; 

jsdomGlobal();

const NavBar = () => {
  const { usuarioLogeado, setAuthenticated, setUsuarioLogeado } =
    useContext(AppContext);

  useEffect(() => {
    document.body.style.paddingTop = "70px";
    return () => {
      document.body.style.paddingTop = null;
    };
  }, []);

  useEffect(() => {
    const authLocal = JSON.parse(localStorage.getItem("isAuthenticated"));
    setAuthenticated(authLocal);

    const usuarioLocal = JSON.parse(localStorage.getItem("usuarioLogeado"));
    setUsuarioLogeado(usuarioLocal);
  }, [setAuthenticated, setUsuarioLogeado]);

  return (
    <Navbar bg="body-tertiary" expand="lg" className="p-0 fixed-top">
      <Container fluid>
        <Navbar.Brand as={Link} to="/">
          <img src="/path/to/logo.png" alt="logo" width="180" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarSupportedContent" />
        <Navbar.Collapse id="navbarSupportedContent">
          <Nav className="ms-auto mb-2 mb-lg-0">
            {usuarioLogeado.rol === "user" || usuarioLogeado.rol === "guest" ? (
              <Nav.Item>
                <Nav.Link as={Link} to="/buscar-cuidador">
                  Buscar cuidador
                </Nav.Link>
              </Nav.Item>
            ) : null}
            <Nav.Item>
              <Nav.Link as={Link} to="/servicios-select">
                Servicios
              </Nav.Link>
            </Nav.Item>
            {usuarioLogeado.rol === "user" ? (
              <>
                <Nav.Item>
                  <Nav.Link as={Link} to="/reservas-duenio">
                    Mis reservas
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link as={Link} to="/perfil-duenio">
                    Mi Perfil
                  </Nav.Link>
                </Nav.Item>
              </>
            ) : usuarioLogeado.rol === "anfitrion" ? (
              <>
                <Nav.Item>
                  <Nav.Link as={Link} to="/reservas-anfitrion">
                    Mis reservas
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link as={Link} to="/mi-perfil">
                    Mi Perfil
                  </Nav.Link>
                </Nav.Item>
              </>
            ) : usuarioLogeado.rol === "guest" ? (
              <>
                <Nav.Item>
                  <Nav.Link as={Link} to="/login">
                    Iniciar Sesión
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link as={Link} to="/registration-select">
                    Registrarse
                  </Nav.Link>
                </Nav.Item>
              </>
            ) : null}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

describe("NavBar Component", () => {
  let setAuthenticatedStub, setUsuarioLogeadoStub, contextValue;

  beforeEach(() => {
    setAuthenticatedStub = sinon.stub();
    setUsuarioLogeadoStub = sinon.stub();

    contextValue = {
      usuarioLogeado: { rol: "guest" },
      setAuthenticated: setAuthenticatedStub,
      setUsuarioLogeado: setUsuarioLogeadoStub,
    };

    localStorage.setItem("isAuthenticated", JSON.stringify(true));
    localStorage.setItem("usuarioLogeado", JSON.stringify({ rol: "user" }));
  });

  afterEach(() => {
    sinon.restore();
    localStorage.clear();
  });

  it("should adjust body padding-top on mount and clean up on unmount", () => {
    const { unmount } = render(
      <AppContext.Provider value={contextValue}>
        <NavBar />
      </AppContext.Provider>
    );

    expect(document.body.style.paddingTop).to.equal("70px");
    unmount();
    expect(document.body.style.paddingTop).to.be.null;
  });

  it("should set authenticated and usuarioLogeado from localStorage on mount", () => {
    render(
      <AppContext.Provider value={contextValue}>
        <NavBar />
      </AppContext.Provider>
    );

    expect(setAuthenticatedStub.calledOnceWith(true)).to.be.true;
    expect(setUsuarioLogeadoStub.calledOnceWith({ rol: "user" })).to.be.true;
  });

  it("should display the correct links for a guest user", () => {
    contextValue.usuarioLogeado.rol = "guest";

    render(
      <AppContext.Provider value={contextValue}>
        <NavBar />
      </AppContext.Provider>
    );

    expect(screen.getByText("Iniciar Sesión")).to.be.visible;
    expect(screen.getByText("Registrarse")).to.be.visible;
  });

  it("should display the correct links for a user", () => {
    contextValue.usuarioLogeado.rol = "user";

    render(
      <AppContext.Provider value={contextValue}>
        <NavBar />
      </AppContext.Provider>
    );

    expect(screen.getByText("Mis reservas")).to.be.visible;
    expect(screen.getByText("Mi Perfil")).to.be.visible;
  });

  it("should display the correct links for an anfitrion user", () => {
    contextValue.usuarioLogeado.rol = "anfitrion";

    render(
      <AppContext.Provider value={contextValue}>
        <NavBar />
      </AppContext.Provider>
    );

    expect(screen.getByText("Mis reservas")).to.be.visible;
    expect(screen.getByText("Mi Perfil")).to.be.visible;
  });
});
