const fs = require('fs');

const Conjunto = require("../models/Conjunto");
const Usuario = require('../models/Usuarios');
const Auth = require('../models/Auth');
const Cobranza = require('../models/Cobranza');




const actualizarImagen = async( tipo, id, nombreArchivo ) => {
    

    // const [ conjunto, usuario, auth, cobranza ] = await Promise.all([
    //     Conjunto.findById( id ),
    //     Usuario.findById( id ),
    //     Auth.findById( id ),
    //     Cobranza.findById( id ),
    // ]);


    // if( !conjunto && !usuario && !auth && !cobranza ) {
    //     console.log('Id desconocido No Existe En Las Colecciones');
    //     return false;
    // }


    let pathViejo = '';
    let conjunto = '';
    let usuario = '';

    switch ( tipo ) {

        case 'logo':
            conjunto =  await Conjunto.findById( id );
            if( !conjunto ){
                console.log('No Existe Un conjunto Por Ese ID');
                return false;
            }

            pathViejo = `./uploads/${ tipo }/${ conjunto.logo }`;
            if( fs.existsSync( pathViejo ) ) {
                fs.unlinkSync( pathViejo );
            }

            conjunto.logo = nombreArchivo;
            await conjunto.save();
            return true;


        case 'factura':
            conjunto =  await Conjunto.findById( id );
            if( !conjunto ){
                console.log('No Existe Un conjunto Por Ese ID');
                return false;
            }
            pathViejo = `./uploads/${ tipo }/${ conjunto.factura }`;
            if( fs.existsSync( pathViejo ) ) {
                fs.unlinkSync( pathViejo );
            }

            conjunto.factura = nombreArchivo;
            await conjunto.save();
            return true;



        case 'informeMes':

            conjunto =  await Conjunto.findById( id );
            if( !conjunto ){
                console.log('No Existe Un conjunto Por Ese ID');
                return false;
            }
            
            pathViejo = `./uploads/${ tipo }/${ conjunto.informeMes }`;
            if( fs.existsSync( pathViejo ) ) {
                fs.unlinkSync( pathViejo );
            }
            conjunto.informeMes = nombreArchivo;
            await conjunto.save();
            return true;


        case 'acuerdoPago':
            usuario =  await Usuario.findById( id );
            if( !usuario ){
                console.log('No Existe Un usuario Por Ese ID');
                return false;
            }
            pathViejo = `./uploads/${ tipo }/${ usuario.acuerdoPago }`;
            if( fs.existsSync( pathViejo ) ) {
                fs.unlinkSync( pathViejo );
            }

            usuario.acuerdoPago = nombreArchivo;
            await usuario.save();
            return true;


        case 'docJuridico':
            usuario =  await Usuario.findById( id );
            if( !usuario ){
                console.log('No Existe Un usuario Por Ese ID');
                return false;
            }
            pathViejo = `./uploads/${ tipo }/${ usuario.docJuridico }`;
            if( fs.existsSync( pathViejo ) ) {
                fs.unlinkSync( pathViejo );
            }

            usuario.docJuridico = nombreArchivo;
            await usuario.save();
            return true;



        case 'estadoCuenta':
            usuario =  await Usuario.findById( id );
            if( !usuario ){
                console.log('No Existe Un usuario Por Ese ID');
                return false;
            }
            pathViejo = `./uploads/${ tipo }/${ usuario.estadoCuenta }`;
            if( fs.existsSync( pathViejo ) ) {
                fs.unlinkSync( pathViejo );
            }

            usuario.estadoCuenta = nombreArchivo;
            await usuario.save();
            return true;



        case 'perfil':
            const auth =  await Auth.findById( id );
            if( !auth ){
                console.log('No Existe Un auth Por Ese ID');
                return false;
            }
            pathViejo = `./uploads/${ tipo }/${ auth.img }`;
            if( fs.existsSync( pathViejo ) ) {
                fs.unlinkSync( pathViejo );
            }

            auth.img = nombreArchivo;
            await auth.save();
            return true;


        case 'cobranza':
            const cobranza =  await Cobranza.findById( id );
            if( !cobranza ){
                console.log('No Existe Un cobranza Por Ese ID');
                return false;
            }
            pathViejo = `./uploads/${ tipo }/${ cobranza.evidencia }`;
            if( fs.existsSync( pathViejo ) ) {
                fs.unlinkSync( pathViejo );
            }

            cobranza.evidencia = nombreArchivo;
            await cobranza.save();
            return true;
    
        default:
            return false;
    }

}











module.exports = {
    actualizarImagen,
}