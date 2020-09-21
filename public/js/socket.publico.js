// =====================================================
//    				 Socket
// =====================================================
var socket = io();
// =====================================================
//    				 Referencias HTML
// =====================================================
const labelPantallaTicket1 = $('#lblTicket1');
const labelPantallaTicket2 = $('#lblTicket2');
const labelPantallaTicket3 = $('#lblTicket3');
const labelPantallaTicket4 = $('#lblTicket4');

const labelPantallaEscritorio1 = $('#lblEscritorio1');
const labelPantallaEscritorio2 = $('#lblEscritorio2');
const labelPantallaEscritorio3 = $('#lblEscritorio3');
const labelPantallaEscritorio4 = $('#lblEscritorio4');

let pantallasTickets = [labelPantallaTicket1, labelPantallaTicket2, labelPantallaTicket3,labelPantallaTicket4];

let pantallasEscritorios = [labelPantallaEscritorio1, labelPantallaEscritorio2, labelPantallaEscritorio3, labelPantallaEscritorio4];
// =====================================================
//    				 Obtener informacion del servidor
// =====================================================

socket.on('estadoActualTickets', function(data){

    actualizaPantallas(data.ticketsPantalla);

});

socket.on('ticketsPantalla', function(data){

    var audio = new Audio('audio/new-ticket.mp3');
    audio.play();
    actualizaPantallas(data.ticketsPantalla);

});

function actualizaPantallas( pantallas ){

    for(let i = 0; i <= pantallas.length - 1; i++){

        pantallasTickets[i].text(`Ticket ` + pantallas[i].numero);
        pantallasEscritorios[i].text(`Escritorio ` + pantallas[i].escritorio);

    }

}