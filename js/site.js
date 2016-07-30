// Here be the site javascript!

$(document).ready(function () {

    new WOW().init();

    $('.preload-section').fadeOut(function() {
        $('.profile').fadeIn();
    });

    $('img').unveil(100, function () {
        var cardContainer = $(this).parent().parent()
        cardContainer.addClass('fadeIn');
        cardContainer.removeClass('card-initial');
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

        if (msg !== "" && mail !== "" && subject !== "") {
           var payload = { subject: subject, email: mail, message: msg };

            // Send mail to the local python mail server
            $.ajax({
                type:    "POST",
                url:     "https://mattij.com:5000/sendmail",
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
        } else {
            alert("Congrats! Looks like you managed to bypass MaterializeCSS form validation. Please fill all the fields");
        }
    });
});

