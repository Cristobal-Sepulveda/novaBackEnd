const Router = require('express');
const router = Router();
const { getCuadrantes, activeCuadrante, createCuadrante, desactiveCuadrante, getCuadrantesActive } = require('./CuadranteController');

router.get('/', getCuadrantes);
router.get('/active', getCuadrantesActive);
router.post('/', createCuadrante);
router.put('/desactive/:id', desactiveCuadrante);
router.put('/active/:id', activeCuadrante);

module.exports = router;