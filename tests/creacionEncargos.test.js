const request = require('supertest');

describe('Post encargo', () => {
  it('Insertar un paquete en la BD sin fallos', async () => {
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
        DNICliente : "00000001A"
    }})
    .on('requestCompleted',async (resInsert) => {
        expect(resInsert.statusCode).toEqual(200);
    })
  })
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
          AltitudOrigen: null,
          AltitudDestino: null,
          LongitudOrigen: null,
          LongitudDestino: null,
          FechaRecogida: null,
          FechaEntrega: null,
          Precio: 10,
          Pagado: false,
          DNICliente: '00000001A',
          DNITransportista: null,
          FechaMaximaEntrega: null,
          ValoracionTiempoEntrega: null,
          ValoracionEstadoPaquete: null,
          ComentariosValoracion: null
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