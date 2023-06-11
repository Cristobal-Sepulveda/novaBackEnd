const {DataTypes} = require('sequelize');

module.exports = (sequelize)=>{
    sequelize.define('recargas',{
        cantidad5kg : {
            type: DataTypes.BIGINT,
            defaultValue: 0
        },
        cantidad11kg : {
            type: DataTypes.BIGINT,
            defaultValue: 0
        },
        cantidad15kg : {
            type: DataTypes.BIGINT,
            defaultValue: 0
        },
        cantidad45kg : {
            type: DataTypes.BIGINT,
            defaultValue: 0
        },
        active : {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        }
    },{
        timestamps : false
    })
}