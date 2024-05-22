import React, { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Importa las imágenes del marcador
import markerIconPng from 'leaflet/dist/images/marker-icon.png';
import markerShadowPng from 'leaflet/dist/images/marker-shadow.png';

// Configura el icono del marcador
const markerIcon = new L.Icon({
  iconUrl: markerIconPng,
  shadowUrl: markerShadowPng,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const Mapa = ({ locations }) => {
  const mapRef = useRef(null);
  const markersRef = useRef([]);

  useEffect(() => {
    if (!locations || locations.length === 0) {
      return;
    }

    // Crea el mapa si aún no existe
    if (!mapRef.current) {
      mapRef.current = L.map("map").setView([locations[0].lat, locations[0].lng], 13);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap contributors",
      }).addTo(mapRef.current);
    }

    // Elimina marcadores existentes
    markersRef.current.forEach(marker => {
      marker.remove();
    });

    // Agrega marcadores al mapa
    markersRef.current = locations.map(location => {
      if (!location.lat || !location.lng) {
        return null;
      }

      return L.marker([location.lat, location.lng], { icon: markerIcon }) // Utiliza el icono personalizado
        .bindPopup(`${location.nombre} ${location.apellido}`)
        .addTo(mapRef.current);
    });

    // Ajusta el límite del mapa según los marcadores si hay al menos una ubicación
    if (locations.length > 0) {
      const bounds = L.latLngBounds(locations
        .filter(location => location.lat && location.lng)
        .map(location => [location.lat, location.lng])
      );
      mapRef.current.fitBounds(bounds);
    }

    // Limpia el mapa cuando el componente se desmonta
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
        markersRef.current = [];
      }
    };
  }, [locations]);

  return <div id="map" className="map" style={{ height: "500px" }}></div>;
};

export default Mapa;