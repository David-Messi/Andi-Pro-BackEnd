const { response } = require('express');
const Usuario = require('../models/Usuarios');



const getUsuarios = async ( req, res = response ) => {

    const desde = Number(req.query.desde) || 0;

    const [ usuarios, total ] = await Promise.all([
        Usuario.find()
            .skip( desde )
            .limit( 20 )
            .populate('conjunto', 'nombre'),
        Usuario.countDocuments()
    ]);

    res.json({
        ok: true,
        usuarios,
        total
    });

}

const getUsuarioPorConjunto = async (req, res = response ) => {

    const uid = req.body.id;

    try {

        const usuario = await Usuario.find({ conjunto: uid });
        if( !usuario ) {
            return res.status(400).json({
                ok: fasle,
                msg: 'No Existen Usuarios En Ese Conjunto'
            });
        }

        res.json({
            ok: true,
            msg: 'Busqueda Por Conjunto',
            usuario
        });

        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: fasle,
            msg: 'Hable con el Administrador'
        });
        
    }

}


const getUsuarioPorId = async ( req, res = response ) => {

    const uid = req.params.id;

    try {

        const usuario = await Usuario.findById( uid )  
                                    .populate('conjunto', 'nombre');
        if( !usuario ) {
            return res.status(400).json({
                ok: false,
                msg: 'No Existe un Usuario con ese ID'
            });
        }

        res.json({
            ok: true,
            usuario
        });

        
    } catch (error) {
        console.log( error );
        res.status(500).json({
            ok: false,
            msg: 'Hable con el Administrador'
        });
    }

}



const crearUsuarios = async ( req, res = response ) => {

    const { email } = req.body;

    try {

        const usuarioBusqueda = await Usuario.findOne({ email });

        if( usuarioBusqueda ){
            return res.status(400).json({
                ok: false,
                msg: 'El Email Ya Existe'
            });
        }

        const usuario = new Usuario( req.body );
        const usuarioDB = await usuario.save();

        res.json({
            ok: true,
            msg: 'Usuario Creado',
            usuarioDB
        });
        
    } catch (error) {
        console.log( error );
        res.status(500).json({
            ok: false,
            msg: 'Hable con el Administrador'
        });
    }
}


const actualizarUsuarios = async ( req, res = response ) => {

    const uid = req.params.id;

    try {

        const usuarioDB = await Usuario.findById( uid );
        if( !usuarioDB ) {
            return res.status(400).json({
                ok: false,
                msg: 'No Existe Un Usuario con ese ID'
            });
        }

        const nuevoUser = {
            ...req.body
        };

        const usuarioActualizado = await Usuario.findByIdAndUpdate( uid, nuevoUser, { new: true });


        res.json({
            ok: true,
            msg: 'Usuario Actualizado',
            usuario: usuarioActualizado
        });

        
    } catch (error) {
        console.log( error );
        res.status(500).json({
            ok: false,
            msg: 'Hable con el Administrador'
        });
    }
}



const eliminarUsuarios = async ( req, res ) => {

    const uid = req.params.id;

    try {

        const usuarioDB = await Usuario.findById( uid );

        if( !usuarioDB ) {
            return res.status(400).json({
                ok: false,
                msg: 'No existe un usuario por ese ID'
            });
        }

        const usuarioDelete = await Usuario.findByIdAndDelete( uid );

        res.json({
            ok: true,
            usuario: usuarioDelete
        });
    

        
    } catch (error) {
        console.log( error );
        res.status(500).json({
            ok: false,
            msg: 'Hable con el Administrador'
        });
    }

}





module.exports = {
    getUsuarios,
    getUsuarioPorId,
    getUsuarioPorConjunto,
    crearUsuarios,
    actualizarUsuarios,
    eliminarUsuarios 
}