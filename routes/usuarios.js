/*
    Rutas de Usuario
    /api/usuario
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { getUsuarios, crearUsuarios, actualizarUsuarios, eliminarUsuarios, getUsuarioPorId, getUsuarioPorConjunto } = require('../controllers/usuarios');
const { validarCampos } = require('../middlewares/validar-campos');
const router = Router();






router.get('/', getUsuarios );

router.get('/:id', getUsuarioPorId );

router.get('/buscar/conjunto', getUsuarioPorConjunto );


router.post('/',
            [
                check('nombre', 'El Nombre Es Obligatorio').not().isEmpty(),
                // check('conjunto', 'El Conjunto debe de ser Valido').isMongoId(),
                // check('password', 'La Contraseña debe de ser de 6 caracteres').isLength({ min: 6 })
            ],
            validarCampos,
            crearUsuarios );


router.put('/:id', actualizarUsuarios );


router.delete('/:id', eliminarUsuarios );





module.exports = router;