function readTextFile(file, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    }
    rawFile.send(null);
}
  
function Headers(data, selector) { 
    var columns = []; 
    var header = $('<tr/>'); 
    for (var i = 0; i < data.length; i++) { 
        var row = data[i]; 
          
        for (var k in row) { 
            if ($.inArray(k, columns) == -1) { 
                columns.push(k); 
                header.append($('<th/>').html(k)); 
            } 
        } 
    } 
    $(selector).append(header); 
        return columns; 
}   

var data;
var displayTestData = document.getElementById("test1");
var table = document.getElementById("table"); 

readTextFile("/test.json", function(text){
    data = JSON.parse(text);
    console.log(data);
    console.log("here");
    console.log(data);
    var cols = Headers(data, table);   
    
    // Traversing the JSON data 
    for (var i = 0; i < data.length; i++) { 
        var row = $('<tr/>');
        for (var colIndex = 0; colIndex < cols.length; colIndex++) 
        { 
            var val = data[i][cols[colIndex]]; 
            if (val == null) val = "";   
                row.append($('<td/>').html(val)); 
        } 
        $(table).append(row); 
    } 
});

