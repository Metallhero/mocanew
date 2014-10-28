function getURLParameters(url) {
    url = url.split("#")[0];
    var result = {};
    var searchIndex = url.indexOf("?");
    if (searchIndex == -1) return result;
    var sPageURL = url.substring(searchIndex + 1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++) {
        var sParameterName = sURLVariables[i].split('=');
        result[sParameterName[0]] = sParameterName[1];
    }
    return result;
}
function getTestResultSymbol(valueResult) {
    if (valueResult == null)
        return "&nbsp;&nbsp;";
    return valueResult ? "✔" : 'x';
}
$(document).ready(function () {

    String.prototype.toHHMMSS = function () {
        var sec_num = parseInt(this, 10);
        var hours = Math.floor(sec_num / 3600);
        var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
        var seconds = sec_num - (hours * 3600) - (minutes * 60);

        if (hours < 10) { hours = "0" + hours; }
        if (minutes < 10) { minutes = "0" + minutes; }
        if (seconds < 10) { seconds = "0" + seconds; }
        // var time    = hours+':'+minutes+':'+seconds;
        var time = minutes + ':' + seconds;
        return time;
    }

    var testId = getURLParameters(window.location.href).id;
    var isComments = true; //getURLParameters(window.location.href).comments;

 
    function getCommentTitle(testTypeID) {
        switch (testTypeID) {
            case 13:
                return "Trail";
            case 14:
                return "Cube";
            case 15:
                return "Clock";
            case 9:
                return "Naming";
            case 7:
                return "Fluency";
        }

    }


    //If comments
    if (isComments) {

        DB.selectData("Select * From MocaComments Where testID = " + testId, function (result) {

            for (var i = 0; i < result.rows.length; i++) {

                var comment = result.rows.item(i);
                var title = getCommentTitle(comment.testTypeID);

                var commentTemplate = $(".commentTemplate").clone();
                commentTemplate.removeClass("commentTemplate").addClass("comment");
                commentTemplate.css("display", "block");
                ///////Title
                var titleDiv = commentTemplate.find(".commentTitle");
                $(titleDiv).text(title);
                //////Comment
                var commentDiv = commentTemplate.find(".commentText");
                $(commentDiv).text(comment.comment);
                /////Img
                var commentImgDiv = commentTemplate.find(".commentImg");
                $(commentImgDiv).attr('src', comment.caneva);


                $("#comments").append(commentTemplate);

            }

        });

        DB.selectData(DB.SelectImageQuery(testId, 7), function (result) {//Fluence
            if (result.rows.length > 0) {
                var test = result.rows.item(0);
                var commentImage = test.Data;

                if (commentImage) {
                    var title = getCommentTitle(7);

                    var commentTemplate = $(".commentTemplate").clone();
                    commentTemplate.removeClass("commentTemplate").addClass("comment");
                    commentTemplate.css("display", "block");
                    ///////Title
                    var titleDiv = commentTemplate.find(".commentTitle");
                    $(titleDiv).text(title);
                    /////Img
                    var commentImgDiv = commentTemplate.find(".commentImg");
                    $(commentImgDiv).attr('src', commentImage);
                    $(commentImgDiv).css("background", "url(Content/img/line_lightgrey.png)");
                    $('#commentTitle').show();
                    $("#comments").append(commentTemplate);
                }
            }

        });


        DB.selectData("Select * From MocaTest Where testID = " + testId, function (result) {
            if (result.rows.length > 0) {
                var test = result.rows.item(0);
                var commentText = test.commentResult;
                var commentImage = test.imageResult;

                if (commentImage || commentText) {
                    var title = "General";

                    var commentTemplate = $(".commentTemplate").clone();
                    commentTemplate.removeClass("commentTemplate").addClass("comment");
                    commentTemplate.css("display", "block");
                    ///////Title
                    var titleDiv = commentTemplate.find(".commentTitle");
                    $(titleDiv).text(title);
                    //////Comment
                    var commentDiv = commentTemplate.find(".commentText");
                    $(commentDiv).text(commentText);
                    /////Img
                    var commentImgDiv = commentTemplate.find(".commentImg");
                    $(commentImgDiv).attr('src', commentImage);

                    $('#commentTitle').show();
                    $("#comments").append(commentTemplate);
                }
            }

        });
    }

    var ScoreByType = [];
    var total = 0;
    var totalTime = 0;
    var SetSum = function (groupId, obj) {
        //log(obj);
        $('.sum_' + groupId).each(function (index) {
            var elemId = "#" + $(this).attr('id');
            var elemTimeId = "." + $(this).attr('id').replace("summResult", "summTime");
            var id = elemId.split('_');
            var item = $(this);
            var time = 0;
            $.each(obj, function (k, v) {
                var testType = v.testTypeID.toString();

                if ($.inArray(testType, id) != -1) {
                    if (testType == 3) {
                        var resultSymbol = getTestResultSymbol(v.score);
                        $("#test_3_1").text(resultSymbol);
                    }
                    var text = parseInt($(elemId).text()) || 0;


                    text += v.score;
                    total += v.score;

                    time += v.timeTest;
                    totalTime += v.timeTest;

                    if (elemId != "#summResult_8_18") { //no points
                        $(elemId).text(text);
                    }
                }

                $(elemTimeId).text(time.toString().toHHMMSS());
            });
        });

    };
    DB.GetClientInfo(testId, function (result) {
        $('#patient_name').text(result.Client.name.replace("***", " "));
        $('#patient_chartNumber').text(result.Client.chartNumber);
        $('#patient_dateOfBirth').text(result.Client.dateOfBirth.split(' ')[0]);
        $('#patient_education').text(result.Client.education);
        $('#patient_gender').text(result.Client.gender ? 'Male' : 'Female');
    });
    function SortByName(a, b) {
        var aName = parseInt(a.valueOptional);
        var bName = parseInt(b.valueOptional.toLowerCase());
        return aName - bName;
    }


    DB.selectData("Select ID From MocaTestGroup", function (result) {

        for (var i = 0; i < result.rows.length; i++) {
            var groupId = result.rows.item(i).ID;
            var resWraps = $('.sum_' + groupId);


            DB.GetTestResultByGroup(testId, groupId, function (result2) {
                console.log("GetTestResultByGroup");
                console.log(result2);
                SetSum(result2.groupId, result2.testResult);
                if (i == result.rows.length) {
                    $('#summAll').text(total);
                    $('#timeAll').text(totalTime.toString().toHHMMSS());
                }
                var groupTime = 0;
                for (var y = 0; y < result2.testResult.length; y++) {

                    var testResult = result2.testResult[y];


                    var testType = testResult.testTypeID;
                    if (testType == 5) {//DELAYED RECALL SORT
                        testResult.testResultValues.sort(SortByName);
                    }
                    for (var k = 0; k < testResult.testResultValues.length; k++) {
                        var resultValue = testResult.testResultValues[k];

                        var resultSymbol = getTestResultSymbol(resultValue.valueResult);


                        var valOpt = resultValue.valueOptional;
                        if (testType == 5) { //DELAYED RECALL
                            log(resultValue);
                            var nextIndexInColumn = parseInt(resultValue.valueOptional) + 4;
                            //log(nextIndexInColumn);
                            if ((resultValue.valueResult == null || resultValue.valueResult == 1) && nextIndexInColumn < testResult.testResultValues.length) {
                                testResult.testResultValues[nextIndexInColumn].valueResult = null;
                                //log(nextIndexInColumn);
                            }
                        }
                        else if (testType == 4 || testType == 9) {
                            valOpt = resultValue.valueOptional.split("|")[0];
                            $("#testVal_" + testType + "_" + valOpt).text(resultValue.valueOptional.split("|")[1]);
                        }
                        else if (testType == 7) {//11 words
                            $("#testVal_" + testType + "_1").text(" (" + resultValue.valueOptional + " words)");
                            $("#test_" + testType + "_1").text(resultSymbol);
                        }

                        $("#test_" + testType + "_" + valOpt).html(resultSymbol);
                        // }

                        if (testType == 3) {
                            $("#word_" + resultValue.valueOptional).css({
                                "background": "red",
                                "padding": "0 5px 0 5px",
                                "color": "#fff"
                            });
                        }
                    };
                };


            });
        };
    });

    DB.GetMISTotal(testId, function (result) {
        $('.summMIS').text(result);
    });
    DB.selectData("Select * From MocaTest Where testID = " + testId, function (result) {
        if (result.rows.length > 0) {
            var test = result.rows.item(0);
            var date = test.testDate;
            var userID = test.userID;
            $('#test_date').text(date);

            DB.selectData("Select * From MocaTestUsers Where userID = " + userID, function (doctor) {
                var doc = doctor.rows.item(0);
                $("#MDname").text(doc.name.replace("***", " "));
            });
        }
    });
    DB.selectData(DB.SelectImageQuery(testId, 13), function (result) {
        if (result.rows.length > 0) {
            var imgData = result.rows.item(0).Data;
            $('#testImg_13').attr('src', imgData);
        }
    });
    DB.selectData(DB.SelectImageQuery(testId, 14), function (result) {
        if (result.rows.length > 0) {
            var imgData = result.rows.item(0).Data;
            $('#testImg_14').attr('src', imgData);
        }
    });
    DB.selectData(DB.SelectImageQuery(testId, 15), function (result) {
        if (result.rows.length > 0) {
            var imgData = result.rows.item(0).Data;
            $('#testImg_15').attr('src', imgData);
        }
    });

    $(window).on('orientationchange', function (event) {
        if ($(window).width() < 900) {
            $('#Wrap').addClass('vertical_table');
        } else {
            $('#Wrap').removeClass('vertical_table');
        }
    });

    if ($(window).width() < 900) {
        $('#Wrap').addClass('vertical_table');
    } else {
        $('#Wrap').removeClass('vertical_table');
    }

});