const request = require('supertest');
const filterTamaños = require('../blablatruck-page/src/scripts/filterUtility.js');
const paquetesToBeFiltered = [  
    // Crear paquete 1
    {
                NaturalezaEncargo : "Congelado",
                Peso : 1.0,
                Alto : 1.0,
                Ancho : 1.0,
                Largo : 1.0,
                Origen : "Calle TEST 1",
                Destino : "Calle TEST 2",
                FechaMax : null,
                AltitudOrigen : 0.0,
                AltitudDestino : 10.0,    
                LongituOrigen : 20.0,
                LongitudDestino : 30.0,
                Precio : 10.0,
                Pagado : 0,
                DNICliente : "00000000G"
        
            },
    // Crear paquete 2
    {
                NaturalezaEncargo : "Congelado",
                Peso : 2.0,
                Alto : 2.0,
                Ancho : 2.0,
                Largo : 2.0,
                Origen : "Calle TEST 1",
                Destino : "Calle TEST 2",
                FechaMax : null,
                AltitudOrigen : 0.0,
                AltitudDestino : 10.0,    
                LongituOrigen : 20.0,
                LongitudDestino : 30.0,
                Precio : 10.0,
                Pagado : 0,
                DNICliente : "11111111G"
            },
    // Crear paquete 3
    {
                NaturalezaEncargo : "Congelado",
                Peso : 3.0,
                Alto : 3.0,
                Ancho : 3.0,
                Largo : 3.0,
                Origen : "Calle TEST 1",
                Destino : "Calle TEST 2",
                FechaMax : null,
                AltitudOrigen : 0.0,
                AltitudDestino : 10.0,    
                LongituOrigen : 20.0,
                LongitudDestino : 30.0,
                Precio : 10.0,
                Pagado : 0,
                DNICliente : "22222222G"
            },
    // Crear paquete 4
    {
                NaturalezaEncargo : "Congelado",
                Peso : 4.0,
                Alto : 4.0,
                Ancho : 4.0,
                Largo : 4.0,
                Origen : "Calle TEST 1",
                Destino : "Calle TEST 2",
                FechaMax : null,
                AltitudOrigen : 0.0,
                AltitudDestino : 10.0,    
                LongituOrigen : 20.0,
                LongitudDestino : 30.0,
                Precio : 10.0,
                Pagado : 0,
                DNICliente : "33333333G"
            },
    // Crear paquete 5
    {
                NaturalezaEncargo : "Congelado",
                Peso : 5.0,
                Alto : 5.0,
                Ancho : 5.0,
                Largo : 5.0,
                Origen : "Calle TEST 1",
                Destino : "Calle TEST 2",
                FechaMax : null,
                AltitudOrigen : 0.0,
                AltitudDestino : 10.0,    
                LongituOrigen : 20.0,
                LongitudDestino : 30.0,
                Precio : 10.0,
                Pagado : 0,
                DNICliente : "44444444G"
            },
    // Crear paquete 6
    {
                NaturalezaEncargo : "Congelado",
                Peso : 6.0,
                Alto : 6.0,
                Ancho : 6.0,
                Largo : 6.0,
                Origen : "Calle TEST 1",
                Destino : "Calle TEST 2",
                FechaMax : null,
                AltitudOrigen : 0.0,
                AltitudDestino : 10.0,    
                LongituOrigen : 20.0,
                LongitudDestino : 30.0,
                Precio : 10.0,
                Pagado : 0,
                DNICliente : "55555555G"
            },
    // Crear paquete 7
    {
                NaturalezaEncargo : "Congelado",
                Peso : 7.0,
                Alto : 7.0,
                Ancho : 7.0,
                Largo : 7.0,
                Origen : "Calle TEST 1",
                Destino : "Calle TEST 2",
                FechaMax : null,
                AltitudOrigen : 0.0,
                AltitudDestino : 10.0,    
                LongituOrigen : 20.0,
                LongitudDestino : 30.0,
                Precio : 10.0,
                Pagado : 0,
                DNICliente : "66666666G"
            },
    // Crear paquete 8
    {
                NaturalezaEncargo : "Congelado",
                Peso : 8.0,
                Alto : 8.0,
                Ancho : 8.0,
                Largo : 8.0,
                Origen : "Calle TEST 1",
                Destino : "Calle TEST 2",
                FechaMax : null,
                AltitudOrigen : 0.0,
                AltitudDestino : 10.0,    
                LongituOrigen : 20.0,
                LongitudDestino : 30.0,
                Precio : 10.0,
                Pagado : 0,
                DNICliente : "77777777G"
            },
    // Crear paquete 9
    {
                NaturalezaEncargo : "Congelado",
                Peso : 9.0,
                Alto : 9.0,
                Ancho : 9.0,
                Largo : 9.0,
                Origen : "Calle TEST 1",
                Destino : "Calle TEST 2",
                FechaMax : null,
                AltitudOrigen : 0.0,
                AltitudDestino : 10.0,    
                LongituOrigen : 20.0,
                LongitudDestino : 30.0,
                Precio : 10.0,
                Pagado : 0,
                DNICliente : "88888888G"
            },
    // Crear paquete 10
    {
                NaturalezaEncargo : "Congelado",
                Peso : 10.0,
                Alto : 10.0,
                Ancho : 10.0,
                Largo : 10.0,
                Origen : "Calle TEST 1",
                Destino : "Calle TEST 2",
                FechaMax : null,
                AltitudOrigen : 0.0,
                AltitudDestino : 10.0,    
                LongituOrigen : 20.0,
                LongitudDestino : 30.0,
                Precio : 10.0,
                Pagado : 0,
                DNICliente : "10000000G"
    }
]
const paquetesFiltrados = [
{
    NaturalezaEncargo : "Congelado",
    Peso : 1.0,
    Alto : 1.0,
    Ancho : 1.0,
    Largo : 1.0,
    Origen : "Calle TEST 1",
    Destino : "Calle TEST 2",
    FechaMax : null,
    AltitudOrigen : 0.0,
    AltitudDestino : 10.0,    
    LongituOrigen : 20.0,
    LongitudDestino : 30.0,
    Precio : 10.0,
    Pagado : 0,
    DNICliente : "00000000G"

},
{
    NaturalezaEncargo : "Congelado",
    Peso : 2.0,
    Alto : 2.0,
    Ancho : 2.0,
    Largo : 2.0,
    Origen : "Calle TEST 1",
    Destino : "Calle TEST 2",
    FechaMax : null,
    AltitudOrigen : 0.0,
    AltitudDestino : 10.0,    
    LongituOrigen : 20.0,
    LongitudDestino : 30.0,
    Precio : 10.0,
    Pagado : 0,
    DNICliente : "11111111G"
},
{
    NaturalezaEncargo : "Congelado",
    Peso : 3.0,
    Alto : 3.0,
    Ancho : 3.0,
    Largo : 3.0,
    Origen : "Calle TEST 1",
    Destino : "Calle TEST 2",
    FechaMax : null,
    AltitudOrigen : 0.0,
    AltitudDestino : 10.0,    
    LongituOrigen : 20.0,
    LongitudDestino : 30.0,
    Precio : 10.0,
    Pagado : 0,
    DNICliente : "22222222G"
},
{
    NaturalezaEncargo : "Congelado",
    Peso : 4.0,
    Alto : 4.0,
    Ancho : 4.0,
    Largo : 4.0,
    Origen : "Calle TEST 1",
    Destino : "Calle TEST 2",
    FechaMax : null,
    AltitudOrigen : 0.0,
    AltitudDestino : 10.0,    
    LongituOrigen : 20.0,
    LongitudDestino : 30.0,
    Precio : 10.0,
    Pagado : 0,
    DNICliente : "33333333G"
},
{
    NaturalezaEncargo : "Congelado",
    Peso : 5.0,
    Alto : 5.0,
    Ancho : 5.0,
    Largo : 5.0,
    Origen : "Calle TEST 1",
    Destino : "Calle TEST 2",
    FechaMax : null,
    AltitudOrigen : 0.0,
    AltitudDestino : 10.0,    
    LongituOrigen : 20.0,
    LongitudDestino : 30.0,
    Precio : 10.0,
    Pagado : 0,
    DNICliente : "44444444G"
}];

const tamanyoFilter = { largo: 5, anchura: 5, altura: 5};
const tamanyoFilterMistake = {largo: -5, anchura: -5, altura: -5};
const tamanyoFilterSinPaquetes = { largo: 0.5, anchura: 0.5, altura: 0.5};



//Test Suite para comprobar el correcto funcionamiento del filtro por capacidad.
describe('Filtro por capacidad', () => {
    it('Los campos de tamaño solo permiten numeros positivos', async () => {
        var filtrado = filterTamaños(paquetesToBeFiltered, tamanyoFilterMistake)
            expect(filtrado.length).toBe(0)

    })

    it('El filtro funciona correctamente', async () => {
        var filtrado = filterTamaños(paquetesToBeFiltered, tamanyoFilter)
            expect(filtrado.length).toBe(5)
    
    })

    it('No se encuentran paquetes disponibles', async () => {
        var filtrado = filterTamaños(paquetesToBeFiltered, tamanyoFilterSinPaquetes)
            expect(filtrado.length).toBe(0)

    })
})

