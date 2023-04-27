function editarUsuario(idEditar)
{
    console.log(idEditar)
    
    // Realizar la peticion fetch para obtener la informacion del usuario
    fetch('/api/usuarios/' + idEditar)
    .then(response => response.json())
    .then(data => {

        // Llenar inputs con información del usuario
        document.getElementById('nombre').value = data.nombre;
        document.getElementById('nombre').readOnly = true;
        document.getElementById('apellido').value = data.apellido;
        document.getElementById('apellido').readOnly = true;
        document.getElementById('email').value = data.email;
        document.getElementById('email').readOnly = true;
        document.getElementById('fechaIngreso').value = data.fechaIngreso;
        document.getElementById('fechaIngreso').readOnly = true;
        document.getElementById('celular').value = data.celular;
        document.getElementById('profesion').value = data.profesion;

        // Colocar ID en el elemento H1
        document.getElementById('cargaId').innerHTML = data.id;
    })
    .catch(error => console.log(error));
}

function actualizarUsuario()
{
    /*
    PREGUNTA 4
    Capturar los datos de los campos input's de la ventana de editar usuario,
    el id del usuario lo puedes capturar de la carga realizada en el elemento
    H1 cuyo id es cargaId. Con los datos capturados postearlos en la base de datos
    y actualizar la informacion del usuario
    */
}