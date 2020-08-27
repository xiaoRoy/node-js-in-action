'use strict';

const http = require('http');
const httpStatusCode = require('http-status-codes');

const port = 3004;
const server = http.createServer();
server.on('request',  (request, response) => {
    var body = [];
    
    request.on('data', (data) => {
        body.push(data);
    });

    request.on('end', () => {
        body = Buffer.concat(body).toString();
        console.log(`Request Body Contents: ${body}`);
    });
    
    response.writeHead(httpStatusCode.OK, {
        'Content-Type': 'text/html',
    });
    showRequest(request);
    const message = '<p>I am not a paragraph!</p>';
    response.end(message);
});

const showRequest = function(request) {
    console.log(`method:${getJSONString(request.method)}`);
    console.log(`url:${getJSONString(request.url)}`);
    console.log(`header:${getJSONString(request.headers)}`);
}


const getJSONString = (object) => JSON.stringify(object, null, 2);
server.listen(port);
console.log(`The server has started and is listening on port number: ${port}`);