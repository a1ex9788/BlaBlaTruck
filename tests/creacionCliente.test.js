const request = require('supertest');

describe('Post transportista', () => {
    it('Insertar un persona en la BD sin fallos', async () =>{
        await request('http://localhost:3300')
        .post('/api/personas')
        .send({ params: {
            Nombre: "NombreTest",
            Apellidos: "TEST CLIENTE",           
            DNI: "40040404A",
            Telefono: 123456789,
            Email: "test@gmail.com",
            Usuario: "clienteTest",
            Contraseña: "1234",
            IBAN: "ES65",
            NumeroCuentaBancaria: "01234567890123456789"

        }})
        .on('requestCompleted',async (resInsert) => {
            expect(resInsert.statusCode).toEqual(200);
        })
    })

    it('Insertar un cliente en la BD sin fallos', async () =>{
        await request('http://localhost:3300')
        .post('/api/cliente', {
            DNI: "40040404A",
            Empresa: "Empresa"   
        })
        .on('requestCompleted',async (resInsert) => {
            expect(resInsert.statusCode).toEqual(true);
        })
    })

    it('Comprobar la inserción del cliente', async() => {
        let isInserted = false;
        let transportista;

        await request('http://localhost:3300')
        .get('/api/cliente/40040404A')
        .then((response) => {
            transportista = response           
        })
        
        if(transportista.text !== "Not Found") {
            isInserted = true;
        }

        expect(isInserted).toBe(true);
        if(isInserted){
            await request('http://localhost:3300')
            .delete('/api/transportista/50501010A')
            .delete('/api/persona/50501010A')
        }    
    })



})
