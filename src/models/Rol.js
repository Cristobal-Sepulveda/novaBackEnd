const {DataTypes} = require('sequelize');

module.exports = (sequelize)=>{
    sequelize.define('rol',{
        name : {
            type : DataTypes.STRING,
            allowNull : false
        },
        comision: {
            type : DataTypes.INTEGER,
            allowNull : true,
            defaultValue : 0
        }
    },
    {
        timestamps : false
    })
}