

const  { Schema, model } = require('mongoose');




const CobranzaSchema = Schema({

    
    fecha: {
        type: String,
        required: true
    }, 
    
    medio: {
        type: String,
        requiered: true
    },

    comunicado: {
        type: String,
        required: true
    },

    observacion: {
        type: String
    },

    evidencia: {
        type: String,
    },

    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    }

});




module.exports = model( 'Cobranza', CobranzaSchema );
