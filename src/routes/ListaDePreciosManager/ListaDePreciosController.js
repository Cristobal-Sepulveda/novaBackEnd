const { ListaDePrecios, OrdenDeReparto } = require('../../db.js');

const getListaDePrecios = async (req, res) => {
    try {
        const listaDePrecios = await ListaDePrecios.findAll();
        res.json(listaDePrecios);
    } catch (error) {
        console.log(error);
    }
};

const createListaDePrecios = async (req, res) => {
    try {
        const { name, precio5kg, precio11kg, precio15kg, precio45kg } = req.body;

        const precio5kilos = Number(precio5kg);
        const precio11kilos = Number(precio11kg);
        const precio15kilos = Number(precio15kg);
        const precio45kilos = Number(precio45kg);


        const listaDePrecios = await ListaDePrecios.create({
            name,
            precio5kg: precio5kilos,
            precio11kg: precio11kilos,
            precio15kg: precio15kilos,
            precio45kg: precio45kilos,
        });
        res.json(listaDePrecios);
    } catch (error) {
        console.log(error);
    }
};

const activeListaDePrecios = async (req, res) => {
    try {
        const { id } = req.params;

        const listaAnterior = await ListaDePrecios.findOne({
            where: { active: true }
        });
        await listaAnterior.update({ active: false });

        const listaDePrecios = await ListaDePrecios.findOne({
            where: { id }
        });
        await listaDePrecios.update({ active: true });

        res.json(listaDePrecios);
    } catch (error) {
        console.log(error);
    }
};

const getListaDePreciosActive = async (req, res) => {
    try {
    const listaDePrecios = await ListaDePrecios.findOne({
        where: { active: true }
    });
    res.json(listaDePrecios);
    } catch (error) {
        console.log(error);
    }
};

const activeListaDePreciosAux = async (req, res) => {
    const { id } = req.params;
    try {
        const listaDePrecios = await ListaDePrecios.findByPk(id);
        await listaDePrecios.update({ active: true });
        res.json(listaDePrecios);
    } catch (error) {
        console.log(error);
    }
};


module.exports = {
    getListaDePrecios,
    createListaDePrecios,
    activeListaDePrecios,
    getListaDePreciosActive,
    activeListaDePreciosAux
}

