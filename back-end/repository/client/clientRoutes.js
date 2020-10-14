const _clientRepository = require('./clientRepository');
const dbContext = require('../../dataBase/dbContext');
module.exports = function (router) {
    const clientRepository = _clientRepository(dbContext);
    router.route('/clients/:ClientDNI')
    .get(clientRepository.get)
        //.post(employeeRepository.post);
}