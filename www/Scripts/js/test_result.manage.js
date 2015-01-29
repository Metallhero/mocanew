
var start = new Date();
function GetTestResult() {

    var testId = $.session.get('testId');
    var testType = DB.GetTestType();

    DB.GetTestResult(testId, testType, function (results) {

        if (results != null) {
            LoadPreviousResult(results);
        }
        else {
            LoadFirstAttempt();
        }
    });

}

$(document).ready(function () {
    GetTestResult();
});

function ResetTest() {
    var testId = $.session.get('testId');
    var testType = DB.GetTestType();
    DB.ResetTest(testId, testType, function (result) {
        log(result);
        if (result) {
            $.session.set('timeTest', '');
            window.location = window.location;
        }
    });
}

function LoadFirstAttempt() {
    log("LoadFirstAttempt");
    if ($.session.get('timeTest')) {
        $('#timeBlock').text($.session.get('timeTest') + ' s');
        $(".timeBlock").show();
    }
    else {
        $(".timeBlock").remove();
    }
    var testType = DB.GetTestType();
    if (testType == MocaTestTypes["Calculation"]) {

        $(".ddlCalc").each(function (k, v) {
            var ind = $(this).attr('id').split('_')[1];
            var searchedVal = 93 - (7 * parseInt(ind));
            console.log(searchedVal);
            $(this).find("option[value='" + searchedVal + "']").prop('selected', true);
        });

        $('.ddlCalc').iPhonePickerRefresh();
    }
    Recalculate();
    LoadImage();

    if (testType == 7) {
        StartTimer();
    }

}
function LoadPreviousResult(data) {
    log("LoadPreviousResult");
    var mocaResult = data.MocaTestResults.data[0];
    var mocaResultValues = data.MocaTestResultsValues.data;
    log(mocaResult);

    $('#timeBlock').text(mocaResult.timeTest + ' s');
    $(".timeBlock").show();

    if (mocaResult.testTypeID == MocaTestTypes["Fluency"]) { //11words
        $("#tab_1_2").html("");
        $("#timerInfoBlock").remove();
        $(".spinner").hide();
        $("#TB_Note").attr('disabled', 'disabled');
        DB.selectData("Select * From MocaComments Where testID = " + mocaResult.testID + " And testTypeID = 7", function (result) {
            var comment = result.rows.item(0);
            if (comment.comment) {
                $("#TB_Note").val(comment.comment);
            }
            if (comment.caneva) {
                $("#tab_1_2").append("<img src='" + comment.caneva + "' />");
            }

        });
        $("#wordsCounter").val(mocaResultValues[0].valueOptional);
    }
    else if (mocaResult.testTypeID == MocaTestTypes["Calculation"]) {//100,93,86 test
        $("#isChangeColor").val(1);
        $.each(mocaResultValues, function (index, value) {

            console.log(value.valueOptional); console.log(value.valueResult);
            $("#ddlCalc_" + value.valueOptional.split("|")[0]).find("option[value='" + value.valueOptional.split("|")[1] + "']").prop('selected', true);

            //$("#spn_" + chkBoxIndex).text(value.valueOptional.split("|")[1]);
        });
        $('.ddlCalc').iPhonePickerRefresh();
    }

    $.each(mocaResultValues, function (index, value) {
        var itemIndex = parseInt(index) + 1;
        if (mocaResult.testTypeID == MocaTestTypes["LetterA"]) //AAAAAAAAAAAA 
        {
            var chkBoxIndex = value.valueOptional;
            if (!$("#cb" + chkBoxIndex).is(':checked')) {
                $("#cb" + chkBoxIndex).prop('checked', true);
                $.uniform.update();
            }
        }
        else {
            if (mocaResult.testTypeID == MocaTestTypes["Naming"]) {
                $("#naming_0" + itemIndex).val(value.valueOptional.split("|")[1]); //naming
            }
            if (value.valueResult && $("#cbx" + itemIndex).not(':checked')) {
                $("#cbx" + itemIndex).bootstrapSwitch('state', true, true);
            }
        }
    });
    Recalculate();
    LoadImage();
}


