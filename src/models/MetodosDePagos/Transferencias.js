const sequelize = require('sequelize');
const {DataTypes} = require('sequelize');

module.exports = (sequelize)=>{
    sequelize.define('transferencias',{
        monto: {
            type: DataTypes.BIGINT,
            defaultValue: 0
        },
    },{
        timestamps : false
    })
}