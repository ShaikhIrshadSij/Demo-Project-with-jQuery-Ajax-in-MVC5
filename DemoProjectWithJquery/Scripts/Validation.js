$(document).ready(function () {
    debugger
    loadData();

    $('#ImageUpload').change(function () {
        ImageFun();
    });

    //debugger
    //$('input[type=file]').on('change',(function () {
    //    debugger
    //    $image = document.getElementById("ImageUplaod");
    //    $formData = new FormData();
    //    if ($image.files.length > 0) {
    //        for (var i = 0; i < $image.files.length; i++) {
    //            $formData.append('file-' + i, $image.files[i]);
    //        }
    //    }

    //    $.ajax({
    //        url:'Home/FetchImage/',
    //        type: 'POST',
    //        data: $formData,
    //        contentType: false,
    //        processData: false,
    //        success: function (result) {
    //            toastr.success("File Uploaded Successfully")
    //        },
    //        error: function (err) {
    //            toastr.error(err)
    //        }
    //    });
    //}));

    $('#submit').click(function () {
        debugger
        var name = $('#Name').val();
        var email = $('#Email').val();
        var username = $('#Username').val();
        var pswd = $('#Password').val();
        var num = $('#Number').val();
        var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        if (name == '') {
            toastr.error("Name is required", { timeOut: 1500 });
            $('#Name').focus();
            return false;
        }
        if (email == '') {
            toastr.error("Email is required", { timeOut: 1500 });
            $('#Email').focus();
            return false;
        }
        else if (regex.test(email) == false) {
            toastr.error("Email is not Valid", { timeOut: 1500 });
            $('#Email').focus();
            return false;
        }
        if (username == '') {
            toastr.error("Username is required", { timeOut: 1500 });
            $('#Username').focus();
            return false;
        }
        if (pswd == '') {
            toastr.error("Email is required", { timeOut: 1500 });
            $('#Password').focus();
            return false;
        }
        if (num == '') {
            toastr.error("Number is required", { timeOut: 1500 });
            $('#Number').focus();
            return false;
        }
       
        var obj = {
            Id:1,
            Name: $('#Name').val(),
            Email: $('#Email').val(),
            Username: $('#Username').val(),
            Password: $('#Password').val(),
            Number: $('#Number').val()
        };
        $.ajax({
            url: 'Home/Index',
            type: 'POST',
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            data: JSON.stringify(obj),
            success: function (result) {
                loadData();
                toastr.success("Data inserted Successfully")
            },
            error: function (err) {
                toastr.error("Error occured "+err)
            }
        });
        
    });
    $('.OnlyNumber').on("keypress keyup blur", function (event) {
        $(this).val($(this).val().replace(/[^\d].+/, ""));
        if ((event.which < 48 || event.which > 57)) {
            event.preventDefault();
        }
    });
    
});



function Delele(ID) {
    var ans = confirm("Are you sure you want to delete this Record?");
    if (ans) {
        $.ajax({
            url: "/Home/Delete/" + ID,
            type: "POST",
            contentType: "application/json;charset=UTF-8",
            dataType: "json",
            success: function (result) {
                StartLoder();
                loadData();
                toastr.success("Deleted Id is " + ID);
            },
            error: function (errormessage) {
                alert(errormessage.responseText);
            }
        });
    }
}

function StartLoder() {
    $('.demoLoader').css("display", "block");
    $('body').addClass('blured-bg');
}
function StopLoder() {
    $('.demoLoader').css("display", "none");
    $('body').removeClass('blured-bg');
}

function loadData() {
    $('#update').hide();
    $('#submit').show();
    $.ajax({
        url: 'Home/List',
        type: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            StartLoder();
            var html = '';
            $.each(result, function (key, item) {
                html += '<tr>';
                html += '<td>' + item.Id + '</td>';
                html += '<td>' + item.Name + '</td>';
                html += '<td>' + item.Email + '</td>';
                html += '<td>' + item.Username + '</td>';
                html += '<td>' + item.Password + '</td>';
                html += '<td>' + item.Number + '</td>';
                html += '<td><a href="#" onclick="return getbyID(' + item.Id + ')">Edit</a> | <a href="#" onclick="Delele(' + item.Id + ')">Delete</a></td>';
                html += '</tr>';
            });
            $('.tbody').html(html);
            StopLoder();
        },
        error: function (errormessage) {
            toastr.error(errormessage.responseText);
        }
    });
}

function getbyID(Id) {
    $('#update').show();
    $('#submit').hide();
    $('#Id').val(Id);
    $.ajax({
        url: "/Home/getbyID/" + Id,
        typr: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            $('#Name').val(result.Id);
            $('#Email').val(result.Name);
            $('#Username').val(result.Username);
            $('#Password').val(result.Password);
            $('#Number').val(result.Number);
            toastr.success("Data Retrived Successfully for Id " + Id);
           
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
    return false;
}

function Update()
{
    var obj = {
        Id: $('#Id').val(),
        Name: $('#Name').val(),
        Email: $('#Email').val(),
        Username: $('#Username').val(),
        Password: $('#Password').val(),
        Number: $('#Number').val()
    };
    $.ajax({
        url: "/Home/Update",
        data: JSON.stringify(obj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            loadData();
            toastr.success("Data Updated Successfully for Id " + $('#Id').val());
            $('#Number').val("");
            $('#Name').val("");
            $('#Email').val("");
            $('#Username').val("");
            $('#Password').val("");
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });

}

function ImageFun() {
    debugger
    $image = document.getElementById("ImageUplaod");
    $formData = new FormData();
    if ($image.files.length > 0) {
        for (var i = 0; i < $image.files.length; i++) {
            $formData.append('file-' + i, $image.files[i]);
        }
    }

    $.ajax({
        url: 'Home/FetchImage/',
        type: 'POST',
        data: $formData,
        contentType: false,
        processData: false,
        success: function (result) {
            toastr.success("File Uploaded Successfully")
        },
        error: function (err) {
            toastr.error(err)
        }
    });
}