const Router = require('express');
const router = Router();
const { check } = require('express-validator');
const { validateFields } = require('../../helpers/FieldValidators');
const { login, logout, renewToken, logoutAux } = require('./AuthController');

// Importar todos los routers;

router.post('/login', [
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    validateFields
], login);

router.post('/logout', logout);

router.post('/logoutAux', logoutAux);

router.get('/renew', renewToken);

module.exports = router;