/* eslint-disable */
const path = require('path');
const xl = require('excel4node');

module.exports = {
  async processData(res) {
    const wb = new xl.Workbook();
    const ws = wb.addWorksheet('Weather Data');
    const style = wb.createStyle({
      font: {
        color: '#276255',
        size: 10,
      },
    });
    ws.cell(1, 1).number(100).style(style);

    wb.write(path.join(__dirname,'files','ExcelFile.xlsx'), function (err, stats) {
      if (err) {
        res.send(Promise.reject(err));
      }
      res.send(Promise.resolve()); // Prints out an instance of a node.js fs.Stats object
    });
  },
};

/*
function generetId() {
    return Math.random().toString(36).substr(2,9)
} */
