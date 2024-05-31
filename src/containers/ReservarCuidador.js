import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { Container, Row, Col } from "react-bootstrap";
import { useParams, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";

const ReservarCuidador = () => {
  const navigate = useNavigate();
  const { cuidadorId } = useParams();
  const [datosCuidador, setDatosCuidador] = useState({});
  const [loading, setLoading] = useState(false);
  console.log(cuidadorId);

  useEffect(() => {
    // const storedUsuarioLogeado = JSON.parse(
    //   localStorage.getItem("usuarioLogeado")
    // );
    // if (storedUsuarioLogeado) {
    //   setUsuarioLogeado(storedUsuarioLogeado);
    // } else {
    //   return;
    // }

    if (cuidadorId) {
      setLoading(false);
      axios
        .get(`https://api-petsion.onrender.com/user/${cuidadorId}`)
        .then((response) => {
          // Guardar los datos en el estado
          setDatosCuidador(response.data);
        })
        .catch(() => {
          navigate("/");
        });
    } else {
      setLoading(true);
      navigate("/");
    }
  }, [cuidadorId, navigate]);

  return (
    <>
      <NavBar />
      <Container className="">
        <h1>Reservar a {datosCuidador.name}</h1>
      </Container>
      <Footer />
    </>
  );
};

export default ReservarCuidador;
