'use strict';

const http = require('http');
const httpStatusCode = require('http-status-codes');

const server = http.createServer((request, response) => {
    console.log('Received an incoming request!');
    response.writeHead(httpStatusCode.OK, {
        'Content-Type': 'text/html'
    });
    let message = '<h1>Hello, What!</h1>';
    response.write(message);
    response.end();
    console.log(`Sent a response: ${message}`);
});
const port  = 3000;
server.listen(port);
console.log(`The server has started and is listening on port number: ${port}`);