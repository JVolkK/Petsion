import HomeForm from "../components/HomeForm";
import Imagen from "../components/Imagen";
import Footer from "../components/Footer";
import React from "react";
import ComoFunciona from "../components/ComoFunciona";

const Home = () => {
  return (
    <>
      <HomeForm />
      <ComoFunciona />
      <Imagen />
      <Footer />
    </>
  );
};

export default Home;
