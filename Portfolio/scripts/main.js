http://codetheory.in/change-active-state-links-sticky-navigation-scroll/

var sections = $('section')
  , nav = $('nav')
  , nav_height = nav.outerHeight();

$(window).on('scroll', function () {
    var cur_pos = $(this).scrollTop();

    sections.each(function () {
        var top = $(this).offset().top - 131,
            bottom = top + $(this).outerHeight();

        if (cur_pos >= top - 131 && cur_pos <= bottom) {
            nav.find('a').removeClass('active');
            sections.removeClass('active');

            $(this).addClass('active');
            nav.find('a[href="#' + $(this).attr('id') + '"]').addClass('active');
        }
    });
});

nav.find('a').on('click', function () {
    var $el = $(this)
      , id = $el.attr('href');

    $('html, body').animate({
        scrollTop: $(id).offset().top - 131
    }, 500);

    return false;
});