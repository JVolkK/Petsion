import React, { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const Mapa = ({ location }) => {
  useEffect(() => {
    const map = L.map("map").setView(location, 13);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap contributors",
    }).addTo(map);

    // Limpia el mapa cuando el componente se desmonte
    return () => {
      map.remove();
    };
  }, [location]);

  return <div id="map" className="map"></div>;
};

export default Mapa;