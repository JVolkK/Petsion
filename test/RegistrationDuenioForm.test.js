const chai = require('chai');
const sinon = require('sinon');
const expect = chai.expect;
const assert = chai.assert;
chai.should();


// Patrones de Validacion
const usernamePattern = /^[a-zA-Z0-9_]+$/;
const passwordPattern = /^(?=.*[A-Z])(?=.*[a-zA-Z0-9]).{10,}$/;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const namePattern = /^[a-zA-Z]+$/;
const numberPattern = /^[0-9]+$/;

// Funcion de Validaciones
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


// Pruebas Unitarias
describe('Validaciones del formulario de registro de dueño', () => {
  
  it('debe devolver error si el nombre de usuario contiene caracteres especiales', () => {
    // Arrange
    const form = { username: 'user!name', password: 'Password123', email: 'test@test.com', nombre: 'Nombre', apellido: 'Apellido', dni: 12345678, fechaDeNacimiento: '1990-01-01', numeroDeTelefono: 1234567890, codigoPostal: 1234 };
    const validationsFormSpy = sinon.spy(validationsForm);

    // Act
    const errors = validationsFormSpy(form);

    // Assert
    errors.should.have.property('username').which.equals('El campo de nombre de usuario no acepta caracteres especiales.');
    validationsFormSpy.calledOnce.should.be.true;
    validationsFormSpy.calledWith(form).should.be.true;
  });

  it('debe devolver error si la contraseña no cumple con los requisitos', () => {
    // Arrange
    const form = { username: 'username', password: 'password', email: 'test@test.com', nombre: 'Nombre', apellido: 'Apellido', dni: 12345678, fechaDeNacimiento: '1990-01-01', numeroDeTelefono: 1234567890, codigoPostal: 1234 };
    const validationsFormSpy = sinon.spy(validationsForm);

    // Act
    const errors = validationsFormSpy(form);

    // Assert
    assert.property(errors, 'password', 'La contraseña debe contener al menos una mayúscula, mínimo 10 caracteres y no contener espacios');
    assert.isTrue(validationsFormSpy.calledOnce);
    assert.isTrue(validationsFormSpy.calledWith(form));
  });

  it('debe devolver error si el email es invalido', () => {
    // Arrange
    const form = { username: 'username', password: 'Password123', email: 'invalidemail', nombre: 'Nombre', apellido: 'Apellido', dni: 12345678, fechaDeNacimiento: '1990-01-01', numeroDeTelefono: 1234567890, codigoPostal: 1234 };
    const validationsFormSpy = sinon.spy(validationsForm);

    // Act
    const errors = validationsFormSpy(form);

    // Assert
    assert.property(errors, 'email', 'El correo electrónico ingresado es inválido');
    assert.isTrue(validationsFormSpy.calledOnce);
    assert.isTrue(validationsFormSpy.calledWith(form));
  });

  it('debe devolver error si el nombre contiene caracteres especiales', () => {
    // Arrange
    const form = { username: 'username', password: 'Password123', email: 'test@test.com', nombre: 'Nombre@', apellido: 'Apellido', dni: 12345678, fechaDeNacimiento: '1990-01-01', numeroDeTelefono: 1234567890, codigoPostal: 1234 };
    const expectedErrors = { nombre: 'El campo de nombre no acepta caracteres especiales.' };
    const validationsFormStub = sinon.stub().returns(expectedErrors);

    // Act
    const errors = validationsFormStub(form);

    // Assert
    assert.property(errors, 'nombre', 'El campo de nombre no acepta caracteres especiales.');
    assert.isTrue(validationsFormStub.calledOnce);
    assert.isTrue(validationsFormStub.calledWith(form));
  });

  it('debe devolver error si el apellido esta vacio', () => {
    // Arrange
    const form = { username: 'username', password: 'Password123', email: 'test@test.com', nombre: 'Nombre', apellido: '', dni: 12345678, fechaDeNacimiento: '1990-01-01', numeroDeTelefono: 1234567890, codigoPostal: 1234 };
    const expectedErrors = { apellido: 'El campo de apellido es requerido' };
    const validationsFormStub = sinon.stub().returns(expectedErrors);

    // Act
    const errors = validationsFormStub(form);

    // Assert
    assert.property(errors, 'apellido', 'El campo de apellido es requerido');
    assert.isTrue(validationsFormStub.calledOnce);
    assert.isTrue(validationsFormStub.calledWith(form));
  });

  it('debe devolver error si el dni es invalido', () => {
    // Arrange
    const form = { username: 'username', password: 'Password123', email: 'test@test.com', nombre: 'Nombre', apellido: 'Apellido', dni: 999999999, fechaDeNacimiento: '1990-01-01', numeroDeTelefono: 1234567890, codigoPostal: 1234 };
    const expectedErrors = { dni: 'Ingrese un DNI valido.' };
    const validationsFormStub = sinon.stub().returns(expectedErrors);

    // Act
    const errors = validationsFormStub(form);

    // Assert
    errors.should.have.property('dni').which.equals('Ingrese un DNI valido.');
    validationsFormStub.calledOnce.should.be.true;
    validationsFormStub.calledWith(form).should.be.true;
  });


  it('debe devolver error si la fecha de nacimiento esta vacia', () => {
    // Arrange
    const form = { username: 'username', password: 'Password123', email: 'test@test.com', nombre: 'Nombre', apellido: 'Apellido', dni: 12345678, fechaDeNacimiento: '', numeroDeTelefono: 1234567890, codigoPostal: 1234 };
    
    // Act
    const errors = validationsForm(form);
    
    // Assert
    expect(errors).to.have.property('fechaDeNacimiento').to.equal('El campo de fecha de nacimiento es requerido');
  });

  it('debe devolver error si el numero de telefono es invalido', () => {
    // Arrange
    const form = { username: 'username', password: 'Password123', email: 'test@test.com', nombre: 'Nombre', apellido: 'Apellido', dni: 12345678, fechaDeNacimiento: '1990-01-01', numeroDeTelefono: 12345678, codigoPostal: 1234 };
    
    // Act
    const errors = validationsForm(form);
    
    // Assert
    expect(errors).to.have.property('numeroDeTelefono').to.equal('El campo de numero de telefono es invalido');
  });

  it('debe devolver error si el codigo postal es invalido', () => {
    // Arrange
    const form = { username: 'username', password: 'Password123', email: 'test@test.com', nombre: 'Nombre', apellido: 'Apellido', dni: 12345678, fechaDeNacimiento: '1990-01-01', numeroDeTelefono: 1234567890, codigoPostal: 12345 };
    
    // Act
    const errors = validationsForm(form);
    
    // Assert
    expect(errors).to.have.property('codigoPostal').to.equal('El campo de codigo postal es invalido');
  });
});
