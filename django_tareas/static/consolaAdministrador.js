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
    // Capturar los valores de los inputs
    var id = document.getElementById('cargaId').innerHTML;
    var nroCelular = document.getElementById('celular').value;
    var profesionUsuario = document.getElementById('profesion').value;

    // Creamos un objeto con los datos del usuario
    var data = {
        id: id,
        nro_celular: nroCelular,
        profesion_usuario: profesionUsuario
    };

    // Realizamos la peticion fetch
    fetch('/api/usuarios/' + id + '/', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    console.log('Usuario actualizado:', data);
    // Cerrar la ventana modal
    $('#editarUsuarioModal').modal('hide');
    // Actualizar la información en la tabla
    actualizarTablaUsuarios();
  })
  .catch(error => {
    console.error('Error al actualizar usuario:', error);
  });
}