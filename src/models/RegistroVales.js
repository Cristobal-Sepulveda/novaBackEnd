const sequelize = require('sequelize');
const {DataTypes} = require('sequelize');

module.exports = (sequelize)=>{
    sequelize.define('registroVales',{
        fecha : {
            type: DataTypes.DATEONLY
        },
        hora : {
            type: DataTypes.TIME
        },
        numeroGuia : {
            type: DataTypes.BIGINT,
            defaultValue: 0
        },
        numeroFactura : {
            type: DataTypes.BIGINT,
            defaultValue: 0
        },
        nombreEntrega : {
            type: DataTypes.STRING,
            defaultValue: ''
        },
        nombreRecibe : {
            type: DataTypes.STRING,
            defaultValue: ''
        },
        vale5kgFisico : {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        vale11kgFisico : {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        vale15kgFisico : {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        vale45kgFisico : {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        vale5kgDigital : {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        vale11kgDigital : {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        vale15kgDigital : {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        vale45kgDigital : {
            type: DataTypes.INTEGER,
            defaultValue: 0
        }
    },{
        timestamps : false
    })
}