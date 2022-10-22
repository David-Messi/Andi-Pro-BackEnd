/*
    Ruta
    /api/cobranza
*/
const { Router } = require('express');
const { getCobranza, crearCobranza, getCobranzaPorUsuario, actualiarCobranza, eliminarCobranza } = require('../controllers/cobranza');



const router = Router();



router.get('/', getCobranza );



router.get('/buscar/:id', getCobranzaPorUsuario );



router.post('/', crearCobranza );



router.put('/:id', actualiarCobranza );



router.delete('/:id', eliminarCobranza );



// router.put('/:id', actualizarCaracter );
// router.put('/eliminar/:id', eliminarCaracter );











module.exports = router;