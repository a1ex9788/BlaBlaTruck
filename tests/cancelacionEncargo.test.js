const request = require('supertest');

const DNICliente = '98128940T'
const DNITransportista = '22222222A'
let Id

/*Creamos un cliente, un transportista, un paquete en la BD y lo reservamos */ 
beforeAll(async () => {
    // Crear cliente
    await request('http://localhost:3300')
        .post('/api/personas')
        .send({
            Nombre: 'TestUser',
            Apellidos: 'TestUser',
            DNI: DNICliente,
            Telefono: 620102020,
            Email: 'test@test.test',
            Usuario: 'testuser',
            Contraseña: 'testuser',
            IBAN: 'ES11',
            NumeroCuentaBancaria: "12345678912365478978",
    })
    await request('http://localhost:3300')
        .post('/api/cliente')
        .send({
            DNI: DNICliente,
            Empresa: 'UsuarioTestable',
    })
    // Crear transportista
    await request('http://localhost:3300')
        .post('/api/personas')
        .send({
            Nombre: 'TestUser2',
            Apellidos: 'TestUser2',
            DNI: DNITransportista,
            Telefono: 620102020,
            Email: 'test@test.test2',
            Usuario: 'testuser2',
            Contraseña: 'testuser2',
            IBAN: 'ES11',
            NumeroCuentaBancaria: "12345678912365478978",
    })
    await request('http://localhost:3300')
        .post('/api/transportista')
        .send({
            DNI: DNITransportista,
            NaturalezaCamion: 'Fragil',
            Capacidad: '5',
    })
    // Crear paquete
    await request('http://localhost:3300')
        .post('/api/encargo/cliente')
        .send({ params: {
            NaturalezaEncargo : "Congelado",
            Peso : 10.0,
            Alto : 2.0,
            Ancho : 3.0,
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
            DNICliente : DNICliente
    }})
    // Obtener el paquete creado de la BD para saber su Id
    await request('http://localhost:3300')
        .get('/api/encargo/todos')
        .then((listaDeEncargos) => {
            status = listaDeEncargos.body.code;
            lista = listaDeEncargos;
        })
    
    lista = JSON.parse(lista.text)[0];
    let paquete = lista[lista.length - 1]
    Id = paquete.Id

    // Hacer la reserva
    await request('http://localhost:3300')
        .put('/api/encargo/reservar')
        .send({
            IdEncargo: Id,
            DNITransportista: DNITransportista
    })
})

/* Despues de ejecutar la suite de test debemos eleminar
el cliente, el transportista y el paquete creados. */
afterAll(async() => {
    // Borrar paquete
    await request('http://localhost:3300')
        .delete('/api/encargo')
        .send({
             Id: Id
    })
    // Borrar cliente
    await request('http://localhost:3300')
        .delete('/api/cliente')
        .send({
            dni: DNICliente
    })
    await request('http://localhost:3300')
        .delete('/api/personas')
        .send({
            dni: DNICliente
    })
    // Borrar transportista
    await request('http://localhost:3300')
        .delete('/api/transportista')
        .send({
                dni: DNITransportista
    })
    await request('http://localhost:3300')
        .delete('/api/personas')
        .send({
            dni: DNITransportista
    })    
})

describe('Cancelación paquete', () => {
    /*Test que comprueba que un paquete se cancela correctamente */
    it('Cancelación de un paquete', async () => {
    let status
    let lista;

    // Cancelar el paquete
    await request('http://localhost:3300')
        .put('/api/encargo/anular')
        .send({
          params: {
            IdEncargo: Id
          }
    })
    
    status = -1;
    // Obtener de nuevo el paquete de la BD
    while(status == -1 || status === 'EINVALIDSTATE') {
    await request('http://localhost:3300')
        .get('/api/encargo/todos')
        .then((listaDeEncargos) => {
            status = listaDeEncargos.body.code;
            lista = listaDeEncargos;
    })
    }

    lista = JSON.parse(lista.text)[0];
    paqueteQuerido = lista[lista.length - 1]

    // Comprobar que el DNITransporista del paquete es null, porque no tiene reserva
    expect(paqueteQuerido.DNITransportista).toBe(null)
    })
})