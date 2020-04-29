const http = require('http');
const url = require('url');
const qs = require('querystring');

http.createServer((req, res) => {
    const _url = url.parse(req.url, true);
    const path = _url.pathname;
    const query = _url.query;

    if (path === '/grade') {
        let query = '';

        req.on('data', (data) => {
            query += data;
        });

        req.on('end', () => {
            let body = qs.parse(query);
            console.log(body);
            const avg = (parseInt(body.html) + parseInt(body.css) + parseInt(body.nodejs) + parseInt(body.android)) / 4;
            let result;
            if (avg >= 95) result = 'A+';
            else if (avg >= 90) result = 'A';
            else if (avg >= 85) result = 'B+';
            else if (avg >= 80) result = 'B';
            else if (avg >= 75) result = 'C';
            else if (avg >= 90) result = 'F';

            res.end(`
            name: ${body.name}
            html: ${body.html}
            css: ${body.css}
            nodejs: ${body.nodejs}
            android: ${body.android}
            avg: ${avg}
            grade: ${result}`)
        })
    }
}).listen(3001);