function SaveImage() {
    if (!$("#visuoexec").attr('src') && $("#visuoexec").data("jqScribble").blank == false) {

        $("#visuoexec").data("jqScribble").save(function (imageData) {
            if (imageData != '' && imageData != 'data:,') {
                var testId = $.session.get('testId');
                var testType = DB.GetTestType();
                var mocaImageData =
                 {
                     tableName: 'MocaImage',
                     data: [{
                         testID: testId,
                         testTypeID: testType,
                         Data: imageData
                     }]
                 };

                // DB.deleteData(DB.DeleteImageQuery(testId, testType), function () {
                //                                       var end = new Date();
                var time = Math.floor((end - start) / 1000);
                $.session.set('timeTest', time);
                DB.insertData(mocaImageData, function (data) {
                    NextTest();
                });
                // });
            }
            else {
                NextTest();
            }
        });
    }
    else {
        NextTest();
    }
}


function LoadImage() {
    if ($("#visuoexec")) {
        var testId = $.session.get('testId');
        var testType = DB.GetTestType();
        DB.selectData(DB.SelectImageQuery(testId, testType), function (results) {
            if (results.rows.length > 0) {
                $("#tools").hide();
                var imgData = results.rows.item(0).Data;
                var container = $("#visuoexec").parent();
                $("#visuoexec").remove();
                var className = 'visuoImg_norev';
                if (DB.GetTestType() == MocaTestTypes["Trail"])//A1B2C3...
                {
                    className = 'visuoImg1';
                }
                container.html('<img id="visuoexec" style="-ms-transform: rotate(180deg); -webkit-transform: rotate(180deg); -moz-transform: rotate(180deg); transform: rotate(180deg); " class="' + className + '" src="' + imgData + '" alt="" />')
            }
        });
    }
}

function ChangeBorderColorCalculation(isRightValue, elem) {
    var isNeedToChange = parseInt($("#isChangeColor").val());
    if (isNeedToChange) {
        if (isRightValue) {
            $(elem).closest('.scrollDiv').removeClass('red');
            $(elem).closest('.scrollDiv').addClass('green');
        }
        else {
            $(elem).closest('.scrollDiv').removeClass('green');
            $(elem).closest('.scrollDiv').addClass('red');
        }
    }
}

function Recalculate() {
    if (DB.GetTestType() == MocaTestTypes["Fluency"]) {
        if ($('#wordsCounter').val() >= 11)
            $("#score").text(1);
        else
            $("#score").text(0);
    }
    else if (DB.GetTestType() == MocaTestTypes["LetterA"]) { //AAAAAAAAAAAAAAA
        var count = $(".cb").filter(':checked').length;
        console.log(count);
        if (count >= 2) { count = 0; } else { count = 1; }
        $("#score").text(count);
    }
    else if (DB.GetTestType() == MocaTestTypes["DelayedRecall"]) {
        var count = 0;
        for (var i = 1; i <= 5; i++) {
            if ($(".col_" + i + ":checked").length > 0) {
                $(".col_" + i + ":not(:checked)").bootstrapSwitch('readonly', true);
            }
            else {
                $(".col_" + i + ":not(:checked)").bootstrapSwitch('readonly', false);
            }
        }
        var count = $("#row_1 .toggle").filter(':checked').length;
        console.log(count);
        $("#score").text(count);
    }
    else if (DB.GetTestType() == MocaTestTypes["Calculation"]) { //100,93,

        var prevValue = 100;
        var rightCount = 0;
        $('.ddlCalc').each(function (k, v) {
            var currValue = parseInt($(this).val());
            $(this).closest(".scrollDiv").find(".hdnVO").val(currValue);
            if (k > 0) {
                var prevIndex = k - 1;
                prevValue = parseInt($("#ddlCalc_" + prevIndex).val());
            }

            if ((currValue + 7) != prevValue) {
                //ChangeBorderColorCalculation(false, $(this));
                $("#hdnVO_" + k).val(0);
            }
            else {
                //ChangeBorderColorCalculation(true, $(this));
                $("#hdnVO_" + k).val(1);
                rightCount++;
            }
        });
        var score = rightCount > 3 ? 3 : (rightCount >= 2 ? 2 : (rightCount > 0 ? 1 : 0));
        $("#score").text(score);

    }
    else {
        var count = 0;
        $('.toggle').each(function () {
            if ($(this).is(':checked')) {
                count++;
            }
        });
        $("#score").text(count);
    }
}


