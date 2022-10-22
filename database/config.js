const mongoose = require('mongoose');


const dbConnection = async() => {

    try {

        await mongoose.connect( process.env.DB_CNN, {

        });

        console.log('Base de Datos Exitosa');

    }catch( error ){
        console.log(error);
        throw new Error('Error al Inicializar la BD');
    }

}


module.exports = {
    dbConnection
}