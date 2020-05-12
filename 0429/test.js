const http = require('http');
const url = require('url');
const qs = require('querystring');

http.createServer((req, res) => {
    const path = url.parse(req.url, true).pathname;

    res.end('end');
}).listen(3000);
