$(document).ready(function() {
    $(".btn_lang").on("click", function() {
        if ($(".btn_lang").hasClass("active")) {
            $(".btn_lang").removeClass("active");
        } else {
            $(".btn_lang").addClass("active");
        }
    });

});