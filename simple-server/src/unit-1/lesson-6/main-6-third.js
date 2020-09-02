'use strict';

const http = require('http');
const httpStatusCode = require('http-status-codes');
const fs = require('fs');

const port = 3000;

const server = http.createServer((request, response) => {
    const responseResult = setupResponse(request);
    if (httpStatusCode.OK == responseResult.statusCode) {
        response.writeHead(responseResult.statusCode, { 'Content-Type': responseResult.statusCode });
        doReadFile(responseResult.filePath, response)
    } else {
        sendErrorResponse(response);
    }

});

const setupResponse = (request) => {
    const url = request.url;
    let contentType;
    let filePath;
    let statusCode = httpStatusCode.OK;
    if (url.indexOf('.html') !== -1) {
        contentType = 'text/html';
        filePath = `./views${url}`;
    } else if (url.indexOf('.js') !== -1) {
        contentType = 'text/javascript';
        filePath = `./public/js${url}`;
    } else if (url.indexOf('.css') !== -1) {
        console.log(url);
        contentType = 'text/css';
        filePath = `./public/css${url};`
        console.log(filePath);
    } else if (url.indexOf('.png') !== -1) {
        contentType = 'image/png';
        filePath = `./public/images${url}`;
    } else {
        statusCode = httpStatusCode.NOT_FOUND;
    }
    return { contentType, filePath, statusCode };
};

const sendErrorResponse = (response) => {
    response.writeHead(httpStatusCode.NOT_FOUND, {
        'Content-Type': 'text/html'
    });
    response.write('<H1>File Not Found</H1>');
    response.end();
};

const doReadFile = (filePath, response) => {
    if (fs.existsSync(filePath)) {
        console.log('file exists');
        fs.readFile(filePath, (error, data) => {
            if (error) {
                sendErrorResponse(response);
                return;
            }
            response.write(data);
            response.end();
        });
    } else {
        sendErrorResponse(response);
    }
}

server.listen(port);