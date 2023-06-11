const Router = require('express');
const router = Router();
const { getPatentes, getAllPatentes, createPatente, deshabilitarPatente, habilitarPatente } = require('./PatenteController');

router.get('/', getPatentes);
router.get('/all', getAllPatentes);
router.post('/', createPatente);
router.put('/habilitar/:id', habilitarPatente);
router.put('/deshabilitar/:id', deshabilitarPatente);

module.exports = router;