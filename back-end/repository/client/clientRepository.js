var response = require('../../shared/response');
var TYPES = require('tedious').TYPES;

function ClientRepository(dbContext) {
    function getClientes(req, res) {
            var parameters = [];

            parameters.push({name: 'Nombre', type: TYPES.VarChar, val: req.params.Nombre});
            var query = "select * from Cliente"
            
            dbContext.getQuery(query, parameters, true, function (error, data) {
                console.log("esto va bien");
                return res.json(response(data, error));
            });
    }
    function getCliente(req,res) {
        return res.json(req.data);
    }
    function findCliente(req, res, next) {
        console.log(req.params.clienteDNI);
        if(req.params.clienteDNI){
        console.log("me he metido");
        var parameters = [];

        parameters.push({name: 'clienteDNI', type: TYPES.VarChar, val: req.params.clienteDNI});
        var query = "select * from Cliente where DNI LIKE @clienteDNI";
        dbContext.getQuery(query, parameters, false, function(err, data) {
            if(data) {
                req.data = data[0];
                return next();
            }
            console.log("error 404");
            return res.sendStatus(404);
        });
        
    }
    else
    {
        console.log(req.params);
        console.log("esto no funciona idk why");
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

        dbContext.post("InsertOrUpdateClient", parameters, function (error, data) {
            return res.json(response(data, error));
        });
    }
    
     function postCliente(req, res) {

        var parameters = [];

        //parameters.push({ name: 'Nombre', type: TYPES.VarChar, val: req.body.Nombre });
        //parameters.push({ name: 'Apellidos', type: TYPES.VarChar, val: req.body.Apellidos });
        parameters.push({ name: 'DNI', type: TYPES.Char, val: req.body.DNI });
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
        dbContext.post("InsertOrUpdateClient", parameters, function (error, data) {
            return res.json(response(data, error));
        });
    }

    function deleteClient(req, res) {

        var parameters = [];

        if (req.data.DNI) {
            var parameters = [];

            parameters.push({ name: 'Dni', type: TYPES.Int, val: req.data.DNI });

            var query = "delete from Cliente where DNI = @Dni"

            dbContext.getQuery(query, parameters, false, function (error, data, rowCount) {
                if (rowCount > 0) {
                    return res.json('Record is deleted');
                }
                return res.sendStatus(404);
            });
        }
    }
    function getClienteEmpresa(req, res) {
        dbContext.get("getClienteEmpresa", function (error, data) {
            return res.json(response(data, error));
        });
    }
    function searchCliente(req,res) {
        var parameters = [];
        parameters.push({name: 'Empresa', type: TYPES.VarChar, val: req.query.Empresa});

        var query = "select * from Cliente where Empresa=@Empresa"

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
            intercept: findCliente,
            delete: deleteClient
        }
}
module.exports = ClientRepository;