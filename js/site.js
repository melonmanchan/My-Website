// Here be the site javascript!

$(document).ready(function () {
    $(".button-collapse").sideNav();

    $("form").submit(function (event) {
       event.preventDefault();
       var msg      =  $("#message").val();
       var mail     = $("#email").val();
       var subject  = $("#subject").val();

        console.log(msg);
        console.log(mail);
        console.log(subject)
        $('#modal1').openModal();
    });
});