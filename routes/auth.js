/*
    Ruta de Admin
    /api/auth
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { crearAdmin, loginAdmin, revalidarToken, actualizarAdmin, getAdmin, getAdminPorID, cambioClave, eliminarAdmin } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const router = Router();





router.get('/adminTodos', getAdmin );


router.get('/buscar/:id', getAdminPorID );




router.post('/new',
    [
        check('nombre', 'El Nombre Es Obligatorio').not().isEmpty(),
        check('email', 'El Email Es Obligatorio').isEmail(),
        check('password', 'El Password debe de ser Minimo de 6 Caracteres').isLength({ min: 5 }),
        validarCampos
    ],
    crearAdmin );


router.post('/', 
    [
        check('email', 'El Email Es Obligatorio').isEmail(),
        check('password', 'El Password debe de ser Minimo de 6 Caracteres').isLength({ min: 3 }),
        validarCampos
    ],
    loginAdmin );




    

router.get('/renew', validarJWT, revalidarToken );



router.put('/actualizar/:id', actualizarAdmin );



router.put('/clave', validarJWT, cambioClave );



router.delete('/:id', eliminarAdmin );











module.exports = router;