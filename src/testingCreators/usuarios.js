const { Personal, Rol, Administrador, Ayudante, Chofer } = require('../db')
const bcrypt = require('bcryptjs');

// const choferes = [
//     {
//         name: 'Luis',
//         lastname: 'Duran',
//         email: 'LuisDuran@gmail.com',
//         password: '123456789',
//         rut: '123456789',
//     },
//     {
//         name: 'Jornan',
//         lastname: 'Acurero',
//         email: 'jornanAcurero@gmail.com',
//         password: '123456789',
//         rut: '123456789',
//     },
//     {
//         name: 'Luis Atencio',
//         lastname: 'Coronado',
//         email: 'luisCoronado@gmail.com',
//         password: '123456789',
//         rut: '123456789',
//     },
//     {
//         name: 'Carlos',
//         lastname: 'Vargas',
//         email: 'carlosVargas@gmail.com',
//         password: '123456789',
//         rut: '123456789',
//     },
//     {
//         name: 'Nilander',
//         lastname: 'Moreno',
//         email: 'nilanderMoreno@gmail.com',
//         password: '123456789',
//         rut: '123456789',
//     },
//     {
//         name: 'Wander',
//         lastname: 'Lubin',
//         email: 'wandellLubin@gmail.com',
//         password: '123456789',
//         rut: '123456789',
//     },
//     {
//         name: 'Ariennys',
//         lastname: 'Vidal',
//         email: 'AriennysVidal@gmail.com',
//         password: '123456789',
//         rut: '123456789',
//     },
//     {
//         name: 'Jhonatan',
//         lastname: 'Cubillan',
//         email: 'jhonatanCubillan@gmail.com',
//         password: '123456789',
//         rut: '123456789',
//     },
//     {
//         name: 'Roger',
//         lastname: 'Guevara',
//         email: 'rogerGuevara@gmail.com',
//         password: '123456789',
//         rut: '123456789',
//     },
//     {
//         name: 'Junior',
//         lastname: 'Rosales',
//         email: 'juniorRosales@gmail.com',
//         password: '123456789',
//         rut: '123456789',
//     },
//     {
//         name: 'Jose',
//         lastname: 'Hernandez',
//         email: 'joseHernandez@gmail.com',
//         password: '123456789',
//         rut: '123456789',
//     },
//     {
//         name: 'Vicente',
//         lastname: 'Ribeiro',
//         email: 'vicenteRibeiro@gmail.com',
//         password: '123456789',
//         rut: '123456789',
//     },
//     {
//         name: 'Jesus',
//         lastname: 'Montilla',
//         email: 'jesusLozada@gmail.com',
//         password: '123456789',
//         rut: '123456789',
//     },
//     {
//         name: 'Andral',
//         lastname: 'Jean',
//         email: 'andralJean@gmail.com',
//         password: '123456789',
//         rut: '123456789',
//     },
//     {
//         name: 'Jose',
//         lastname: 'villablanca',
//         email: 'joseVillablanca@gmail.com',
//         password: '123456789',
//         rut: '123456789',
//     },
//     {
//         name: 'Julio',
//         lastname: 'Palima',
//         email: 'julioPalima@gmail.com',
//         password: '123456789',
//         rut: '123456789',
//     },
//     {
//         name: 'Egnis',
//         lastname: 'Mato',
//         email: 'egnisMato@gmail.com',
//         password: '123456789',
//         rut: '123456789',
//     },
//     {
//         name: 'Luis Angel',
//         lastname: 'Coronado',
//         email: 'luisAngelCoronado@gmail.com',
//         password: '123456789',
//         rut: '123456789',
//     },
//     {
//         name: 'Jose',
//         lastname: 'Tucupido',
//         email: 'joseTucupido@gmail.com',
//         password: '123456789',
//         rut: '123456789',
//     },
//     {
//         name: 'Marcelo',
//         lastname: 'Jimenez',
//         email: 'marceloJimenez@gmail.com',
//         password: '123456789',
//         rut: '123456789',
//     },
//     {
//         name: 'Maikel',
//         lastname: 'Olmedillo',
//         email: 'maikelOlmedillo@gmail.com',
//         password: '123456789',
//         rut: '123456789',
//     },
//     {
//         name: 'Jose',
//         lastname: 'Orellana',
//         email: 'joseOrellana@gmail.com',
//         password: '123456789',
//         rut: '123456789',
//     },
//     {
//         name: 'Felipe',
//         lastname: 'Oria',
//         email: 'felipeOria@gmail.com',
//         password: '123456789',
//         rut: '123456789',
//     }
// ]

