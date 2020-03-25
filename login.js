function inicioSesion(correo, contrasena) {
    const usuarios = JSON.parse(localStorage.getItem('usuarios'));
    const resultado = usuarios.filter(usuario => usuario.correo === correo && usuario.contrasena === contrasena);
    return resultado.length === 1;
}

function validacionFormatoCorreo(correo) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(correo).toLowerCase());
}

module.exports = { inicioSesion, validacionFormatoCorreo };