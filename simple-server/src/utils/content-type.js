'use strict';

const contentType = 'Content-Type';

function ContentType(contentType) {
    this.contentType = contentType;
}

const plainText = new ContentType('text/plain');
const html = new ContentType('text/html');

module.exports = {
    plainText, 
    html
}