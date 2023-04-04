const fs = require('fs');
const csv = require('csv-parser');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const inputFilePath = './src/data/hb_test.csv';
const outputFilePath = './src/data/output.csv';

let products = [];

fs.createReadStream(inputFilePath)
  .pipe(csv())
  .on('data', (row) => {
    products.push(row);
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
    const rows = [];
    let currentBay = 'A';
    let currentShelf = 1;
    for (let i = 0; i < products.length; i++) {
      const product = products[i];
      const quantity = parseInt(product.quantity);
      for (let j = 0; j < quantity; j++) {
        rows.push({
          product_code: product.product_code,
          quantity: 1,
          pick_location: `${currentBay} ${currentShelf}`
        });
        currentShelf++;
        if (currentShelf > 10) {
          currentShelf = 1;
          currentBay = String.fromCharCode(currentBay.charCodeAt(0) + 1);
        }
      }
    }
    csvWriter.writeRecords(rows)
      .then(() => {
        console.log(`Output written to ${outputFilePath}`);
      });
  });
