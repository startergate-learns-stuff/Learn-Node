const http = require('http');

http.createServer((req, res) => {
    console.log(req.url);

    if (req.url === '/html') {
        res.end('<font color="red">its html page</font>')
    }

    if (req.url === '/nodejs') {
        res.end('<font color="red">its nodejs page</font>')
    }

    res.end('<font color="red">its other page</font>')
}).listen(3000);