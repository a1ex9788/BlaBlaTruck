var response = require('../../shared/response');
var TYPES = require('tedious').TYPES;

function TransportistaRepository(dbContext) {
    function getTransportistas(req, res) {
        var parameters = [];

        //parameters.push({name: 'Nombre', type: TYPES.VarChar, val: req.params.Nombre});
        var query = "select * from Transportista"
        console.log("getTransportistas");
        dbContext.getQuery(query, parameters, true, function (error, data) {            
            return res.json(response(data, error));
        });
    }

    function getTransportista(req,res) {
        if (req.params.transportistaDNI) {
            console.log("getTransportista");
            var parameters = [];
            parameters.push({name: 'DNI', type: TYPES.VarChar, val: req.params.transportistaDNI});

            var query = "select t.DNI, t.Capacidad, t.NaturalezaCamion, p.Nombre, p.Apellidos, p.Email, p.Telefono, p.IBAN, p.NumeroCuentaBancaria, p.Usuario, AVG(e.ValoracionTiempoEntrega) as MediaValoracionTiempo, AVG(e.ValoracionEstadoPaquete) as MediaValoracionEstado "
                + "from Transportista t, Persona p, Encargo e "
                + "where t.DNI = @DNI and p.DNI = @DNI and e.DNITransportista = t.DNI "
                + "group by t.DNI, t.Capacidad, t.NaturalezaCamion, p.Nombre, p.Apellidos, p.Email, p.Telefono, p.IBAN, p.NumeroCuentaBancaria, p.Usuario"
            dbContext.getQuery(query, parameters, true, function (error, data) {
                if(data){
                    return res.json(response(data, error))
                }
                query = "select t.DNI, t.Capacidad, t.NaturalezaCamion, p.Nombre, p.Apellidos, p.Email, p.Telefono, p.IBAN, p.NumeroCuentaBancaria, p.Usuario, 0 as MediaValoracionTiempo, 0 as MediaValoracionEstado "
                    + "from Transportista t, Persona p "
                    + "where t.DNI like @DNI and p.DNI like @DNI"
                dbContext.getQuery(query, parameters, true, function (error, data) {
                    return res.json(response(data, error))
                })                           
            });
        } else {
            console.log("The parameters are not correct")
            return res.send("The parameters are not correct");
        }
    }

    function findTransportista(req, res, next) {
        if(req.params.transportistaDNI){        
            var parameters = [];

            parameters.push({name: 'transportistaDNI', type: TYPES.VarChar, val: req.params.transportistaDNI});
            var query = "select * from Persona p, Transportista t where p.DNI = t.DNI and p.DNI LIKE @transportistaDNI";

            dbContext.getQuery(query, parameters, false, function(err, data) {
                if(data) {
                    req.data = data[0];
                    return next();
                }
                return res.sendStatus(404);
            });            
        }
        else
        {
            console.log(req.params);
            console.log("esto no funciona idk why");
        }
    }

    function putTransportista(req, res) {
        console.log("putTransportista");
        
        var query = "UPDATE Transportista SET NaturalezaCamion = " + req.body.NaturalezaCamion + ", Capacidad = " + req.body.Capacidad + " WHERE DNI = '" + req.body.DNI + "'"

        dbContext.getQuery(query, [], true, function (error, data) {
            return res.json(response(data, error));
        });
    }
    
    function postTransportista(req, res) {
        var parameters = [];

        parameters.push({ name: 'DNI', type: TYPES.Char, val: req.body.DNI });
        parameters.push({ name: 'NaturalezaCamion', type: TYPES.VarChar, val: req.body.NaturalezaCamion});
        parameters.push({ name: 'Capacidad', type: TYPES.Decimal, val: req.body.Capacidad });

        // Object.entries(employee).forEach((property)=>{
        //     parameters.push({name:'@'+property[0]})
        // });
        var query = "INSERT INTO Transportista (DNI,NaturalezaCamion,Capacidad) VALUES (@DNI,@NaturalezaCamion,@Capacidad)";
        //console.log("postTransportista");
        /*
        dbContext.post("InsertOrUpdateTransportista", parameters, function (error, data) {
            return res.json(response(data, error));
        });*/
        dbContext.getQuery(query, parameters,true, function (error, data) {
            return res.json(response(data, error));
        });
    }

    function deleteTransportista(req, res) {
        var parameters = [];

        if (req.data.Id) {
            var parameters = [];

            parameters.push({ name: 'transportistaDNI', type: TYPES.Int, val: req.data.transportistaDNI});

            var query = "delete from Transportista where persona DNI = @transportistaDNI"
            console.log("deleteTransportista");
            dbContext.getQuery(query, parameters, false, function (error, data, rowCount) {
                if (rowCount > 0) {
                    return res.json('Record is deleted');
                }
                return res.sendStatus(404);
            });
        }
    }

    function searchTransportistaNaturaleza(req,res) {
        var parameters = [];
        parameters.push({name: 'naturalezaCamion', type: TYPES.VarChar, val: req.query.naturalaezaCamion});
        console.log("searchPersonaTelefono")
        var query = "select * from Persona where naturalezaCamion = @naturalezaCamion"

        dbContext.get(query, parameters, function (error, data){
            return res.json(response(data,error));
        });
    }

    function deleteByDNI(req, res) {
        if (req.body.dni) {
            var parameters = [];

            parameters.push({ name: 'DNI', type: TYPES.Char, val: req.body.dni });

            var query = "delete from Transportista where DNI = @DNI"

            dbContext.getQuery(query, parameters, false, function (error, data, rowCount) {
                if (rowCount > 0) {
                    return res.json('Record is deleted');
                }
                return res.sendStatus(404);
            });
        }
    }

    function deleteByDNI(req, res) {
        if (req.body.dni) {
            var parameters = [];

            parameters.push({ name: 'DNI', type: TYPES.Char, val: req.body.dni });

            var query = "delete from Transportista where DNI = @DNI"

            dbContext.getQuery(query, parameters, false, function (error, data, rowCount) {
                if (rowCount > 0) {
                    return res.json('Record is deleted');
                }
                return res.sendStatus(404);
            });
        }
    }

    function setCoord(req,res) {

        if (req.body.DNI) {
            var option = {"precision":18,"scale":9}
            console.log("cambiando coord");
            var parameters = [];
            console.log(req.body.Latitud);
            console.log(req.body.Altitud);
            parameters.push({name: 'DNI', type: TYPES.VarChar, val: req.body.DNI});
            parameters.push({name: 'Latitud', type: TYPES.Float, val: req.body.Latitud});
            parameters.push({name: 'Altitud', type: TYPES.Float, val: req.body.Altitud});

            var query = "update transportista set Altitud = @Altitud, Latitud = @Latitud where DNI = @DNI"
            dbContext.getQuery(query, parameters, true, function (error, data) {            
                return res.json(response(data, error));
            });
        } else {
            console.log("The parameters are not correct")
            return res.send("The parameters are not correct");
        }
    }
    return {
            getAll: getTransportistas,
            get: getTransportista,
            put: putTransportista,
            putCoord: setCoord,
            post: postTransportista,
            find: searchTransportistaNaturaleza,
            intercept: findTransportista,
            delete: deleteTransportista,
            deleteByDNI: deleteByDNI
        }
}
module.exports = TransportistaRepository;