// const auxiliares = [
//     {
//         name: 'Jose',
//         lastname: 'Perez',
//         email: 'jose@gmail.com',
//         password: '123456789',
//         rut: '123456789',
//     },
//     {
//         name: 'Luis',
//         lastname: 'Gomez',  
//         email: 'Luis@gmail.com',
//         password: '123456789',
//         rut: '123456789',
//     },
//     {
//         name: 'Ana',
//         lastname: 'Gonzalez',
//         email: 'ana@gmail.com',
//         password: '123456789',
//         rut: '123456789',
//     }
// ]

// const ayudantes = [
//     {
//         name: 'Williams',
//         lastname: 'Veliz',
//         email: 'williamsVeliz@gmail.com',
//         password: '123456789',
//         rut: '123456789',
//     },
//     {
//         name: 'Daniel',
//         lastname: 'Valbuena',
//         email: 'danielValbuena@gmail.com',
//         password: '123456789',
//         rut: '123456789',
//     },
//     {
//         name: 'Carlos',
//         lastname: 'Quintero',
//         email: 'carlosQuintero@gmail.com',
//         password: '123456789',
//         rut: '123456789',
//     },
//     {
//         name: 'Peterson',
//         lastname: 'Sainta',
//         email: 'petersonSainta@gmail.com',
//         password: '123456789',
//         rut: '123456789',
//     },
//     {
//         name: 'Octavio',
//         lastname: 'Perez',
//         email: 'octavioPerez@gmail.com',
//         password: '123456789',
//         rut: '123456789',
//     },
//     {
//         name: 'Franklin',
//         lastname: 'Hernandez',
//         email: 'FranklinHernandez@gmail.com',
//         password: '123456789',
//         rut: '123456789',
//     },
//     {
//         name: 'Gregori',
//         lastname: 'Hernandez',
//         email: 'gregoryHernandez@gmail.com',
//         password: '123456789',
//         rut: '123456789',
//     },
//     {
//         name: 'Juan',
//         lastname: 'Galindo',
//         email: 'juanGalindo@gmail.com',
//         password: '123456789',
//         rut: '123456789',
//     },
//     {
//         name: 'Ruhander',
//         lastname: 'Diaz',
//         email: 'ruhanderDiaz@gmail.com',
//         password: '123456789',
//         rut: '123456789',
//     },
//     {
//         name: 'Christian',
//         lastname: 'Campos',
//         email: 'christianCampos@gmail.com',
//         password: '123456789',
//         rut: '123456789',
//     },
//     {
//         name: 'Juan',
//         lastname: 'Burgos',
//         email: 'juanBurgos@gmail.com',
//         password: '123456789',
//         rut: '123456789',
//     },
//     {
//         name: 'Jordan',
//         lastname: 'Briceño',
//         email: 'jordanBriceño@gmail.com',
//         password: '123456789',
//         rut: '123456789',
//     },
//     {
//         name: 'Jose',
//         lastname: 'Atencio',
//         email: 'JoseAtencio@gmail.com',
//         password: '123456789',
//         rut: '123456789',
//     },
//     {
//         name: 'Leivis',
//         lastname: 'Angalita',
//         email: 'leivisAngalita@gmail.com',
//         password: '123456789',
//         rut: '123456789',
//     },
// ]

