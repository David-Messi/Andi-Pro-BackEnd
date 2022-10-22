
const { response } = require('express');

const Conjunto = require('../models/Conjunto');
const Usuario = require('../models/Usuarios');





const buscar = async( req, res = response ) => {

    const tipo = req.params.tipo;
    const busqueda = req.params.busqueda;
    const regex = new RegExp( busqueda, 'i' );

    const inmueble = new RegExp( busqueda, 'i' );

    let data = [];

    switch ( tipo ) {

        case 'usuarios':
            // data = await Usuario.find({ nombre: regex });
            data = await Usuario.find({ inmueble });
            break;

        case 'conjuntos':
            data = await Conjunto.find({ nombre: regex });
            break;
    
        default:
            return res.status(400).json({
                ok: false,
                msg: 'El tipo tiene que ser conjuntos o usuarios'
            });
    }


    res.json({
        ok: true,
        resultados: data
    });

}



const buscarPorConjunto = async( req, res = response ) => {

    const termino = req.params.termino;
    // const rexge = new RegExp( termino, 'i' );
    try {

        const respuesta = await Usuario.find({  
           conjunto: termino });

        res.json({
            ok: true,
            respuesta
        });
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el Administrador'
        });
    }
}






const buscarPorUsuarioPorCojunto = async( req, res = response ) => {

    const termino = req.params.termino;
    const regex = new RegExp( termino, 'i' );

    try {
        const respuesta = await Usuario.find({  
            conjunto: req.uid,
            inmueble: regex,
        });

        console.log(respuesta);
        res.json({
            ok: true,
            respuesta
        });
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el Administrador'
        });
    }
}






module.exports = {
    buscar,
    buscarPorConjunto,
    buscarPorUsuarioPorCojunto,
}