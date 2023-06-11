const { Rol } = require('../db')

const createRoles = () =>{
    Rol.create({ name: 'Administrador', comision: 0 });
    Rol.create({ name: 'Auxiliar', comision: 0 });
    Rol.create({ name: 'Chofer', comision: 350 });
    Rol.create({ name: 'Ayudante', comision: 150 });
}

module.exports = createRoles
