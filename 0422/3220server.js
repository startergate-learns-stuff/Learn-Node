const http = require('http');
const url = require('url');

http.createServer((req, res) => {
    const _url = url.parse(req.url, true);
    const path = _url.pathname;
    const query = _url.query;

    if (path === '/plus') {
        let response = parseInt(query.num1) + parseInt(query.num2);
        res.end(response.toString());
    }
}).listen(3001);
