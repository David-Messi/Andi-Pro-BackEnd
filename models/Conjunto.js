
const { Schema, model } = require('mongoose');




const ConjuntoSchema = Schema({

    nombre: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    logo: {
        type: String
    },

    password: {
        type: String,
        // required: true,
    },

    informeMes: {
        type: String
    },

    factura: {
        type: String
    }

});




module.exports = model( 'Conjunto', ConjuntoSchema );