const _encargoRepository = require('./encargoRepository');
const dbContext = require('../../dataBase/dbContext');
module.exports = function (router) {
    const encargoRepository = _encargoRepository(dbContext);
    router.route('/encargos')
        .get(encargoRepository.getAll)
        .post(encargoRepository.post);
    /** Por ejemplo:
      * router.use('/encargos/naturaleza', encargoRepository.getNaturalezaEncargo);
      */

    //deberia usarse el dni del cliente??
    router.use('/encargo/:clienteDNI', encargoRepository.intercept);

    router.route('/encargo/:clienteDNI')
        .get(encargoRepository.get)
        .put(encargoRepository.put) 
        .delete(encargoRepository.delete)
       //.get(encargoRepository.find);  
       
    router.route('/encargos/:clienteDNI')
      .get(encargoRepository.getEncargosByDNI)
  }