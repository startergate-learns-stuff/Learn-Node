const http = require('http');
const url = require('url');
const fs = require('fs');

const temp = require('./temp');

http.createServer((req, res) => {
    const path = url.parse(req.url, true).pathname;
    const query = url.parse(req.url, true).query;

    console.log(req.url);
    console.log(path);
    console.log(query.id);

    res.setHeader('Content-Type', 'text/html;charset=utf8');

    if (path === '/html') {
        res.end(temp.template('html', query.id));
    }
    else if (path === '/nodejs') {
        res.end(temp.template('nodejs', query.id));
    }
    else if (path === '/query') {
        res.end(temp.template('query', query.id, query.id2));
    }
    else if (path === '/table') {
        res.end(temp.table(query.id));
    }
    else {
        res.end('Not Found');
    }
}).listen(3000);