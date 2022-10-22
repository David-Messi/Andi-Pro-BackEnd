
/*
    Rutas de Conjuntos
    /api/conjunto
*/
const { Router } = require('express');
const { getConjuntos, crearConjunto, actualizarConjunto, eliminarConjunto, getConjuntoPorId, loginConjunto, revalidarToken } = require('../controllers/conjuntos');
const { validarJWT } = require('../middlewares/validar-jwt');


const router = Router();




router.get('/', getConjuntos );


router.get('/:id', getConjuntoPorId );


router.post('/', crearConjunto );


router.post('/login', loginConjunto );


router.put('/:id', actualizarConjunto );


router.delete('/:id', eliminarConjunto );


router.get('/renew/conjunto', validarJWT, revalidarToken );





module.exports = router;