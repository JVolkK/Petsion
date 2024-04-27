import HomeForm from "../components/HomeForm";
import NavBar from "../components/NavBar";
import Imagen from "../components/Imagen";
import Footer from "../components/Footer";
import React from "react";

const Home = () => {
  return (
    <>
      <NavBar />
      <HomeForm />
      <Imagen />
      <Footer />
    </>
  );
};

export default Home;