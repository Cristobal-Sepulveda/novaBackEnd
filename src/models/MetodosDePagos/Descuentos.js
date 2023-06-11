const sequelize = require('sequelize');
const {DataTypes} = require('sequelize');

module.exports = (sequelize)=>{
    sequelize.define('descuentos',{
        monto : {
            type : DataTypes.INTEGER,
            defaultValue : 0
        },
    },{
        timestamps : false
    })
}