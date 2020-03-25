const functions = require('./citamedica');

describe('crearCitaMedica', () => {
    test('Paciente con un DPI con caracteres no numericos', () => {
        expect(functions.crearCitaMedica(
        '250151asd050301', 'Juan', 'Perez', '25', '23456789','12/12/2020', '12:00')).toBe(false);
    });
    test('Paciente con cita en fecha menor a la actual', () => {
        expect(functions.crearCitaMedica(
        '2501517050301', 'Juan', 'Perez', '25', '23456789','01/01/2010', '12:00')).toBe(false);
    });
    test('Paciente con cita en horario fuera de atencion', () => {
        expect(functions.crearCitaMedica(
        '2501517050301', 'Juan', 'Perez', '25', '23456789','01/01/2021', '13:00')).toBe(false);
    });
    test('Paciente con datos de la cita ingresados correctamente', () => {
        localStorage.setItem('citas', JSON.stringify([]));
        expect(functions.crearCitaMedica(
        '2501517050301', 'Juan', 'Perez', '25', '23456789','01/01/2021', '08:30')).toBe(true);
    });
});

describe('validarDisponibilidadDeHorario', () => {
    test('Fecha y hora de cita igual a otra ya registrada es incorrecta', () => {
        const cita = {
            dpi: "2501517050301",
            nombrePaciente: 'Pedro', 
            apellidoPaciente: "Gutierrez", 
            edad: '20', 
            telefono: '23456781', 
            fechaCita: '12/12/2020', 
            horaCita: '12:00'
        };
        const citas = JSON.parse(localStorage.getItem('citas')) || [];
        citas.push(cita);
        localStorage.setItem('citas', JSON.stringify(citas));
        expect(functions.validarDisponibilidadHorario('12/12/2020', '12:00')).toBe(false);
    });
    test('Cita en fecha y hora disponibles, correcta ', () => {
        expect(functions.validarDisponibilidadHorario('10/12/2020', '10:00')).toBe(true);
    });
});

describe('validarDPI', () => {
    test('Dpi diferente a 13 digitos debe ser incorrecto', () => {
        expect(functions.validarDPI('1234567')).toBe(false);
    });
    test('Caracteres no numericos en dpi son incorrectos', () => {
        expect(functions.validarDPI('abcd1234!')).toBe(false);
    });
    test('Dpi con 13 caracteres numericos es correcto', () => {
        expect(functions.validarDPI('2901517010209')).toBe(true);
    });
});

describe('validarFormatoHora', () => {
    test('Hora de cita diferente a formato HH:MM es incorrecta', () => {
        expect(functions.validarFormatoHora('xx-30')).toBe(false);
    });
    test('Cita fuera de horario de trabajo(8 a 13 y 14 a 17) es incorrecta', () => {
        expect(functions.validarFormatoHora('13:30')).toBe(false);
    });
    test('Cita en horario correcto', () => {
        expect(functions.validarFormatoHora('10:30')).toBe(true);
    });
});

describe('ValidarFormatoFecha', () => {
    test('Fecha de cita vacia es incorrecta', () => {
        expect(functions.validarFormatoFecha('')).toBe(false);
    });
    test('Fecha de cita diferente a formato DD/MM/AAAA es incorrecta', () => {
        expect(functions.validarFormatoFecha('01#08#2020')).toBe(false);
    });
    test('Fecha de cita ingresada correctamente', () => {
        expect(functions.validarFormatoFecha('02/09/2020')).toBe(true);
    });
});

describe('FechaMayorActual', () => {
    test('Cita en fecha menor a la fecha actual es incorrecta', () => {
        expect(functions.fechaMayorActual('01/01/2020')).toBe(false);
    });
    test('Cita en fecha correcta, debe ser mayor a la actual', () => {
        expect(functions.fechaMayorActual('01/08/2020')).toBe(true);
    });
});