const administradores = [
    {
        name: 'Jorge',
        lastname: 'Soto',
        email: 'jorgetalento@outlook.es',
        password: 'asdF123465',
        rut: '123456789',
    },
    {
        name: 'Raul',
        lastname: 'Gomez',
        email: 'raul@gmail.com',
        password: '123456789',
        rut: '123456789',
    },
    {
        name: 'Sofia',
        lastname: 'Gonzalez',
        email: 'sofia@gmail.com',
        password: '123456789',
        rut: '123456789',
    },
    {
        name: 'Irma',
        lastname: 'Perez',
        email: 'irmaperez.gea@gmail.com',
        password: 'anahisbelen',
        rut: '16247049-3',
    },
    {
        name: 'bodega',
        lastname: 'jorgegas',
        email: 'bodega@jorgegas.cl',
        password: '123456789',
        rut: '111111111',
    },
    {
        name: 'Maicol',
        lastname: 'Nieto',
        email: 'maicol.nieto@jorgegas.cl',
        password: 'Mans.,2020',
        rut: '18604289-1',
    },
    {
        name: 'Benjamin',
        lastname: 'Soto',
        email: 'benjaminsotoro@gmail.com',
        password: 'asdF1234',
        rut: '123456789',
    },
    {
        name: 'Jhoskar',
        lastname: 'Toro',
        email: 'jhoskartoro@gmail.com',
        password: 'Rafaeltoro741',
        rut: '123456789',
    }

]

const choferPeoneta = [
    {
        name: 'Luiggy',
        lastname: 'Coronado',
        email: 'luigiCoronado@gmail.com',
        password: '123456789',
        rut: '123456789',
    },
    {
        name: 'Luis',
        lastname: 'Duran',
        email: 'LuisDuran@gmail.com',
        password: '123456789',
        rut: '123456789',
    },
    {
        name: 'Jornan',
        lastname: 'Acurero',
        email: 'jornanAcurero@gmail.com',
        password: '123456789',
        rut: '123456789',
    },
    {
        name: 'Luis Manuel',
        lastname: 'Coronado',
        email: 'luisCoronado@gmail.com',
        password: '123456789',
        rut: '123456789',
    },
    {
        name: 'Carlos',
        lastname: 'Vargas',
        email: 'carlosVargas@gmail.com',
        password: '123456789',
        rut: '123456789',
    },
    {
        name: 'Nilander',
        lastname: 'Moreno',
        email: 'nilanderMoreno@gmail.com',
        password: '123456789',
        rut: '123456789',
    },
    {
        name: 'Wander',
        lastname: 'Lubin',
        email: 'wandellLubin@gmail.com',
        password: '123456789',
        rut: '123456789',
    },
    {
        name: 'Ariennys',
        lastname: 'Vidal',
        email: 'AriennysVidal@gmail.com',
        password: '123456789',
        rut: '123456789',
    },
    {
        name: 'Jhonatan',
        lastname: 'Cubillan',
        email: 'jhonatanCubillan@gmail.com',
        password: '123456789',
        rut: '123456789',
    },
    {
        name: 'Roger',
        lastname: 'Guevara',
        email: 'rogerGuevara@gmail.com',
        password: '123456789',
        rut: '123456789',
    },
    {
        name: 'Junior',
        lastname: 'Rosales',
        email: 'juniorRosales@gmail.com',
        password: '123456789',
        rut: '123456789',
    },
    {
        name: 'Jose',
        lastname: 'Hernandez',
        email: 'joseHernandez@gmail.com',
        password: '123456789',
        rut: '123456789',
    },
    {
        name: 'Vicente',
        lastname: 'Ribeiro',
        email: 'vicenteRibeiro@gmail.com',
        password: '123456789',
        rut: '123456789',
    },
    {
        name: 'Jesus',
        lastname: 'Montilla',
        email: 'jesusLozada@gmail.com',
        password: '123456789',
        rut: '123456789',
    },
    {
        name: 'Andral',
        lastname: 'Jean',
        email: 'andralJean@gmail.com',
        password: '123456789',
        rut: '123456789',
    },
    {
        name: 'Jose',
        lastname: 'villablanca',
        email: 'joseVillablanca@gmail.com',
        password: '123456789',
        rut: '123456789',
    },
    {
        name: 'Julio',
        lastname: 'Palima',
        email: 'julioPalima@gmail.com',
        password: '123456789',
        rut: '123456789',
    },
    {
        name: 'Egnis',
        lastname: 'Mato',
        email: 'egnisMato@gmail.com',
        password: '123456789',
        rut: '123456789',
    },
    {
        name: 'Luis Angel',
        lastname: 'Coronado',
        email: 'luisAngelCoronado@gmail.com',
        password: '123456789',
        rut: '123456789',
    },
    {
        name: 'Alejandro',
        lastname: 'Tucupido',
        email: 'joseTucupido@gmail.com',
        password: '123456789',
        rut: '123456789',
    },
    {
        name: 'Marcelo',
        lastname: 'Jimenez',
        email: 'marceloJimenez@gmail.com',
        password: '123456789',
        rut: '123456789',
    },
    {
        name: 'Maikel',
        lastname: 'Olmedillo',
        email: 'maikelOlmedillo@gmail.com',
        password: '123456789',
        rut: '123456789',
    },
    {
        name: 'Jose',
        lastname: 'Orellana',
        email: 'joseOrellana@gmail.com',
        password: '123456789',
        rut: '123456789',
    },
    {
        name: 'Felipe',
        lastname: 'Oria',
        email: 'felipeOria@gmail.com',
        password: '123456789',
        rut: '123456789',
    }
]

