const chai = require('chai');
const sinon = require('sinon');
const expect = chai.expect;
chai.should();

// Patrones de validación
const usernamePattern = /^[a-zA-Z0-9]+$/;
const namePattern = /^[a-zA-Z]+(?: [a-zA-Z]+)?$/;
const passwordPattern = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d@.#$!%*?&]{10,15}$/;
const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
const numberPattern = /^[0-9]+$/;

// Función de validaciones
const validationsForm = (form) => {
    let errors = {};

    if (!form.username || typeof form.username !== 'string' || !form.username.trim()) {
        errors.username = "El campo nombre de usuario es requerido.";
    }

    if (!form.password || typeof form.password !== 'string' || !form.password.trim()) {
        errors.password = "El campo contraseña es requerido";
    } else if (!passwordPattern.test(form.password)) {
        errors.password = "La contraseña debe contener al menos una mayuscula, numeros, minimo 10 caracteres y no contener espacios";
    }

    if (!form.email || typeof form.email !== 'string' || !form.email.trim()) {
        errors.email = "El campo de correo electronico es requerido ";
    } else if (!emailPattern.test(form.email)) {
        errors.email = "El correo electronico ingresado es invalido";
    }

    if (!form.nombre || typeof form.nombre !== 'string' || !form.nombre.trim()) {
        errors.nombre = "El campo de nombre es requerido ";
    } else if (!namePattern.test(form.nombre)) {
        errors.nombre = "El campo de nombre no acepta caracteres especiales. Maximo 2 nombres.";
    }

    if (!form.apellido || typeof form.apellido !== 'string' || !form.apellido.trim()) {
        errors.apellido = "El campo de apellido es requerido";
    } else if (!namePattern.test(form.apellido)) {
        errors.apellido = "El campo de apellido no acepta caracteres especiales.";
    }

    if (!form.dni || typeof form.dni !== 'string' || !form.dni.trim()) {
        errors.dni = "El campo de DNI es requerido";
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

    if (
        form.admiteGato === false &&
        form.admitePerro === false &&
        form.admiteAlltypesMascotas === false
    ) {
        errors.admiteGato = "Debe aceptar algun tipo de mascota a cuidar.";
        errors.admitePerro = "Debe aceptar algun tipo de mascota a cuidar.";
        errors.admiteAlltypesMascotas = "Debe aceptar algun tipo de mascota a cuidar.";
    } else if (form.admiteAlltypesMascotas === true) {
        form.admiteGato = true;
        form.admitePerro = true;
    }

    if (!form.cantidadDeAnimales) {
        errors.cantidadDeAnimales = "Este campo es requerido.";
    } else if (!numberPattern.test(form.cantidadDeAnimales)) {
        errors.cantidadDeAnimales = "Solo puede ingresar numeros.";
    } else if (form.cantidadDeAnimales > 10 || form.cantidadDeAnimales < 1) {
        errors.cantidadDeAnimales = "Ingrese un numero igual o menor a 10.";
    }

    return errors;
};


// Pruebas unitarias
describe('Validaciones del formulario de registro de anfitrion', () => {
    it('debería devolver un error cuando el nombre de usuario está vacío', () => {
        // Arrange
        const form = { username: '', password: 'Password123', email: 'test@test.com' };

        // Act
        const errors = validationsForm(form);

        // Assert
        expect(errors).to.have.property('username').to.equal('El campo nombre de usuario es requerido.');
    });

    it('debería devolver un error cuando la contraseña no cumple con los requisitos', () => {
        // Arrange
        const form = { username: 'usuario', password: 'pass', email: 'test@test.com' };

        // Act
        const errors = validationsForm(form);

        // Assert
        expect(errors).to.have.property('password').to.equal('La contraseña debe contener al menos una mayuscula, numeros, minimo 10 caracteres y no contener espacios');
    });

    it('debería devolver un error cuando el correo electrónico es inválido', () => {
        // Arrange
        const form = { username: 'usuario', password: 'Password123', email: 'test@test' };

        // Act
        const errors = validationsForm(form);

        // Assert
        expect(errors).to.have.property('email').to.equal('El correo electronico ingresado es invalido');
    });
    

    it('debería devolver un error cuando el nombre está vacío', () => {
        // Arrange
        const form = { nombre: '', apellido: 'Apellido', dni: '12345678' };
        const validationsFormSpy = sinon.spy(validationsForm);
        
        // Act
        const errors = validationsFormSpy(form);
        
        // Assert    
        expect(errors).to.have.property('nombre').to.equal('El campo de nombre es requerido ');
        expect(validationsFormSpy.calledOnce).to.be.true;
        expect(validationsFormSpy.calledWith(form)).to.be.true;
    });

    it('debería devolver un error cuando el apellido contiene caracteres especiales', () => {
        // Arrange
        const form = { nombre: 'Nombre', apellido: 'Apellid@!', dni: '12345678' };

        // Act
        const errors = validationsForm(form);

        // Assert
        expect(errors).to.have.property('apellido').to.equal('El campo de apellido no acepta caracteres especiales.');
    });

    it('debería devolver un error cuando el DNI es inválido (demasiado alto)', () => {
        // Arrange
        const form = { nombre: 'Nombre', apellido: 'Apellido', dni: '80000000' };

        // Act
        const errors = validationsForm(form);

        // Assert
        expect(errors).to.have.property('dni').to.equal('Ingrese un DNI valido.');
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

    it('debería devolver un error cuando no se acepta ningún tipo de mascota', () => {
        // Arrange
        const form = {
            admiteGato: false,
            admitePerro: false,
            admiteAlltypesMascotas: false
        };
        const validationsFormSpy = sinon.spy(validationsForm);

        // Act
        const errors = validationsFormSpy(form);
        
        // Assert
        expect(errors).to.have.property('admiteGato').to.equal('Debe aceptar algun tipo de mascota a cuidar.');
        expect(errors).to.have.property('admitePerro').to.equal('Debe aceptar algun tipo de mascota a cuidar.');
        expect(errors).to.have.property('admiteAlltypesMascotas').to.equal('Debe aceptar algun tipo de mascota a cuidar.');
        expect(validationsFormSpy.calledOnce).to.be.true;
        expect(validationsFormSpy.calledWith(form)).to.be.true;
    });

    it('debería devolver un error cuando el campo cantidadDeAnimales no contiene solo números', () => {
        // Arrange
        const form = { cantidadDeAnimales: 'abc' };

        // Act
        const errors = validationsForm(form);

        // Assert
        errors.should.have.property('cantidadDeAnimales').and.equal('Solo puede ingresar numeros.');
    });
});


