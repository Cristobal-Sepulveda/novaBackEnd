const {DataTypes} = require('sequelize');

module.exports = (sequelize)=>{
    sequelize.define('gastos', {
        descripcion: {
            type: DataTypes.STRING,
            defaultValue: 'Gasto',
        },
        monto: {
            type: DataTypes.BIGINT,
            defaultValue: 0,
        }
    },{
        timestamps : false
    })
}