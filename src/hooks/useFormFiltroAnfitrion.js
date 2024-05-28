import { useContext, useState } from "react";
import { AppContext } from "../contexts/AppContext";
import axios from "axios";

export const useForm = (initialForm) => {
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const { setUsuariosFiltrados } = useContext(AppContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      // Aquí realizas la solicitud a tu API utilizando Axios
      const response = await axios.post(
        "https://api-petsion.onrender.com/anfitrion/filtrado",
        {
          admitePerro: form.admitePerro,
          admiteGato: form.admiteGato,
          admiteAlltypesMascotas: form.admiteAlltypesMascotas,
          disponibilidadAlojamiento: form.disponibilidadAlojamiento,
          disponibilidadPaseo: form.disponibilidadPaseo,
          disponibilidadVisita: form.disponibilidadVisita,
          disponibilidadlunes: form.disponibilidadlunes,
          disponibilidadmartes: form.disponibilidadmartes,
          disponibilidadmiercoles: form.disponibilidadmiercoles,
          disponibilidadjueves: form.disponibilidadjueves,
          disponibilidadviernes: form.disponibilidadviernes,
          disponibilidadsabado: form.disponibilidadsabado,
          disponibilidaddomingo: form.disponibilidaddomingo,
          disponibilidadHoraria: form.disponibilidadHoraria,
        }
      );
      // Manejar la respuesta de la API según sea necesario
      setUsuariosFiltrados(response.data);
    } catch (error) {
      // Manejar errores de la solicitud
    } finally {
      setLoading(false);
    }
  };

  const handleChange = async (e) => {
    e.preventDefault();
    const { name, value } = e.target;

    if (name === "servicio" && value === "alojamiento") {
      // Si el usuario selecciona "Alojamiento" en el campo de servicios, establecer disponibilidadAlojamiento en true
      setForm({
        ...form,
        disponibilidadAlojamiento: true,
        disponibilidadPaseo: false,
        disponibilidadVisita: false,
      });
    } else if (name === "servicio" && value === "cuidado-dia") {
      setForm({
        ...form,
        disponibilidadAlojamiento: false,
        disponibilidadPaseo: false,
        disponibilidadVisita: true,
      });
    } else if (name === "servicio" && value === "paseo") {
      setForm({
        ...form,
        disponibilidadAlojamiento: false,
        disponibilidadPaseo: true,
        disponibilidadVisita: false,
      });
    } else if (name === "tipoMascotaAdmite" && value === "admitePerro") {
      setForm({
        ...form,
        admitePerro: true,
        admiteGato: false,
        admiteAlltypesMascotas: false,
      });
    } else if (name === "tipoMascotaAdmite" && value === "admiteGato") {
      setForm({
        ...form,
        admitePerro: false,
        admiteGato: true,
        admiteAlltypesMascotas: false,
      });
    } else if (
      name === "tipoMascotaAdmite" &&
      value === "admiteAlltypesMascotas"
    ) {
      setForm({
        ...form,
        admitePerro: false,
        admiteGato: false,
        admiteAlltypesMascotas: true,
      });
    } else if (name === "disponibilidadSemana" && value === "lunes") {
      setForm({
        ...form,
        disponibilidadlunes: true,
        disponibilidadmartes: false,
        disponibilidadmiercoles: false,
        disponibilidadjueves: false,
        disponibilidadviernes: false,
        disponibilidadsabado: false,
        disponibilidaddomingo: false,
      });
    } else if (name === "disponibilidadSemana" && value === "martes") {
      setForm({
        ...form,
        disponibilidadlunes: false,
        disponibilidadmartes: true,
        disponibilidadmiercoles: false,
        disponibilidadjueves: false,
        disponibilidadviernes: false,
        disponibilidadsabado: false,
        disponibilidaddomingo: false,
      });
    } else if (name === "disponibilidadSemana" && value === "miercoles") {
      setForm({
        ...form,
        disponibilidadlunes: false,
        disponibilidadmartes: false,
        disponibilidadmiercoles: true,
        disponibilidadjueves: false,
        disponibilidadviernes: false,
        disponibilidadsabado: false,
        disponibilidaddomingo: false,
      });
    } else if (name === "disponibilidadSemana" && value === "jueves") {
      setForm({
        ...form,
        disponibilidadlunes: false,
        disponibilidadmartes: false,
        disponibilidadmiercoles: false,
        disponibilidadjueves: true,
        disponibilidadviernes: false,
        disponibilidadsabado: false,
        disponibilidaddomingo: false,
      });
    } else if (name === "disponibilidadSemana" && value === "viernes") {
      setForm({
        ...form,
        disponibilidadlunes: false,
        disponibilidadmartes: false,
        disponibilidadmiercoles: false,
        disponibilidadjueves: false,
        disponibilidadviernes: true,
        disponibilidadsabado: false,
        disponibilidaddomingo: false,
      });
    } else if (name === "disponibilidadSemana" && value === "sabado") {
      setForm({
        ...form,
        disponibilidadlunes: false,
        disponibilidadmartes: false,
        disponibilidadmiercoles: false,
        disponibilidadjueves: false,
        disponibilidadviernes: false,
        disponibilidadsabado: true,
        disponibilidaddomingo: false,
      });
    } else if (name === "disponibilidadSemana" && value === "domingo") {
      setForm({
        ...form,
        disponibilidadlunes: false,
        disponibilidadmartes: false,
        disponibilidadmiercoles: false,
        disponibilidadjueves: false,
        disponibilidadviernes: false,
        disponibilidadsabado: false,
        disponibilidaddomingo: true,
      });
    }

    if (name === "disponibilidadHoraria")
      setForm({
        ...form,
        disponibilidadHoraria: value,
      });
  };

  return {
    handleSubmit,
    handleChange,
    loading,
  };
};
