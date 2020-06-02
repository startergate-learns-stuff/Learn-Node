const mariadb = require('mariadb');

const conn = mariadb.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'helo',
    database: 'software'
});

module.exports = conn;