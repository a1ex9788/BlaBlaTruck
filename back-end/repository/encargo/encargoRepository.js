var response = require('../../shared/response');
var TYPES = require('tedious').TYPES;

function EncargoRepository(dbContext) {
    function getEncargos(req, res) {
        var parameters = [];
        
        
        parameters.push({name: 'DNICliente', type: TYPES.Char, val: req.query.DNICliente});
        var query = "select * from Encargo where DNICliente LIKE @DNICliente"

        dbContext.getQuery(query, parameters, true, function (error, data) {
            return res.json(response(data, error));
        });
    }
   
    function getEncargosPorId(req,res) {

        var parameters = [];
        
        parameters.push({name: 'Id', type: TYPES.BigInt, val: req.query.Id});
        var query = "select * from Encargo where Id LIKE @Id"

        dbContext.getQuery(query, parameters, true, function (error, data) {
            return res.json(response(data, error));
        });
    
    }


    function getEncargosPorDniCliente(req, res)
    {
            var parameters=[];

            parameters.push({name: 'DNICliente', type: TYPES.Char, val: req.query.DNICliente});
            
            var query = "select * from Encargo where DNICliente LIKE @DNICliente order by FechaRecogida desc";
            
            dbContext.getQuery(query, parameters, true, function(err, data) {
                if(data) {
                    return res.json(data)
                }
                console.log(data);
                console.log("error 404");
                return res.sendStatus(404);
            });
       
    }

    function getEncargosPorDniTransportista(req,res) {
        
        var parameters = [];
        
        parameters.push({name: 'DNITransportista', type: TYPES.Char, val: req.query.DNITransportista});
        var query = "select * from Encargo where DNITransportista LIKE @DNITransportista order by FechaRecogida desc"

        dbContext.getQuery(query, parameters, true, function (error, data) {
            return res.json(response(data, error));
        });
    
    }

    function getEncargosPorNaturalezaCliente(req,res) {
        
        var parameters = [];
        
        parameters.push({name: 'DNICliente', type: TYPES.Char, val: req.query.DNICliente});
        parameters.push({name: 'NaturalezaEncargo', type: TYPES.VarChar, val: req.query.NaturalezaEncargo});

        var query = "select * from Encargo where NaturalezaEncargo LIKE @NaturalezaEncargo AND DNICliente LIKE @DNICliente"

        dbContext.getQuery(query, parameters, true, function (error, data) {
            return res.json(response(data, error));
        });
  
    }

    function getEncargosPorNaturalezaTransportista(req,res) {
       
        var parameters = [];
        
        parameters.push({name: 'DNITransportista', type: TYPES.Char, val: req.query.DNITransportista});
        parameters.push({name: 'NaturalezaEncargo', type: TYPES.VarChar, val: req.query.NaturalezaEncargo});
        var query = "select * from Encargo where NaturalezaEncargo LIKE @NaturalezaEncargo  AND DNITransportista LIKE @DNITransportista"

        dbContext.getQuery(query, parameters, true, function (error, data) {
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

        //parameters.push({ name: 'Id', type: TYPES.Char, val: req.body.params.Id});
        parameters.push({ name: 'NaturalezaEncargo', type: TYPES.VarChar, val: req.body.params.NaturalezaEncargo });
        parameters.push({ name: 'Peso', type: TYPES.Decimal, val: req.body.params.Peso });
        parameters.push({ name: 'Alto', type: TYPES.Decimal, val: req.body.params.Alto });
        parameters.push({ name: 'Ancho', type: TYPES.Decimal, val: req.body.params.Ancho });
        parameters.push({ name: 'Largo', type: TYPES.Decimal, val: req.body.params.Largo });
        parameters.push({ name: 'Origen', type: TYPES.VarChar, val: req.body.params.Origen });
        parameters.push({ name: 'Destino', type: TYPES.VarChar, val: req.body.params.Destino });

        parameters.push({ name: 'AltitudOrigen', type: TYPES.VarChar, val: req.body.params.AltitudOrigen });
        parameters.push({ name: 'AltitudDestino', type: TYPES.VarChar, val: req.body.params.Destino });
        parameters.push({ name: 'LongitudOrigen', type: TYPES.VarChar, val: req.body.params.Origen });
        parameters.push({ name: 'LongitudDestino', type: TYPES.VarChar, val: req.body.params.Destino });

        parameters.push({ name: 'Precio', type: TYPES.Decimal, val: req.body.params.Precio });
        parameters.push({ name: 'Pagado', type: TYPES.Decimal, val: req.body.params.Pagado });
        parameters.push({ name: 'DNICliente', type: TYPES.Char, val: req.body.params.DNICliente});
        
       /* var query= "INSERT INTO Encargo (id,NaturalezaEncargo,Peso,Alto,Ancho,Largo,Origen,Destino,AltitudOrigen,AltitudDestino,LongitudOrigen,LongitudDestino,Precio,Pagado,DNICliente) "+
        "VALUES(@id,@NaturalezaEncargo,@Peso,@Alto,@Ancho,@Largo,@Origen,@Destino,@AltitudOrigen,@AltitudDestino,@LongitudOrigen,@LongitudDestino,@Precio,@Pagado,@DNICliente)";
        */
       var query= "INSERT INTO Encargo (NaturalezaEncargo,Peso,Alto,Ancho,Largo,Origen,Destino,Precio,Pagado,DNICliente) "+
        "VALUES(@NaturalezaEncargo,@Peso,@Alto,@Ancho,@Largo,@Origen,@Destino,@Precio,@Pagado,@DNICliente)";
       
        dbContext.getQuery(query, parameters, true, function (error, data) {
         return res.json(response(data, error));
        });
    }

    function deleteEncargoCliente(req, res) {

        if (req.data.Id) {
            var parameters = [];

            parameters.push({ name: 'Id', type: TYPES.BigInt, val: req.data.Id });
            parameters.push({ name: 'DNICLiente', type: TYPES.Char, val: req.data.DNICliente });
          
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

        if (req.data.Id) {
            var parameters = [];

            parameters.push({ name: 'Id', type: TYPES.BigInt, val: req.data.Id });
            parameters.push({ name: 'DNITransportista', type: TYPES.Char, val: req.data.DNITransportista });
          
            var query = "delete from Encargo where persona DNITransportista LIKE @DNITransportista AND Id LIKE @Id"
           
            dbContext.getQuery(query, parameters, false, function (error, data, rowCount) {
                if (rowCount > 0) {
                    return res.json('Record is deleted');
                }
                return res.sendStatus(404);
            });
     
        }
    }

    function añadirDNITransportistaAEncargo(req, res)
    {
        if (req.body.IdEncargo && req.body.DNITransportista) {
            var parameters = [];
            
            parameters.push({ name: 'IdEncargo', type: TYPES.BigInt, val: req.body.IdEncargo });
            parameters.push({ name: 'DNITransportista', type: TYPES.Char, val: req.body.DNITransportista });
            
            var query = "update Encargo set DNITransportista = @DNITransportista where Id = @IdEncargo"
           
            dbContext.getQuery(query, parameters, false, function (error, data) {
                return res.json(response(data, error));
            });
        }

    }

    function quitarDNITransportistaDeEncargo(req, res)
    {
        if (req.query.IdEncargo) {
            var parameters = [];

            parameters.push({ name: 'IdEncargo', type: TYPES.BigInt, val: req.query.IdEncargo });
          
            var query = "update Encargo set DNITransportista = NULL where Id = @IdEncargo"
           
            dbContext.getQuery(query, parameters, false, function (error, data) {
                if (error) {
                    console.log(error)
                }
            });
     
        } else {
            console.log("The parameters are not correct")
        }

        return res.sendStatus(404);
    }



    function getEncargosPorEstado(req,res) {
       
        var parameters = [];
        
        var query = "select * from Encargo where DNITransportista IS NULL"

        dbContext.getQuery(query, parameters, true, function (error, data) {
            return res.json(response(data, error));
        });
   
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
        getEncargosPorNaturalezaTransportista: getEncargosPorNaturalezaTransportista,
        getEstados: getEncargosPorEstado,
        reservarEncargo: añadirDNITransportistaAEncargo,
        anularEncargo: quitarDNITransportistaDeEncargo
    }
}
module.exports = EncargoRepository;