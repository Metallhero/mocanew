
Resource = {
    Init: function (callback) {

        if (!$.session.get('MocaResources')) {
            console.log("InitIf");
            $('body').append('<div id="preload"></div>');
            DB.selectData("Select * From MocaResources", function (results) {
                if (results.rows.length > 0) {
                    var resourceObj = [];
                    for (var i = 0; i < results.rows.length; i++) {
                        resourceObj.push(results.rows.item(i));
                    }
                    $.session.set('MocaResources', JSON.stringify(resourceObj));
                    callback.apply(null);
                }
                else
                {
                    console.log("resFromFile");
                    $.getJSON("Resources/MocaResources.txt", function (insertedData) {
                        
                        DB.insertData(insertedData, function () {
                            console.log("getJSONCallBack");
                            var resourceObj = [];
                            $.session.set('MocaResources', JSON.stringify(insertedData.data));
                            callback.apply(null);
                        });
                    });
                 
                }
                
                $("#preload").remove();
            });
        }
    },
    LocolizePage: function () {

        var locolizePage = function () {
            console.log("locolFun");
            $("[data-resource]").each(function (k, v) {
                var data = $(this).data("resource");

                var resValue = Resource.Value(data.name);

                switch (data.attribute) {
                    case "html":
                        $(this).html(resValue);
                        return;
                    case "text":
                        $(this).html(resValue);
                        return;
                    case "placeholder":
                        $(this).attr("placeholder", resValue);
                        return;
                }
            });
            $("#preload").remove();
        };

        if (!$.session.get('MocaResources')) {
            console.log("sessionInit");
            Resource.Init(function () {
                console.log("sessionInitFunc");
                locolizePage();
            });
        }
        else {
            console.log("locol");
            locolizePage();
        };

    },
    Value: function (key) {
        var resources = $.session.get('MocaResources');
        //console.log(resources);
        if (resources) {
            var resourcesJson = $.parseJSON(resources);
            for (var i = 0; i < resourcesJson.length; i++) {

                if (resourcesJson[i].Name == key) {

                    return resourcesJson[i].Value;
                }
            }
        }
        else {
            console.log("resourcesNo");
        }
    },
    Update: function (callback) {
        $('body').append('<div id="preload"></div>');
        var DataUpdateDate = function (data) {
            console.log("UpdateDateFun");
            for (var i = 0; i < data.length; i++) {
                var date = new Date(parseInt(data[i].UpdateDate.substr(6)));
                data[i].UpdateDate = SqliteDate(date);
            }
            return data;
        };
        if (!navigator.onLine) {
            ShowAlertPopup("Check internet connection!");
            return;
        }
        $.ajax({
            url: serverUrl + "/Resource/Get",
            type: "POST",
            //data: { model: e.data.queryResult, email: email },
            dataType: 'json',
            success: function (data) {
                if (data) {
                    data = DataUpdateDate(data);
                
                    DB.deleteData("DELETE FROM MocaResources", function (rres) {
                        var resourceInsData =
                        {
                            tableName: 'MocaResources',
                            data: data
                        };

                        console.log(JSON.stringify(resourceInsData)); //Add this log to MocaRes.txt for update local Resources
                        DB.insertData(resourceInsData, function (res2) {
                            $.session.set('MocaResources', JSON.stringify(data));
                            console.log('updateApply');
                            callback.apply(null);
                        });
                    });
                    setTimeout(function () { $('#preload').remove(); ShowAlertPopup(Resource.Value('UpdateComplete'), 'window.location=window.location') }, 1000);
                }
                else {
                    callback.apply(null);
                }

            },
            error: function (xhr, ajaxOptions, thrownError) {
                $("#preload").remove();
                ShowAlertPopup("Server is not responding!");
            }
        });

    },

};
$(document).ready(function () {
    console.log("ready");
    console.log($.session.get('MocaResources'));
    //if ($.session.get('MocaResources')) {
        if ($("#preload").length == 0) {
            $('body').append('<div id="preload"></div>');
        }
 
            console.log('LocolizePage');
            Resource.LocolizePage();
 
    //}
});