const sequelize = require('sequelize');
const {DataTypes} = require('sequelize');

module.exports = (sequelize)=>{
    sequelize.define('listaDePrecios',{
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        precio5kg : {
            type: DataTypes.BIGINT,
        },
        precio11kg : {
            type: DataTypes.BIGINT,
        },
        precio15kg : {
            type: DataTypes.BIGINT,
        },
        precio45kg : {
            type: DataTypes.BIGINT,
        },
        active : {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
    },{
        timestamps : false
    })
}