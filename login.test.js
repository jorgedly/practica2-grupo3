const { inicioSesion, validacionFormatoCorreo } = require('./login');

describe('validarInicioSesion', () => {
    // Pre carga de datos
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

    // Pruebas
    test('Inicio de sesion valido', () => {
        expect(inicioSesion('correo1@gmail.com', 'contrasena1')).toBe(true);
    });

    test('Inicio de sesion invalido', () => {
        expect(inicioSesion('correo2@gmail.com', 'contrasena2')).toBe(false);
    });
});

describe('validacionFormatoCorreo', () => {
    test('Correo valido para inicio sesion', () => {
        expect(validacionFormatoCorreo('correo1@gmail.com')).toBe(true);
    });
    test('Correo invalido para inicio sesion', () => {
        expect(validacionFormatoCorreo('correo2@gmail')).toBe(false);
    });
});