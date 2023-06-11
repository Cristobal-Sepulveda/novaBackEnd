const Router = require('express');
const router = Router();
const { getAuxiliares, getAuxiliarById} = require('./AuxiliarController');
const { check } = require('express-validator');
const { idVerify } = require('../../helpers/DBValidators');
const { validateFields } = require('../../helpers/FieldValidators');


router.get('/', getAuxiliares);

router.get('/:id',[
    check('id').custom(idVerify),
    validateFields
], getAuxiliarById);

module.exports = router;