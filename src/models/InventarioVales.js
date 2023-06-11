const sequelize = require('sequelize');
const {DataTypes} = require('sequelize');

module.exports = (sequelize)=>{
    sequelize.define('InventarioVales',{
        fisico5kg : {
            type: DataTypes.BIGINT,
            defaultValue: 0
        },
        fisico11kg : {
            type: DataTypes.BIGINT,
            defaultValue: 0
        },
        fisico15kg : {
            type: DataTypes.BIGINT,
            defaultValue: 0
        },
        fisico45kg : {
            type: DataTypes.BIGINT,
            defaultValue: 0
        },
        totalValesFisicos : {
            type: DataTypes.BIGINT,
            defaultValue: 0
        },
        digital5kg : {
            type: DataTypes.BIGINT,
            defaultValue: 0
        },
        digital11kg : {
            type: DataTypes.BIGINT,
            defaultValue: 0
        },
        digital15kg : {
            type: DataTypes.BIGINT,
            defaultValue: 0
        },
        digital45kg : {
            type: DataTypes.BIGINT,
            defaultValue: 0
        },
        totalValesDigitales : {
            type: DataTypes.BIGINT,
            defaultValue: 0
        },
        totalValesAmbos : {
            type: DataTypes.BIGINT,
            defaultValue: 0
        },
    },{
        timestamps : false
    })
}