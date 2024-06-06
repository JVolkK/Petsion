import React from "react";
import Avatar from "@mui/material/Avatar";

const CustomAvatar = ({ nombre, apellido, onClick }) => {
  const initials = nombre && apellido ? `${nombre.charAt(0)}${apellido.charAt(0)}` : '';

  // Genera un color aleatorio en formato hexadecimal
  const randomColor = () => {
    return "#" + Math.floor(Math.random() * 16777215).toString(16);
  };

  // Aplica el color aleatorio al avatar
  const color = randomColor();

  return (
    <Avatar
      onClick={onClick}
      sx={{
        bgcolor: color,
        width: "6rem", 
        height: "6rem", 
        fontSize: "3rem", 
        borderRadius: "50%", 
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "1rem",
      }}
    >
      {initials}
    </Avatar>
  );
};

export default CustomAvatar;