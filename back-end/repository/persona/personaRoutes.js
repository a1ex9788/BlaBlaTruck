const _personaRepository = require('./personaRepository');
const dbContext = require('../../dataBase/dbContext');
module.exports = function (router) {
    const personaRepository = _personaRepository(dbContext);
    router.route('/personas/filter')
        .get(personaRepository.searchPersona)
    router.route('/personas')
        .get(personaRepository.getAll)
        .post(personaRepository.post)
        .delete(personaRepository.deleteByDNI);
    router.use('/personas/userExists', personaRepository.usernameExists);
    router.use('/personas/login', personaRepository.getMulti);
    router.use('/personas/:personaDNI', personaRepository.intercept);

    router.route('/personas/:personaDNI')
        .get(personaRepository.get)
        .put(personaRepository.put) 
        .delete(personaRepository.delete)
       // .get(personaRepository.find);  
       
}