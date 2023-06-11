const { Personal } = require('../db');

const emailVerify = async (email = '') => {
    const emailExist = await Personal.findOne({
        where: {
            email
        }
    });
    if (emailExist) {
        throw new Error(`El email ${email} ya existe`);
    }
}

const idVerify = async (id = '') => {
    const idExist = await Personal.findOne({
        where: {
            id
        }
    });
    if (!idExist) {
        throw new Error(`El id ${id} no existe`);
    }
};

module.exports = {
    emailVerify,
    idVerify
}