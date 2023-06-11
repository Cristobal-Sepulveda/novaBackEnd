require('dotenv').config();
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
const {
  DB_USER, DB_PASSWORD, DB_HOST, DB_NAME, DB_PORT, DB_DEPLOY
} = process.env;

let sequelize = 
    // new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`, {
    //   logging: false,
    //   native: false,  
    new Sequelize(DB_DEPLOY, { 
      dialectOptions: {
        ssl: {
          require: true,
        },
        keepAlive: true,
      },
      ssl: true,
      logging: false,
      native: false,
      pool: {
        max: 10,
        min: 0,
        acquire: 300000,
        idle: 300000,
      },
      port: 5432,
      queryCache : true,
  });

const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models y MetodosDePagos y los importamos
fs
  .readdirSync(path.join(__dirname, '/models'))
  .filter((file) => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

fs
  .readdirSync(path.join(__dirname, '/models/MetodosDePagos'))
  .filter((file) => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models/MetodosDePagos', file)));
  });

  

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach(model => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const { 
    Administrador, 
    Auxiliar, 
    Chofer, 
    Personal, 
    Rol, 
    Ayudante, 
    Cuadrante, 
    OrdenDeReparto, 
    Patentes, 
    ListaDePrecios,
    Recargas,
    ContabilidadRecargas,
    MetodoPagos,
    Transbank,
    Transferencias,
    Efectivo,
    Abonos,
    DescuentoRut,
    Descuentos,
    Vales,
    Gastos
    } = sequelize.models;

// Relaciones entre los modelos

//Relacion entre personal y administrador
Personal.hasOne(Administrador, { foreignKey: 'fk_personalID', targetKey: 'id' }, {
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
});
Administrador.belongsTo(Personal, { foreignKey: 'fk_personalID', targetKey: 'id' });

//Relacion entre personal y auxiliar
Personal.hasOne(Auxiliar, { foreignKey: 'fk_personalID', targetKey: 'id' }, {
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
});
Auxiliar.belongsTo(Personal, { foreignKey: 'fk_personalID', targetKey: 'id' });

//Relacion entre personal y chofer
Personal.hasOne(Chofer, { foreignKey: 'fk_personalID', targetKey: 'id' }, {
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
});
Chofer.belongsTo(Personal, { foreignKey: 'fk_personalID', targetKey: 'id' });

//Relacion entre personal y rol
Rol.belongsToMany(Personal, { through: 'Personal_Rol', timestamps: false });
Personal.belongsToMany(Rol, { through: 'Personal_Rol', timestamps: false });

//Relacion entre personal y ayudante
Personal.hasOne(Ayudante, { foreignKey: 'fk_personalID', targetKey: 'id' }, {
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
});
Ayudante.belongsTo(Personal, { foreignKey: 'fk_personalID', targetKey: 'id' });

//Relacion entre orden de reparto y ayudante
OrdenDeReparto.belongsToMany(Personal, { through: 'OrdenDeReparto_Ayudante', timestamps: false });
Personal.belongsToMany(OrdenDeReparto, { through: 'OrdenDeReparto_Ayudante', timestamps: false });

//Relacion entre orden de reparto 
Patentes.hasMany(OrdenDeReparto, {foreignKey: 'fk_patenteID', targetKey: 'id' });
OrdenDeReparto.belongsTo(Patentes, {foreignKey: 'fk_patenteID', targetKey: 'id' });

//Relacion entre orden de reparto y cuadrante
Cuadrante.hasMany(OrdenDeReparto);
OrdenDeReparto.belongsTo(Cuadrante);

//Relacion entre orden de reparto y chofer
Chofer.hasMany(OrdenDeReparto, { foreignKey: 'fk_choferID', targetKey: 'id' });
OrdenDeReparto.belongsTo(Chofer, { foreignKey: 'fk_choferID', targetKey: 'id' });

//Relacion entre orden de reparto y ayudante
Ayudante.hasMany(OrdenDeReparto, { foreignKey: 'fk_ayudanteID', targetKey: 'id' });
OrdenDeReparto.belongsTo(Ayudante, { foreignKey: 'fk_ayudanteID', targetKey: 'id' });

//Relacion entre orden de reparto y administrador
Administrador.hasMany(OrdenDeReparto);
OrdenDeReparto.belongsTo(Administrador);

//Relacion orden de reparto y recargas
OrdenDeReparto.hasMany(Recargas, { foreignKey: 'fk_ordenDeRepartoID', targetKey: 'id' });
Recargas.belongsTo(OrdenDeReparto, { foreignKey: 'fk_ordenDeRepartoID', targetKey: 'id' });

//relacion entre orden de reparto y contabilidad de recargas
OrdenDeReparto.hasOne(ContabilidadRecargas, { foreignKey: 'fk_ordenDeRepartoID', targetKey: 'id' }, {
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
  });
ContabilidadRecargas.belongsTo(OrdenDeReparto, { foreignKey: 'fk_ordenDeRepartoID', targetKey: 'id' });

/////// METODOS DE PAGO ///////

//Relacion entre orden de reparto y metodo de pago
OrdenDeReparto.hasMany(MetodoPagos, { foreignKey: 'fk_ordenDeRepartoID', targetKey: 'id' });
MetodoPagos.belongsTo(OrdenDeReparto, { foreignKey: 'fk_ordenDeRepartoID', targetKey: 'id' });

//Relacion entre metodo de pago y transbank
MetodoPagos.hasOne(Transbank, { foreignKey: 'fk_MetodoPagosID', targetKey: 'id' }, {
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
});
Transbank.belongsTo(MetodoPagos, { foreignKey: 'fk_MetodoPagosID', targetKey: 'id' });

//Relacion entre metodo de pago y efectivo
MetodoPagos.hasOne(Efectivo, { foreignKey: 'fk_MetodoPagosID', targetKey: 'id' }, {
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
});
Efectivo.belongsTo(MetodoPagos, { foreignKey: 'fk_MetodoPagosID', targetKey: 'id' });

//Relacion entre metodo de pago y vales
MetodoPagos.hasOne(Vales, { foreignKey: 'fk_MetodoPagosID', targetKey: 'id' }, {
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
});
Vales.belongsTo(MetodoPagos, { foreignKey: 'fk_MetodoPagosID', targetKey: 'id' });

//Relacion entre metodo de pago y transferencias
MetodoPagos.hasOne(Transferencias, { foreignKey: 'fk_MetodoPagosID', targetKey: 'id' }, {
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
});
Transferencias.belongsTo(MetodoPagos, { foreignKey: 'fk_MetodoPagosID', targetKey: 'id' });

//Relacion entre metodo de pago y abonos  
MetodoPagos.hasOne(Abonos, { foreignKey: 'fk_MetodoPagosID', targetKey: 'id' }, {
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
});
Abonos.belongsTo(MetodoPagos, { foreignKey: 'fk_MetodoPagosID', targetKey: 'id' });

//Relacion entre metodo de pago y descuentos
MetodoPagos.hasOne(Descuentos, { foreignKey: 'fk_MetodoPagosID', targetKey: 'id' }, {
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
});
Descuentos.belongsTo(MetodoPagos, { foreignKey: 'fk_MetodoPagosID', targetKey: 'id' });

//Relacion entre metodo de pago y descuento rut
MetodoPagos.hasOne(DescuentoRut, { foreignKey: 'fk_MetodoPagosID', targetKey: 'id' }, {
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
});
DescuentoRut.belongsTo(MetodoPagos, { foreignKey: 'fk_MetodoPagosID', targetKey: 'id' });

//Relacion entre metodo de pago y gastos
MetodoPagos.hasOne(Gastos, { foreignKey: 'fk_MetodoPagosID', targetKey: 'id' }, {
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
});
Gastos.belongsTo(MetodoPagos, { foreignKey: 'fk_MetodoPagosID', targetKey: 'id' });

//Relacion entre lista de precios y orden de reparto
ListaDePrecios.hasMany(OrdenDeReparto, { foreignKey: 'fk_listaPreciosID', targetKey: 'id' });
OrdenDeReparto.belongsTo(ListaDePrecios, { foreignKey: 'fk_listaPreciosID', targetKey: 'id' });


module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize,     // para importart la conexión { conn } = require('./db.js');
};
