// Here be the site javascript!

$(document).ready(function () {
    $(".button-collapse").sideNav();
    $("form").submit(function (event) {
       event.preventDefault();
       var msg      =  $("#message").val();
       var mail     = $("#email").val();
       var subject  = $("#subject").val();

        payload = {subject: subject, email: mail, message: msg};

        $.ajax({
            type:    "POST",
            url:     "contact-form.php",
            data:    payload,
            success: function (data, status, req) {
                console.log(data);
                console.log(status);
                console.log(req);
                $('#modal1').openModal();
            }
        });

    });
});