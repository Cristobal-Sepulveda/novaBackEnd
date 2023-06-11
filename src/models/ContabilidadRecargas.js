const {DataTypes} = require('sequelize');

module.exports = (sequelize)=>{
    sequelize.define('contabilidadRecargas',{
        total5kg : {
            type: DataTypes.BIGINT,
        },
        llenos5kg : {
            type: DataTypes.BIGINT,
        },
        ventas5kg : {
            type: DataTypes.BIGINT,
        },
        precio5kg : {
            type: DataTypes.BIGINT,
            defaultValue: 0
        },
        recaudacion5kg : {
            type: DataTypes.BIGINT,
        },
        total11kg : {
            type: DataTypes.BIGINT,
        },
        llenos11kg : {
            type: DataTypes.BIGINT,
        },
        ventas11kg : {
            type: DataTypes.BIGINT,
        },
        precio11kg : {
            type: DataTypes.BIGINT,
            defaultValue: 0
        },
        recaudacion11kg : {
            type: DataTypes.BIGINT,
        },
        total15kg : {
            type: DataTypes.BIGINT,
        },
        llenos15kg : {
            type: DataTypes.BIGINT,
        },
        ventas15kg : {
            type: DataTypes.BIGINT,
        },
        precio15kg : {
            type: DataTypes.BIGINT,
            defaultValue: 0
        },
        recaudacion15kg : {
            type: DataTypes.BIGINT,
        },
        total45kg : {
            type: DataTypes.BIGINT,
        },
        llenos45kg : {
            type: DataTypes.BIGINT,
        },
        ventas45kg : {
            type: DataTypes.BIGINT,
        },
        precio45kg : {
            type: DataTypes.BIGINT,
            defaultValue: 0,
        },
        recaudacion45kg : {
            type: DataTypes.BIGINT,
        },
        totalCantidad : {
            type: DataTypes.BIGINT,
        },
        totalRecaudacion : {
            type: DataTypes.BIGINT,
        },
    },{
        timestamps : false
    })
}