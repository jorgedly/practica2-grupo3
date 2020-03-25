function Asignar_Examen(Dpi, Dia,Hora, Examen, Precio){
    const examen = {
        dpi:Dpi,
        dia:Dia,
        hora:Hora,
        examen:Examen,
        precio:Precio
    };
    const examenes = JSON.parse(localStorage.getItem('examen'));
    examenes.push(examen);
    localStorage.setItem('examenes', JSON.stringify(examenes));
    return true;
}

function Gestion_Resultado(dpi, Dia, Hora, Examen, Resultado){
    const examenes = JSON.parse(localStorage.getItem('examen'));
    examenes.forEach(element => {
        if(element.dpi===dpi 
            && element.dia===Dia 
            && element.hora===Hora 
            && element.examen===Examen){
            element.Resultado=Resultado;
        }
    });
    localStorage.setItem('examenes', JSON.stringify(examenes));
    return true;
}

function Cobro_Consulta(dpi,Dia_Inicio,Dia_Fin){
    const examenes = JSON.parse(localStorage.getItem('examen'));
    const monto = 0;
    examenes.forEach(element => {
        if(element.dpi===dpi 
            && element.dia<Dia_Fin
            && element.dia>Dia_Inicio
            && element.examen===Examen){
            monto = monto + element.precio;
        }
    });
    return precio;
}