const { registrar, validarContrasena, validarCorreo } = require('./registro');

describe('validarContrasena', () => {
    test('contrasena corta debe ser incorrecta', () => {
        expect(validarContrasena('123')).toBe(false);
    });
    test('contrasena con caracteres invalidos debe ser incorrecta', () => {
        expect(validarContrasena('12!3')).toBe(false);
    });
    test('contrasena correcta', () => {
        expect(validarContrasena('aBc123cd')).toBe(true);
    });
});

describe('validarCorreo', () => {
    test('correo no cumple con formato', () => {
        expect(validarCorreo('correo1')).toBe(false);
    });
    test('correo ya existe', () => {
        const usuario = {
            correo: 'correo1@gmail.com',
            nombre: 'nombre1',
            contrasena: 'contrasena1',
            fechaNacimiento: '03-06-1994',
            tipoUsuario: 'doctor'
        };
        const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
        usuarios.push(usuario);
        localStorage.setItem('usuarios', JSON.stringify(usuarios));
        expect(validarCorreo('correo1@gmail.com')).toBe(false);
    });
    test('correo correcto', () => {
        expect(validarContrasena('correo2@gmail.com')).toBe(true);
    });
});

describe('registrar', () => {
    test('datos de usuario invalidos', () => {
        expect(registrar('jorge', 'correo1@gmail.com', '123', '03-06-1994')).toBe(false);
    });
    test('datos correctos', () => {
        expect(registrar('jorge', 'correo2@gmail.com', '123abc45', '03-06-1994')).toBe(true);
    });
});