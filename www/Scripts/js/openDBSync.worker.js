
self.addEventListener('message', function (e) {
    var data = e.data;
    var maxSize = 5 * 1024 * 1024;
    var wdb = openDatabaseSync("MoCA", 2, "MoCA", maxSize);

    //get Query
    var queryResult = doQuery(data.queryText);
    var result = JSON.stringify(queryResult);
    //console.log(result);
    //console.log("result2");
    //queryResult = doQuery("Select Count(*) From MocaComments Where testID = 17");
    //result = JSON.stringify(queryResult);
    //console.log(result);
    postMessage({ queryResult: result, complete: true });

    function doQuery(sql) {
        wdb.transaction(function (tx) {
            rs = tx.executeSql(sql, []);
        });
        var queryResults = { Rows: [] };
        for (var i = 0; i < rs.rows.length; i++) {
            queryResults.Rows.push(rs.rows.item(i));
        }
        return queryResults;
    }
}, false);
