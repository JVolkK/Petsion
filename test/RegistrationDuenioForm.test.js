const chai = require('chai');
const expect = chai.expect;

// Suponiendo que las expresiones regulares se definen aquí
const usernamePattern = /^[a-zA-Z0-9_]+$/;
const passwordPattern = /^(?=.*[A-Z])(?=.*[a-zA-Z0-9]).{10,}$/;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const namePattern = /^[a-zA-Z]+$/;
const numberPattern = /^[0-9]+$/;

const validationsForm = (form) => {
  let errors = {};

  if (!form.username.trim()) {
    errors.username = "El campo nombre de usuario es requerido.";
  } else if (!usernamePattern.test(form.username)) {
    errors.username = "El campo de nombre de usuario no acepta caracteres especiales.";
  }

  if (!form.password.trim()) {
    errors.password = "El campo contraseña es requerido";
  } else if (!passwordPattern.test(form.password)) {
    errors.password = " La contraseña debe contener al menos una mayuscula, minimo 10 caracteres y no contener espacios";
  }

  if (!form.email.trim()) {
    errors.email = "El campo de correo electronico es requerido ";
  } else if (!emailPattern.test(form.email)) {
    errors.email = "El correo electronico ingresado es invalido";
  }

  if (!form.nombre.trim()) {
    errors.nombre = "El campo de nombre es requerido ";
  } else if (!namePattern.test(form.nombre)) {
    errors.nombre = "El campo de nombre no acepta caracteres especiales.";
  }

  if (!form.apellido.trim()) {
    errors.apellido = "El campo de apellido es requerido";
  } else if (!namePattern.test(form.apellido)) {
    errors.apellido = "El campo de apellido no acepta caracteres especiales.";
  }

  if (!form.dni) {
    errors.dni = "El campo de dni es requerido";
  } else if (form.dni > 70000000 || form.dni < 1000000) {
    errors.dni = "Ingrese un DNI valido.";
  }

  if (!form.fechaDeNacimiento) {
    errors.fechaDeNacimiento = "El campo de fecha de nacimiento es requerido";
  }

  if (!form.numeroDeTelefono) {
    errors.numeroDeTelefono = "El campo de numero de telefono es requerido";
  } else if (form.numeroDeTelefono > 9999999999 || form.numeroDeTelefono < 999999999) {
    errors.numeroDeTelefono = "El campo de numero de telefono es invalido";
  }

  if (!form.codigoPostal) {
    errors.codigoPostal = "El campo de codigo postal es requerido";
  } else if (!numberPattern.test(form.codigoPostal)) {
    errors.codigoPostal = "Este campo solo acepta numeros.";
  } else if (form.codigoPostal > 9999 || form.codigoPostal < 1) {
    errors.codigoPostal = "El campo de codigo postal es invalido";
  }

  return errors;
};

