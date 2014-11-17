$(document).ready(function () {
    $('.navbar-toggle').remove();
    DB.setupTable(function (dataRes) {
        DB.selectData('SELECT * FROM MocaTestUsers', function (data) {
            for (var i = 0; i < data.rows.length; i++) {
                var v = data.rows.item(i);

                var option = $('<option>', {
                    text: v.name.replace("***"," ") + ' | ' + v.occupation,
                    value: v.userID
                });
                $('#ddlAdministrators').append(option);
            };
            $('#ddlAdministrators').select2({
                placeholder: "Select",
                allowClear: true
            });
        });
    });
});
$("#btnSubmit").click(function () {

    var fname = $("#txtFirstName").val();
    var sname = $("#txtSecondName").val();
    var name = fname + "***" + sname;
    var occupation = $("#txtOccupation").val();
    if (occupation && fname && sname) {
        var user =
        {
            tableName: 'MocaTestUsers',
            data: [{
                "name": name,
                "occupation": occupation
            }]
        };
        DB.insertData(user, function (data) {
            $.session.set('userId', data.insertId);
            window.location = "createPatient.html";
        });
    } else {
        var text = '';
        if (!fname) {
            text = 'The field "First name" is required';
            $('#txtFirstName').closest('.input-icon').css({ 'border': '1px solid red' });
            if (!$('#txtFirstName').closest('.input-icon').next().hasClass('pError')) {
                $('#txtFirstName').closest('.input-icon').after('<p style="color:red;margin-top: 5px;" class="pError">' + text + '</p>');
            }
        } else {
            $('#txtFirstName').closest('.input-icon').css({ 'border': 'none' }).nextAll('.pError').remove();
        }
        if (!sname) {
            text = 'The field "Last name" is required';
            $('#txtSecondName').closest('.input-icon').css({ 'border': '1px solid red' });
            if (!$('#txtSecondName').closest('.input-icon').next().hasClass('pError')) {
                $('#txtSecondName').closest('.input-icon').after('<p style="color:red;margin-top: 5px;" class="pError">' + text + '</p>');
            }
        } else {
            $('#txtSecondName').closest('.input-icon').css({ 'border': 'none' }).nextAll('.pError').remove();
        }
        if (!occupation) {
            text = 'The field "Occupation" is required';
            $('#txtOccupation').closest('.input-icon').css({ 'border': '1px solid red' });
            if (!$('#txtOccupation').closest('.input-icon').next().hasClass('pError')) {
                $('#txtOccupation').closest('.input-icon').after('<p style="color:red;margin-top: 5px;" class="pError">' + text + '</p>');
            }
        } else {
            $('#txtOccupation').closest('.input-icon').css({ 'border': 'none' }).nextAll('.pError').remove();
        }
    }
    return false;
});
$("#btnSubmitDll").click(function () {
    if ($("#ddlAdministrators").val()) {
        var occupation = $("#ddlAdministrators").val();
        $.session.set('userId', occupation);
        window.location = "createPatient.html";
        return false;
    } else {
        ShowAlertPopup('Please create a new administrator!');
    }
});