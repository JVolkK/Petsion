const chai = require('chai');
const expect = chai.expect;

var usernamePattern = /^[a-zA-Z0-9]+$/;

var namePattern = /^[a-zA-Z]+(?: [a-zA-Z]+)?$/;
var passwordPattern = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d@.#$!%*?&]{10,15}$/; // Test para password, requiere al menos una letra minuscula, una mayuscula, un caracter especial, un numero y un largo minimo de 8 a 15 caracteres
var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
var numberPattern = /^[0-9]+$/;

const validationsForm = (form) => {
    // Aqui van todas las validaciones de cada input del formulario
    let errors = {};
  
    //Validaciones username
    if (!form.username.trim()) {
      errors.username = "El campo nombre de usuario es requerido.";
    } else if (!usernamePattern.test(form.username)) {
      errors.username =
        "El campo de nombre de usuario no acepta caracteres especiales.";
    }
  
    //Validaciones password
    if (!form.password.trim()) {
      errors.password = "El campo contraseña es requerido";
    } else if (!passwordPattern.test(form.password)) {
      errors.password =
        "La contraseña debe contener al menos una mayuscula, numeros, minimo 10 caracteres y no contener espacios";
    }
  
    //Validaciones
    if (!form.email.trim()) {
      errors.email = "El campo de correo electronico es requerido ";
    } else if (!emailPattern.test(form.email)) {
      errors.email = "El correo electronico ingresado es invalido";
    }

    return errors;
};

describe('Validaciones de formulario', () => {
    it('debería devolver un error cuando el nombre de usuario está vacío', () => {
        const form = { username: '', password: 'Password123', email: 'test@test.com' };
        const errors = validationsForm(form);
        expect(errors).to.have.property('username').to.equal('El campo nombre de usuario es requerido.');
    });

    it('debería devolver un error cuando la contraseña no cumple con los requisitos', () => {
        const form = { username: 'usuario', password: 'pass', email: 'test@test.com' };
        const errors = validationsForm(form);
        expect(errors).to.have.property('password').to.equal('La contraseña debe contener al menos una mayuscula, numeros, minimo 10 caracteres y no contener espacios');
    });

    it('debería devolver un error cuando el correo electrónico es inválido', () => {
        const form = { username: 'usuario', password: 'Password123', email: 'test@test' };
        const errors = validationsForm(form);
        expect(errors).to.have.property('email').to.equal('El correo electronico ingresado es invalido');
    });
});
