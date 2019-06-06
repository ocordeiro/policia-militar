$('.owl-carousel').owlCarousel({
    loop: true,
    margin: 10,
    responsiveClass: true,
    autoplay: true,
    responsive: {
        0: {
            items: 1,
            nav: true
        },
        600: {
            items: 3,
            nav: false
        },
        1000: {
            items: 5,
            nav: true,
            loop: true
        }
    }
});

//$('li#li_central_servicos').find('a#servicos').click(function () {
//
//    if ($('li#li_central_servicos').find('.dropdown').find('div').attr('class') == "dropdown-menu dropdown-simple show") {
//        postToURL(PORTAL_URL + 'modulos');
//    }
//
//});
