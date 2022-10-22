
const { Schema, model } = require('mongoose');



const ClienteSchema = Schema({

    nombre: {
        type: String,
        required: true
    },
    
    celular: {
        type: String,
        required: true
    },

    fecha: {
        type: Date,
        default: new Date(),
    },


});



module.exports = model( 'Cliente', ClienteSchema );