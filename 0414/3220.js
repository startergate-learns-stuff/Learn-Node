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

    if (path === '/html') {
        res.end(temp.template() + query.id)
    }
    else if (path === '/nodejs') {
        fs.readFile('./nodejs', (err, data) => {
            res.end(data)
        });
    }
    else if (path === '/table') {
        let str = '';
        for (let i = 1; i <= query.id; i++)
            str += '<td>' + i + '</td>';

        res.end('<table><tr>' + str + '</tr></table>');
    }
    else {
        fs.readFile('./other', (err, data) => {
            res.end(data)
        });
    }
}).listen(3000);