const { Ayudante, Personal, Rol } = require('../../db')


const getAyudantes = async (req, res) => {
    
    const ayudantes = await Ayudante.findAll({
        include: [{
            model: Personal,
            include: [{
                model: Rol
            }]
        }]
    });
    res.json(ayudantes);
}

const getAyudanteById = async (req, res) => {
    const { id } = req.params;

    const ayudante = await Ayudante.findOne({
        where: {
            id
        },
        include: [{
            model: Personal,
            include: [{
                model: Rol
            }]
        }]
    });
    res.json(ayudante);
}

const getAllAyudanteNames = async (req, res) => {
    try {
        const personalActivo = await Personal.findAll({
            attributes: ['name', 'lastname'],
            where: {
                activeForOrden: true
            },
            include: [
                {
                    model: Rol,
                    where: {
                        name: 'Ayudante'
                    }, 
                },
                {
                    model: Ayudante
                }
            ]
        });

        const ayudantes = personalActivo.filter(personal => personal.rols[0].name === 'Ayudante');
        const ayudantes2 = personalActivo.filter(personal => personal?.rols[1]?.name === 'Ayudante');

        res.json([...ayudantes, ...ayudantes2]);
    } catch (error) {
        res.status(500).json({
            msg: error.message
        });
    }
}

module.exports = {
    getAyudantes,
    getAyudanteById,
    getAllAyudanteNames
}