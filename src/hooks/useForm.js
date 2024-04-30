import { useState } from "react";

export const useForm = (initialForm, validateForm) => {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  // const [loading, setLoading] = useState(false);
  // const [response, setResponse] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleBlur = (e) => {
    handleChange(e);
    setErrors(validateForm(form));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(validateForm(form));
    if (Object.keys(errors).length === 0) {
      // Validamos que el objeto errors donde guardamos los errores de las validaciones este vacio lo que significa que todos los campos han sido llenados correctamente.
      alert("Enviando formulario");
      // AQUI IRA EL CODIGO DE AXIOS O FETCH PARA GUARDAR USUARIO EN LA API
      // LOS VALORES QUE ENVIA EL USUARIO ESTAN EN EL STATE form
    } else {
      return;
    }
  };

  return {
    form,
    errors,
    //loading,
    //response,
    handleChange,
    handleBlur,
    handleSubmit,
  };
};
