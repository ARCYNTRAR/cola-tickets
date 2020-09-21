// =====================================================
//    				 Required
// =====================================================
const fs = require('fs');
// =====================================================
//    				 Clases
// =====================================================
class Ticket {

    constructor( numero, escritorio ){

        this.numero     = numero;
        this.escritorio = escritorio;

    }

}

class TicketControl {
    // =====================================================
    // Constructor se ejecuta cada vez que se crea una instancia
    // =====================================================
    constructor(){

        this.ultimo            = 0;
        this.hoy               = new Date().getDate();
        this.ticketsPendientes = [];
        this.ticketsPantalla   = [];
    // =====================================================
    //    		Llama a la data dentro del archivo
    // =====================================================
        let data    = require('../data/data.json');

        if( data.hoy === this.hoy ){

            this.ultimo            = data.ultimo;
            this.ticketsPendientes = data.ticketsPendientes;
            this.ticketsPantalla   = data.ticketsPantalla;

        }else{

            this.reiniciarInformacion();

        }

    }

    // =====================================================
    //    				 Métodos
    // =====================================================

    siguienteTicket(){

        this.ultimo++;

        let ticket = new Ticket( this.ultimo, null );

        this.ticketsPendientes.push(ticket);

        this.grabarInfoArchivo();

        return `Ticket ${this.ultimo}`;

    }

    getUltimoTicket(){

        return `Ticket ${this.ultimo}`;

    }

    getTicketsPantalla(){

        return this.ticketsPantalla;

    }

    atenderTicket( escritorio ){


        if(this.ticketsPendientes.length === 0 ) return 'No hay Tickets';

        let numeroTicket = this.ticketsPendientes[0].numero;
        this.ticketsPendientes.shift();

        let atenderTicket = new Ticket(numeroTicket, escritorio);

        this.ticketsPantalla.unshift( atenderTicket );

        if( this.ticketsPantalla.length > 4 ){

            this.ticketsPantalla.splice(-1,1); // Borra el ultimo elemento

        }

        this.grabarInfoArchivo();

        return atenderTicket;

    }

    reiniciarInformacion(){

        this.ultimo            = 0;
        this.ticketsPendientes = [];
        this.ticketsPantalla   = [];


        console.log('Se ha iniciliazido el sistema');

        this.grabarInfoArchivo();

    }

    grabarInfoArchivo(){

        let jsonData = {
            ultimo:             this.ultimo,
            hoy:                this.hoy,
            ticketsPendientes:  this.ticketsPendientes,
            ticketsPantalla:    this.ticketsPantalla
        }

        let jsonDataString = JSON.stringify(jsonData);

        fs.writeFileSync('./server/data/data.json', jsonDataString);

    }

}
// =====================================================
//   			Esportacion de Clases
// =====================================================
module.exports = {
    TicketControl
}