const Router = require('express');
const router = Router();
const { updateAbono, getAllMetodoPagosInOrdenDeRepartoBetweenDates, getallMetodoPagosInOrdenDeRepartoByAdministradorIdBetweenDates } = require('./MetodoPagosController.js');

router.put('/:id', updateAbono);
router.get('/:date1/:date2?', getAllMetodoPagosInOrdenDeRepartoBetweenDates);
router.get('/administrador/:administradorId/:fechaInicio/:fechaFin?', getallMetodoPagosInOrdenDeRepartoByAdministradorIdBetweenDates);

module.exports = router;