
const response = require('express');
const { generarJWT } = require('../helpers/jwt');
const Conjunto = require('../models/Conjunto');
const Usuario = require('../models/Usuarios');






const getConjuntos = async ( req, res = response ) => {


    const [ conjuntos, total ] = await Promise.all([
        Conjunto.find(),
        Conjunto.countDocuments()
    ]);


    res.json({
        ok: true,
        conjuntos,
        total
    });
}



const getConjuntoPorId = async ( req, res = response ) => {

    const uid = req.params.id;

    try {

        const conjunto = await Conjunto.findById( uid )  
                                    
        if( !conjunto ) {
            return res.status(400).json({
                ok: false,
                msg: 'No Existe un Conjunto con ese ID'
            });
        }

        res.json({
            ok: true,
            conjunto
        });

        
    } catch (error) {
        console.log( error );
        res.status(500).json({
            ok: false,
            msg: 'Hable con el Administrador'
        });
    }

}



const crearConjunto = async ( req, res = response ) => {


    try {

        const conjunto = new Conjunto( req.body );
        const conjuntoDB = await conjunto.save();


        res.json({
            ok: true,
            conjunto: conjuntoDB
        });

        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el Administrador'
        });
    }


}


const actualizarConjunto = async ( req, res = response ) => {


    const id = req.params.id;


    try {

        const conjunto = await Conjunto.findById( id );
        if( !conjunto ) {
            return res.status(400).json({
                ok: false,
                msg: 'No Existe Un Conjunto Por Ese Id'
            });
        }

        const conjuntoBody = {
            ...req.body
        }

        const conjuntoDB = await Conjunto.findByIdAndUpdate( id, conjuntoBody, { new: true } ); 

        res.json({
            ok: true,
            conjunto: conjuntoDB
        });


        
    } catch (error) {
        console.log( error );
        res.status(500).json({
            ok: false,
            msg: 'Hable con el Administrador'
        });
    }

}


const eliminarConjunto = async ( req, res = response ) => {

    const id = req.params.id;

    try {

        const conjunto = await Conjunto.findById( id );
        if( !conjunto ){
            return res.status(400).json({
                ok: false,
                msg: 'No Existe un Conjunto Por ese ID'
            });
        }

        const conjuntoDelete = await Conjunto.findByIdAndDelete( id );

        res.json({
            ok: true,
            conjunto: conjuntoDelete
        });


        
    } catch (error) {
        console.log( error );
        res.status(500).json({
            ok: false,
            msg: 'Hable con el Administrador'
        });
    }

}



const loginConjunto = async( req, res = response ) => {

    const { email, password } = req.body;


    try {

        const conjunto = await Conjunto.findOne({ email });

        if( !conjunto ){
            return res.status(400).json({
                ok: false,
                msg: 'Email o Clave Incorrectos'
            });
        }

        

        // Confirmar Contraseñas
        if( password !== conjunto.password ) {
            return res.status(400).json({
                ok: false,
                msg: 'Email o Clave Incorrectos'
            });
        }


        // Generar JWT
        const token = await generarJWT( conjunto.id, conjunto.nombre );

        // Informacion de Usuarios
        const usuarios = await Usuario.find({ conjunto: conjunto._id });


        res.json({
            ok: true,
            // uid: conjunto.id,
            // nombre: conjunto.nombre,
            conjunto,
            usuarios,
            token
        });

        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el Administrador'
        });
        
    }
}



const revalidarToken = async( req, res = response ) => {

    const uid = req.uid;
    const nombre = req.nombre;

    // Generar JWT
    const token = await generarJWT( uid, nombre );

    // Obtener el Admin Por ID
    const admin = await Conjunto.findById( uid );

    // Informacion de Usuarios
    const usuarios = await Usuario.find({ conjunto: uid });



    res.json({
        ok: true,
        admin,
        usuarios,
        token
    });

}





module.exports = {
    getConjuntos,
    crearConjunto,
    actualizarConjunto,
    eliminarConjunto,
    getConjuntoPorId,
    loginConjunto,
    revalidarToken,
}

