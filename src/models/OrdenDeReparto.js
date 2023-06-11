const {DataTypes} = require('sequelize');

module.exports = (sequelize)=>{
    sequelize.define('ordenDeReparto',{
        fecha : {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        estado : {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        },
        PrecioTotal: {
            type: DataTypes.BIGINT,
            defaultValue: 0
        },
        rendida : {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        faltante : {
            type: DataTypes.BIGINT,
            defaultValue: 0
        },
        faltanteChofer: {
            type: DataTypes.BIGINT,
            defaultValue: 0
        },
        faltantePeoneta: {
            type: DataTypes.BIGINT,
            defaultValue: 0
        },
        sobrante : {
            type: DataTypes.BIGINT,
            defaultValue: 0
        },
        cuadradoPor : {
            type: DataTypes.BIGINT,
            defaultValue: 0
        },
    },{
        timestamps : false
    })
};