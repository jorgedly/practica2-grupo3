const { registrarPaciente } = require('./paciente');

describe('registrarPaciente', () => {
    test('Datos de paciente invalidos', () => {
        expect(registrarPaciente('luis', 'correo1@gmailcom', '45235235', '03-06-1994')).toBe(false);
    });
    test('Datos de paciente validos', () => {
        expect(registrarPaciente('enrique', 'correo2@gmail.com', '89342317', '03-06-1994')).toBe(true);
    });
});