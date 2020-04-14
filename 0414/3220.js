const http = require('http');
const fs = require('fs');

http.createServer((req, res) => {
    console.log(req.url);

    if (req.url === '/html') {
        fs.readFile('./html', (err, data) => {
            res.end(data)
        });
    }
    else if (req.url === '/nodejs') {
        fs.readFile('./nodejs', (err, data) => {
            res.end(data)
        });
    }
    else {
        fs.readFile('./other', (err, data) => {
            res.end(data)
        });
    }
}).listen(3000);