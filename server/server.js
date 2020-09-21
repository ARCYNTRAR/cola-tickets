// =====================================================
//    				  Required
// =====================================================
const express   = require('express');
const socketIO  = require('socket.io');
const http      = require('http');
const path      = require('path');
// =====================================================
//    				 Servidores
// =====================================================
const app       = express();
let server      = http.createServer(app);
// =====================================================
//    				 Carpeta publica
// =====================================================
const publicPath = path.resolve(__dirname, '../public');
// =====================================================
//    				    Puerto
// =====================================================
const port = process.env.PORT || 3000;
// =====================================================
//    				 Middlewares
// =====================================================
app.use(express.static(publicPath));
// =====================================================
//      				 Sockets
// =====================================================
// IO = esta es la comunicacion del backend
module.exports.io = socketIO(server);
require('./sockets/socket');
// =====================================================
//    		    Iniciar el servidor HTTP
// =====================================================
server.listen(port, (err) => {

    if (err) throw new Error(err);

    console.log(`Máquina corriendo en el puerto ${ port }`);

});