const sequelize = require('sequelize');
const {DataTypes} = require('sequelize');

module.exports = (sequelize)=>{
    sequelize.define('vales',{
        fisico5kg : {
            type: DataTypes.BIGINT,
            defaultValue: 0
        },
        totalFisico5kg : {
            type: DataTypes.BIGINT,
            defaultValue: 0
        },
        fisico11kg : {
            type: DataTypes.BIGINT,
            defaultValue: 0
        },
        totalFisico11kg : {
            type: DataTypes.BIGINT,
            defaultValue: 0
        },
        fisico15kg : {
            type: DataTypes.BIGINT,
            defaultValue: 0
        },
        totalFisico15kg : {
            type: DataTypes.BIGINT,
            defaultValue: 0
        },
        fisico45kg : {
            type: DataTypes.BIGINT,
            defaultValue: 0
        },
        totalFisico45kg : {
            type: DataTypes.BIGINT,
            defaultValue: 0
        },
        digital5kg : {
            type: DataTypes.BIGINT,
            defaultValue: 0
        },
        totalDigital5kg : {
            type: DataTypes.BIGINT,
            defaultValue: 0
        },
        digital11kg : {
            type: DataTypes.BIGINT,
            defaultValue: 0
        },
        totalDigital11kg : {
            type: DataTypes.BIGINT,
            defaultValue: 0
        },
        digital15kg : {
            type: DataTypes.BIGINT,
            defaultValue: 0
        },
        totalDigital15kg : {
            type: DataTypes.BIGINT,
            defaultValue: 0
        },
        digital45kg : {
            type: DataTypes.BIGINT,
            defaultValue: 0
        },
        totalDigital45kg : {
            type: DataTypes.BIGINT,
            defaultValue: 0
        },
        sumaTotalDigitalYFisico5kg : {
            type: DataTypes.BIGINT,
            defaultValue: 0
        },
        sumaTotalDigitalYFisico11kg : {
            type: DataTypes.BIGINT,
            defaultValue: 0
        },
        sumaTotalDigitalYFisico15kg : {
            type: DataTypes.BIGINT,
            defaultValue: 0
        },
        sumaTotalDigitalYFisico45kg : {
            type: DataTypes.BIGINT,
            defaultValue: 0
        },
        totalVales : {
            type: DataTypes.BIGINT,
            defaultValue: 0
        },
        totalSumaVales : {
            type: DataTypes.BIGINT,
            defaultValue: 0
        },
    },{
        timestamps : false
    })
}