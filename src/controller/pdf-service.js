const PDFDocument = require('pdfkit-table');

async function buildPDF(dataCallback, endCallback, res) {
    const doc = new PDFDocument({
        margins: {
            top: 20,
            left: 20,
            right: 20,
            bottom: 20
        },
        size: 'A5',
        layout: 'landscape'
    });
    const table = {
        headers: [{
                label: "Name",
                property: 'name',
                width: 60,
                renderer: null
            },
            {
                label: "Description",
                property: 'description',
                width: 150,
                renderer: null
            },
            {
                label: "Price 1",
                property: 'price1',
                width: 100,
                renderer: null
            },
            {
                label: "Price 2",
                property: 'price2',
                width: 100,
                renderer: null
            },
            {
                label: "Price 3",
                property: 'price3',
                width: 80,
                renderer: null
            },
            {
                label: "Price 4",
                property: 'price4',
                width: 43,
                renderer: (value, indexColumn, indexRow, row, rectRow, rectCell) => {
                    return `U$ ${Number(value).toFixed(2)}`
                }
            },
        ],
        datas: [{
                name: 'Name 1',
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean mattis ante in laoreet egestas. ',
                price1: '$1',
                price3: '$ 3',
                price2: '$2',
                price4: '4',
            },
            {
                options: {
                    fontSize: 10,
                    separation: true
                },
                name: 'bold:Name 2',
                description: 'bold:Lorem ipsum dolor.',
                price1: 'bold:$1',
                price3: {
                    label: 'PRICE $3',
                    options: {
                        fontSize: 12,
                        border: {
                            bottom: 0,
                            right: 1
                        }
                    }
                },
                price2: '$2',
                price4: '4',
            },
        ],
        rows: [],
    };
    doc.text(`Nota Penjualan Sang Ndoro Coffee`, {
        align: 'center'
    }).moveDown(1);
    doc.
    fontSize(10).
    text('Customer', {
        continued: true,
    }).fontSize(10).text(' : ', {
        continued: true,
    }).fontSize(10).text('Customer', {})
    doc.
    fontSize(10).
    text('Tanggal', {
        continued: true,
    }).fontSize(10).text(' : ', {
        continued: true,
    }).fontSize(10).text('Customer', {})
    doc.moveDown()
    await doc.table(table, {
        prepareHeader: () => doc.font("Helvetica-Bold").fontSize(8),
        prepareRow: (row, indexColumn, indexRow, rectRow, rectCell) => {
            doc.font("Helvetica").fontSize(8);
        },
    });
    doc.pipe(res);
    doc.end();
}

async function buildReportPenjualan(res) {
    const doc = new PDFDocument({
        size: 'A4',
        layout: 'landscape'
    });
    const table = {
        headers: [{
                label: "#",
                property: 'no',
                width: 60,
                renderer: null
            },
            {
                label: "No. Transaksi",
                property: 'no_transaction',
                width: 150,
                renderer: null
            },
            {
                label: "Customer",
                property: 'customer',
                width: 100,
                renderer: null
            },
            {
                label: "Total",
                property: 'total',
                width: 100,
                renderer: null
            },
        ],
        datas: [],
        rows: [],
    };

    doc.text(`Nota Penjualan Sang Ndoro Coffee`, {
        align: 'center'
    }).moveDown(1);
    await doc.table(table, {
        prepareHeader: () => doc.font("Helvetica-Bold").fontSize(8),
        prepareRow: (row, indexColumn, indexRow, rectRow, rectCell) => {
            doc.font("Helvetica").fontSize(8);
        },
    });
    doc.pipe(res);
    doc.end();
}
module.exports = {
    buildPDF,
    buildReportPenjualan
};