const PDFDocument = require('pdfkit');
const fs = require('fs');
const blobStream = require('blob-stream');

function buildPDF(dataCallback, endCallback, res) {
    const doc = new PDFDocument({
        size: [180, 297]
    });
    doc.pipe(res);
    doc.fontSize(25).text('Here is some vector graphics...', 100, 80);
    doc.end();
    res.writeHead(200, {
        'Content-Type': 'application/pdf',
    });
}

module.exports = {
    buildPDF
};