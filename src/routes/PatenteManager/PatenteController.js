const { Patentes, OrdenDeReparto } = require('../../db');

const getPatentes = async (req, res) => {
    try {
        const patentes = await Patentes.findAll({
            where: {
                active : false,
                habilitada : true
            },
            include: {
                model: OrdenDeReparto,
            },
            order : [
                ['id', 'ASC']
            ]
        });
        res.json(patentes);
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
};

const getAllPatentes = (req, res) => {
    Patentes.findAll()
        .then(patentes => res.json(patentes))
        .catch(err => console.log(err));
};

const habilitarPatente = async (req, res) => {
    const { id } = req.params;
    try {
        const patente = await Patentes.findByPk(id);

        await patente.update({
            habilitada : true
        });

        res.json({
            msg : 'Patente habilitada',
            patente
        });
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
};

const deshabilitarPatente = async (req, res) => {
    const { id } = req.params;
    try {
        const patente = await Patentes.findByPk(id);
        
        await patente.update({
            habilitada : false
        });

        res.json({
            msg : 'Patente deshabilitada',
            patente
        });
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
};

const createPatente = async (req, res) => {

    const { name } = req.body;
    try {
        const newPatente = await Patentes.create({ name });
        res.json(newPatente);
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
};



module.exports = {
    getPatentes,
    getAllPatentes,
    createPatente,
    habilitarPatente,
    deshabilitarPatente
}