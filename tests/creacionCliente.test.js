const request = require('supertest');

/*Creamos un cliente con su respectiva persona en la BD  */
beforeAll(async () => {
    await request('http://localhost:3300')
        .post('/api/personas')
        .send({ 
            Nombre: 'TestName',
            Apellidos: 'TestApellidos',
            DNI: '50501010A',
            Telefono: 123456789,
            Email: 'test@gmail.com',
            Usuario: 'test',
            Contraseña: 'test',
            IBAN: 'ES65',
            NumeroCuentaBancaria: '01234567890123456789',
        })
    await request('http://localhost:3300')
        .post('/api/cliente')
        .send({
            DNI: '50501010A',
            Empresa: 'Producto frágil',             
        })       
})

/*Borramos el cliente y persona creado de la bd */
afterAll(async() => {
    await request('http://localhost:3300')
      .delete('/api/cliente')
      .send({
        dni: '50501010A'
      })
    await request('http://localhost:3300')
      .delete('/api/personas')
      .send({
        dni: '50501010A'
      })
})

/*Comprobamos que el cliente ha sido creado correctamente en la BD */
describe('Post cliente', () => {
    it('Debería comprobar la inserción del cliente', async() => {
        let isInserted = false;
        let cliente;

        await request('http://localhost:3300')
        .get('/api/cliente/50501010A')
        .then((response) => {
            cliente = response           
        })
        
        if(cliente.text !== "Not Found") {
            isInserted = true;
        }

        expect(isInserted).toBe(true);
    })
})
