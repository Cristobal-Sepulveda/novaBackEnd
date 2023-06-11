//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require('./src/app.js');
const { conn, Rol, Chofer, Ayudante, Administrador, Cuadrante, Patentes, ListaDePrecios, InventarioVales } = require('./src/db.js');
const createRoles = require('./src/testingCreators/roles.js');
const createPatentes = require('./src/testingCreators/patentes.js');
const createCuadrantes = require('./src/testingCreators/cuadrante.js');
const createListaDePrecios = require('./src/testingCreators/listaDePrecios.js');
const { createAdministradores, createChoferPeoeneta, createPeonetaChofer} = require('./src/testingCreators/usuarios.js');
const createInventarioVales = require('./src/testingCreators/inventarioVales.js');
const PORT = process.env.PORT || 3001;

conn.sync({ force: false }).then(() => {
  server.listen(PORT, async () => {
    console.log(`Servidor en puerto ${PORT}`); 

    const roles = await Rol.findAll();
    if (roles.length < 1) createRoles();

    const choferes = await Chofer.findAll();
    if (choferes.length < 1) {
      createChoferPeoeneta();
    }

    const inventarioVales = await InventarioVales.findAll();
    if (inventarioVales.length < 1) createInventarioVales();

    const ayudantes = await Ayudante.findAll();
    if (ayudantes.length < 1) createPeonetaChofer();

    const administradores = await Administrador.findAll();
    if (administradores.length < 1) createAdministradores();

    const cuadrantes = await Cuadrante.findAll();
    if (cuadrantes.length < 1) createCuadrantes();

    const patentes = await Patentes.findAll();
    if (patentes.length < 1) createPatentes();

    const listaDePrecios = await ListaDePrecios.findAll();
    if (listaDePrecios.length < 1) createListaDePrecios();

  });
});
