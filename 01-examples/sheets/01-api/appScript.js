// https://script.google.com/macros/s/AKfycby6m-A_mdKvMxOz0KaqUf5nshtWQnP25qyzWgsV7p81MKS4LwtGyDK7oXS38Lu27eZ6/exec
// ?t=forecasts
// https://script.google.com/macros/s/AKfycby6m-A_mdKvMxOz0KaqUf5nshtWQnP25qyzWgsV7p81MKS4LwtGyDK7oXS38Lu27eZ6/exec?t=cities

var config = PropertiesService.getScriptProperties();

// This function glues spreadsheet and Apps Script project
function setup() {
    var doc = SpreadsheetApp.getActiveSpreadsheet();
    config.setProperty("key", doc.getId());
}

function getDataFromSheet(table) {
    try{
        // Alternatively, you can hard code spreadsheet here
        // eg. SpreadsheetApp.openById("1AcsuboS3xxk0kj02ACcE_j4ASb8GrxyZscTU5IM-wqc")

        var doc = SpreadsheetApp.openById(config.getProperty("key"));
        var sheet = doc.getSheetByName(table);

        if (!sheet) {
            return {
                "status": "error",
                "description": "table not found"
            }
        }

        var header = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
        var data = sheet.getRange(2, 1, sheet.getLastRow()-1, sheet.getLastColumn()).getValues()

        var result = data.map(function(values, index, array) {
            var obj = {};
            for (var i = 0; i < header.length; i++) {
                obj[header[i]] = values[i];
            }
            return obj;
        });

        return result;
    }
    catch (e) {
        return {
            "status": "error",
            "description": e
        }
    }

}

function render(obj) {
    var obj_json = JSON.stringify(obj);
    return ContentService.createTextOutput(obj_json).setMimeType(ContentService.MimeType.JSON)
}

function doGet(e) {
    var params = e.parameter;

    if (Object.keys(params).indexOf('t') == -1) {
        return render({"status": "error", "description": "no table parameter, e.g. ?t=forecasts"});
    }

    return render(getDataFromSheet(params['t']));
}