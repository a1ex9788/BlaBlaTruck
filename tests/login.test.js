const request = require('supertest');

beforeAll(async () => {
    /** Creando un cliente testeable añadiendo primero el cliente en personas
      * y luego en la tabla cliente*/
    await request('http://localhost:3300')
        .post('/api/personas')
        .send({
            Nombre: 'TestClienteNombre',
            Apellidos: 'TestClienteApellidos',
            DNI: '10101010A',
            Telefono: 620102020,
            Email: 'testcliente@test.test',
            Usuario: 'testcliente',
            Contraseña: 'testcliente',
            IBAN: 'ES11',
            NumeroCuentaBancaria: "12345678912365478978",
        })
    await request('http://localhost:3300')
        .post('/api/cliente')
        .send({
            DNI: '10101010A',
            Empresa: 'EmpresaClienteTestable',
        })
    /** Creando un transportista testeable añadiendo primero el transportista en personas
      * y luego en la tabla transportista*/
    await request('http://localhost:3300')
        .post('/api/personas')
        .send({
            Nombre: 'TestTransportistaNombre',
            Apellidos: 'TestTransportistaApellidos',
            DNI: '20202020B',
            Telefono: 620102020,
            Email: 'testcliente@test.test',
            Usuario: 'testtransportista',
            Contraseña: 'testtransportista',
            IBAN: 'ES11',
            NumeroCuentaBancaria: "12345678912365478978",
        })
    await request('http://localhost:3300')
        .post('/api/transportista')
        .send({
            DNI: '20202020B',
            NaturalezaCamion: 'Congelado',
            Capacidad: 12.3
        })
})


afterAll(async () => {
    /**Borra el cliente introducido en las tablas persona y cliente */
    await request('http://localhost:3300')
        .delete('/api/cliente')
        .send({
            dni: '10101010A'
        })
    await request('http://localhost:3300')
        .delete('/api/personas')
        .send({
            dni: '10101010A'
        })

    /**Borra el cliente introducido en las tablas persona y cliente */
    await request('http://localhost:3300')
        .delete('/api/transportista')
        .send({
            dni: '20202020B'
        })
    await request('http://localhost:3300')
        .delete('/api/personas')
        .send({
            dni: '20202020B'
        })
})

/**Se comprueba que se realiza el inicio de sesión de usuario con un usuario existente (cliente o transportista)
 * en la base de datos y uno fallido */
describe('Iniciar sesión', () => {

    it('Iniciar sesión como cliente', async () => {

        var response = await request('http://localhost:3300').get('/api/personas/login').query({
            Usuario: "testcliente",
            Contraseña: "testcliente"
        })
        expect(response.body.Type).toEqual('Cliente');
        expect(response.body.Dni).toEqual('10101010A');
        expect(response.statusCode).toEqual(200);



    });

    it('Iniciar sesión como transportista', async () => {

        var response = await request('http://localhost:3300').get('/api/personas/login').query({

            Usuario: "testtransportista",
            Contraseña: "testtransportista"

        })
        expect(response.statusCode).toEqual(200);
        expect(response.body.Type).toEqual('Transportista');
        expect(response.body.Dni).toEqual('20202020B');


    });

    it('Iniciar sesión con un usuario no existente en la base de datos', async () => {
        var response = await request('http://localhost:3300').get('/api/personas/login').query({

            Usuario: "usuarioInexistente",
            Contraseña: "contraseñaInexsistente"

        })

        expect.assertions();
        expect(response.statusCode).toEqual(200);
        expect(response.body.Type).toEqual('NotLogged');
        expect(response.body.Dni).toEqual(undefined);

    });

});