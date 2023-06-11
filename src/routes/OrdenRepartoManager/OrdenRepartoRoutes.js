const Router = require('express');
const router = Router();
const { authMiddleware } = require('../../helpers/JWTGenerator');

const { 
        getOrdenesDeReparto, 
        getOrdenDeRepartoById, 
        createOrden, 
        RechargeOrden,
        changeRecharge,
        finalizeOrden,
        cuadrarOrden,
        getAllChoferOrdenesDeRepartoBetweenDates,
        getAllAyudanteOrdenesDeRepartoBetweenDates,
        sendEmailWithCode,
        getAllOrdenesByDate,
        getAllOrdenesWhereEstadoFalseByDate,
        getAllOrdenesWhereEstadoFalseBetweenDates,
        changeLlenos,
        desactiveRecarga,
        cambiarChoferDeOrden,
        cambiarAyudanteDeOrden,
        changeContabilidadOrdenById
    } = require('./OrdenRepartoController');

router.get('/', getOrdenesDeReparto);
router.get('/date/:date', authMiddleware, getAllOrdenesByDate);
router.get('/date/estado/:date', authMiddleware, getAllOrdenesWhereEstadoFalseByDate);
router.get('/date/estado/:fechaInicio/:fechaFin?', getAllOrdenesWhereEstadoFalseBetweenDates);
router.get('/:id', getOrdenDeRepartoById);
router.post('/', createOrden);
router.put('/:id', RechargeOrden);
router.put('/changeRecharge/:idOrden/:idRecarga', changeRecharge);
router.put('/changeLlenos/:idOrden', changeLlenos);
router.put('/finalize/:id', finalizeOrden);
router.put('/cuadrar/:id', cuadrarOrden);
router.put('/desactiveRecarga/:idOrden/:idRecarga', desactiveRecarga);
router.put('/cambiarChoferOPeonetaDeOrden/:idOrden/:idChofer', cambiarChoferDeOrden);
router.put('/cambiarAyudanteOPeonetaDeOrden/:idOrden/:idAyudante', cambiarAyudanteDeOrden);
router.put('/changeContabilidadOrdenById/:idContabilidad', changeContabilidadOrdenById);
router.get('/chofer/:id/:fechaInicio/:fechaFin?', getAllChoferOrdenesDeRepartoBetweenDates);
router.get('/ayudante/:id/:fechaInicio/:fechaFin?', getAllAyudanteOrdenesDeRepartoBetweenDates);
router.post('/sendEmail', sendEmailWithCode);

module.exports = router;