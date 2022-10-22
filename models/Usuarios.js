
const { Schema, model } = require('mongoose');



const UsuarioSchema = Schema({

    nombre: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: false,
        // unique: true
    },
    inmueble: {
        type: String,
        required: true
    },
    conjunto: {
        type: Schema.Types.ObjectId,
        ref: 'Conjunto',
        required: true
    },
    evidencia: {
        type: String
    },
    gestion: {
        type: String
    },
    celular: {
        type: String
    },
    comunicado: {
        type: String
    },
    estadoCuenta: {
        type: String
    },

    acuerdoPago: {
        type: String
    },

    docJuridico: {
        type: String
    },

    cobranza: [ { type: Object, required: false } ],

});



module.exports = model( 'Usuario', UsuarioSchema );