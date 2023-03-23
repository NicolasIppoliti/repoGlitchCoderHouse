const socket = io();
let user;
const chatBox = document.getElementById('chatBox');

//Aplicando sweetalert
Swal.fire({
    icon: 'info',
    title: 'Identificate por favor',
    input: 'text',
    text: 'Ingresa tu nombre de usuario',
    color: '#716add',
    inputValidator: (value) => {
        if (!value) {
            return 'Debes ingresar un nombre de usuario!'
        } else {
            socket.emit('userConnected', {user: value});
        }
    },
    allowOutsideClick: false
}).then((result) => {
    if (result.isConfirmed) {
        user = result.value;
        Swal.fire({
            icon: 'success',
            title: 'Bienvenido',
            text: `Bienvenido ${user}`,
            footer: 'Clase de sockets',
            showConfirmButton: false,
            timer: 1500
        })
    }
})

//Guardar mensajes por usuario y mostrarlo en nuestro log de mensajes.
chatBox.addEventListener('keyup', evt => {
    if (evt.key === "Enter") {
        if(chatBox.value.trim().length>0){
            socket.emit('message', {user: user, message: chatBox.value});
            chatBox.value = "";
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'No puedes enviar mensajes vacios!',
                footer: 'Clase de sockets',
                showConfirmButton: false,
                timer: 1500
            })
        }
    }
})

//Escuchamos los mensajes del servidor
socket.on('messageLogs', data => {
    const messageLogs = document.getElementById('messageLogs');

    let logs = '';
    data.forEach(message => {
        logs += `<p><strong>${message.user}</strong>: ${message.message}</p>`
    })
    messageLogs.innerHTML = logs;
})

//Escuchamos los nuevos usuarios conectados
socket.on('userConnected', data=>{
    let message = `${data} se ha conectado al chat`;

    Swal.fire({
        icon: 'info',
        title: 'Nuevo usuario conectado',
        text: message,
        toast: true,
        timer: 3000
})
})


//Parte dos: Guardar mensajes por socketid.
input.addEventListener('keyup',evt=>{
    if(evt.key==="Enter"){
        socket.emit('message2',input.value);
        input.value=""
    }
});
socket.on('log',data=>{
    let logs='';
    data.logs.forEach(log=>{
        logs += `${log.socketid} dice: ${log.message}<br/>`
    })
    log.innerHTML=logs;
});

