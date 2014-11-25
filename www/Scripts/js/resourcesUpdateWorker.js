
self.addEventListener('message', function (e) {
    var data = e.data;
    var testId = data.testId;
    var maxSize = 5 * 1024 * 1024;
    var wdb = openDatabaseSync("MoCA", 2, "MoCA", maxSize);

    var MocaTest = { TestId: testId, ResultList: [] };
    //get Query
    var result = ExecuteSql("Select ID From MocaTestGroup");

    for (var i = 0; i < result.rows.length; i++) {
        var groupId = result.rows.item(i).ID;
        var testResultVal = GetTestResultByGroup(testId, groupId);

        if (testResultVal && testResultVal.testResult) {
            for (var y = 0; y < testResultVal.testResult.length; y++) {
                var testResult = testResultVal.testResult[y];
                var testType = testResult.testTypeID;

                if (testResult.testResultValues) {
                    //sort by valueOptional
                    testResult.testResultValues.sort(SortByValueOptional);


                    var resultValues = [];
                    for (var k = 0; k < testResult.testResultValues.length; k++) {
                        var resultValue = testResult.testResultValues[k];
                        resultValues.push({
                            ValueOptional: resultValue.valueOptional,
                            ValueResult: resultValue.valueResult == 1 ? true : false
                        });
                    }
                    var resItem = {
                        ResultID: testResult.resultID,
                        TestType: testResult.testTypeID,
                        Score: testResult.score,
                        Time: testResult.timeTest,
                        ResultValues: resultValues
                    }
                    var testTypesImg = JSON.parse(data.testTypesWithImg);

                    if (testTypesImg.contains(resItem.TestType)) { //Images
                        var mocaImage = ExecuteSql("SELECT * FROM MocaImage Where testID=" + testId + " AND testTypeID=" + resItem.TestType);
                        if (mocaImage.rows.length > 0) {
                            resItem.MocaImage = { Data: mocaImage.rows.item(0).Data };
                        }
                    }
                    MocaTest.ResultList.push(resItem);

                }

            }
        }
    }
    MocaTest.Patient = {};
    //Patient info
    var patientQueryRes = ExecuteSql("Select * From MocaTestClients Inner Join MocaTest ON MocaTestClients.clientID = MocaTest.clientID Where MocaTest.testID=" + testId);
    var patient = patientQueryRes.rows.item(0);

    MocaTest.Patient.name = patient.name;
    MocaTest.Patient.chartNumber = patient.chartNumber;
   
    if (isValidDate(patient.dateOfBirth)) {
        MocaTest.Patient.dateOfBirth = patient.dateOfBirth;
    }
    MocaTest.Patient.education = patient.education;
    MocaTest.Patient.gender = patient.gender;

    //Administrator 
    MocaTest.Administrator = {};
    var adminQueryRes = ExecuteSql("Select * From MocaTestUsers  Inner Join MocaTest ON MocaTestUsers.userID = MocaTest.userID Where MocaTest.testID=" + testId);
    var admin = adminQueryRes.rows.item(0);
    MocaTest.Administrator.name = admin.name;

    //Comments
    var totalCommentQueryRes = ExecuteSql("Select * From MocaTest Where MocaTest.testID=" + testId);
    var totalComment = totalCommentQueryRes.rows.item(0);
    MocaTest.testDate = totalComment.testDate;
    var totalCommentText = totalComment.commentResult;
    var totalCommentImage = totalComment.imageResult;
   
    var commentsQueryRes = ExecuteSql("Select * From MocaComments Where testID = " + testId);
    MocaTest.CommentList = [];
    for (var i = 0; i < commentsQueryRes.rows.length; i++) {
        var comment = commentsQueryRes.rows.item(i);
        if (comment.comment || comment.caneva) {
            MocaTest.CommentList.push({ CommentText: comment.comment, CommentImage: comment.caneva, TestType: comment.testTypeID });
        }
    }
    if (totalCommentText || totalCommentImage) {
        MocaTest.CommentList.push({ CommentText: totalCommentText, CommentImage: totalCommentImage, TestType: 0 });
    }
    
    //Final serialize
    var finalTestResult = JSON.stringify(MocaTest);

    postMessage({ queryResult: finalTestResult });

    function ExecuteSql(sql) {
        var rs;
        wdb.transaction(function (tx) {
            rs = tx.executeSql(sql, []);
        });
        return rs;
    }


    function GetTestResultByGroup(testId, groupId) {
        var results = ExecuteSql(SelectTestResultValuesByGroupIdAndTestIdQuery(testId, groupId));
        var testResults = [];
        if (results.rows.length > 0) {
            var groupName = results.rows.item(0).GroupName;
            var groupId = results.rows.item(0).GroupId;
            for (var i = 0; i < results.rows.length; i++) {
                var testResult = results.rows.item(i);

                testResults.push(testResult);
            }

            var result = groupBy(testResults, function (item) {
                return [item.resultID];
            });
            var tempResult = [];
            for (var i = 0; i < result.length; i++) {
                var testRes = result[i];

                for (var j = 0; j < testRes.length; j++) {
                    if (j == 0) {
                        tempResult.push({ resultID: testRes[j].resultID, testTypeID: testRes[j].testTypeID, score: testRes[j].score, timeTest: testRes[j].timeTest, testResultValues: [] });
                    }
                    tempResult[tempResult.length - 1].testResultValues.push({ valueOptional: testRes[j].valueOptional, valueResult: testRes[j].valueResult });
                }
            }

            var res = { "groupName": groupName, "groupId": groupId, "testResult": tempResult };
            
            return res;
        }


    }

}, false);

var SelectTestResultValuesByGroupIdAndTestIdQuery = function (testId, groupId) {
    return "Select MocaTestResultsValues.valueResult, MocaTestResultsValues.valueOptional,  MocaTestResults.resultID, MocaTestGroup.Title as 'GroupName', MocaTestGroup.ID as 'GroupId', MocaTestResults.testID,MocaTestResults.testTypeID,MocaTestResults.score,MocaTestResults.timeTest From MocaTestResults inner join MocaTestType_MocaGroup On MocaTestResults.testTypeID = MocaTestType_MocaGroup.testTypeId inner join MocaTestGroup On MocaTestType_MocaGroup.GroupId =  MocaTestGroup.ID inner join MocaTestResultsValues on MocaTestResults.resultID= MocaTestResultsValues.resultID Where GroupId = " + groupId + " and MocaTestResults.testID=" + testId;
};

Array.prototype.contains = function (obj) {
    var i = this.length;
    while (i--) {
        if (this[i] === obj) {
            return true;
        }
    }
    return false;
}

function isValidDate(dateString) {
    var re = /^\d{4}-(0[1-9]|1[0-2])-([0-2]\d|3[01]) (0\d|1[01]):[0-5]\d:[0-5]\d$/;
    return re.test(dateString);
}

function groupBy(array, f) {
    var groups = { testResultValues: [] };
    array.forEach(function (o) {
        var group = JSON.stringify(f(o));
        groups[group] = groups[group] || [];
        groups[group].push(o);
    });
    return Object.keys(groups).map(function (group) {
        return groups[group];
    })
}

function SortByValueOptional(a, b) {
    var aName = parseInt(a.valueOptional);
    var bName = parseInt(b.valueOptional.toLowerCase());
    return aName - bName;
}
