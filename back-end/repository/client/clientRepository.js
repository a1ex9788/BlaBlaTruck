var response = require('../../shared/response');
var TYPES = require('tedious').TYPES;

function ClientRepository(dbContext) {
    function getClientes(req, res) {
        if(req.query.Nombre) {
            var parameters = [];

            parameters.push({name: 'nombre', type: TYPES.VarChar, val: req.params.Nombre});
            var query = "select * from Cliente where Nombre=@nombre"
            
            dbContext.getQuery(query, parameters, false, function (error, data) {
                return res.json(response(data, error));
            });
        }
        else {
            dbContext.get("getCliente", function(error, data){
                return res.json(response(data,error));
            });
        }
    }
    function getCliente(req,res) {
        return res.json(req.data);
    }
    function findCliente(req, res) {
        if(req.params.DNI) {
            var parameters = [];

            parameters.push({name: 'DNI', type: TYPES.VarChar, val: req.params.DNI});
            var query = "select * from Cliente where DNI = @DNI"
            dbContext.getQuery(query, parameters, false, function(err, data) {
                if(data) {
                    req.data = data[0];
                    return next();
                }
                return res.sendStatus(404);
            });
        }
    }
     function putCliente(req, res) {

        var parameters = [];

        Object.entries(req.data).forEach((property) => {

            if (req.body[property[0]]) {
                parameters.push(
                    {
                        name: property[0],
                        val: req.body[property[0]],
                        type: TYPES.VarChar
                    });
            } else {

                parameters.push(
                    {
                        name: property[0],
                        val: property[1],
                        type: TYPES.VarChar
                    });
            }
        });

        dbContext.post("InsertCliente", parameters, function (error, data) {
            return res.json(response(data, error));
        });
    }
    
     function postCliente(req, res) {

        var parameters = [];

        //parameters.push({ name: 'Nombre', type: TYPES.VarChar, val: req.body.Nombre });
        //parameters.push({ name: 'Apellidos', type: TYPES.VarChar, val: req.body.Apellidos });
        parameters.push({ name: 'DNI', type: TYPES.VarChar, val: req.body.DNI });
        //parameters.push({ name: 'telefono', type: TYPES.Int, val: req.body.telefono });
        //parameters.push({ name: 'email', type: TYPES.VarChar, val: req.body.email });
        //parameters.push({ name: 'usuario', type: TYPES.VarChar, val: req.body.usuario });
        //parameters.push({ name: 'contraseña', type: TYPES.Int, val: req.body.contraseña });
        //parameters.push({ name: 'IBAN', type: TYPES.VarChar, val: req.body.IBAN });
        //parameters.push({ name: 'numeroCuentaBancaria', type: TYPES.Int, val: req.body.numeroCuentaBancaria});
        parameters.push({ name: 'Empresa', type: TYPES.VarChar, val: req.body.Empresa });
        // Object.entries(employee).forEach((property)=>{
        //     parameters.push({name:'@'+property[0]})
        // });

        dbContext.post("InsertOrUpdateCliente", parameters, function (error, data) {
            return res.json(response(data, error));
        });
    }
    function getClienteEmpresa(req, res) {
        dbContext.get("getClienteEmpresa", function (error, data) {
            return res.json(response(data, error));
        });
    }
    function searchCliente(req,res) {
        var parameters = [];
        parameters.push({name: 'Nombre', type: TYPES.VarChar, val: req.query.Nombre});

        var query = "select * from Cliente where Nombre=@Nombre"

        dbContext.get(query, parameters, function (error, data){
            return res.json(response(data,error));
        });
    }

    return {
            getAll: getClientes,
            get: getCliente,
            put: putCliente,
            post: postCliente,
            getMulti: getClienteEmpresa,
            find: searchCliente,
            intercept: findCliente
        }
}
module.exports = ClientRepository;