const xl = require('excel4node');


module.exports = {

    async processData (res) {
        var wb = new xl.Workbook();
        var ws = wb.addWorksheet('Weather Data');
        var style = wb.createStyle({
           font: {
              color: '#000000',
              size: 10,
           }
        });
        ws.cell(1,1).number(100).style(style);

        wb.write(`${__dirname}/files/ExcelFile.xlsx`, function (err, stats) {
            if (err) {
            res.send(Promise.reject(err));
            } 
            res.send(Promise.resolve()); // Prints out an instance of a node.js fs.Stats object
        });;
    }

}






/* 
function generetId() {
    return Math.random().toString(36).substr(2,9)
} */