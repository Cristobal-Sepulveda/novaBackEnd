const sequelize = require('sequelize');
const {DataTypes} = require('sequelize');

module.exports = (sequelize)=>{
    sequelize.define('chofer',{
        
    },{
        timestamps : false
    })
}