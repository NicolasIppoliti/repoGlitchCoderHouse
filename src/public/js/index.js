// Configuracion del socket del lado del cliente
const socket = io();

socket.emit('mensaje', 'Hola soy el cliente!!')

Swal.fire({
    icon: 'success',
    title: 'Bienvenido',
    text: 'Bienvenido a la clase de sockets',
    footer: 'Clase de sockets',
    showConfirmButton: false,
    timer: 1500
})