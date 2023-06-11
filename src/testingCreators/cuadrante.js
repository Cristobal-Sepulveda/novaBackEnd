const { Cuadrante } = require('../db');

const createCuadrantes = () => {
    Cuadrante.create({ name: 'Nocedal 1'});
    Cuadrante.create({ name: 'Maipu Bajo'});
    Cuadrante.create({ name: 'La cisterna'});
    Cuadrante.create({ name: 'Peñalolen'});
    Cuadrante.create({ name: 'Macul'});
    Cuadrante.create({ name: 'San miguel'});
    Cuadrante.create({ name: 'La granja'});
    Cuadrante.create({ name: 'Pedro aguirre cerda'});
    Cuadrante.create({ name: 'San joaquin'});
    Cuadrante.create({ name: 'Apoyo Raqueles'});
    Cuadrante.create({ name: 'Raquel Baja'});
    Cuadrante.create({ name: 'Florida alta alta'});
    Cuadrante.create({ name: 'Caletas 2'});
    Cuadrante.create({ name: 'Apoyo caletas'});
    Cuadrante.create({ name: 'Florida baja'});
    Cuadrante.create({ name: 'Caletas 1'});
    Cuadrante.create({ name: 'Foresta'});
    Cuadrante.create({ name: 'Santo tomas'});
    Cuadrante.create({ name: 'Raquel alta'});
    Cuadrante.create({ name: 'Maipu Alta'});    
    Cuadrante.create({ name: 'Nocedal 2'});
};

module.exports = createCuadrantes;

