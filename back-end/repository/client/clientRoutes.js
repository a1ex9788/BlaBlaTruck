const _clienteRepository = require('./clientRepository');
const dbContext = require('../../dataBase/dbContext');
module.exports = function (router) {
    const clienteRepository = _clienteRepository(dbContext);
    router.route('/cliente')
        .get(clienteRepository.getAll)
        .post(clienteRepository.post);
    
    router.route('/cliente/empresa')
        .get(clienteRepository.getMulti);

    router.route('/cliente/:clienteDNI', clienteRepository.intercept);

    router.route('/cliente/:clienteDNI')
        .get(clienteRepository.get)
        .put(clienteRepository.put)    
}