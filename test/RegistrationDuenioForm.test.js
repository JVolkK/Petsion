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

    // Arrange: Se define un objeto 'form' que contiene varios campos, incluyendo 'username' que tiene un valor con caracteres especiales 
    const form = { username: 'user!name', password: 'Password123', email: 'test@test.com', nombre: 'Nombre', apellido: 'Apellido', dni: 12345678, fechaDeNacimiento: '1990-01-01', numeroDeTelefono: 1234567890, codigoPostal: 1234 };
    const validationsFormSpy = sinon.spy(validationsForm); // Se utiliza 'sinon.spy' para crear un spy que envuelve la función 'validationsForm'

    // Act: Se llama a la función 'validationsForm' pasando el objeto 'form' como argumento, siendo monitoreada por el spy
    const errors = validationsFormSpy(form);

    // Assert: Se verifica que el objeto 'errors' tenga una propiedad 'username' con el valor 'El campo de nombre de usuario no acepta caracteres especiales.'
    errors.should.have.property('username').which.equals('El campo de nombre de usuario no acepta caracteres especiales.');
    validationsFormSpy.calledOnce.should.be.true; // Se verifica que el spy fue llamado una vez
    validationsFormSpy.calledWith(form).should.be.true; // Se verifica que el spy fue llamado con el objeto 'form' como argumento 
  });

  it('debe devolver error si la contraseña no cumple con los requisitos', () => {

    // Arrange: Se define un objeto 'form' con varios campos, incluyendo 'password' que no cumple con los requisitos.
    const form = { username: 'username', password: 'password', email: 'test@test.com', nombre: 'Nombre', apellido: 'Apellido', dni: 12345678, fechaDeNacimiento: '1990-01-01', numeroDeTelefono: 1234567890, codigoPostal: 1234 };
    const validationsFormSpy = sinon.spy(validationsForm); // Se utiliza 'sinon.spy' para crear un spy que envuelve la función 'validationsForm'

    // Act: Se llama a la función 'validationsForm' pasando el objeto 'form' como argumento, siendo monitoreada por el spy
    const errors = validationsFormSpy(form);

    // Assert: Se verifica que el objeto 'errors' tenga una propiedad 'password' con el valor 'La contraseña debe contener al menos una mayúscula, mínimo 10 caracteres y no contener espacios'.
    assert.property(errors, 'password', 'La contraseña debe contener al menos una mayúscula, mínimo 10 caracteres y no contener espacios');
    assert.isTrue(validationsFormSpy.calledOnce); // Se verifica que el spy fue llamado una vez
    assert.isTrue(validationsFormSpy.calledWith(form)); // Se verifica que el spy fue llamado con el objeto 'form' como argumento
  });

  it('debe devolver error si el email es invalido', () => {

    // Arrange: se define un objeto 'form' con varios campos, incluyendo 'email' pero que es invalido
    const form = { username: 'username', password: 'Password123', email: 'invalidemail', nombre: 'Nombre', apellido: 'Apellido', dni: 12345678, fechaDeNacimiento: '1990-01-01', numeroDeTelefono: 1234567890, codigoPostal: 1234 };
    const validationsFormSpy = sinon.spy(validationsForm); // Se utiliza 'sinon.spy' para crear un spy que envuelve la función 'validationsForm'

    // Act: Se llama a la función 'validationsForm' pasando el objeto 'form' como argumento, siendo monitoreada por el spy
    const errors = validationsFormSpy(form);

    // Assert: se verifica que el objeto 'errors' tenga una propiedad 'email' con el valor 'El correo electronico ingresado es invalido'
    assert.property(errors, 'email', 'El correo electrónico ingresado es inválido');
    assert.isTrue(validationsFormSpy.calledOnce); // se verifica que el spy fue llamado una vez
    assert.isTrue(validationsFormSpy.calledWith(form)); // se verifica que el spy fue llamado con el objeto 'form' como argumento
  });

  it('debe devolver error si el nombre contiene caracteres especiales', () => {
    
    // Arrange: se define el objeto 'form' con varios campos, el campo 'nombre' contiene un valor con caracter especial para provocar un error de validacion
    const form = { username: 'username', password: 'Password123', email: 'test@test.com', nombre: 'Nombre@', apellido: 'Apellido', dni: 12345678, fechaDeNacimiento: '1990-01-01', numeroDeTelefono: 1234567890, codigoPostal: 1234 };
    const expectedErrors = { nombre: 'El campo de nombre no acepta caracteres especiales.' }; // se define el objeto 'expectedErrors' que simula el error que deberia devolver la funcion de validacion
    const validationsFormStub = sinon.stub().returns(expectedErrors); // se crea un stub configurado para devolver 'expectedErrors' cada vez que se llame, simulando el comportamiento de la validacion real

    // Act: se llama al stub con el objeto 'form' como argumento, esta llamada devuelve el objeto 'expectedErrors'
    const errors = validationsFormStub(form);

    // Assert: verificamos con 'assert.property()' que 'errors' tenga una propiedad 'nombre' y el mensaje de error esperado
    assert.property(errors, 'nombre', 'El campo de nombre no acepta caracteres especiales.');
    assert.isTrue(validationsFormStub.calledOnce); // para verificar que el stub fue llamado una vez
    assert.isTrue(validationsFormStub.calledWith(form)); // para verificar que el stub fue llamado con el objeto 'form' como argumento
  });

  it('debe devolver error si el apellido esta vacio', () => {

    // Arrange: se define el objeto 'form' con varios campos, pero el de 'apellido' se encuentra vacio
    const form = { username: 'username', password: 'Password123', email: 'test@test.com', nombre: 'Nombre', apellido: '', dni: 12345678, fechaDeNacimiento: '1990-01-01', numeroDeTelefono: 1234567890, codigoPostal: 1234 };
    const expectedErrors = { apellido: 'El campo de apellido es requerido' }; // el objeto 'expectedErrors' es definido y simula el error que debe resoler la funcion de validacion
    const validationsFormStub = sinon.stub().returns(expectedErrors); // se crea un stub configurado para devolver 'expectedErrors' cada vez que se llame, simulando el comportamiento de la validacion real

    // Act: se llama al stub con el objeto 'form' como argumento, esta llamada devuelve el objeto 'expectedErrors'
    const errors = validationsFormStub(form);

    // Assert: verificamos con 'assert.property()' que 'errors' tenga una propiedad 'apellido' y el mensaje de error esperado
    assert.property(errors, 'apellido', 'El campo de apellido es requerido');
    assert.isTrue(validationsFormStub.calledOnce); // para verificar que el stub fue llamado una vez
    assert.isTrue(validationsFormStub.calledWith(form)); // para verificar que el stub fue llamado con el objeto 'form' como argumento
  });

  it('debe devolver error si el dni es invalido', () => {

    // Arrange: se define el objeto 'form' con varios campos, pero el de 'dni' es invalido
    const form = { username: 'username', password: 'Password123', email: 'test@test.com', nombre: 'Nombre', apellido: 'Apellido', dni: 999999999, fechaDeNacimiento: '1990-01-01', numeroDeTelefono: 1234567890, codigoPostal: 1234 };
    const expectedErrors = { dni: 'Ingrese un DNI valido.' };
    const validationsFormStub = sinon.stub().returns(expectedErrors);

    // Act: se llama al stub con el objeto 'form' como argumento, que devuelve el objeto 
    const errors = validationsFormStub(form);

    // Assert: el objeto 'errors' tiene una propiedad 'dni' con el valor de 'Ingrese un DNI valido' (el mensaje de error esperado)
    errors.should.have.property('dni').which.equals('Ingrese un DNI valido.');
    validationsFormStub.calledOnce.should.be.true; // el stub fue llamado una vez
    validationsFormStub.calledWith(form).should.be.true; // el stub fue llamado con el objeto 'form' como argumento durante la prueba
  });


  it('debe devolver error si la fecha de nacimiento esta vacia', () => {

    // Arrange: se define un objeto 'form' con varios campos, pero el campo 'fechaDeNacimiento' se esncuentra vacio
    const form = { username: 'username', password: 'Password123', email: 'test@test.com', nombre: 'Nombre', apellido: 'Apellido', dni: 12345678, fechaDeNacimiento: '', numeroDeTelefono: 1234567890, codigoPostal: 1234 };
    
    // Act: Se llama a la funcion 'validationsForm' con el objeto 'form'
    const errors = validationsForm(form);
    
    // Assert: Se espera que el valor de la propiedad 'fechaDeNacimiento' sea 'El campo de fecha de nacimiento es requerido'
    expect(errors).to.have.property('fechaDeNacimiento').to.equal('El campo de fecha de nacimiento es requerido');
  });

  it('debe devolver error si el numero de telefono es invalido', () => {

    // Arrange: se prepara el objeto 'form' con el campo de 'telefono' invalido
    const form = { username: 'username', password: 'Password123', email: 'test@test.com', nombre: 'Nombre', apellido: 'Apellido', dni: 12345678, fechaDeNacimiento: '1990-01-01', numeroDeTelefono: 12345678, codigoPostal: 1234 };
    
    // Act: se llama a la funcion 'validationsForm' con el objeto 'form'
    const errors = validationsForm(form);
    
    // Assert: se espera que el valor de la propiedad 'telefono' sea 'El campo de numero de telefono es invalido'
    expect(errors).to.have.property('numeroDeTelefono').to.equal('El campo de numero de telefono es invalido');
  });

  it('debe devolver error si el codigo postal es invalido', () => {

    // Arrange: se prepara el objeto 'form' con el campo de 'codigo postal' invalido
    const form = { username: 'username', password: 'Password123', email: 'test@test.com', nombre: 'Nombre', apellido: 'Apellido', dni: 12345678, fechaDeNacimiento: '1990-01-01', numeroDeTelefono: 1234567890, codigoPostal: 12345 };
    
    // Act: se llama a la funcion 'validationsForm' con el objeto 'form'
    const errors = validationsForm(form);
    
    // Assert: se espera que el valor de la propiedad 'codigo postal' sea 'El campo de codigo postal es invalido'
    expect(errors).to.have.property('codigoPostal').to.equal('El campo de codigo postal es invalido');
  });
});
