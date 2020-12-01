const request = require('supertest');

/*Antes de ejecutar creamos un cliente en la BD el cual
  usaremos mas adelante para asignarle el paquete creado por
  el test */ 
beforeAll(async () => {
  await request('http://localhost:3300')
      .post('/api/personas')
      .send({
        Nombre: 'TestUser',
        Apellidos: 'TestUser',
        DNI: '00000000P',
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
        DNI: '00000000P',
        Empresa: 'UsuarioTestable',
      })
})

/* Despues de ejecutar la suite de test debemos eleminar
   el cliente generado antes para que los datos reales no
   se vean alterados */
afterAll(async() => {
    await request('http://localhost:3300')
      .delete('/api/cliente')
      .send({
        dni: '00000000P'
      })
    await request('http://localhost:3300')
      .delete('/api/personas')
      .send({
        dni: '00000000P'
      })
})

/* Test Suite para comprobar la creacion de un paquete usando nuestra API */
describe('Post encargo', () => {
  /*Test que comprueba que se puede realizar la inserción del paquete en la BD y no
    ningun problema de conexión con la misma */
  it('Insertar un paquete en la BD sin fallos de conexion/parsing', async () => {
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
          DNICliente : "00000000P"
      }})
      .on('requestCompleted',async (resInsert) => {
          expect(resInsert.statusCode).toEqual(200);
      })

  })
  /* Test que comprueba que la inserción del paquete es correcto y conforme
    a los datos que se le han pasado. Acto seguido el paquete se elimina para
    mantener la consistencia de los datos reales de la BD */
  it('Comprobar la insercion del paquete correcto', async() => {
      let status = -1;
      let lista;
    while(status == -1 || status === 'EINVALIDSTATE') {
      await request('http://localhost:3300')
        .get('/api/encargo/estado').then((listaDeEncargos) => {
            status = listaDeEncargos.body.code;
            lista =listaDeEncargos;
        })
    }
    const expected = {
        NaturalezaEncargo: 'Congelado',
          Peso: 10,
          Alto: 2,
          Ancho: 3,
          Largo: 1,
          Origen: 'Calle TEST 1',
          Destino: 'Calle TEST 2',
          Precio: 10,
          Pagado: false,
          DNICliente: '00000000P',
    }
    const paquetes = JSON.parse(lista.text)[0];
    let isInserted = false;
    let _id, dni;
    for(let i = 0; i < paquetes.length; i++) {
        if(paquetes[i].NaturalezaEncargo === expected.NaturalezaEncargo && 
            paquetes[i].Peso == expected.Peso &&
            paquetes[i].Alto == expected.Alto &&
            paquetes[i].Ancho == expected.Ancho &&
            paquetes[i].Largo == expected.Largo &&
            paquetes[i].Origen === expected.Origen &&
            paquetes[i].Destino === expected.Destino &&
            paquetes[i].Precio == expected.Precio &&
            paquetes[i].Pagado == expected.Pagado &&
            paquetes[i].DNICliente === expected.DNICliente) 
        {
            isInserted = true;
            _id = paquetes[i].Id;
            dni = paquetes[i].DNICliente;
        }
    }
    expect(isInserted).toBe(true);
    if(isInserted) {
        await request('http://localhost:3300')
            .delete('/api/encargo/cliente')
            .send({params:{Id: _id, DNICliente: dni}})
    }
  })
})