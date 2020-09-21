// =====================================================
//    				 Socket
// =====================================================
var socket = io();
// =====================================================
//    				 Verificar params URL
// =====================================================
var searchParams = new URLSearchParams( window.location.search );

if ( !searchParams.has('escritorio') ){

    window.location = 'index.html';
    throw new Error('El escritorio es necesario');

}
var escritorio = searchParams.get('escritorio');
// =====================================================
//    				 Referencias html
// =====================================================
const h1AtendiendoA = $('h1');
const botonAtenderTicket = $('button');
const spanTicketAtendiendo = $('span');
// =====================================================
//    				 Eventos y Emitir mensajes al servidor
// =====================================================
h1AtendiendoA.text(`Escritorio ${escritorio}`)

botonAtenderTicket.on('click', function(){

    socket.emit('atenderTicket', { escritorio: escritorio }, function(respuesta){

        if( respuesta === 'No hay Tickets' ) {
            alert('No hay Tickets');
            spanTicketAtendiendo.text("'no hay tickets por atender'");
            return;
        }

        spanTicketAtendiendo.text(`Ticket ${respuesta.numero}`)

    });

});

