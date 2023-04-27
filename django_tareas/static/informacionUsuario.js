function capturarInformacionTarea(idTarea)
{
    fetch(`/conseguirInfoTarea?idTarea=${idTarea}`)
    .then(response => response.json())
    .then(data => {
        let fechaInicioDetalle = document.getElementById('fechaInicioDetalle')
        let fechaFinDetalle = document.getElementById('fechaFinDetalle')
        let estadoTareaDetalle = document.getElementById('estadoTareaDetalle')
        let descripcionTareaDetalle = document.getElementById('descripcionTareaDetalle')
        let indTarea = document.getElementById('indTarea')
        let comentariosTareaTotales = document.getElementById('comentariosTareaTotales')

        fechaInicioDetalle.value = data.fechaInicio
        fechaFinDetalle.value = data.fechaFin
        estadoTareaDetalle.value = data.estadoTarea
        descripcionTareaDetalle.value = data.descripcionTarea
        indTarea.innerHTML = data.idTarea
        comentariosTareaTotales.innerHTML = ''
        for(let i = 0; i < data.comentariosTotales.length; i++)
        {
            comentariosTareaTotales.innerHTML += `
                <div class="row mb-3">
                    <div class="col-3">
                        ${data.comentariosTotales[i][0]}
                    </div>
                    <div class="col-9">
                        ${data.comentariosTotales[i][1]}
                    </div>
                </div>
            `
        }
    })
}

function eliminarInfo()
{
    let fechaInicioDetalle = document.getElementById('fechaInicioDetalle')
    let fechaFinDetalle = document.getElementById('fechaFinDetalle')
    let estadoTareaDetalle = document.getElementById('estadoTareaDetalle')
    let descripcionTareaDetalle = document.getElementById('descripcionTareaDetalle')
    let indTarea = document.getElementById('indTarea')
    let comentariosTareaTotales = document.getElementById('comentariosTareaTotales')

    fechaInicioDetalle.value = ''
    fechaFinDetalle.value = ''
    estadoTareaDetalle.value = ''
    descripcionTareaDetalle.value = ''
    indTarea.innerHTML = ''
    comentariosTareaTotales.innerHTML = ''
}

function enviarComentario()
{
    let comentarioUsuario = document.getElementById('comentarioUsuario')
    let indTarea = document.getElementById('indTarea')
    
    datos = {
        'comentario':comentarioUsuario.value,
        'idTarea':indTarea.innerHTML
    }

    fetch('/publicarComentario',{
        method:"POST",
        headers:{
            "X-Requested-With":"XMLHttpRequest",
            "X-CSRFToken": getCookie("csrftoken"),
        },
        body:JSON.stringify(datos)
    })
    .then(response => response.json())
    .then(data => {
        console.log(data)
        capturarInformacionTarea(indTarea.innerHTML)
    })

}

function getCookie(name)
{
    let cookieValue = null;
    if(document.cookie && document.cookie !== "")
    {
        const cookies = document.cookie.split(';');
        for(let i = 0; i < cookies.length; i++)
        {
            const cookie = cookies[i].trim();
            if(cookie.substring(0,name.length + 1) === (name + "="))
            {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue 
}

function finalizarTarea(idFinalizar)
{
    console.log(idFinalizar)
    // Obtener el ID de la tarea
    var tareaId = idFinalizar.split('-')[1];

    // Actualizar el estado en el DOM
    var estadoCelda = document.getElementById('estado' + tareaId);
    estadoCelda.innerHTML = 'Finalizada';

    // Actualizar el estado en la base de datos
    var data = {estado: 'Finalizada'};
    fetch('/api/tareas/' + tareaId + '/', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (!response.ok) {
        throw new Error('La respuesta de la red no era correcta');
        }
        return response.json();
    })
    .then(data => {
        console.log('Tarea actualizada:', data);
    })
    .catch(error => {
        console.error('Error al actualizar tarea:', error);
    });
}