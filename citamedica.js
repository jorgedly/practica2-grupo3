function crearCitaMedica(dpi, nombrePaciente, apellidoPaciente, 
    edad, telefono, fechaCita, horaCita){
    if(validarDPI(dpi) && validarDisponibilidadHorario(fechaCita, horaCita)){
        const cita = {dpi, nombrePaciente, apellidoPaciente, edad, telefono, fechaCita, horaCita};
        const citas = JSON.parse(localStorage.getItem('citas'));
        citas.push(cita);
        localStorage.setItem('citas', JSON.stringify(citas));
        return true;
    }
    return false;  
}

function validarDisponibilidadHorario(fecha, hora){
    if( validarFormatoHora(hora) && validarFormatoFecha(fecha))
    {
        const citas = JSON.parse(localStorage.getItem('citas'));      
        for (let i = 0; i < citas.length; i++) {
            const cita = citas[i];
            if (cita.fechaCita.localeCompare(fecha) == 0 && cita.horaCita.localeCompare(hora) == 0){
                return false;
            }
        }
        return true;    
    } 
}

function validarDPI(dpi)
{
    if(dpi.length==13 && !isNaN(dpi)){
        return true;
    }
    return false;
}

function validarFormatoHora(horaCita){

    if(horaCita.includes(':')){
        var horaMin = horaCita.split(':')
        var hora = horaMin[0];
        var min = horaMin[1]   
        if( !isNaN(hora) && !isNaN(min) && (hora != 13) && 
                (hora >= 8 && hora < 17)  && ((min == 0) || (min == 30))){
            return true;             
        }      
    }
    return false;
}

function validarFormatoFecha(fechaCita)
{
      var RegExPattern = /^\d{1,2}\/\d{1,2}\/\d{2,4}$/;
      if (fechaCita!='' && fechaCita.match(RegExPattern) && fechaMayorActual(fechaCita)) {     
            return true;
      }
      return false;
}

function fechaMayorActual(fechaCita){

    var date = new Date();
    var fecha = fechaCita.split("/");
    date.setFullYear(fecha[2],fecha[1]-1,fecha[0]);
    var fechaActual = new Date();

    if (date >= fechaActual){
       return true;
    }
    return false;
}

const functions ={
    crearCitaMedica,
    validarDisponibilidadHorario,
    validarFormatoFecha,
    fechaMayorActual,
    validarFormatoHora,
    validarDPI
};
module.exports = functions;