describe('validationsForm', () => {
  it('should return error if username is empty', () => {
    const form = { username: '', password: 'Password123', email: 'test@test.com', nombre: 'Nombre', apellido: 'Apellido', dni: 12345678, fechaDeNacimiento: '1990-01-01', numeroDeTelefono: 1234567890, codigoPostal: 1234 };
    const errors = validationsForm(form);
    expect(errors).to.have.property('username').to.equal('El campo nombre de usuario es requerido.');
  });

  it('should return error if username contains special characters', () => {
    const form = { username: 'user!name', password: 'Password123', email: 'test@test.com', nombre: 'Nombre', apellido: 'Apellido', dni: 12345678, fechaDeNacimiento: '1990-01-01', numeroDeTelefono: 1234567890, codigoPostal: 1234 };
    const errors = validationsForm(form);
    expect(errors).to.have.property('username').to.equal('El campo de nombre de usuario no acepta caracteres especiales.');
  });

  it('should return error if password is empty', () => {
    const form = { username: 'username', password: '', email: 'test@test.com', nombre: 'Nombre', apellido: 'Apellido', dni: 12345678, fechaDeNacimiento: '1990-01-01', numeroDeTelefono: 1234567890, codigoPostal: 1234 };
    const errors = validationsForm(form);
    expect(errors).to.have.property('password').to.equal('El campo contraseña es requerido');
  });

  it('should return error if password does not meet criteria', () => {
    const form = { username: 'username', password: 'password', email: 'test@test.com', nombre: 'Nombre', apellido: 'Apellido', dni: 12345678, fechaDeNacimiento: '1990-01-01', numeroDeTelefono: 1234567890, codigoPostal: 1234 };
    const errors = validationsForm(form);
    expect(errors).to.have.property('password').to.equal(' La contraseña debe contener al menos una mayuscula, minimo 10 caracteres y no contener espacios');
  });

  it('should return error if email is empty', () => {
    const form = { username: 'username', password: 'Password123', email: '', nombre: 'Nombre', apellido: 'Apellido', dni: 12345678, fechaDeNacimiento: '1990-01-01', numeroDeTelefono: 1234567890, codigoPostal: 1234 };
    const errors = validationsForm(form);
    expect(errors).to.have.property('email').to.equal('El campo de correo electronico es requerido ');
  });

  it('should return error if email is invalid', () => {
    const form = { username: 'username', password: 'Password123', email: 'invalidemail', nombre: 'Nombre', apellido: 'Apellido', dni: 12345678, fechaDeNacimiento: '1990-01-01', numeroDeTelefono: 1234567890, codigoPostal: 1234 };
    const errors = validationsForm(form);
    expect(errors).to.have.property('email').to.equal('El correo electronico ingresado es invalido');
  });

  it('should return error if nombre is empty', () => {
    const form = { username: 'username', password: 'Password123', email: 'test@test.com', nombre: '', apellido: 'Apellido', dni: 12345678, fechaDeNacimiento: '1990-01-01', numeroDeTelefono: 1234567890, codigoPostal: 1234 };
    const errors = validationsForm(form);
    expect(errors).to.have.property('nombre').to.equal('El campo de nombre es requerido ');
  });

  it('should return error if nombre contains special characters', () => {
    const form = { username: 'username', password: 'Password123', email: 'test@test.com', nombre: 'Nombre@', apellido: 'Apellido', dni: 12345678, fechaDeNacimiento: '1990-01-01', numeroDeTelefono: 1234567890, codigoPostal: 1234 };
    const errors = validationsForm(form);
    expect(errors).to.have.property('nombre').to.equal('El campo de nombre no acepta caracteres especiales.');
  });

  it('should return error if apellido is empty', () => {
    const form = { username: 'username', password: 'Password123', email: 'test@test.com', nombre: 'Nombre', apellido: '', dni: 12345678, fechaDeNacimiento: '1990-01-01', numeroDeTelefono: 1234567890, codigoPostal: 1234 };
    const errors = validationsForm(form);
    expect(errors).to.have.property('apellido').to.equal('El campo de apellido es requerido');
  });

  it('should return error if apellido contains special characters', () => {
    const form = { username: 'username', password: 'Password123', email: 'test@test.com', nombre: 'Nombre', apellido: 'Apellido@', dni: 12345678, fechaDeNacimiento: '1990-01-01', numeroDeTelefono: 1234567890, codigoPostal: 1234 };
    const errors = validationsForm(form);
    expect(errors).to.have.property('apellido').to.equal('El campo de apellido no acepta caracteres especiales.');
  });

  it('should return error if dni is empty', () => {
    const form = { username: 'username', password: 'Password123', email: 'test@test.com', nombre: 'Nombre', apellido: 'Apellido', dni: '', fechaDeNacimiento: '1990-01-01', numeroDeTelefono: 1234567890, codigoPostal: 1234 };
    const errors = validationsForm(form);
    expect(errors).to.have.property('dni').to.equal('El campo de dni es requerido');
  });

  it('should return error if dni is invalid', () => {
    const form = { username: 'username', password: 'Password123', email: 'test@test.com', nombre: 'Nombre', apellido: 'Apellido', dni: 999999999, fechaDeNacimiento: '1990-01-01', numeroDeTelefono: 1234567890, codigoPostal: 1234 };
    const errors = validationsForm(form);
    expect(errors).to.have.property('dni').to.equal('Ingrese un DNI valido.');
  });

  it('should return error if fecha de nacimiento is empty', () => {
    const form = { username: 'username', password: 'Password123', email: 'test@test.com', nombre: 'Nombre', apellido: 'Apellido', dni: 12345678, fechaDeNacimiento: '', numeroDeTelefono: 1234567890, codigoPostal: 1234 };
    const errors = validationsForm(form);
    expect(errors).to.have.property('fechaDeNacimiento').to.equal('El campo de fecha de nacimiento es requerido');
  });

  it('should return error if numero de telefono is empty', () => {
    const form = { username: 'username', password: 'Password123', email: 'test@test.com', nombre: 'Nombre', apellido: 'Apellido', dni: 12345678, fechaDeNacimiento: '1990-01-01', numeroDeTelefono: '', codigoPostal: 1234 };
    const errors = validationsForm(form);
    expect(errors).to.have.property('numeroDeTelefono').to.equal('El campo de numero de telefono es requerido');
  });

  it('should return error if numero de telefono is invalid', () => {
    const form = { username: 'username', password: 'Password123', email: 'test@test.com', nombre: 'Nombre', apellido: 'Apellido', dni: 12345678, fechaDeNacimiento: '1990-01-01', numeroDeTelefono: 12345678, codigoPostal: 1234 };
    const errors = validationsForm(form);
    expect(errors).to.have.property('numeroDeTelefono').to.equal('El campo de numero de telefono es invalido');
  });

  it('should return error if codigo postal is empty', () => {
    const form = { username: 'username', password: 'Password123', email: 'test@test.com', nombre: 'Nombre', apellido: 'Apellido', dni: 12345678, fechaDeNacimiento: '1990-01-01', numeroDeTelefono: 1234567890, codigoPostal: '' };
    const errors = validationsForm(form);
    expect(errors).to.have.property('codigoPostal').to.equal('El campo de codigo postal es requerido');
  });

  it('should return error if codigo postal is invalid', () => {
    const form = { username: 'username', password: 'Password123', email: 'test@test.com', nombre: 'Nombre', apellido: 'Apellido', dni: 12345678, fechaDeNacimiento: '1990-01-01', numeroDeTelefono: 1234567890, codigoPostal: 12345 };
    const errors = validationsForm(form);
    expect(errors).to.have.property('codigoPostal').to.equal('El campo de codigo postal es invalido');
  });
});
