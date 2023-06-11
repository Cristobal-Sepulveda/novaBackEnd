const sequelize = require('sequelize');
const {DataTypes} = require('sequelize');

module.exports = (sequelize)=>{
    sequelize.define('descuentoRut',{
        monto : {
            type : DataTypes.INTEGER,
            defaultValue : 0
        },
    },{
        timestamps : false
    })
}