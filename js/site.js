// Here be the site javascript!

$(document).ready(function () {
    $(".button-collapse").sideNav();
    $("form").submit(function (event) {
       event.preventDefault();
       $("#send-msg").attr("disabled", true);

       $("#fa-send").toggleClass("fa-envelope-o").toggleClass("fa-spinner").toggleClass("fa-spin");
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
                $("#fa-send").toggleClass("fa-envelope-o").toggleClass("fa-spinner").toggleClass("fa-spin");

                $("#message").val("");
                $("#email").val("");
                $("#subject").val("");
                $("#send-msg").attr("disabled", false);
                $('#modal1').openModal();
            }
        });

    });
});