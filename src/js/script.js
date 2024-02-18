"use strict"

$(document).ready(function () {

    // работа с меню бургер
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

    //добавление фиксированной кнопки page-up
    $(window).scroll(function () { 
        if($(window).scrollTop() > 1600) {
            $('.page-up').fadeIn();
        } else {
            $('.page-up').fadeOut();
        }
    });
})