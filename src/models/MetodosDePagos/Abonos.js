const sequelize = require('sequelize');
const {DataTypes} = require('sequelize');

module.exports = (sequelize)=>{
    sequelize.define('abonos',{
        monto : {
            type: DataTypes.BIGINT,
            defaultValue: 0
        }
    },{
        timestamps : false
    })
}