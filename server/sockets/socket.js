// =====================================================
//    				    Required
// =====================================================
const { io }            = require('../server');
const { TicketControl } = require('../classes/ticket-control')

const ticketControl = new TicketControl();

// =====================================================
//    				 IO Conexion
// =====================================================
io.on('connection', (client) => {

    client.on('siguienteTicket', ( data, callback ) => {

        let siguiente = ticketControl.siguienteTicket();

        console.log(siguiente);

        callback(siguiente);

    });
    // =====================================================
    //    			Emitir mensaje al cliente
    // =====================================================
    client.emit('estadoActualTickets', {
        ticketActual:  ticketControl.getUltimoTicket(),
        ticketsPantalla: ticketControl.getTicketsPantalla()
    });

    client.on('atenderTicket', ( data, callback ) => {

        if( !data.escritorio ) {

            return callback({

                error: true,
                mensaje: 'El escritorio es necesario'

            });

        }

        let atenderTicket = ticketControl.atenderTicket( data.escritorio );

        callback(atenderTicket);

        client.broadcast.emit('ticketsPantalla', {
            ticketsPantalla: ticketControl.getTicketsPantalla()
        });

    });

});