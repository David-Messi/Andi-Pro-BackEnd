const { response } = require('express');

const Cobranza = require('../models/Cobranza');





const getCobranza = async ( req, res = response ) => {

    const [ cobranza, total ] = await Promise.all([
        Cobranza.find()
                .populate('usuario', 'nombre'),
        Cobranza.countDocuments()
    ]);

    res.json({
        ok: true,
        cobranza,
        total
    });
}



const getCobranzaPorUsuario = async (req, res = response ) => {

    const uid = req.params.id;

    try {

        let cobranza = await Cobranza.find({ usuario: uid });

        cobranza.reverse();
                                        

        res.json({
            ok: true,
            msg: 'Busqueda Cobranza Por Usuario',
            cobranza
        });

        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: fasle,
            msg: 'Hable con el Administrador'
        });
        
    }

}





const crearCobranza = async ( req, res = response ) => {

    try {

        const cobranza = new Cobranza( req.body );
        const cobranzaDB = await cobranza.save();

        res.json({
            ok: true,
            msg: 'Cobranza Creada',
            cobranzaDB
        });
        

    } catch (error) {
        console.log( error );
        res.status(500).json({
            ok: false,
            msg: 'Hable con el Administrador'
        });
    }
}





const actualiarCobranza = async ( req, res = response ) => {

    const uid = req.params.id;

    try {

        const cobranzaDB = await Cobranza.findById( uid );
        if( !cobranzaDB ) {
            return res.status(400).json({
                ok: false,
                msg: 'No Existe Una Cobranza con ese ID'
            });
        }

        const newCobranza = {
            ...req.body
        };

        const cobranzaActual = await Cobranza.findByIdAndUpdate( uid, newCobranza, { new: true } );


        res.json({
            ok: true,
            msg: 'Cobranza Actualizada',
            cobranzaActual
        });

        
    } catch (error) {
        console.log( error );
        res.status(500).json({
            ok: false,
            msg: 'Hable con el Administrador'
        });
    }
}



const eliminarCobranza = async ( req, res ) => {

    const uid = req.params.id;

    try {

        const cobranzaDB = await Cobranza.findById( uid );

        if( !cobranzaDB ) {
            return res.status(400).json({
                ok: false,
                msg: 'No existe una cobranza por ese ID'
            });
        }

        const cobranzaDelete = await Cobranza.findByIdAndDelete( uid );

        res.json({
            ok: true,
            cobranzaDelete
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
    getCobranza,
    getCobranzaPorUsuario,
    crearCobranza,
    actualiarCobranza,
    eliminarCobranza
}