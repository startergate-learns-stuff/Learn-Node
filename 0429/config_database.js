const mariadb = require('mariadb');

const conn = mariadb.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Wb4H9nn542',
    database: 'software'
});

module.exports = conn;