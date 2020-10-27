var response = require('../../shared/response');
var TYPES = require('tedious').TYPES;

function EncargoRepository(dbContext) {
    function getEncargos(req, res) {
        var parameters = [];
        
        
        parameters.push({name: 'DNICliente', type: TYPES.Char, val: req.params.DNICliente});
        var query = "select * from Encargo where DNICliente LIKE @DNICliente"

        dbContext.getQuery(query, parameters, true, function (error, data) {
            console.log("esto va bien");
            return res.json(response(data, error));
        });
    }
   
    function getEncargosPorId(req,res) {

        var parameters = [];
        
        parameters.push({name: 'Id', type: TYPES.Char, val: req.params.Id});
        var query = "select * from Encargo where Id LIKE @Id"

        dbContext.getQuery(query, parameters, true, function (error, data) {
            console.log("esto va bien");
            return res.json(response(data, error));
        });
    
    }


    function getEncargosPorDniCliente(req, res)
    {
            var parameters=[];

            parameters.push({name: 'DNICliente', type: TYPES.VarChar, val: req.params.DNICliente});

            var query = "select * from Encargo where DNICliente LIKE @DNICliente";
            dbContext.getQuery(query, parameters, true, function(err, data) {
                if(data) {
                    return res.json(data)
                }
                console.log("error 404");
                return res.sendStatus(404);
            });
       
    }

    function getEncargosPorDniTransportista(req,res) {
        
        var parameters = [];
        
        parameters.push({name: 'DNITransportista', type: TYPES.Char, val: req.params.DNITransportista});
        var query = "select * from Encargo where DNITransportista LIKE @DNITransportista"

        dbContext.getQuery(query, parameters, true, function (error, data) {
            console.log("esto va bien");
            return res.json(response(data, error));
        });
    
    }

    function getEncargosPorNaturalezaCliente(req,res) {
        
        var parameters = [];
        
        parameters.push({name: 'DNICliente', type: TYPES.VarChar, val: req.params.DNICliente});
        parameters.push({name: 'NaturalezaEncargo', type: TYPES.VarChar, val: req.params.NaturalezaEncargo});

        var query = "select * from Encargo where NaturalezaEncargo LIKE @NaturalezaEncargo AND DNICliente LIKE @DNICliente"

        dbContext.getQuery(query, parameters, true, function (error, data) {
            console.log("esto va bien");
            return res.json(response(data, error));
        });
  
    }

    function getEncargosPorNaturalezaTransportista(req,res) {
       
        var parameters = [];
        
        parameters.push({name: 'DNITransportista', type: TYPES.VarChar, val: req.params.DNITransportista});
        parameters.push({name: 'NaturalezaEncargo', type: TYPES.VarChar, val: req.params.NaturalezaEncargo});
        var query = "select * from Encargo where NaturalezaEncargo LIKE @NaturalezaEncargo  AND DNITransportista LIKE @DNITransportista"

        dbContext.getQuery(query, parameters, true, function (error, data) {
            console.log("esto va bien");
            return res.json(response(data, error));
        });
   
    }


    /* Buscar un encargo? hara falta si ya hay get?
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
    }*/
    /*
    function putEncargo(req, res) { //Modifica si existe o lo añade si no existe
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
        //parameters.push({ name: 'DNITransportista', type: TYPES.Char, val: req.body.DNITransportista});

        dbContext.post("InsertOrUpdateEncargo", parameters, function (error, data) {
            return res.json(response(data, error));
        });
    }*/

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

        parameters.push({ name: 'AltitudOrigen', type: TYPES.VarChar, val: req.body.AltitudOrigen });
        parameters.push({ name: 'AltitudDestino', type: TYPES.VarChar, val: req.body.Destino });
        parameters.push({ name: 'LongitudOrigen', type: TYPES.VarChar, val: req.body.Origen });
        parameters.push({ name: 'LongitudDestino', type: TYPES.VarChar, val: req.body.Destino });

        parameters.push({ name: 'Precio', type: TYPES.Decimal, val: req.body.Precio });
        parameters.push({ name: 'Pagado', type: TYPES.Decimal, val: req.body.Pagado });
        parameters.push({ name: 'DNICliente', type: TYPES.Char, val: req.body.DNICliente});
        
       /* var query= "INSERT INTO Encargo (id,NaturalezaEncargo,Peso,Alto,Ancho,Largo,Origen,Destino,AltitudOrigen,AltitudDestino,LongitudOrigen,LongitudDestino,Precio,Pagado,DNICliente) "+
        "VALUES(@id,@NaturalezaEncargo,@Peso,@Alto,@Ancho,@Largo,@Origen,@Destino,@AltitudOrigen,@AltitudDestino,@LongitudOrigen,@LongitudDestino,@Precio,@Pagado,@DNICliente)";
        */
       var query= "INSERT INTO Encargo (id,NaturalezaEncargo,Peso,Alto,Ancho,Largo,Origen,Destino,Precio,Pagado,DNICliente) "+
        "VALUES(@id,@NaturalezaEncargo,@Peso,@Alto,@Ancho,@Largo,@Origen,@Destino,@Precio,@Pagado,@DNICliente)";
       
        dbContext.post(query, parameters, function (error, data) {
        return res.json(response(data, error));
        });
    }

    function deleteEncargoCliente(req, res) {

        var parameters = [];

        if (req.data.Id) {
            var parameters = [];

            parameters.push({ name: 'Id', type: TYPES.Int, val: req.data.Id });
            parameters.push({ name: 'DNICLiente', type: TYPES.Int, val: req.data.DNICliente });
          
            var query = "delete from Encargo where persona DNICLiente LIKE @DNICLiente AND Id LIKE @Id"
           
            dbContext.getQuery(query, parameters, false, function (error, data, rowCount) {
                if (rowCount > 0) {
                    return res.json('Record is deleted');
                }
                return res.sendStatus(404);
            });
        }
    }

    function deleteEncargoTransportista(req, res) {

        var parameters = [];

        if (req.data.Id) {
            var parameters = [];

            parameters.push({ name: 'Id', type: TYPES.Int, val: req.data.Id });
            parameters.push({ name: 'DNITransportista', type: TYPES.Int, val: req.data.DNITransportista });
          
            var query = "delete from Encargo where persona DNITransportista LIKE @DNITransportista AND Id LIKE @Id"
           
            dbContext.getQuery(query, parameters, false, function (error, data, rowCount) {
                if (rowCount > 0) {
                    return res.json('Record is deleted');
                }
                return res.sendStatus(404);
            });
     
        }
    }

    return {
        getAll: getEncargos,
        //put: putEncargo,
        postEncargo: postEncargo,
        //intercept: findEncargo,
        deleteEncargoCliente: deleteEncargoCliente,
        deleteEncargoTransportista: deleteEncargoTransportista,
        getEncargosPorId: getEncargosPorId,
        getEncargosPorCliente: getEncargosPorDniCliente,
        getEncargosPorTransportista: getEncargosPorDniTransportista,
        getEncargosPorNaturalezaCliente: getEncargosPorNaturalezaCliente,
        getEncargosPorNaturalezaTransportista: getEncargosPorNaturalezaTransportista


    }
}
module.exports = EncargoRepository;