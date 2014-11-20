
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
            $("[data-resource]").each(function (k, v) {
                var data = $(this).data("resource");
               
                var resValue = Resource.Value(data.name);
               
                switch (data.attribute) {
                    case "html":
                        $(this).html(resValue);
                    case "placeholder":
                        $(this).attr("placeholder", resValue);
                }
            });
            $("#preload").remove();
        };
        if (!$.session.get('MocaResources')) {
     
            Resource.Init(function () {
                locolizePage();
            });
        }
        else {
            
            locolizePage();
        };

    },
    Value: function (key) {
        var resources = $.session.get('MocaResources');
        console.log(resources);
        if (resources) {
            resources = $.parseJSON(resources);
            for (var i = 0; i < resources.length; i++) {
                if (resources[i].Name == key) {
                    return resources[i].Value;
                }
            }
        }
    },
    Update: function (callback) {
        $.ajax({
            url: serverUrl + "/Resource/Get",
            type: "POST",
            //data: { model: e.data.queryResult, email: email },
            dataType: 'json',
            success: function (data) {
                if (data) {
                    DB.deleteData("DELETE FROM MocaResources", function () {
                        var resourceInsData =
                        {
                            tableName: 'MocaResources',
                            data: data
                        };
                

                        DB.insertData(resourceInsData, function (res) {
                            $.session.set('MocaResources', JSON.stringify(data));
                            console.log('updateApply');
                            callback.apply(null);
                        })
                    });

                }

            },
            error: function (xhr, ajaxOptions, thrownError) {


            }
        });

    },

};
$(document).ready(function () {
    Resource.Update(function () {;
        console.log('LocolizePage');
        Resource.LocolizePage();
    });
});