const http = require('http');
const url = require('url');
const qs = require('querystring');

http.createServer((req, res) => {
    res.end('end');
}).listen(3001);
