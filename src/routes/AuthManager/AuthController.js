// const { response } = require('./AuthRoutes');
const bcrypt = require('bcryptjs');
const { JWTGenerator } = require('../../helpers/JWTGenerator');
const { Personal, Rol, Administrador } = require('../../db');

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const usuario = await Personal.findOne({
            where: {
                email
            }, 
            include: [
                {
                    model: Rol
                },
                {
                    model: Administrador
                }
            ]
        });

        if (!usuario) {
            return res.status(400).json({
                ok: false,
                msg: 'El usuario no existe'
            });
        }

        if(usuario.online === true) {
            return res.status(400).json({
                ok: false,
                msg: 'El usuario ya está logueado'
            });
        }

        const validPassword = bcrypt.compareSync(password, usuario.password);
        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Contraseña incorrecta'
            });
        }
        const token = await JWTGenerator(usuario.id);
        await usuario.update({online: true})
        res.json({
            ok: true,
            usuario,
            token
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: error.message
        });
    };
};

const logout = async (req, res) => {
    const { id } = req.body;
    try {
        const usuario = await Personal.findOne({
            where: {
                id
            }
        });
        if (!usuario) {
            return res.status(400).json({
                ok: false,
                msg: 'El usuario no existe'
            });
        }
        await usuario.update({online: false})
        res.json({
            ok: true,
            usuario
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: error.message
        });
    };
};

const logoutAux = async (req, res) => {
    const { email, password } = req.body;

    try {
        const usuario = await Personal.findOne({
            where: {
                email
            }
        });

        if (!usuario) {
            return res.status(400).json({
                ok: false,
                msg: 'El usuario no existe'
            });
        }

        const validPassword = bcrypt.compareSync(password, usuario.password);
        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Contraseña incorrecta'
            });
        }
        if(usuario.online === false) {
            //mando un mensaje en el error de que el usuario no está logueado
            return res.status(400).json({
                ok: false,
                msg: 'Todas las sesiones ya están cerradas'
            });
        }
        await usuario.update({online: false})
        res.json({
            ok: true,
            usuario
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: error.message
        });
    };
};


const renewToken = async (req, res = response) => {

    const user = req.user;

    const token = await JWTGenerator(user.id);

    console.log("Soy el usuario que renueva el token", user.ToJSON());

    res.json({
        ok: true,
        user,
        token
    });
};

module.exports = {
    login,
    logout,
    renewToken,
    logoutAux
}