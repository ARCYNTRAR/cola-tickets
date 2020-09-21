// =====================================================
//    				 Referencias HTML
// =====================================================
const botonGenerarTicket = $('button');
const labelMostrarTicket = $('#lblNuevoTicket');
// =====================================================
//    		    Establecer conexion 'Socket'
// =====================================================
var socket = io();
// =====================================================
//    			'Socket' Connect y disconect
// =====================================================
socket.on('connect', function(){
    console.log('Conectado');
});

socket.on('disconnect', function(){
    console.log('Desconectado');
});

// =====================================================
//    		Recibir información del servidor
// =====================================================
socket.on('estadoActualTickets', data => {

    let ticketActualImprimir = data.ticketActual;
    labelMostrarTicket.text(ticketActualImprimir);

});

// =====================================================
//    				Eventos con JQuery
// =====================================================
botonGenerarTicket.on('click', function(){

    // =====================================================
    //    				 Mandar mensaje al servidor 
    // =====================================================
    socket.emit('siguienteTicket', null, function(siguienteTicket){

        labelMostrarTicket.text(siguienteTicket);

    });


});

