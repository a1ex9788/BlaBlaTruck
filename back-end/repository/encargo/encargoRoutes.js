const _encargoRepository = require('./encargoRepository');
const dbContext = require('../../dataBase/dbContext');
module.exports = function (router) {
    const encargoRepository = _encargoRepository(dbContext);
    router.route('/encargos').get(encargoRepository.getAll)
  
    router.use('/encargo/naturalezaEncargosCliente', encargoRepository.getEncargosPorNaturalezaCliente);
    router.use('/encargo/naturalezaEncargosTransportista', encargoRepository.getEncargosPorNaturalezaTransportista);
    router.route('/encargo/transportista')
    .get(encargoRepository.getEncargosPorTransportista)
    .delete(encargoRepository.deleteEncargoTransportista)
    .find(encargoRepository.getEncargosPorId);
    router.route('/encargos/cliente')
    .get(encargoRepository.getEncargosPorCliente)
    .delete(encargoRepository.deleteEncargoCliente)
    .post(encargoRepository.postEncargo).find(encargoRepository.getEncargosPorId);
   
           
  }