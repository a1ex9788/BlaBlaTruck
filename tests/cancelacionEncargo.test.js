const request = require('supertest');

beforeAll(async () => {
  await request('http://localhost:3300')
      .post('/api/personas')
      .send({
        Nombre: 'TestPerson',
        Apellidos: 'TestPerson',
        DNI: '12345678W',
        Telefono: 123456789,
        Email: 'TestPerson@test.test',
        Usuario: 'testperson',
        Contraseña: 'testperson',
        IBAN: 'ES99',
        NumeroCuentaBancaria: "01234567890123456789",
      })
  await request('http://localhost:3300')
      .post('/api/cliente')
      .send({
        DNI: '12345678W',
        Empresa: 'EmpresaTestable',
      })
  await request('http://localhost:3300')
      .post('/api/personas')
      .send({ 
          Nombre: 'TestPerson2',
          Apellidos: 'TestPerson2',
          DNI: '50501010A',
          Telefono: 123456789,
          Email: 'testperson2@gmail.com',
          Usuario: 'testperson2',
          Contraseña: 'testperson2',
          IBAN: 'ES65',
          NumeroCuentaBancaria: '01234567890123456789',
      })
  await request('http://localhost:3300')
      .post('/api/transportista')
      .send({
          DNI: '50501010A',
          NaturalezaCamion: 'Producto frágil',
          Capacidad: 250.00,               
      }) 
  await request('http://localhost:3300')
      .post('/api/encargo/cliente')
      .send({ params: {
        NaturalezaEncargo : "Frágil",
        Peso : 100.0,
        Alto : 1.0,
        Ancho : 1.0,
        Largo : 1.0,
        Origen : "Calle prueba 1",
        Destino : "Calle prueba 2",
        FechaMax : null,
        AltitudOrigen : 0.0,
        AltitudDestino : 0.0,    
        LongituOrigen : 0.0,
        LongitudDestino : 0.0,
        Precio : 200.0,
        Pagado : 0,
        DNICliente : "12345678W"
    }})
    
  })

describe('Post transportista', () => {
  let hola = true
  it('Holi', async () =>{
      expect(hola).toBe(true);
  })
})
