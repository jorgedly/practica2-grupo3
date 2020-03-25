const { validacionFormatoCorreo } = require('./login');

function registrarPaciente(nombre, correo, numeroTelefono, fechaNacimiento) {
    if (validacionFormatoCorreo(correo)) {
        const paciente = { nombre, correo, numeroTelefono, fechaNacimiento };
        const pacientes = JSON.parse(localStorage.getItem('pacientes')) || [];
        pacientes.push(paciente);
        localStorage.setItem('pacientes', JSON.stringify(pacientes));
        return true;
    }
    return false;
}

module.exports = { registrarPaciente };