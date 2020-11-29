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
            
            var query = "(select e.Origen, e.Destino, e.FechaEntrega, e.FechaRecogida, p.Nombre + ' ' + p.Apellidos as NombreCompleto, e.Id, e.FechaMaximaEntrega"
            + " from Encargo e, Persona p"
            + " where p.DNI = e.DNITransportista and DNICliente LIKE @DNICliente)"
            + " union all"
            + " (select distinct e.Origen, e.Destino, e.FechaEntrega, e.FechaRecogida, 'Por reservar' as NombreCompleto, e.Id, e.FechaMaximaEntrega"
            + " from Encargo e"
            + " where e.DNITransportista is null and DNICliente LIKE @DNICliente)";

                console.log(query);
            
            dbContext.getQuery(query, parameters, true, function(err, data) {
                if(data) {
                    return res.json(data)
                }
                console.log(err);
                console.log("error 404");
                return res.sendStatus(404);
            });
       
    }

    function getEncargosPorDniTransportista(req,res) {
        
        var parameters = [];
        
        parameters.push({name: 'DNITransportista', type: TYPES.Char, val: req.query.DNITransportista});
        var query = "select e.Origen, e.Destino, e.FechaEntrega, e.FechaRecogida, p.Nombre + ' ' + p.Apellidos as NombreCompleto, e.Id, e.FechaMaximaEntrega" 
        + " from Encargo e, Persona p" 
        + " where p.DNI = e.DNICliente and DNITransportista LIKE @DNITransportista"
        + " order by  e.FechaRecogida"

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
        parameters.push({ name: 'FechaMax', type: TYPES.Date, val: req.body.params.FechaMax });

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
       var query= "INSERT INTO Encargo (NaturalezaEncargo,Peso,Alto,Ancho,Largo,Origen,Destino,Precio,Pagado,DNICliente,FechaMaximaEntrega) "+
        "VALUES(@NaturalezaEncargo,@Peso,@Alto,@Ancho,@Largo,@Origen,@Destino,@Precio,@Pagado,@DNICliente,@FechaMax)";
       
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

    function añadirFechaDeEntrega(req,res)
    {
        if (req.body.params.IdEncargo && req.body.params.FechaEntrega){
            var parameters = [];

            parameters.push({ name: 'IdEncargo', type: TYPES.BigInt, val: req.body.params.IdEncargo });
            parameters.push({ name: 'FechaEntrega', type: TYPES.Date, val: req.body.params.FechaEntrega });
            

            var query = "update Encargo set FechaEntrega = @FechaEntrega where Id = @IdEncargo"
           
            dbContext.getQuery(query, parameters, false, function (error, data) {
                return res.json(response(data, error));
            });
        }else {
            console.log("The parameters are not correct")
            return res.send("The parameters are not correct");
        }
    }

    function quitarDNITransportistaDeEncargo(req, res)
    {
        if (req.body.params.IdEncargo) {
            var parameters = [];

            parameters.push({ name: 'IdEncargo', type: TYPES.BigInt, val: req.body.params.IdEncargo });
          
            var query = "update Encargo set DNITransportista = NULL where Id = @IdEncargo"
            dbContext.getQuery(query, parameters, false, function (error, data) {
                return res.json(response(data, error));
            });
     
        } else {
            console.log("The parameters are not correct")
            return res.send("The parameters are not correct");
        }
    }

    function getEncargosPorEstado(req,res) {
       
        var parameters = [];
        
        var query = "select * from Encargo where DNITransportista IS NULL"

        dbContext.getQuery(query, parameters, true, function (error, data) {
            return res.json(response(data, error));
        });
   
    }
    
    function añadirValoracion(req, res)
    {
        if (req.body.params.IdEncargo && req.body.params.ValoracionTiempo && req.body.params.ValoracionEstado && req.body.params.Comentarios){
            var parameters = [];

            parameters.push({ name: 'IdEncargo', type: TYPES.BigInt, val: req.body.params.IdEncargo });
            parameters.push({ name: 'ValoracionTiempo', type: TYPES.Int, val: req.body.params.ValoracionTiempo });
            parameters.push({ name: 'ValoracionEstado', type: TYPES.Int, val: req.body.params.ValoracionEstado });
            parameters.push({ name: 'Comentarios', type: TYPES.Char, val: req.body.params.Comentarios });            

            var query = "update Encargo set ValoracionEstadoPaquete = @ValoracionTiempo, ValoracionTiempoEntrega = @ValoracionEstado, ComentariosValoracion = @Comentarios where Id = @IdEncargo"
           
            dbContext.getQuery(query, parameters, false, function (error, data) {
                return res.json(response(data, error));
            });
        }else {
            console.log("The parameters are not correct")
            return res.send("The parameters are not correct");
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
        getEncargosPorNaturalezaTransportista: getEncargosPorNaturalezaTransportista,
        getEstados: getEncargosPorEstado,
        reservarEncargo: añadirDNITransportistaAEncargo,
        anularEncargo: quitarDNITransportistaDeEncargo,
        entregarEncargo: añadirFechaDeEntrega,
        valorarEncargo: añadirValoracion
    }
}
module.exports = EncargoRepository;