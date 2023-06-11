const { Personal, Chofer, Rol } = require('../../db')

const getChofer = async (req, res) => {

    const choferes = await Chofer.findAll({
        include: [{
            model: Personal,
            include: [{
                model: Rol
            }]
        }]
    });
    res.json(choferes);
}

const getChoferById = async (req, res) => {
    const { id } = req.params;
    const chofer = await Chofer.findOne({
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
    res.json(chofer);
}

const getAllChoferNames = async (req, res) => {
    
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
                        name: 'Chofer'
                    }
                },
                {
                    model: Chofer
                }
            ]
        });

        const choferes = personalActivo.filter(persona => persona.rols[0].name === 'Chofer');
        const choferes2 = personalActivo.filter(persona => persona?.rols[1]?.name === 'Chofer');

        res.json([...choferes, ...choferes2]);

    } catch (error) {
        res.status(500).json({
            msg: error.message
        });
    }
}


module.exports = {
    getChofer,
    getChoferById,
    getAllChoferNames,
}
