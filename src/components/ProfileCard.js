import React from "react";

const ProfileCard = ({ nombre, apellido, ubicacion, foto, valoracion }) => {
  // Función para generar las estrellas de la valoración
  const renderEstrellas = () => {
    const estrellas = [];
    for (let i = 0; i < 5; i++) {
      if (i < valoracion) {
        estrellas.push(<span key={i} style={{ color: 'gold' }}>★</span>);
      } else {
        estrellas.push(<span key={i}>★</span>);
      }
    }
    return estrellas;
  };

  return (
    <div style={styles.card}>
      <img src={foto} alt={`${nombre} ${apellido}`} style={styles.image} />
      <div style={styles.content}>
        <h3>{`${nombre} ${apellido}`}</h3>
        <p><strong>Ubicación:</strong> {ubicacion}</p>
        <p><strong>Valoración:</strong> {renderEstrellas()}</p>
      </div>
    </div>
  );
};

const styles = {
  card: {
    display: "flex",
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    padding: '20px',
    marginBottom: '20px',
    backgroundColor: '#fff',
    width: '100%',
  },
  image: {
    width: '150px',
    height: '150px',
    borderRadius: '50%',
    marginRight: '20px',
  },
  content: {
    textAlign: 'left',
  }
};

export default ProfileCard;
