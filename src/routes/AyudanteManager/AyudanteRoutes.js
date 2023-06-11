const Router = require('express');
const router = Router();
const { getAyudantes, getAyudanteById, getAllAyudanteNames } = require('./AyudanteController');
const { check } = require('express-validator');
const { idVerify } = require('../../helpers/DBValidators');
const { validateFields } = require('../../helpers/FieldValidators');

router.get('/', getAyudantes);

router.get('/names', getAllAyudanteNames);

router.get('/:id',[
    check('id').custom(idVerify),
    validateFields
], getAyudanteById);


module.exports = router;