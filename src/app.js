import express from 'express';
import handlebars from 'express-handlebars';
import __dirname from './utils.js';
import viewRouter from './routes/views.router.js'

import {Server} from 'socket.io'

const app = express()
const PORT = 9090;

//Preparar la configuracion del servidor para recibir objetos JSON.
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//Uso de vista de plantillas
app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + "/views");
app.set('view engine', 'handlebars');

//Carpeta public
app.use(express.static(__dirname+'/public'));

const httpServer = app.listen(PORT, () => {
    console.log("Servidor escuchando por el puerto: " + PORT);
});

// Declaramos el router
app.use('/', viewRouter)

// const socketServer = new Server
const socketServer = new Server(httpServer);
let messages = [];

// Abrimos el canal de comunicacion
socketServer.on('connection', socket=>{
    console.log(`Nuevo cliente conectado! Socket id: ${socket.id}`);
    socket.emit('mensaje', 'Bienvenido al servidor');
    socket.on('mensaje', data=>{
        console.log(data);
    })

    //Recibimos los mensajes y los enviamos a todos los clientes
    socket.on('message', data=>{
        messages.push(data);
        socketServer.emit('messageLogs', messages);
    })

    //Recibimos los nombres de usuario y los enviamos a todos los clientes
    socket.on('userConnected', data=>{
        socket.broadcast.emit('userConnected', data.user);
    })
})