const peonetaChofer = [
    {
        name: 'Williams',
        lastname: 'Veliz',
        email: 'williamsVeliz@gmail.com',
        password: '123456789',
        rut: '123456789',
    },
    {
        name: 'Daniel',
        lastname: 'Valbuena',
        email: 'danielValbuena@gmail.com',
        password: '123456789',
        rut: '123456789',
    },
    {
        name: 'Carlos',
        lastname: 'Quintero',
        email: 'carlosQuintero@gmail.com',
        password: '123456789',
        rut: '123456789',
    },
    {
        name: 'Peterson',
        lastname: 'Sainta',
        email: 'petersonSainta@gmail.com',
        password: '123456789',
        rut: '123456789',
    },
    {
        name: 'Octavio',
        lastname: 'Perez',
        email: 'octavioPerez@gmail.com',
        password: '123456789',
        rut: '123456789',
    },
    {
        name: 'Franklin',
        lastname: 'Hernandez',
        email: 'FranklinHernandez@gmail.com',
        password: '123456789',
        rut: '123456789',
    },
    {
        name: 'Gregori',
        lastname: 'Hernandez',
        email: 'gregoryHernandez@gmail.com',
        password: '123456789',
        rut: '123456789',
    },
    {
        name: 'Juan',
        lastname: 'Galindo',
        email: 'juanGalindo@gmail.com',
        password: '123456789',
        rut: '123456789',
    },
    {
        name: 'Ruhander',
        lastname: 'Diaz',
        email: 'ruhanderDiaz@gmail.com',
        password: '123456789',
        rut: '123456789',
    },
    {
        name: 'Christian',
        lastname: 'Campos',
        email: 'christianCampos@gmail.com',
        password: '123456789',
        rut: '123456789',
    },
    {
        name: 'Juan',
        lastname: 'Burgos',
        email: 'juanBurgos@gmail.com',
        password: '123456789',
        rut: '123456789',
    },
    {
        name: 'Jordan',
        lastname: 'Briceño',
        email: 'jordanBriceño@gmail.com',
        password: '123456789',
        rut: '123456789',
    },
    {
        name: 'Jose',
        lastname: 'Atencio',
        email: 'JoseAtencio@gmail.com',
        password: '123456789',
        rut: '123456789',
    },
    {
        name: 'Leivis',
        lastname: 'Angalita',
        email: 'leivisAngalita@gmail.com',
        password: '123456789',
        rut: '123456789',
    },
]

// const createChoferes = async () => {

//     choferes.map(c => async function () {

//         const actualChofer = await Personal.create({
//             name: c.name,
//             lastname: c.lastname,
//             email: c.email,
//             password: bcrypt.hashSync(c.password, 10),
//             rut: c.rut,
//         });

//         // Seteo el chofer al personal
//         const chofer = await Chofer.create();
//         actualChofer.setChofer(chofer);

