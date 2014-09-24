﻿// Sticky elements.  This script will stick elements to the top of a page, until another sticky element comes and pushes it out of the way so as to take its place at the top.
function stickyTitles(stickies) {

    this.load = function () {

        stickies.each(function () {

            var thisSticky = jQuery(this).wrap('<div class="followWrap" />');
            thisSticky.parent().height(thisSticky.outerHeight());

            jQuery.data(thisSticky[0], 'pos', thisSticky.offset().top);

        });
    }

    this.scroll = function () {

        stickies.each(function (i) {


            var thisSticky = jQuery(this),
                nextSticky = stickies.eq(i + 1),
                prevSticky = stickies.eq(i - 1),
                pos = jQuery.data(thisSticky[0], 'pos');

            if (pos <= jQuery(window).scrollTop()) {

                thisSticky.addClass("fixed");

                if (nextSticky.length > 0 && thisSticky.offset().top >= jQuery.data(nextSticky[0], 'pos') - thisSticky.outerHeight()) {

                    thisSticky.addClass("absolute").css("top", jQuery.data(nextSticky[0], 'pos') - thisSticky.outerHeight());

                }

            } else {

                thisSticky.removeClass("fixed");

                if (prevSticky.length > 0 && jQuery(window).scrollTop() <= jQuery.data(thisSticky[0], 'pos') - prevSticky.outerHeight()) {

                    prevSticky.removeClass("absolute").removeAttr("style");

                }

            }
        });
    }
}

jQuery(document).ready(function () {

    var newStickies = new stickyTitles(jQuery(".followMeBar"));

    newStickies.load();

    jQuery(window).on("scroll", function () {

        newStickies.scroll();

    });
});//End of sticky elements

/**
 * ScrollTo. Once an anchor in the nav is pressed, this script will automatically scroll to the corresponding div
 * Copyright (c) 2007-2014 Ariel Flesler - aflesler<a>gmail<d>com | http://flesler.blogspot.com
 * Licensed under MIT
 * @author Ariel Flesler
 * @version 1.4.13
 */

; (function (k) { 'use strict'; k(['jquery'], function ($) { var j = $.scrollTo = function (a, b, c) { return $(window).scrollTo(a, b, c) }; j.defaults = { axis: 'xy', duration: parseFloat($.fn.jquery) >= 1.3 ? 0 : 1, limit: !0 }; j.window = function (a) { return $(window)._scrollable() }; $.fn._scrollable = function () { return this.map(function () { var a = this, isWin = !a.nodeName || $.inArray(a.nodeName.toLowerCase(), ['iframe', '#document', 'html', 'body']) != -1; if (!isWin) return a; var b = (a.contentWindow || a).document || a.ownerDocument || a; return /webkit/i.test(navigator.userAgent) || b.compatMode == 'BackCompat' ? b.body : b.documentElement }) }; $.fn.scrollTo = function (f, g, h) { if (typeof g == 'object') { h = g; g = 0 } if (typeof h == 'function') h = { onAfter: h }; if (f == 'max') f = 9e9; h = $.extend({}, j.defaults, h); g = g || h.duration; h.queue = h.queue && h.axis.length > 1; if (h.queue) g /= 2; h.offset = both(h.offset); h.over = both(h.over); return this._scrollable().each(function () { if (f == null) return; var d = this, $elem = $(d), targ = f, toff, attr = {}, win = $elem.is('html,body'); switch (typeof targ) { case 'number': case 'string': if (/^([+-]=?)?\d+(\.\d+)?(px|%)?$/.test(targ)) { targ = both(targ); break } targ = win ? $(targ) : $(targ, this); if (!targ.length) return; case 'object': if (targ.is || targ.style) toff = (targ = $(targ)).offset() } var e = $.isFunction(h.offset) && h.offset(d, targ) || h.offset; $.each(h.axis.split(''), function (i, a) { var b = a == 'x' ? 'Left' : 'Top', pos = b.toLowerCase(), key = 'scroll' + b, old = d[key], max = j.max(d, a); if (toff) { attr[key] = toff[pos] + (win ? 0 : old - $elem.offset()[pos]); if (h.margin) { attr[key] -= parseInt(targ.css('margin' + b)) || 0; attr[key] -= parseInt(targ.css('border' + b + 'Width')) || 0 } attr[key] += e[pos] || 0; if (h.over[pos]) attr[key] += targ[a == 'x' ? 'width' : 'height']() * h.over[pos] } else { var c = targ[pos]; attr[key] = c.slice && c.slice(-1) == '%' ? parseFloat(c) / 100 * max : c } if (h.limit && /^\d+$/.test(attr[key])) attr[key] = attr[key] <= 0 ? 0 : Math.min(attr[key], max); if (!i && h.queue) { if (old != attr[key]) animate(h.onAfterFirst); delete attr[key] } }); animate(h.onAfter); function animate(a) { $elem.animate(attr, g, h.easing, a && function () { a.call(this, targ, h) }) } }).end() }; j.max = function (a, b) { var c = b == 'x' ? 'Width' : 'Height', scroll = 'scroll' + c; if (!$(a).is('html,body')) return a[scroll] - $(a)[c.toLowerCase()](); var d = 'client' + c, html = a.ownerDocument.documentElement, body = a.ownerDocument.body; return Math.max(html[scroll], body[scroll]) - Math.min(html[d], body[d]) }; function both(a) { return $.isFunction(a) || typeof a == 'object' ? a : { top: a, left: a } } return j }) }(typeof define === 'function' && define.amd ? define : function (a, b) { if (typeof module !== 'undefined' && module.exports) { module.exports = b(require('jquery')) } else { b(jQuery) } }));