var audio = new Audio('audio/bud.mp3');
function StartTimer() {
    var start = 0;
    var timer = setInterval(function () {
        var time;
        if (start < 10) { start = '0' + start; }
        if (start < 60) {
            time = start;
        } else {
            time = 'PLEASE STOP';
            clearInterval(timer);

            audio.play();

            ShowAlertPopup("PLEASE STOP!", "audio.pause();$('#popup-alert').bPopup().close();");
        }

        $('#up_Timer').html('<span id="up_Timer"><i class="icon-bell"></i> <span id="timerTime">' + time + '</span></span>');
        $("#timeBlock").text(start);
        start++;
    }, 1000);
}

function SaveTest() {

    ///time
    var end = new Date();
    var time = Math.floor((end - start) / 1000);
    if ($("#timeBlock").length > 0) {
        time = parseInt($("#timeBlock").text())
    }
    ///score/////
    var score = 0;
    if ($("#score").length > 0) {
        score = parseInt($("#score").text());
    }
    /////////////
    var testId = $.session.get('testId');
    var testType = DB.GetTestType();
    var ResultValues = [];
    if (DB.GetTestType() == MocaTestTypes["Fluency"]) //11 words
    {
        time = 60;
        var val = { valueResult: parseInt($("#score").text()), valueOptional: $("#wordsCounter").val() };
        ResultValues.push(val);
    }
    else if (DB.GetTestType() == MocaTestTypes["LetterA"]) { ///AAAAAAA test
        $("input:checkbox.cb").each(function () {
            if ($(this).is(':checked')) {
                var cbIndex = $(this).attr("id").replace("cb", "");
                var val = { valueResult: 0, valueOptional: cbIndex };
                ResultValues.push(val);
            }
        });
        if (ResultValues.length == 0) {
            ResultValues.push({ valueResult: 1 });
        }
    }
    else if (DB.GetTestType() == MocaTestTypes["Calculation"])//100,93...
    {
        $('.hdnVO').each(function () {
            var cbIndex = $(this).attr("id").split("_")[1];
            var val = {};

            val = { valueResult: $(this).val(), valueOptional: cbIndex + "|" + $("#ddlCalc_" + cbIndex).val() };

            ResultValues.push(val);
        });

    }
    else {
        $('.toggle').each(function () {
            var cbIndex = $(this).attr("id").replace("cbx", "");
            var val = {};
            if (DB.GetTestType() == MocaTestTypes["Naming"]) {//camel,rhino...
                val = { valueResult: $(this).is(':checked') ? 1 : 0, valueOptional: cbIndex + "|" + $("#naming_0" + cbIndex).val() };
            }
            else {
                var valRes = $(this).is(':checked') ? 1 : 0;
                if ($(this).is(':checked') && $(this).is(':disabled')) {
                    valRes = 0;
                }
                val = { valueResult: valRes, valueOptional: cbIndex };
            }
            ResultValues.push(val);
        });
    }

    var testResultData =
     {
         MocaTestResults: {
             tableName: 'MocaTestResults',
             data: [{
                 testID: testId,
                 testTypeID: testType,
                 score: score,
                 timeTest: time
             }]
         },
         MocaTestResultsValues: {
             tableName: 'MocaTestResultsValues',
             data: ResultValues
         }

     };
    log(testResultData);
    DB.AddTestResult(testResultData, function (results) {
        //Save Comments
        var testWithComments = [15, 7];  //[13, 14, 15, 9, 7];
        if (testWithComments.indexOf(testType) != -1) {
            SaveComments(testId, testType);
        }
        else {
            NextTest();
        }
    });
}
function SaveComments(testId, testType) {
    DB.deleteData(DB.DeleteCommentQuery(testId, testType), function () { //if drow img
        if ($("#cvs_note").length > 0 && $("#cvs_note").data("jqScribble").blank == false) {
            $("#cvs_note").data("jqScribble").save(function (imageData) {
                if (imageData != '' && imageData != 'data:,') {
                    var testId = $.session.get('testId');
                    var comment = $("#TB_Note").val();

                    var mocaComment =
                     {
                         tableName: 'MocaComments',
                         data: [{
                             testID: testId,
                             testTypeID: testType,
                             caneva: imageData,
                             comment: comment
                         }]
                     };
                    DB.insertData(mocaComment, function (data) {
                        NextTest();
                    });

                }
            });
        }
        else if ($("#TB_Note").val() != '') { //if not drow img but fill textarea
            var comment = $("#TB_Note").val();


            var mocaComment =
             {
                 tableName: 'MocaComments',
                 data: [{
                     testID: testId,
                     testTypeID: testType,
                     comment: comment
                 }]
             };
            log(mocaComment);
            DB.insertData(mocaComment, function (data) {
                NextTest();
            });
        }
        else {
            NextTest();
        }
    });
}


