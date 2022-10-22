const { response } = require('express');
const Cliente = require('../models/Cliente');



const getCliente = async ( req, res = response ) => {

    const [ cliente, total ] = await Promise.all([
        Cliente.find(),
        Cliente.countDocuments()
    ]);

    res.json({
        ok: true,
        cliente,
        total
    });

}



const getClientePorId = async ( req, res = response ) => {

    const uid = req.params.id;

    try {

        const cliente = await Cliente.findById( uid );

        if( !cliente ) {
            return res.status(400).json({
                ok: false,
                msg: 'No Existe un Cliente con ese ID'
            });
        }

        res.json({
            ok: true,
            cliente
        });

        
    } catch (error) {
        console.log( error );
        res.status(500).json({
            ok: false,
            msg: 'Hable con el Administrador'
        });
    }

}



const crearCliente = async ( req, res = response ) => {


    try {


        const cliente = new Cliente( req.body );
        const clienteDB = await cliente.save();

        res.json({
            ok: true,
            msg: 'Cliente Creado',
            clienteDB
        });
        
    } catch (error) {
        console.log( error );
        res.status(500).json({
            ok: false,
            msg: 'Hable con el Administrador'
        });
    }
}


const actualizarCliente = async ( req, res = response ) => {

    const uid = req.params.id;

    try {

        const clienteDB = await Cliente.findById( uid );
        if( !clienteDB ) {
            return res.status(400).json({
                ok: false,
                msg: 'No Existe Un Cliente con ese ID'
            });
        }

        const nuevoUser = {
            ...req.body
        };

        const clienteActualizado = await Cliente.findByIdAndUpdate( uid, nuevoUser, { new: true });


        res.json({
            ok: true,
            msg: 'Cliente Actualizado',
            cliente: clienteActualizado
        });

        
    } catch (error) {
        console.log( error );
        res.status(500).json({
            ok: false,
            msg: 'Hable con el Administrador'
        });
    }
}



const eliminarCliente = async ( req, res ) => {

    const uid = req.params.id;

    try {

        const clienteDB = await Cliente.findById( uid );

        if( !clienteDB ) {
            return res.status(400).json({
                ok: false,
                msg: 'No existe un Cliente por ese ID'
            });
        }

        const clienteDelete = await Cliente.findByIdAndDelete( uid );

        res.json({
            ok: true,
            cliente: clienteDelete
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
    getCliente,
    getClientePorId,
    crearCliente,
    actualizarCliente,
    eliminarCliente,
}