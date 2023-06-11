const { Auxiliar, Personal, Rol } = require('../../db')

const getAuxiliares = async (req, res) => {
    
        Personal.findAll({
            where : {
                rolId : 2
            },
            include : [{
                model : Auxiliar,
                model: Rol
            }]
        })
        .then(auxiliares => {
            res.json(auxiliares)
        });
    }

const getAuxiliarById = async (req, res) => {
    const { id } = req.params;

    const auxiliar = await Auxiliar.findOne({
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
    res.json(auxiliar);
}

module.exports = {
    getAuxiliares,
    getAuxiliarById,
}
