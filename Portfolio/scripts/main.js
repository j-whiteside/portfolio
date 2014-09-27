/*************************************************************************
*   File name:      main.js
*   Author:         Jeremy Whiteside (200249654)
*   Website:        Jeremy Whiteside's portfolio (webdesign4.georgianc.on.ca/~200249654/portfolio/)
*   Description:    This is the main script sheet for my portfolio website.  None of the code was written
*                   by me from scratch, but I modified all to fit my needs.
**************************************************************************/

// Code written by: Rishabh
// http://codetheory.in/change-active-state-links-sticky-navigation-scroll/
//This code originally looked for anchors in the nav that correspond to ids in the section elements.
//I changed it so that it also looks through divs and footer elements, and link them to the appropriate sections aswell.
//I also added an offset to the scrolling, so that elements are not scrolled to, then hidden under my nav bar.
var sections = $('section') //Assigning section elements to the section variable
  , nav = $('nav') //Assigning nav elements to the nav variable
  , div = $('div') //Assigning div elements to the div variable
  , footer = $('footer') //Assigning footer elements to the footer variable
  , nav_height = nav.outerHeight();

//When the window scrolls, do the following
$(window).on('scroll', function () { 
    var cur_pos = $(this).scrollTop(); 

    //Set the coordinates for the top and bottom of each section
    sections.each(function () { 
        var top = $(this).offset().top - 131,
            bottom = top + $(this).outerHeight();

        //If the screen is below the current element, taking into consideration the offset
        if (cur_pos >= top - 131 && cur_pos <= bottom) {
            nav.find('a').removeClass('active'); //Remove 'active' class from the currently active nav link
            sections.removeClass('active');

            //Add the active class to activate highliting under the currently active nav link
            $(this).addClass('active'); 
            nav.find('a[href="#' + $(this).attr('id') + '"]').addClass('active');
        } //End of if
    });
});

// This code crawls through my nav bar located in the header, finds any href that correspond to the id on another element, and allows smooth scrolling navigation between elements.
nav.find('a').on('click', function () {
    var $el = $(this)
      , id = $el.attr('href');

    //Scroll the body element to reach the desired section, with a duration of 500ms
    $('html, body').animate({
        scrollTop: $(id).offset().top - 131 
    }, 500);

    return false;
});

// This code crawls through div elements, finds any href that correspond to the id on another element, and allows smooth scrolling navigation between elements.
div.find('a').on('click', function () {
    var $el = $(this)
      , id = $el.attr('href');

    //Scroll the body element to reach the desired section, with a duration of 500ms
    $('html, body').animate({
        scrollTop: $(id).offset().top - 131
    }, 500);

    return false;
});

// This code crawls through the footers, to find the "back to top" link, and smoothly scrolls back to the top of the page.
footer.find('a').on('click', function () {
    var $el = $(this)
      , id = $el.attr('href');

    //Scroll the body element to reach the desired section, with a duration of 500ms
    $('html, body').animate({
        scrollTop: $(id).offset().top - 131
    }, 500);

    return false;
});



/*Adjusting the foundation 5 slider settings*/
http://foundation.zurb.com/docs/components/orbit.html
/*Code supplied by foundation 5 docs, settings tuned to my liking*/
$(document).foundation({
    orbit: {
        animation: 'slide', // Sets the type of animation used for transitioning between slides, can also be 'fade'
        timer_speed: 7000, // Sets the amount of time in milliseconds before transitioning a slide
        pause_on_hover: true, // Pauses on the current slide while hovering
        resume_on_mouseout: false, // If pause on hover is set to true, this setting resumes playback after mousing out of slide
        next_on_click: false, // Advance to next slide on click
        animation_speed: 500, // Sets the amount of time in milliseconds the transition between slides will last
        stack_on_small: false,
        navigation_arrows: true,
        slide_number: true,
        slide_number_text: '',
        container_class: 'orbit-container',
        stack_on_small_class: 'orbit-stack-on-small',
        next_class: 'orbit-next', // Class name given to the next button
        prev_class: 'orbit-prev', // Class name given to the previous button
        timer_container_class: 'orbit-timer', // Class name given to the timer
        timer_paused_class: 'paused', // Class name given to the paused button
        timer_progress_class: 'orbit-progress', // Class name given to the progress bar
        slides_container_class: 'orbit-slides-container', // Class name given to the slide container
        preloader_class: 'preloader', // Class given to the perloader
        slide_selector: 'li', // Default is '*' which selects all children under the container
        bullets_container_class: 'orbit-bullets',
        bullets_active_class: 'active', // Class name given to the active bullet
        slide_number_class: 'orbit-slide-number', // Class name given to the slide number
        caption_class: 'orbit-caption', // Class name given to the caption
        active_slide_class: 'active', // Class name given to the active slide
        orbit_transition_class: 'orbit-transitioning',
        bullets: true, // Does the slider have bullets visible?
        circular: true, // Does the slider should go to the first slide after showing the last?
        timer: true, // Does the slider have a timer active? Setting to false disables the timer.
        variable_height: false, // Does the slider have variable height content?
        swipe: true,
    }
});