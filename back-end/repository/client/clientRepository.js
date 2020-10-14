var response = require('../../shared/response');
var TYPES = require('tedious').TYPES;

function ClientRepository(dbContext) {
    function findClient(req, res, next) {
        if(req.params.ClienteDNI) {
            var parameters = [];

            parameters.push({Nombre: 'Id', type: TYPES.Int, val: req.params.ClientId});

            dbContext.getQuery("select * from Cliente", parameters, false, function(error, data){
                if(data) {
                    req.data = data[0];
                    return next;
                }
                return res.sendStatus(404);
            });
        }
    }
   
    return {
            get: findClient
        }
}
module.exports = ClientRepository;