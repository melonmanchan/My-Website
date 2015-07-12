// Here be the site javascript!

$(document).ready(function () {
    $(".button-collapse").sideNav();
    $("form").submit(function (event) {
       event.preventDefault();
       var msg      =  $("#message").val();
       var mail     = $("#email").val();
       var subject  = $("#subject").val();

        payload = {subject: subject, email: mail, message: msg};

        // Send mail to the local python mail server
        $.ajax({
            type:    "POST",
            url:     "http://46.101.248.58:5000/sendmail",
            crossDomain: true,
            data:    payload,
            complete: function (data, status, req) {
                $('#modal1').openModal();
            }
        });

    });
});