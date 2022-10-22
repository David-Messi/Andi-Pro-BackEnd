const jwt = require('jsonwebtoken');



const generarJWT = ( uid, nombre ) => {

    return new Promise( (resolve, reject) => {

        const payload = { uid, nombre };

        jwt.sign( payload, process.env.SCRET_JWT_SEED, {
            expiresIn: '4h'
        }, ( err, token ) => {

            if( err ) {
                console.log(err);
                reject('No se pudo Generar el Token');
            }

            resolve( token );

        })
    })

}



module.exports = {
    generarJWT,
}