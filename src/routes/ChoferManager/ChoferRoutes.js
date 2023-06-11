const Router = require('express');
const router = Router();
const { getChofer, getChoferById, getAllChoferNames } = require('./ChoferController');
const { check } = require('express-validator');
const { idVerify } = require('../../helpers/DBValidators');
const { validateFields } = require('../../helpers/FieldValidators');

// Importar todos los routers;

router.get('/', getChofer);
router.get('/names', getAllChoferNames);
router.get('/:id',[
    check('id').custom(idVerify),
    validateFields
], getChoferById);


module.exports = router;