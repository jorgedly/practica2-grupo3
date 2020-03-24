function registrar(nombre, correo, contrasena, fechaNacimiento, tipoUsuario) {
    if (validarContrasena(contrasena) && validarCorreo(correo)) {
        const usuario = { nombre, correo, contrasena, fechaNacimiento, tipoUsuario };
        const usuarios = JSON.parse(localStorage.getItem('usuarios'));
        usuarios.push(usuario);
        localStorage.setItem('usuarios', JSON.stringify(usuarios));
        return true;
    }
    return false;
}

function validarContrasena(contrasena) {
    const patron = /[A-Za-z0-9]+/;
    if (contrasena.length >= 8 && patron.test(contrasena)) {
        return true;
    } else {
        return false;
    }
}

function validarCorreo(correo) {
    const usuarios = JSON.parse(localStorage.getItem('usuarios'));
    if (!correo.includes('@')) {
        return false;
    }
    for (let i = 0; i < usuarios.length; i++) {
        const usuario = usuarios[i];
        if (usuario.correo.localeCompare(correo) === 0) {
            return false;
        }
    }
    return true;
}

module.exports = { registrar, validarContrasena, validarCorreo };