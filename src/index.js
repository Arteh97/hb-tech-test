const fs = require('fs');
const csv = require('csv-parser');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const inputFilePath = '../data/hb_test.csv';
const outputFilePath = '../data/output.csv';

let products = [];

fs.createReadStream(inputFilePath)
    .pipe(csv())
    .on('data', (row) => {
        products.push(row);
        console.log(products);
    })
    .on('end', () => {
        products.sort((a, b) => a.product_code - b.product_code);
        const csvWriter = createCsvWriter({
            path: outputFilePath,
            header: [
                {id: 'product_code', title: 'product_code'},
                {id: 'quantity', title: 'quantity'},
                {id: 'pick_location', title: 'pick_location'}
            ]
        });
    })