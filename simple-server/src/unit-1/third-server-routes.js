'use strict';

const http = require('http');
const httpStatuesCode = require('http-status-codes');

const port = 3000;

const routeMap = {
    '/info': 'Info Page',
    '/contact': 'Contact US',
    '/about': 'Learn More About US',
    '/hello': 'Say Hello by emailing us here',
    'error': 'Sorry for the page you are looking for is not here.',
};


const server = http.createServer((request, response) => {
    
    const url = request.url;
    const routeInfo = routeMap[url];
    const defaultHeader = {
        'Content-Type': 'text/html',
    };
    if (routeInfo) {
        let message;
        response.writeHead(httpStatuesCode.OK, defaultHeader);
        if(url === '/hello') {
            message = "Say Hello by emailing us <a href='https://www.baidu.com'>Here</a>";
        } else {
            message = routeInfo
        }
        response.write(`<H1>${message}</H1>`);
    } 
    else {
        response.writeHead(httpStatuesCode.NOT_FOUND, defaultHeader);
        response.write('<H1>404 NOT FOUND</H1>');
    }
    
    response.end();
});

server.listen(port);
