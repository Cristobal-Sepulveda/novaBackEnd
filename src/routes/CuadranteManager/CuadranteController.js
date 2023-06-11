const { Cuadrante } = require('../../db');

// obtener todos los cuadrantes

const getCuadrantes = async (req, res) => {
    try {
        const cuadrantes = await Cuadrante.findAll();
        res.json(cuadrantes);
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
};

const getCuadrantesActive = async (req, res) => {
    try {
        const cuadrantes = await Cuadrante.findAll({
            where: {
                active: true
            }
        });

        res.json(cuadrantes);
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
};

const createCuadrante = async (req, res) => {
    try {
        const { name } = req.body;

        let newCuadrante = await Cuadrante.create({
            name
        }, {
            fields: ['name']
        });

        if (newCuadrante) {
            return res.json({
                message: 'Cuadrante creado',
                data: newCuadrante
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Hubo un error',
            data: {}
        });
    }
};

const desactiveCuadrante = async (req, res) => {
    try {
        const { id } = req.params;

        const cuadrante = await Cuadrante.findByPk(id);

        if (!cuadrante) {
            return res.status(404).json({
                message: 'No se encontro el cuadrante',
                data: {}
            });
        }

        const desactive = await Cuadrante.update({
            active: false
        }, {
            where: {
                id
            }
        });

        if (desactive) {
            return res.json({
                message: 'Cuadrante desactivado',
                data: cuadrante
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Hubo un error',
            data: {}
        });
    }
};

const activeCuadrante = async (req, res) => {
    try {
        const { id } = req.params;

        const cuadrante = await Cuadrante.findByPk(id, {
            where: {
                active: false
            }
        });

        if (!cuadrante) {
            return res.status(404).json({
                message: 'No se encontro el cuadrante',
                data: {}
            });
        }

        const active = await Cuadrante.update({
            active: true
        }, {
            where: {
                id
            }
        });

        if (active) {
            return res.json({
                message: 'Cuadrante activado',
                data: cuadrante
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Hubo un error',
            data: {}
        });
    }
};

module.exports = {
    getCuadrantes,
    getCuadrantesActive,
    createCuadrante,
    desactiveCuadrante,
    activeCuadrante
}
