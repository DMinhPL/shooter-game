"use strict";

/* global WOW, Swiper */
(function ($) {
  function scrollDown_header() {
    var $header = $('.o-header');
    $(window).on('scroll', function () {
      var scrollDistance = $(window).scrollTop();
      if (scrollDistance > 40) $header.addClass('fixed');else $header.removeClass('fixed');
    });
  }

  function burger_menu() {
    var $burger = $('.o-header_burger');
    var $menu = $('.o-header_menu');
    $burger.on('click', function (e) {
      var $it = $(e.currentTarget);
      $it.toggleClass('open');
      $menu.toggleClass('expand');
    });
  }

  function privilege_slider() {
    new Swiper('.t-privilege_wrap.swiper', {
      slidesPerView: 1,
      spaceBetween: 20,
      scrollbar: {
        el: '.t-privilege_wrap .swiper-scrollbar'
      },
      breakpoints: {
        // when window width is >= 640px
        992: {
          slidesPerView: 2,
          spaceBetween: 32
        }
      }
    });
  }

  function rules_slider() {
    var arrHeight = [];
    new Swiper('.t-rules_wrap.swiper', {
      slidesPerView: 'auto',
      spaceBetween: 20,
      // scrollbar: {
      //     el: '.t-rules_wrap .swiper-scrollbar',
      // },
      pagination: {
        el: '.t-rules_wrap.swiper .swiper-pagination'
      },
      breakpoints: {
        // when window width is >= 640px
        768: {
          slidesPerView: 2,
          spaceBetween: 32
        },
        // when window width is >= 640px
        992: {
          slidesPerView: 3,
          spaceBetween: 32
        }
      }
    });

    var resize = function resize() {
      $.each($('.t-rules_content ul'), function (i, val) {
        arrHeight.push($(val).height());
      });
      $('.t-rules_content ul').css({
        height: Math.max.apply(Math, arrHeight)
      });
    };

    $(window).on('resize', resize);
    resize();
  }

  function ui_matchHeight() {
    $('.t-privilege_content').matchHeight();
  }

  function backToTop() {
    $('.backToTop').on('click', function () {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });

    var checkScroll = function checkScroll() {
      var scrollDistance = $(window).scrollTop();
      if (scrollDistance <= 120) $('.backToTop').fadeOut();else $('.backToTop').fadeIn();
    };

    $(window).on('scroll', checkScroll);
    checkScroll();
  }

  $(function () {
    $('.select-location').val('').trigger('change');
    scrollDown_header();
    burger_menu();
    privilege_slider();
    backToTop();
    rules_slider();
    ui_matchHeight();
    new WOW().init();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
})(jQuery);
"use strict";

/* global SimpleBar */
function ui() {
  // Select UI
  $.fn.select2.defaults.set('width', '100%');
  $('.select-ui').each(function () {
    var el = $(this);
    el.select2({
      placeholder: el.data('placeholder'),
      minimumResultsForSearch: -1
    }); // Update UI Scroll - Open dropdown
    // selectUI.on('select2:open', function() {
    //     const id = $('.select2-results  > .select2-results__options').attr('id');
    //     $('.select2-results')
    //         .attr({ id: id + '-group' })
    //         .queue(function(next) {
    //             new SimpleBar($('#' + id + '-group')[0]);
    //             next();
    //         });
    // });
  }); // Range UI

  $('.range-ui').each(function (key) {
    var el = $(this);
    el.attr({
      id: 'range-ui-' + key
    }).queue(function (next) {
      $('#range-ui-' + key).ionRangeSlider();
      next();
    });
  }); // Scroll

  $('.scroll-ui').each(function (key) {
    var el = $(this);
    el.attr({
      id: 'scroll-ui-' + key
    }).queue(function (next) {
      new SimpleBar($('#' + el.attr('id'))[0]);
      next();
    });
  }); // File Browse UI

  $('.file-ui .file-ui-input').change(function (e) {
    if (typeof e.target.files[0] !== 'undefined') {
      var fileName = e.target.files[0].name;
      $(this).siblings('.file-ui-label').text(fileName);
    }
  }); // Parallax
  // $('[data-paroller-factor]').paroller();
} // Image svg


function imgSVG() {
  $('img.svg').each(function () {
    var $img = $(this);
    var imgID = $img.attr('id');
    var imgClass = $img.attr('class');
    var imgURL = $img.attr('src');
    $.get(imgURL, function (data) {
      // Get the SVG tag, ignore the rest
      var $svg = $(data).find('svg'); // Add replaced image's ID to the new SVG

      if (typeof imgID !== 'undefined') $svg = $svg.attr('id', imgID); // Add replaced image's classes to the new SVG

      if (typeof imgClass !== 'undefined') $svg = $svg.attr('class', imgClass + ' replaced-svg'); // Remove any invalid XML tags as per http://validator.w3.org

      $svg = $svg.removeAttr('xmlns:a'); // Replace image with new SVG

      $img.replaceWith($svg);
    }, 'xml');
  });
}

function gotoTop() {
  var topTop = $('.toTop');
  $(window).scroll(function () {
    if ($(this).scrollTop() > 200) topTop.addClass('active');else topTop.removeClass('active');
  });
  topTop.click(function () {
    $('body,html').animate({
      scrollTop: 0
    }, 500);
    return false;
  });
}

function init() {
  // Base
  ui(); // Image SVG

  imgSVG(); // Go to top

  gotoTop(); // $(window).on("debouncedresize", function (event) {
  //     // ...
  // });

  if (1 == 2) ui();
}

$('body').imagesLoaded(function () {
  init();
  $('body').addClass('loaded');
  $('.pageLoad').fadeOut();
});

function scrollBySection() {
  var $section = $('.p-home_section');
  var $header = $('header.o-header');
  var $link = $('.o-header_menu_link:not(.o-header_menu_link-external)');
  var $burger = $('.o-header_burger');
  var $menu = $('.o-header_menu');
  $link.on('click', function (e) {
    e.preventDefault();
    $burger.removeClass('open');
    $menu.removeClass('expand');
    var target = $(this).attr('href');
    $link.removeClass('active');
    $('.header-main').removeClass('show'); // btn.fadeOut().html(name === 'menu' ? i_close : i_menu).stop().fadeIn();

    $(this).addClass('active');
    $('html,body').stop().animate({
      scrollTop: $(target).offset().top - $header.outerHeight()
    }, 400);
  });
  $(window).on('scroll', function () {
    var scrolldistance = $(window).scrollTop();
    $section.each(function (i, val) {
      var itTop = $(val).offset().top;

      if (itTop <= scrolldistance + 200 && scrolldistance < itTop + $(val).outerHeight()) {
        $link.removeClass('active');
        $(".o-header_menu_link[href='#".concat($(val).attr('id'), "']")).addClass('active');
      } else $link.eq(i).removeClass('active');
    });
  });
}

function resizeTools() {
  var $w = $(window);

  var resize = function resize() {
    if ($w.outerHeight() <= 610 && $w.outerWidth() >= 1200) $('.t-tools').addClass('resize');else $('.t-tools').removeClass('resize');
  };

  $w.on('resize', resize);
  resize();
}

function scrollToRegister() {
  var checkHref = function checkHref(e) {
    e.preventDefault();
    var $it = $(e.currentTarget);
    var href = $it.attr('href');
    var target = $it.attr('target') || '_blank';
    if (href && href.includes('#')) toRegister(href);
    if (href && !href.includes('#')) window.open(href, target);
  };

  var toRegister = function toRegister(href) {
    $('html,body').stop().animate({
      scrollTop: $(href).offset().top - 80
    }, 400);
  };

  $('.a-button-link').on('click', function (e) {
    return checkHref(e);
  });
}

$(function () {
  scrollBySection();
  scrollToRegister();
  resizeTools();
});