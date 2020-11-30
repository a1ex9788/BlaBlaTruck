const request = require('supertest');

describe('Post transportista', () => {
    it('Insertar un persona en la BD sin fallos', async () =>{
        await request('http://localhost:3300')
        .post('/api/personas')
        .send({ params: {
            Nombre: "Gervasio",
            Apellidos: "Domingo Giménez",           
            DNI: "50501010A",
            Telefono: 123456789,
            Email: "gervasio@gmail.com",
            Usuario: "ElTransporter",
            Contraseña: "1234",
            IBAN: "ES65",
            NumeroCuentaBancaria: "01234567890123456789"

        }})
        .on('requestCompleted',async (resInsert) => {
            expect(resInsert.statusCode).toEqual(200);
        })
    })

    it('Insertar un transportista en la BD sin fallos', async () =>{
        await request('http://localhost:3300')
        .post('/api/transportista')
        .send({ params: {
            DNI: "50501010A",
            NaturalezaCamion: "Producto frágil",
            Capacidad: 250.00        
        }})
        .on('requestCompleted',async (resInsert) => {
            expect(resInsert.statusCode).toEqual(200);
        })
    })

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
        if(isInserted){
            await request('http://localhost:3300')
            .delete('/api/transportista/50501010A')
        }    
    })



})
