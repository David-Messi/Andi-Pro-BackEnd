const { response } = require("express");
const path = require('path');
const fs = require('fs');

const { v4: uuidv4 } = require('uuid');
const { actualizarImagen } = require("../helpers/actualizar-imagen");





const fileUploads = ( req, res = response ) => {

    const tipo = req.params.tipo;
    const id = req.params.id;


    const tiposValidos = [  'acuerdoPago',
                            'docJuridico',
                            'estadoCuenta',
                            'factura', 
                            'informeMes',
                            'logo',
                            'cobranza',
                            'perfil'   ];

    if( !tiposValidos.includes( tipo ) ) {
        return res.status(400).json({
            ok: false,
            msg: 'El Tipo no es Valido'
        });
    }


    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            msg: 'No hay Archivo'
        });
      }


    //Procesar Una Imagen
    const file = req.files.imagen;

    const nombreCortado = file.name.split('.');
    const extencionArchivo = nombreCortado[ nombreCortado.length - 1 ];

    // validar Extencion
    const extencionValida = ['png', 'jpg', 'jpeg', 'gif', 'pdf'];

    if( !extencionValida.includes(extencionArchivo) ) {
        return res.status(400).json({
            ok: false,
            msg: 'No Es una Extencion Permitida'
        });
    }

    // Generar Nombre Del Archivo
    const nombreArchivo = `${ uuidv4() }.${ extencionArchivo }`;

    // Path para Guardar Imagen
    const path = `uploads/${ tipo }/${ nombreArchivo }`;

    // Mover la Imagen
    file.mv(path, (err) => {
        if (err) {
            console.log(err);
            return res.status(500).json({
                ok: false,
                msg: 'Error al Mover la Imagen'
            });
        }

        // Actualizar Base de Datos
        actualizarImagen( tipo, id, nombreArchivo );


        res.json({
            ok: true,
            msg: 'Archivo Subido',
            nombreArchivo
        });
    
      });
}





const mostrarImagen = ( req, res = response ) => {

    const tipo = req.params.tipo;
    const foto = req.params.foto;

    const pathImg = path.join( __dirname, `../uploads/${ tipo }/${ foto }` );

    if( fs.existsSync( pathImg ) ) {
       
        res.sendFile( pathImg );

    }else {
        const pathImg2 = path.join( __dirname, `../uploads/no-img.jpg` );
        res.sendFile( pathImg2 );
    }
}







module.exports = {
    fileUploads,
    mostrarImagen,
}