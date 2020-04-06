const http = require('http');
const fs = require('fs');
const url = require('url');
const app = http.createServer(function(request,response){
    const queryData = url.parse(request.url, true).query;
    const pathname = url.parse(request.url, true).pathname;
    const title = queryData.id;
    if (request.url === '/') {
        if(queryData.id === undefined){
            fs.readFile(`data/${queryData.id}`, 'utf8', function(err, description){
                let title = 'Welcome';
                description = 'Hello, Node.js';
                let template = `
                <!doctype html>
                    <html>
                        <head>
                            <title>WEB1 - ${title}</title>
                            <meta charset="utf-8">
                        </head>
                        <body>
                            <h1><a href="/">WEB</a></h1>
                            <ul>
                                <li><a href="/?id=HTML">HTML</a></li>
                                <li><a href="/?id=CSS">CSS</a></li>
                                <li><a href="/?id=JavaScript">JavaScript</a></li>
                            </ul>
                            <h2>${title}</h2>
                            <p>${description}</p>
                        </body>
                    </html>
                `;
                response.writeHead(200);
                response.end(template);
            });
        } else {
            fs.readFile(`data/${queryData.id}`, 'utf8', function(err, description){
                let title = queryData.id;
                let template = `
                <!doctype html>
                    <html>
                        <head>
                            <title>WEB1 - ${title}</title>
                            <meta charset="utf-8">
                        </head>
                        <body>
                            <h1><a href="/">WEB</a></h1>
                            <ul>
                                <li><a href="/?id=HTML">HTML</a></li>
                                <li><a href="/?id=CSS">CSS</a></li>
                                <li><a href="/?id=JavaScript">JavaScript</a></li>
                            </ul>
                            <h2>${title}</h2>
                            <p>${description}</p>
                        </body>
                    </html>
                `;
                response.writeHead(200);
                response.end(template);
            });
        }
    } else {
        response.writeHead(404);
        response.end('Not found');
    }
});

app.listen(3000);