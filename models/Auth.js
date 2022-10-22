
const { Schema, model } = require('mongoose');




const AuthSchema = Schema({

    nombre: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },

    role: {
        type: String,
        default: 'Usuario'
    },
    img: {
        type: String,
    }

});




module.exports = model( 'Auth', AuthSchema );


