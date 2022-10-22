/*
    Rutas de Clientes
    /api/cliente
*/
const { Router } = require('express');
const { getCliente, getClientePorId, crearCliente, actualizarCliente, eliminarCliente } = require('../controllers/cliente');




const router = Router();




router.get('/', getCliente );


router.get('/:id', getClientePorId );


router.post('/', crearCliente );


router.put('/:id', actualizarCliente );


router.delete('/:id', eliminarCliente );





module.exports = router;