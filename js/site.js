/**
 * Created by pnLinh on 07/03/2017.
 */

$(document).ready(function () {
    $('.awe-parallax').each(function () {
        $(this).parallax("50%", 0.2);
    });
})



$(window).scroll(function() {
    if ($(this).scrollTop() > 56){
        $('.header').addClass("sticky-header");
    }
    else{
        $('.header').removeClass("sticky-header");
    }
});





