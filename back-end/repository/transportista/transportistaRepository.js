var response = require('../../shared/response');
var TYPES = require('tedious').TYPES;

function TransportistaRepository(dbContext) {
    function getTransportistas(req, res) {
            var parameters = [];

            //parameters.push({name: 'Nombre', type: TYPES.VarChar, val: req.params.Nombre});
            var query = "select * from Transportista"
            console.log("getTransportista");
            dbContext.getQuery(query, parameters, true, function (error, data) {
               
                return res.json(response(data, error));
            });
    }
    function getTransportista(req,res) {
        console.log("getTransportista");
        return res.json(req.data);
    }
    function findTransportista(req, res, next) {
        if(req.params.transportistaDNI){
        
        var parameters = [];

        parameters.push({name: 'transportistaDNI', type: TYPES.VarChar, val: req.params.transportistaDNI});
        var query = "select * from Persona where DNI LIKE @transportistaDNI";

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
        var parameters = [];

        Object.entries(req.data).forEach((property) => {
            console.log("putTransportista");
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

        dbContext.post("InsertOrUpdateTransportista", parameters, function (error, data) {
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

    return {
            getAll: getTransportistas,
            get: getTransportista,
            put: putTransportista,
            post: postTransportista,
            find: searchTransportistaNaturaleza,
            intercept: findTransportista,
            delete: deleteTransportista,
            deleteByDNI: deleteByDNI
        }
}
module.exports = TransportistaRepository;