$(function () {

    $(".ddlCalc").on("change", function () {
        console.log("CHANGE!!!");

        $("#isChangeColor").val(1);
        var val_change = parseInt($(this).val());
        var currIndex = parseInt($(this).attr('id').split('_')[1]);
        var prevValue = 100;
        if (currIndex > 0)
            prevValue = $("#ddlCalc_" + (currIndex - 1)).val();
        ChangeBorderColorCalculation((val_change + 7) == prevValue, $(this));

        $('.ddlCalc').each(function (k, v) {

            if (k > currIndex) {
                //    console.log(k);
                $("#ddlCalc_" + k).find('option:selected').removeAttr("selected");
                var searchedVal = val_change - 7;
                console.log(searchedVal);
                if (val_change <= 7)
                    searchedVal = 1;
                $("#ddlCalc_" + k + " option[value='" + searchedVal + "']").prop('selected', true);
                val_change -= 7;
            }
        });

        //calculateScore();
        $('.ddlCalc').iPhonePickerRefresh();
        Recalculate();

    });


    $("input:checkbox.cb,  .numeric").change(function () {
        Recalculate();
    });
    $('.toggle').on('switchChange.bootstrapSwitch', function (event, state) {
        ////console.log(this); // DOM element
        //console.log(event); // jQuery event
        //console.log(state); // true | false
        Recalculate();
    });
    $('.spinner').click(function () {
        if ($(this).hasClass('spinner-up')) {
            var count = parseInt($("#wordsCounter").val());
            ++count;
            $("#wordsCounter").val(count)
        }
        else if ($(this).hasClass('spinner-down')) {
            var count = parseInt($("#wordsCounter").val());
            --count;
            $("#wordsCounter").val(count)
        }

        Recalculate();
    });


    function GetMaxStep(testType) {
        var maxStep = 3;
        //if (testType == 17 || testType == 16)
        //    maxStep = 4;
        if (testType == 2 || testType == 5 || testType == 19 || testType == 3 || testType == 4 || testType == 7 || testType == 1 || testType == 12)
            maxStep = 2;
        return maxStep;
    }

});


