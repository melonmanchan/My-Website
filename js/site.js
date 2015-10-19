// Here be the site javascript!

$(document).ready(function () {

    $('.preload-section').fadeOut(function() {
        $('.profile').fadeIn();
    });

    $(".button-collapse").sideNav();
    $('.scrollspy').scrollSpy();
    $("form").submit(function (event) {
       event.preventDefault();
       $("#send-msg").attr("disabled", true);

       $("#fa-send").toggleClass("fa-envelope-o").toggleClass("fa-spinner").toggleClass("fa-spin");
       var msg      =  $("#message").val();
       var mail     = $("#email").val();
       var subject  = $("#subject").val();

       var payload = {subject: subject, email: mail, message: msg};

        // Send mail to the local python mail server
        $.ajax({
            type:    "POST",
            url:     "http://mattij.com:5000/sendmail",
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