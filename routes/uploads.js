/*
    Ruta
    /api/uploads
*/
const { Router } = require('express');
const exfileUpload = require('express-fileupload');
const { fileUploads, mostrarImagen } = require('../controllers/uploads');


const router = Router();


router.use(exfileUpload({ createParentPath: true }));



router.put('/:tipo/:id', fileUploads );


router.get('/:tipo/:foto', mostrarImagen );











module.exports = router;
