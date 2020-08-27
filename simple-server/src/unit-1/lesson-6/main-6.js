'use strict';

const http = require('http');
const httpStatusCode = require('http-status-codes');
const fs = require('fs');

const port = 3000;

const routeMap = {
    '/': 'views/index.html',
};

const server = http.createServer((request, response) => {
    response.writeHead(httpStatusCode.OK, { 'Content-Type': 'text/html' });
    const path = routeMap[request.url];
    if(path) {
        fs.readFile(path, (error, data) => {
            if(error) {
                response.write(data);
                response.end();
            }
        });
    } else {
        response.end('<H2>Not Found</H2>');
    }
});

server.listen(port);