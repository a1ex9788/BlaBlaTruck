var Connection = require('tedious').Connection;
var config = {
    server: 'wap-server.database.windows.net',
    authentication: {
        type: 'default',
        options: {
            userName: 'user',
            password: 'blablatruck20@'
        }
    },
    options: {
        encrypt: true,
        database: 'wap-db'
    }
}
var connection = new Connection(config);
connection.on('connect', function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log('Connected');
    }
});
module.exports = connection;