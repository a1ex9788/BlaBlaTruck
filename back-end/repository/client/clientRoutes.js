const _clienteRepository = require('./clientRepository');
const dbContext = require('../../dataBase/dbContext');
module.exports = function (router) {
    const clienteRepository = _clienteRepository(dbContext);
    router.route('/cliente')
        .get(clienteRepository.getAll)
        .post(clienteRepository.post)
        .delete(clienteRepository.deleteByDNI);
    router.route('/cliente/empresa')
        .get(clienteRepository.getMulti);

    router.use('/cliente/:clienteDNI', clienteRepository.intercept);

    router.route('/cliente/:clienteDNI')
        .get(clienteRepository.get)
        .put(clienteRepository.put) 
        .delete(clienteRepository.delete)   
}