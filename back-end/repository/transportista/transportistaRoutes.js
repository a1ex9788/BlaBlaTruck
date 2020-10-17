const _transportistaRepository = require('./transportistaRepository');
const dbContext = require('../../dataBase/dbContext');
module.exports = function (router) {
    const transportistaRepository = _transportistaRepository(dbContext);
    router.route('/transportista')
        .get(transportistaRepository.getAll)
        .post(transportistaRepository.post);
        

    router.use('/transportista/:transportistaDNI', transportistaRepository.intercept);

    router.route('/transportista/:transportistaDNI')
        .get(transportistaRepository.get)
        .put(transportistaRepository.put) 
        .delete(transportistaRepository.delete)
       // .get(transportistaRepository.find);  
}