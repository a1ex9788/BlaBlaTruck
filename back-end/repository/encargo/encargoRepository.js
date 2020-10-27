var response = require('../../shared/response');
var TYPES = require('tedious').TYPES;

function EncargoRepository(dbContext) {
    function getEncargos(req, res) {
            var parameters = [];
        //getEncargos: por id, por naturaleza, por peso, por dnicliente, por dni transportista??
            var query = "select * from Encargo"
            parameters.push({name: 'clienteDni', type: TYPES.VarChar, val: req.params.DNICliente});
            dbContext.getQuery(query, parameters, true, function (error, data) {
                console.log("esto va bien");
                return res.json(response(data, error));
            });
    }


    function getEncargo(req,res) {
        return res.json(req.data);
    }

    function findEncargo(req,res,next){
        if(req.params.DNICliente){
            var parameters=[];

            parameters.push({name: 'Id', type: TYPES.VarChar, val: req.params.Id});
            parameters.push({name: 'clienteDni', type: TYPES.VarChar, val: req.params.DNICliente});

            var query = "select * from Encargo where DNICliente LIKE @clienteDni AND Id LIKE @Id";
            dbContext.getQuery(query, parameters, false, function(err, data) {
                if(data) {
                    req.data = data[0];
                    return next();
                }
                console.log("error 404");
                return res.sendStatus(404);
            });
        }else{
            console.log(req.params);
            console.log("esto no funciona");
        }
    }

    function putEncargo(req, res) {
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
        
        dbContext.post("InsertOrUpdateEncargo", parameters, function (error, data) {
            return res.json(response(data, error));
        });
    }
    function postEncargo(req, res) {

        var parameters = [];

        parameters.push({ name: 'Id', type: TYPES.Char, val: req.body.Id});
        parameters.push({ name: 'NaturalezaEncargo', type: TYPES.VarChar, val: req.body.NaturalezaEncargo });
        parameters.push({ name: 'Peso', type: TYPES.Decimal, val: req.body.Peso });
        parameters.push({ name: 'Alto', type: TYPES.Decimal, val: req.body.Alto });
        parameters.push({ name: 'Ancho', type: TYPES.Decimal, val: req.body.Ancho });
        parameters.push({ name: 'Largo', type: TYPES.Decimal, val: req.body.Largo });
        parameters.push({ name: 'Origen', type: TYPES.VarChar, val: req.body.Origen });
        parameters.push({ name: 'Destino', type: TYPES.VarChar, val: req.body.Destino });
        parameters.push({ name: 'Precio', type: TYPES.Decimal, val: req.body.Precio });
        parameters.push({ name: 'DNICliente', type: TYPES.Char, val: req.body.DNICliente});
        //parameters.push({ name: 'DNITransportista', type: TYPES.Char, val: req.body.DNITransportista});
    
        dbContext.post("InsertOrUpdateEncargo", parameters, function (error, data) {
            return res.json(response(data, error));
        });
    }

    function deleteEncargo(req, res) {

        var parameters = [];

        if (req.data.Id) {
            var parameters = [];

            parameters.push({ name: 'Id', type: TYPES.Int, val: req.data.DNICliente });
            parameters.push({ name: 'ClienteDni', type: TYPES.Int, val: req.data.DNICliente });
          
            var query = "delete from Encargo where persona DNICLiente = @ClienteDni AND Id = @Id"
           
            dbContext.getQuery(query, parameters, false, function (error, data, rowCount) {
                if (rowCount > 0) {
                    return res.json('Record is deleted');
                }
                return res.sendStatus(404);
            });
        }
    }
    /*
    function searchPersonaTelefono(req,res) {
        var parameters = [];
        parameters.push({name: 'telefono', type: TYPES.VarChar, val: req.query.telefono});
        console.log("searchPersonaTelefono")
        var query = "select * from Persona where telefono = @telefono"

        dbContext.getQuery(query, parameters, true, function (error, data){
            return res.json(response(data,error));
        });
    }*/

    //se pueden hacer funciones para encontrar paquetes 

    function getEncargosByDNI(req, res)
    {
        var parameters=[];
        if(req.params.userDNI){
            //////////////////////
            var isClient
            var parameters2=[];
            parameters2.push({name: 'userDni', type: TYPES.VarChar, val: req.params.userDNI});

            var query = "select * from Cliente where DNI LIKE @userDni";
            dbContext.getQuery(query, parameters2, false, function(err, data) {
                console.log(data)
                if(data) {
                    isClient = true
                }
                else {
                    isClient = false
                }

                parameters.push({name: 'userDni', type: TYPES.VarChar, val: req.params.userDNI});

                console.log(isClient)
                if (isClient) 
                {atributo = "DNICliente"}
                else
                {atributo = "DNITransportista"}

                var query = "select * from Encargo where " + atributo + " LIKE @userDni";
                console.log(query)
                dbContext.getQuery(query, parameters, false, function(err, data) {
                    if(data) {
                        return res.json(data)
                    }
                    console.log("error 404");
                    return res.sendStatus(404);
                });
            });
            //////////////////////
            
        }else{
            console.log(req.params);
            console.log("esto no funcionaaa");
        }
    }

    return {
        getAll: getEncargos,
        get: getEncargo,
        put: putEncargo,
        post: postEncargo,
        //getMulti: getLoginToken,
        //find: searchPersonaTelefono,
        intercept: findEncargo,
        delete: deleteEncargo,
        //usernameExists: isUsernameAlreadyExists
        getEncargosByDNI: getEncargosByDNI
    }
}
module.exports = EncargoRepository;