//         // Seteo el rol al personal
//         const rol = await Rol.findOne({
//             where: {
//                 name: 'Chofer'
//             }
//         });
//         actualChofer.addRols(rol);

//     }())
// };

// const createAuxiliares = async () => {

//     auxiliares.map(c => async function () {

//         const actualAuxiliar = await Personal.create({
//             name: c.name,
//             lastname: c.lastname,
//             email: c.email,
//             password: bcrypt.hashSync(c.password, 10),
//             rut: c.rut,
//         });

//         // Seteo el auxiliar al personal
//         const auxiliar = await Auxiliar.create();
//         actualAuxiliar.setAuxiliar(auxiliar);

//         // Seteo el rol al personal
//         const rol = await Rol.findOne({
//             where: {
//                 name: 'Auxiliar'
//             }
//         });
//         actualAuxiliar.setRol(rol);

//     }())
// };

// const createAyudantes = async () => {

//     ayudantes.map(c => async function () {

//         const actualAyudante = await Personal.create({
//             name: c.name,
//             lastname: c.lastname,
//             email: c.email,
//             password: bcrypt.hashSync(c.password, 10),
//             rut: c.rut,
//         });

//         // Seteo el ayudante al personal
//         const ayudante = await Ayudante.create();
//         actualAyudante.setAyudante(ayudante);

//         // Seteo el rol al personal
//         const rol = await Rol.findOne({
//             where: {
//                 name: 'Ayudante'
//             }
//         });
//         actualAyudante.addRols(rol);

//     }())
// };

const createChoferPeoeneta = async () => {

    choferPeoneta.map(c => async function () {

        const actualChoferPeoneta = await Personal.create({
            name: c.name,
            lastname: c.lastname,
            email: c.email,
            password: bcrypt.hashSync(c.password, 10),
            rut: c.rut,
        });

        // Seteo el ayudante al personal
        const chofer = await Chofer.create();
        const peoneta = await Ayudante.create();

        await actualChoferPeoneta.setChofer(chofer);
        await actualChoferPeoneta.setAyudante(peoneta);

        // Seteo el rol al personal
        const rolChofer = await Rol.findOne({
            where: {
                name: 'Chofer'
            }
        });
        const rolPeoneta = await Rol.findOne({
            where: {
                name: 'Ayudante'
            }
        });

        actualChoferPeoneta.addRols([rolChofer, rolPeoneta]);

    }())
};

const createPeonetaChofer = async () => {

    peonetaChofer.map(c => async function () {

        const actualPeonetaChofer = await Personal.create({
            name: c.name,
            lastname: c.lastname,
            email: c.email,
            password: bcrypt.hashSync(c.password, 10),
            rut: c.rut,
        });

        // Seteo el ayudante al personal
        const peoneta = await Ayudante.create();
        const chofer = await Chofer.create();

        await actualPeonetaChofer.setAyudante(peoneta);
        await actualPeonetaChofer.setChofer(chofer);

        // Seteo el rol al personal
        const rolPeoneta = await Rol.findOne({
            where: {
                name: 'Ayudante'
            }
        });
        const rolChofer = await Rol.findOne({
            where: {
                name: 'Chofer'
            }
        });

        actualPeonetaChofer.addRols([rolPeoneta, rolChofer]);

    }())
};

const createAdministradores = async () => {

    administradores.map(c => async function () {

        const actualAdministrador = await Personal.create({
            name: c.name,
            lastname: c.lastname,
            email: c.email,
            password: bcrypt.hashSync(c.password, 10),
            rut: c.rut,
        });

        // Seteo el administrador al personal
        const administrador = await Administrador.create();
        actualAdministrador.setAdministrador(administrador);

        // Seteo el rol al personal
        const rol = await Rol.findOne({
            where: {
                name: 'Administrador'
            }
        });
        actualAdministrador.addRols(rol);

    }())
};


module.exports = {
    // createChoferes,
    // createAuxiliares,
    // createAyudantes,
    createAdministradores,
    createChoferPeoeneta,
    createPeonetaChofer
};



