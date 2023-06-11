const sequelize = require('sequelize');
const {DataTypes} = require('sequelize');

module.exports = (sequelize)=>{
    sequelize.define('efectivo',{
        totalBilletes1 : {
            type: DataTypes.BIGINT,
            defaultValue: 0
        },
        totalBilletes2 : {
            type: DataTypes.BIGINT,
            defaultValue: 0
        },
        totalBilletes5 : {
            type: DataTypes.BIGINT,
            defaultValue: 0
        },
        totalBilletes10 : {
            type: DataTypes.BIGINT,
            defaultValue: 0
        },
        totalBilletes20 : {
            type: DataTypes.BIGINT,
            defaultValue: 0
        },
        monedas : {
            type: DataTypes.BIGINT,
            defaultValue: 0
        },
        totalGeneral : {
            type: DataTypes.BIGINT,
            defaultValue: 0
        },
    },{
        timestamps : false
    })
}