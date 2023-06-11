const { ListaDePrecios } = require('../db');

function createPrecios() {
    ListaDePrecios.create({ 
        name: "Lista 3ra semana febrero 2023", 
        precio5kg: 11450,
        precio11kg: 17200,
        precio15kg: 24000,
        precio45kg: 71350,
        active: true
    });
}

module.exports = createPrecios