/**
 * localScroll
 * http://www.adriantomic.se/development/jquery-localscroll-tutorial/
 * Copyright (c) 2007-2014 Ariel Flesler - aflesler<a>gmail<d>com | http://flesler.blogspot.com
 * Licensed under MIT
 * @author Ariel Flesler
 * @version 1.3.5
 */
; (function (a) { if (typeof define === 'function' && define.amd) { define(['jquery'], a) } else { a(jQuery) } }(function ($) { var g = location.href.replace(/#.*/, ''); var h = $.localScroll = function (a) { $('body').localScroll(a) }; h.defaults = { duration: 1000, axis: 'y', event: 'click', stop: true, target: window }; $.fn.localScroll = function (a) { a = $.extend({}, h.defaults, a); if (a.hash && location.hash) { if (a.target) window.scrollTo(0, 0); scroll(0, location, a) } return a.lazy ? this.on(a.event, 'a,area', function (e) { if (filter.call(this)) { scroll(e, this, a) } }) : this.find('a,area').filter(filter).bind(a.event, function (e) { scroll(e, this, a) }).end().end(); function filter() { return !!this.href && !!this.hash && this.href.replace(this.hash, '') == g && (!a.filter || $(this).is(a.filter)) } }; h.hash = function () { }; function scroll(e, a, b) { var c = a.hash.slice(1), elem = document.getElementById(c) || document.getElementsByName(c)[0]; if (!elem) return; if (e) e.preventDefault(); var d = $(b.target); if (b.lock && d.is(':animated') || b.onBefore && b.onBefore(e, elem, d) === false) return; if (b.stop) d._scrollable().stop(true); if (b.hash) { var f = elem.id === c ? 'id' : 'name', $a = $('<a> </a>').attr(f, c).css({ position: 'absolute', top: $(window).scrollTop(), left: $(window).scrollLeft() }); elem[f] = ''; $('body').prepend($a); location.hash = a.hash; $a.remove(); elem[f] = c } d.scrollTo(elem, b).trigger('notify.serialScroll', [elem]) }; return h }));

// When the document is loaded...
$(document).ready(function () {
    // Scroll the whole document
    $('#scroll').localScroll({
        offset: -132,
        target: 'body'
    });
});

// Sliding sidebar
// http://stackoverflow.com/questions/21894502/slidedown-drop-down-menu
$(document).ready(function () {

    $('#parent').hover(function () {
        $('#submenu').stop(true, true).slideDown(200);
    }, function () {
        $('#submenu').stop(true, true).slideUp(200);

    });

});