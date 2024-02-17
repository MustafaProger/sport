"use strict"

$(document).ready(function () {

    $('.burger__menu').on("click", function() {
        $('.burger__menu').toggleClass("active");
        $('.navbar').toggleClass("active");
        $("body").toggleClass('lock');
    })

    // плавная анимация при скролле
    $('a[href^="#"').on('click', function () {

        let href = $(this).attr('href');

        $('html, body').animate({
            scrollTop: $(href).offset().top
        });
        return false;
    });
})