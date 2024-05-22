import axios from 'axios';

const geocodeAddress = async (address) => {
  try {
    const response = await axios.get('https://nominatim.openstreetmap.org/search', {
      params: {
        q: address,
        format: 'json',
        addressdetails: 1,
        limit: 1,
      },
    });
    if (response.data && response.data.length > 0) {
      const { lat, lon } = response.data[0];
      return { lat: parseFloat(lat), lng: parseFloat(lon) };
    }
    throw new Error('No se encontraron coordenadas para la dirección proporcionada');
  } catch (error) {
    console.error('Error al geocodificar la dirección:', error);
    return null;
  }
};

export default geocodeAddress;