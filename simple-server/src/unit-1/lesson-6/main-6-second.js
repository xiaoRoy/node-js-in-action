'use strict';

const http = require('http');
const httpStatusCode = require('http-status-codes');
const fs = require('fs');

const port = 3000;

const getViewPath = (url) => {
    return `views/${url}.html`
};

const server = http.createServer((request, response) => {
    const url = request.url;
    fs.readFile(getViewPath(url), (error, data) => {
        if(error) {
            response.writeHead(httpStatusCode.NOT_FOUND);
            response.write('<H1>404 NOT FOUND</H1>');
        } else {
            response.writeHead(httpStatusCode.OK, {
                'Content-Type': 'text/html'
            });
            response.write(data);
        }
        response.end();
    });

});

server.listen(port);