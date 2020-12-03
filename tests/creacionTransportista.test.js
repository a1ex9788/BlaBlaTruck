const request = require('supertest');

/*Creamos un transportista en la BD  */
beforeAll(async () => {
    await request('http://localhost:3300')
        .post('/api/personas')
        .send({ 
            Nombre: 'Gervasio',
            Apellidos: 'Domingo Giménez',
            DNI: '50501010A',
            Telefono: 123456789,
            Email: 'gervasio@gmail.com',
            Usuario: 'ElTransporter',
            Contraseña: '1234',
            IBAN: 'ES65',
            NumeroCuentaBancaria: '01234567890123456789',
        })
    await request('http://localhost:3300')
        .post('/api/transportista')
        .send({
            DNI: '50501010A',
            NaturalezaCamion: '1',
            Capacidad: 250.00,               
        })       
})

/*Borramos el transportista creado */
afterAll(async() => {
    await request('http://localhost:3300')
      .delete('/api/transportista')
      .send({
        dni: '50501010A'
      })
    await request('http://localhost:3300')
      .delete('/api/personas')
      .send({
        dni: '50501010A'
      })
})

/*Comprobamos que el transportista ha sido creado correctamente en la BD */
describe('Post transportista', () => {
    it('Comprobar la inserción del transportista', async() => {
        let isInserted = false;
        let transportista;

        await request('http://localhost:3300')
        .get('/api/transportista/50501010A')
        .then((response) => {
            transportista = response           
        })
        
        if(transportista.text !== "Not Found") {
            isInserted = true;
        }

        expect(isInserted).toBe(true);
    })
})
