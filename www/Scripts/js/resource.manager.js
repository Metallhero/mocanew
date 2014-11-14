Resource = {
    Value: function (key) {
        $.get("Resources/Resource.xml",
        function (data) {
            console.log(data);
            //var xml = $.parseXML(data);
            //console.log(xml);
            var t = $(data).getElementsByTagName("Addresses");
            console.log(t);
            console.log(t.Value);
        });
    }

};