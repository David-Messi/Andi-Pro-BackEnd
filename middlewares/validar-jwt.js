const { response } = require('express');
const jwt = require('jsonwebtoken');


const validarJWT = ( req, res = response, next ) => {

    // x-token
    const token = req.header('x-token');

    if( !token ) {
        return res.status(401).json({
            ok: false,
            msg: 'No hay token en la Peticion'
        });
    }

    try {
        
        const { uid, nombre } = jwt.verify(
            token,
            process.env.SCRET_JWT_SEED
        );


        req.uid = uid;
        req.nombre = nombre;



        
    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token No Valido'
        });
        
    }




    next();

}







module.exports = {
    validarJWT,
}