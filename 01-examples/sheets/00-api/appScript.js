/*
https://script.google.com/macros/s/AKfycby2VnhRm_nHzAM7vGytzrdrjId7qRKKDNuIfdiBzsp6GCGP3Gy2vvv7Q__oAH4Xy375/exec
*/

function doGet(req){
    var doc=SpreadsheetApp.getActiveSpreadsheet();
    var sheet=doc.getSheetByName('Sheet1');
    var values =  sheet.getDataRange().getValues();
    var output=[];
    for(var i=0;i<values.length;i++){
        var row={};
        row['Name']=values[i][0];
        row['Location']=values[i][1];
        output.push(row);
    }
    return ContentService.createTextOutput(JSON.stringify({data: output})).setMimeType(ContentService.MimeType.JSON);
}