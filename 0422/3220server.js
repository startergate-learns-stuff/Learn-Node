const http = require('http');
const url = require('url');
const qs = require('querystring');

http.createServer((req, res) => {
    const _url = url.parse(req.url, true);
    const path = _url.pathname;
    const query = _url.query;

    if (path === '/plus') {
        const num1 = parseInt(query.num1);
        const num2 = parseInt(query.num2);
        const cal = query.cal;
        let response;

        switch (cal) {
            case '+':
                response = num1 + num2;
                break;
            case '-':
                response = num1 - num2;
                break;
            case '*':
                response = num1 * num2;
                break;
            case '/':
                response = num1 / num2;
                break;
        }
        res.end(response.toString());
    } else if (path === '/grade') {
        let query = '';

        req.on('data', (data) => {
            query += data;
        });

        req.on('end', () => {
            let body = qs.parse(query);
            console.log(body);
            res.end(body.text)
        })
    }
}).listen(3001);
