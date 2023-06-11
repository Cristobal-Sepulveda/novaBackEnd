const { 
    Personal,
    Rol, 
    Chofer, 
    Auxiliar, 
    Ayudante, 
    Administrador,
    OrdenDeReparto
    } = require('../../db');

const bcrypt = require('bcryptjs');
const { Op } = require('sequelize');

const getPersonals = async (req, res) => {

    try {
        const personals = await Personal.findAll({
            include: [
                {
                    model: Rol,
                    attributes: ['name']
                }
            ]
        });
        res.json(personals);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

const createPersonal = async (req, res) => {
    const { name, lastname, email, password, rut, rol } = req.body;
    
    try {
        const newPersonal = await Personal.create({
            name,
            lastname,
            email,
            password: bcrypt.hashSync(password, 10),
            rut,
        }).catch(error => {
            if(error.message === 'llave duplicada viola restricción de unicidad «personals_email_key»'){
                res.status(400).json({message: 'El email ya existe'})
            }
        });

        if(rol === 'Chofer/Peoneta') {
            const newChofer = await Chofer.create();
            const newAyudante = await Ayudante.create();

            
            const rolChofer = await Rol.findOne({
                where: {
                    name: 'Chofer'
                }
            });
            const rolAyudante = await Rol.findOne({
                where: {
                    name: 'Ayudante'
                }
            });
            await newPersonal.setChofer(newChofer);
            await newPersonal.setAyudante(newAyudante);
            await newPersonal.addRols([rolChofer, rolAyudante]);
            res.json([newPersonal, newChofer, newAyudante]);
        } else {
        
            const newRol = await Rol.findOne({
                where: {
                    name: rol
                }
            });

            if (newPersonal && newRol) {
                switch (rol) {
                    case 'Chofer':
                        const newChofer = await Chofer.create();

                        if (newChofer) {
                            await newPersonal.setChofer(newChofer);
                            await newPersonal.addRols(newRol);
                            res.json([newPersonal, newChofer]);
                        }
                        break;
                    case 'Auxiliar':
                        const newAuxiliar = await Auxiliar.create();

                        if (newAuxiliar) {
                            await newPersonal.setAuxiliar(newAuxiliar);
                            await newPersonal.addRols(newRol);
                            res.json([newPersonal, newAuxiliar]);
                        }
                        break;
                    case 'Ayudante':
                        const newAyudante = await Ayudante.create();

                        if (newAyudante) {
                            await newPersonal.setAyudante(newAyudante);
                            await newPersonal.addRols(newRol);
                            res.json([newPersonal, newAyudante]);
                        }
                        break;
                    case 'Administrador':
                        const newAdministrador = await Administrador.create();

                        if (newAdministrador) {
                            await newPersonal.setAdministrador(newAdministrador);
                            await newPersonal.addRols(newRol);
                            res.json([newPersonal, newAdministrador]);
                        }
                        break;
                    default:
                        res.status(400).json({ message: 'No se pudo crear el personal' });
                        break;
                }
            }
        }
    } catch
    (error) {
        res.status(400).json({ message: error.message });
    }
}

const getOnlyChofercWithFaltantesBetweenDates = async (req, res) => {
    const { fechaInicio, fechaFin } = req.params;   

    try {
        
        let ordenesDeReparto

        if (!fechaFin || fechaFin === "undefined" || fechaFin === null){
            ordenesDeReparto = await OrdenDeReparto.findAll({
                where: {
                    faltanteChofer: {
                        [Op.gt]: 0
                    },
                    fecha: fechaInicio
                },
                include: [
                    {
                        model: Chofer,
                        include: [
                            {
                                model: Personal
                            }
                        ]
                    }
                ]
            });
        } else {

        //traigo todas las ordenes de reparto en donde el atributo faltanteChofer que sean mayores a 0
            ordenesDeReparto = await OrdenDeReparto.findAll({
                where: {
                    faltanteChofer: {
                        [Op.gt]: 0
                    },
                    fecha: {
                        [Op.between]: [fechaInicio, fechaFin]
                    }
                },
                include: [
                    {
                        model: Chofer,
                        include: [
                            {
                                model: Personal
                            }
                        ]
                    }
                ]
            });
        }

        //traigo todos los choferes que tengan ordenes de reparto sin que se repitan entre las fechas pasadas por parametro
        const choferes = await Chofer.findAll({
            where: {
                id: {
                    [Op.in]: ordenesDeReparto.map(orden => orden.chofer.id)
                }
            },
            include: [
                {
                    model: Personal,
                    attributes: ['name', 'lastname']
                }
            ]
        });

        // se calcula el total de faltantes de cada chofer y ayudante manejando promesas
        const choferesWithFaltantes = await Promise.all(choferes.map(async (chofer) => {
            const faltantes = ordenesDeReparto.filter(orden => orden.chofer.id === chofer.id);
            const totalFaltantes = faltantes.reduce((acc, orden) => acc + Number(orden.faltanteChofer), 0);
            const name = chofer.personal.name ;
            const lastname = chofer.personal.lastname;	
            return {
                faltantes,
                totalFaltantes,
                name,
                lastname
            }
        }));

        res.json(choferesWithFaltantes);

    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

const getOnlyAyudantesWithFaltantesBetweenDates = async (req, res) => {
    const { fechaInicio, fechaFin } = req.params;

    try {

        let ordenesDeReparto

        if(!fechaFin || fechaFin === "undefined" || fechaFin === null){
            ordenesDeReparto = await OrdenDeReparto.findAll({
                where: {
                    faltantePeoneta: {
                        [Op.gt]: 0
                    },
                    fecha: fechaInicio
                },
                include: [
                    {
                        model: Ayudante,
                        include: [
                            {
                                model: Personal
                            }
                        ]
                    }
                ]
            });
        } else {

        //traigo todas las ordenes de reparto en donde el atributo faltanteAyudante que sean mayores a 0
            ordenesDeReparto = await OrdenDeReparto.findAll({
                where: {
                    faltantePeoneta: {
                        [Op.gt]: 0
                    },
                    fecha: {
                        [Op.between]: [fechaInicio, fechaFin]
                    }
                },
                include: [
                    {
                        model: Ayudante,
                        include: [
                            {
                                model: Personal
                            }
                        ]
                    }
                ]
            });
        }

        //traigo todos los ayudantes que tengan ordenes de reparto sin que se repitan entre las fechas pasadas por parametro
        const ayudantes = await Ayudante.findAll({
            where: {
                id: {
                    [Op.in]: ordenesDeReparto.map(orden => orden.ayudante.id)
                }
            },
            include: [
                {
                    model: Personal,
                    attributes: ['name', 'lastname']
                }
            ]
        });
        // se calcula el total de faltantes de cada chofer y ayudante manejando promesas
        const ayudantesWithFaltantes = await Promise.all(ayudantes.map(async (ayudante) => {
            const faltantes = ordenesDeReparto.filter(orden => orden.ayudante.id === ayudante.id);
            const totalFaltantes = faltantes.reduce((acc, orden) => acc + Number(orden.faltantePeoneta), 0);
            const name = ayudante.personal.name ;
            const lastname = ayudante.personal.lastname;
            return {
                faltantes,
                totalFaltantes,
                name,
                lastname
            }
        }));

        res.json(ayudantesWithFaltantes);

    } catch (error) {
        res.status(400).json({error: error.message});
    }
};

const getAllFaltantesBetweenDates = async (req, res) => {
    const { fechaInicio, fechaFin, administradorId } = req.params;

    try {

        let ordenesDeReparto

        if(administradorId === 'all') {
            if(!fechaFin || fechaFin === "undefined" || fechaFin === null){
                ordenesDeReparto = await OrdenDeReparto.findAll({
                    where: {
                        [Op.or]: [
                            {
                                faltanteChofer: {
                                    [Op.gt]: 0
                                }
                            },
                            {
                                faltantePeoneta: {
                                    [Op.gt]: 0
                                }
                            }
                        ],
                        fecha: fechaInicio
                    }
                });
            } else {

                ordenesDeReparto = await OrdenDeReparto.findAll({
                    where: {
                        [Op.or]: [
                            {
                                faltanteChofer: {
                                    [Op.gt]: 0
                                }
                            },
                            {
                                faltantePeoneta: {
                                    [Op.gt]: 0
                                }
                            }
                        ],
                        fecha: {
                            [Op.between]: [fechaInicio, fechaFin]
                        }
                    }
                });
            }
        } else {
            if(!fechaFin || fechaFin === "undefined" || fechaFin === null){
                ordenesDeReparto = await OrdenDeReparto.findAll({
                    where: {
                        [Op.or]: [
                            {
                                faltanteChofer: {
                                    [Op.gt]: 0
                                }
                            },
                            {
                                faltantePeoneta: {
                                    [Op.gt]: 0
                                }
                            }
                        ],
                        fecha: fechaInicio,
                        cuadradoPor: administradorId
                    }
                });
            } else {

                ordenesDeReparto = await OrdenDeReparto.findAll({
                    where: {
                        [Op.or]: [
                            {
                                faltanteChofer: {
                                    [Op.gt]: 0
                                }
                            },
                            {
                                faltantePeoneta: {
                                    [Op.gt]: 0
                                }
                            }
                        ],
                        fecha: {
                            [Op.between]: [fechaInicio, fechaFin]
                        },
                        cuadradoPor: administradorId
                    }
                });
            }
        }

        // sumo todos los atributos faltanChofer y faltantePeoneta de las ordenes de reparto
        const totalFaltantes = ordenesDeReparto.reduce((acc, orden) => acc + Number(orden.faltanteChofer) + Number(orden.faltantePeoneta), 0);

        res.json(totalFaltantes);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
};

const changeActiveForOrdenById = async (req, res) => {
    const { personalId } = req.params;

    try {
        const personal = await Personal.findByPk(personalId);

        if(!personal) {
            return res.status(404).json({error: 'Personal no encontrado'});
        }

        await personal.update({
            activeForOrden: !personal.activeForOrden
        });

        res.json(personal);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

const modifyPersonal = async (req, res, next) => {
    const { personalId } = req.params;
    const { name, lastname, email, rut, lastPassword, password } = req.body;

    try {

        const personal = await Personal.findByPk(personalId);

        if(!personal) {
            return res.status(404).json({error: 'Personal no encontrado'});
        }

        if(lastPassword && password) {
            const isPasswordCorrect = await bcrypt.compare(lastPassword, personal.password);

            if(!isPasswordCorrect) {
                return res.status(400).json({error: 'Contraseña incorrecta'});
            }

            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            
            await personal.update({
                name,
                lastname,
                email,
                rut,
                password: hashedPassword
            });
        } else {
            await personal.update({
                name,
                lastname,
                email,
                rut
            });
        }
        
        res.json(personal);
    } catch (error) {
        next(error);
    }
}


module.exports = {
    getPersonals,
    createPersonal,
    getOnlyChofercWithFaltantesBetweenDates,
    getOnlyAyudantesWithFaltantesBetweenDates,
    getAllFaltantesBetweenDates,
    changeActiveForOrdenById,
    modifyPersonal
}
