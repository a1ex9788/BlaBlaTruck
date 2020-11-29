const _encargoRepository = require('./encargoRepository');
const dbContext = require('../../dataBase/dbContext');
module.exports = function (router) {
    const encargoRepository = _encargoRepository(dbContext);
    router.route('/encargo').get(encargoRepository.getAll)
  
    router.use('/encargo/naturalezaEncargosCliente', encargoRepository.getEncargosPorNaturalezaCliente);
    router.use('/encargo/naturalezaEncargosTransportista', encargoRepository.getEncargosPorNaturalezaTransportista);
    router.route('/encargo/transportista')
    .get(encargoRepository.getEncargosPorTransportista)
    .delete(encargoRepository.deleteEncargoTransportista)
    //.find(encargoRepository.getEncargosPorId);
    router.route('/encargo/cliente')
    .get(encargoRepository.getEncargosPorCliente)
    .delete(encargoRepository.deleteEncargoCliente)
    .post(encargoRepository.postEncargo)
    //.find(encargoRepository.getEncargosPorId);
    router.route('/encargo/reservar')
    .put(encargoRepository.reservarEncargo)
    router.route('/encargo/anular')
    .put(encargoRepository.anularEncargo)
    router.route('/encargo/estado').get(encargoRepository.getEstados)
    router.route('/encargo/entregar').put(encargoRepository.entregarEncargo)
    router.route('/encargo/valorar').put(encargoRepository.valorarEncargo)
  }