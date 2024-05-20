import HomeForm from "../components/HomeForm";
import Imagen from "../components/Imagen";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import React from "react";
import ComoFunciona from "../components/ComoFunciona";

const Home = () => {
  return (
    <>
      <NavBar/>
      <HomeForm />
      <ComoFunciona />
      <Imagen />
      <Footer />
    </>
  );
};

export default Home;
