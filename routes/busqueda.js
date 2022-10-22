
/*
    Rutas de Usuario
    /api/busqueda
*/
const { Router } = require('express');
const router = Router();

const { buscar, buscarPorConjunto, buscarPorUsuarioPorCojunto } = require('../controllers/busqueda');
const { validarJWT } = require('../middlewares/validar-jwt');



router.get('/tipo/:tipo/:busqueda', buscar );


router.get('/:termino', buscarPorConjunto );


router.get('/usuarioxconjunto/:termino', validarJWT, buscarPorUsuarioPorCojunto );







module.exports = router;