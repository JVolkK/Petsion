import React, { useEffect, useRef, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Importa las imágenes del marcador
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import markerShadowPng from "leaflet/dist/images/marker-shadow.png";

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
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    // Obtiene la ubicación actual del usuario al cargar el componente
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ lat: latitude, lng: longitude });
        },
        (error) => {
          console.error("Error al obtener la ubicación:", error);
        }
      );
    } else {
      console.error("Geolocalización no es compatible con este navegador.");
    }
  }, []);

  useEffect(() => {
    if (!locations || locations.length === 0) {
      return;
    }

    // Crea el mapa si aún no existe
    if (!mapRef.current) {
      // Centra el mapa en la ubicación del usuario si está disponible, de lo contrario, usa una ubicación predeterminada
      const center = userLocation
        ? [userLocation.lat, userLocation.lng]
        : [0, 0];
      mapRef.current = L.map("map").setView(center, 13);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap contributors",
      }).addTo(mapRef.current);
    }

    // Elimina marcadores existentes
    markersRef.current.forEach((marker) => {
      marker.remove();
    });

    // Agrega marcadores al mapa
    markersRef.current = locations.map((location) => {
      if (!location.lat || !location.lng) {
        return null;
      }

      return L.marker([location.lat, location.lng], { icon: markerIcon })
        .bindPopup(`${location.name} ${location.lastname}`)
        .addTo(mapRef.current);
    });

    // Ajusta el límite del mapa según los marcadores si hay al menos una ubicación
    if (locations.length > 0) {
      const bounds = L.latLngBounds(
        locations
          .filter((location) => location.lat && location.lng)
          .map((location) => [location.lat, location.lng])
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
  }, [locations, userLocation]);

  return <div id="map" className="map" style={{ height: "500px" }}></div>;
};

export default Mapa;
