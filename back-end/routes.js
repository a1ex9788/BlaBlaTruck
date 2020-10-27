const express = require('express');
function eRoutes() {
    const router = express.Router();
    var client = require('./repository/client/clientRoutes.js')(router);
    var persona = require('./repository/persona/personaRoutes.js')(router);
    var transportista = require('./repository/transportista/transportistaRoutes.js')(router);
    var encargo = require('./repository/encargo/encargoRoutes.js')(router);

    //var department = require('./repository/department/department.routes')(router);
    return router;
}
module.exports = eRoutes;