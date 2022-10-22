const { response } = require('express');
const bcrypt = require('bcryptjs'); 
const Auth = require('../models/Auth');
const { generarJWT } = require('../helpers/jwt');




const getAdmin = async(req, res = response ) => {

    const [ admin, total ] = await Promise.all([
        Auth.find(),
        Auth.countDocuments()
    ]);


    res.json({
        ok: true,
        admin,
        total
    });
}



const getAdminPorID = async( req, res = response ) => {

    const uid = req.params.id;

    const admin = await Auth.findById( uid );

    res.json({
        ok: true,
        admin
    });

}



const crearAdmin = async( req, res = response ) => {


    const  { email, password } = req.body;

    try {

        const usuarioDB = await Auth.findOne({ email });

        if( usuarioDB ){
            return res.status(400).json({
                ok: false,
                msg: 'Ya Existe Un Administrador Con Ese Email'
            });
        }

        const usuario = new Auth( req.body );

        // Encriptar Contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync( password, salt );

        const auth = await usuario.save();

        // Generar JWT
        const token = await generarJWT( auth.id, auth.nombre );

    
        res.json({
            ok: true,
            id: auth.id,
            nombre: auth.nombre,
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


const loginAdmin = async( req, res = response ) => {

    const { email, password } = req.body;


    try {

        const usuarioDB = await Auth.findOne({ email });

        if( !usuarioDB ){
            return res.status(400).json({
                ok: false,
                msg: 'Usuario o Clave Incorrectos'
            });
        }

        // Confirmar Contraseñas
        const validPassword = bcrypt.compareSync( password, usuarioDB.password );

        if( !validPassword ) {
            return res.status(400).json({
                ok: false.valueOf,
                msg: 'Usuario o Clave Incorrectos'
            })
        }

        // Generar JWT
        const token = await generarJWT(usuarioDB.id, usuarioDB.nombre );

        res.json({
            ok: true,
            uid: usuarioDB.id,
            nombre: usuarioDB.nombre,
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
    const admin = await Auth.findById( uid );

    res.json({
        ok: true,
        token,
        admin
    });

}





const actualizarAdmin = async ( req, res = response ) => {

    const uid = req.params.id;

    try {

        const admin = await Auth.findById( uid );

        if( !admin ) {
            return res.status(400).json({
                ok: false,
                msg: 'No Existe Un Administrador Por Ese ID'
            });
        }

        const campos = req.body;

         // Encriptar Contraseña
         const salt = bcrypt.genSaltSync();
        campos.password = bcrypt.hashSync( req.body.password, salt );
        // delete campos.password;

        const adminActualizado = await Auth.findByIdAndUpdate( uid, campos, { new: true } );

        res.json({
            ok: true,
            admin: adminActualizado
        });

        
    } catch (error) {
        console.log(error);
        res.status(400).json({
            ok: false,
            msg: 'Hable con el Administrador'
        });
    }

}



const  cambioClave = async( req, res = response ) => {

    // const uid = req.params.id;
    const uid = req.uid;
    const { claveAntigua, password } = req.body;

    try {

        const admin = await Auth.findById( uid );
        
        if( !admin ){
            return res.status(400).json({
                ok: false,
                msg: 'No Existe Un Administrador Por Ese ID'
            })
        }

        
        const validPassword = bcrypt.compareSync( claveAntigua, admin.password );

        if( !validPassword ) {
            return res.status(400).json({
                ok: false,
                msg: 'La Clave Antigua no es Igual'
            });
        }

        
         // Encriptar Contraseña
         const salt = bcrypt.genSaltSync();
         const clave = bcrypt.hashSync( password, salt );


        const actualizarAdmin = await Auth.findByIdAndUpdate( uid, { password: clave }, { new: true } );


        res.json({
            ok: true,
            msg: 'Clave Actualizada'
        });

        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el Administrador'
        });
    }
} 




const eliminarAdmin = async ( req, res = response ) => {

    const uid = req.params.id;

    if( uid === '61e8ac7a62791147dac718ea') {
        return res.status(400).json({
            ok: false,
            msg: 'No se Puede Borrar Es Super Admin'
        });
    }

    const auth = await Auth.findById( uid );

    if( !auth ) {
        return res.status(400).json({
            ok: false,
            msg: 'No Existe un Administrador Por Ese Id'
        });
    }

    const authEliminado = await Auth.findByIdAndDelete( uid );

    res.json({
        ok: true,
        msg: 'Administrador Eliminado',
        authEliminado
    });

}




module.exports = {
    getAdmin,
    getAdminPorID,
    crearAdmin,
    loginAdmin,
    revalidarToken,
    actualizarAdmin,
    cambioClave,
    eliminarAdmin
}