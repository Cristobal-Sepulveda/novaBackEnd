const { InventarioVales } = require('../db');

const createInventarioVales = () => {
    InventarioVales.create({
        fisico5kg: 0,
        fisico11kg: 0,
        fisico15kg: 0,
        fisico45kg: 0,
        digital5kg: 0,
        digital11kg: 0,
        digital15kg: 0,
        digital45kg: 0,
        totalValesFisicos: 0,
        totalValesDigitales: 0,
        totalValesAmbos: 0,
    });
}

module.exports = createInventarioVales