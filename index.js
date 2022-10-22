require('dotenv').config();

const express = require('express');
const cors = require('cors');

const { dbConnection } = require('./database/config');




// Crear El Servidor Express
const app = express();


// Configurar el CORS
app.use( cors() );



// Base de Datos
dbConnection();



// Directorio Publico
app.use( express.static('public') );



// Lectura y Parseo de Body
app.use( express.json() );



// Rutas
app.use('/api/auth', require('./routes/auth') ); 
app.use('/api/usuario', require('./routes/usuarios') );
app.use('/api/cobranza', require('./routes/cobranza') );

app.use('/api/conjunto', require('./routes/conjuntos') );
app.use( '/api/busqueda', require('./routes/busqueda') );
app.use( '/api/cliente', require('./routes/cliente') );

app.use( '/api/uploads', require('./routes/uploads') );






// Escuchar Peticiones
app.listen( process.env.PORT, () => {
    console.log(`Servidor Corriendo el el Puerto ${ process.env.PORT }`);
});