
Resource = {
    Init: function (callback) {
        if (!$.session.get('MocaResources')) {
            $('body').append('<div id="preload"></div>');
            DB.selectData("Select * From MocaResources", function (results) {
                if (results.rows.length > 0) {
                    var resourceObj = [];
                    for (var i = 0; i < results.rows.length; i++) {
                        resourceObj.push(results.rows.item(i));
                    }
                    $.session.set('MocaResources', JSON.stringify(resourceObj));

                }
                callback.apply(null);
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
              
                    DB.deleteData("DELETE FROM MocaResources", function () {
                        var resourceInsData =
                        {
                            tableName: 'MocaResources',
                            data: data
                        };

                        //console.log(JSON.stringify(resourceInsData)); //Add this log to MocaRes.txt for update local Resources
                        DB.insertData(resourceInsData, function (res) {
                            $.session.set('MocaResources', JSON.stringify(data));
                            console.log('updateApply');
                            window.location = window.location;
                            callback.apply(null);
                        });
                    });

                }
                else {
                    callback.apply(null);
                }

            },
            error: function (xhr, ajaxOptions, thrownError) {
                ShowAlertPopup("Server is not responding!");
            }
        });

    },

};
$(document).ready(function () {
    console.log("ready");

    console.log('LocolizePage');
    //Resource.Update(function () { });
    Resource.LocolizePage();

});