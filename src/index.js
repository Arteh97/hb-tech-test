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