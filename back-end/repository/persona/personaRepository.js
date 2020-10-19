var response = require('../../shared/response');
var TYPES = require('tedious').TYPES;

function PersonaRepository(dbContext) {
    function getPersonas(req, res) {
            var parameters = [];

            //parameters.push({name: 'Nombre', type: TYPES.VarChar, val: req.params.Nombre});
            var query = "select * from Persona"
            console.log("getPersonas");
            dbContext.getQuery(query, parameters, true, function (error, data) {
                console.log("esto va bien");
                return res.json(response(data, error));
            });
    }
    function getPersona(req,res) {
        console.log("getPersona");
        return res.json(req.data);
    }
    function findPersona(req, res, next) {
        if(req.params.personaDNI){
        
        var parameters = [];

        parameters.push({name: 'personaDNI', type: TYPES.VarChar, val: req.params.personaDNI});
        var query = "select * from Persona where DNI LIKE @personaDNI";

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
     function putPersona(req, res) {
        var parameters = [];

        Object.entries(req.data).forEach((property) => {
            console.log("putPersona");
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

        dbContext.post("InsertPersona", parameters, function (error, data) {
            return res.json(response(data, error));
        });
    }
    
     function postPersona(req, res) {

        var parameters = [];

        parameters.push({ name: 'Nombre', type: TYPES.VarChar, val: req.body.Nombre });
        parameters.push({ name: 'Apellidos', type: TYPES.VarChar, val: req.body.Apellidos });
        parameters.push({ name: 'DNI', type: TYPES.Char, val: req.body.DNI });
        parameters.push({ name: 'Telefono', type: TYPES.Int, val: req.body.Telefono });
        parameters.push({ name: 'Email', type: TYPES.VarChar, val: req.body.Email });
        parameters.push({ name: 'Usuario', type: TYPES.VarChar, val: req.body.Usuario });
        parameters.push({ name: 'Contraseña', type: TYPES.VarChar, val: req.body.Contraseña });
        parameters.push({ name: 'IBAN', type: TYPES.VarChar, val: req.body.IBAN });
        parameters.push({ name: 'NumeroCuentaBancaria', type: TYPES.VarChar, val: req.body.NumeroCuentaBancaria});
       // parameters.push({ name: 'Empresa', type: TYPES.VarChar, val: req.body.Empresa });
        // Object.entries(employee).forEach((property)=>{
        //     parameters.push({name:'@'+property[0]})
        // });
        console.log("postPersona");
        dbContext.post("InsertOrUpdatePersona", parameters, function (error, data) {
            console.log("response works!")
            return res.json(response(data, error));
        });
    }

    function deletePersona(req, res) {

        var parameters = [];

        if (req.data.Id) {
            var parameters = [];

            parameters.push({ name: 'pesonaDNI', type: TYPES.Int, val: req.data.personaDNI });

            var query = "delete from Persona where persona DNI = @pesonaDNI"
            console.log("deletePersona");
            dbContext.getQuery(query, parameters, false, function (error, data, rowCount) {
                if (rowCount > 0) {
                    return res.json('Record is deleted');
                }
                return res.sendStatus(404);
            });
        }
    }
    function searchPersonaTelefono(req,res) {
        var parameters = [];
        parameters.push({name: 'telefono', type: TYPES.VarChar, val: req.query.telefono});
        console.log("searchPersonaTelefono")
        var query = "select * from Persona where telefono = @telefono"

        dbContext.get(query, parameters, function (error, data){
            return res.json(response(data,error));
        });
    }

    function getLoginToken (req, res) {
        var parameters = [];
        var dayToSeconds = 24*60*60;

        parameters.push({name: 'Usuario', type: TYPES.VarChar, val: req.query.Usuario});
        parameters.push({name: 'Contraseña', type: TYPES.VarChar, val: req.query.Contraseña});

        var query = 'SELECT DNI FROM PERSONA WHERE Usuario = @Usuario and Contraseña = @Contraseña';
        dbContext.get(query, parameters, function (error, data){
            return res.cookie('loginToken',res.json(response(data,error)), {maxAge: dayToSeconds, httpOnly: true});
        });
    }

    return {
            getAll: getPersonas,
            get: getPersona,
            put: putPersona,
            post: postPersona,
            getMulti: getLoginToken,
            find: searchPersonaTelefono,
            intercept: findPersona,
            delete: deletePersona
        }
}
module.exports = PersonaRepository;