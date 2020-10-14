const express = require('express');
function eRoutes() {
    const router = express.Router();
    var client = require('./repository/client/clientRoutes.js')(router);
    //var department = require('./repository/department/department.routes')(router);
    return router;
}
module.exports = eRoutes;