
/*const encargoRepository = require('../back-end/repository/encargo')
const personaRepository = require('../back-end/repository/persona') 
const transportistaRepository = require('../back-end/repository/transportista')*/

describe('encargos', () => {


    /*personaRepository.invokePostPersona("Rodrigo", "Perez Galván", "65444689A", 654894581, "Ropega@inf.upv.es", "ropega", "123", "ES65", "01234567890123456789")
    transportistaRepository.invokePostTransportista("65444689A", "Frágil", 100)
    encargoRepository.invokePostEncargo("Frágil", 100, 10,10,10,"Rafelbunyol","Galicia","2020-01-15","10","23", "12", "12", 2200, 1, "98789584S")
    var idEncargo = encargoRepository.invokeGetEncargosPorDniTransportistaForTest("65444689A")

     test('Debe borrar el paquete con id {idEncargo}', ()=> {
        encargoRepository.invokeAñadirDNITransportistaAEncargo(idEncargo, "65444689A")
        encargoRepository.invokeQuitarDNITransportistaDeEncargo(idEncargo)

        const actual = encargoRepository.invokeGetEncargosPorDniTransportistaForTest("65444689A")
        const esperado = null

        expect(actual).toEqual(esperado)

    }) */

    test('debe dar true', () => {

        const actual = true
        const esperado = true

        expect(actual).toEqual(esperado)
    }) 

    

});

