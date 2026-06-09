export default function initJQuery() {
  const $ = window.$;
  if (!$) return;
 $('.loader').fadeOut();
  $('#preloder').delay(200).fadeOut('slow');
  // Background Set
  $('.set-bg').each(function () {
    var bg = $(this).data('setbg');
    if (bg) $(this).css('background-image', 'url(' + bg + ')');
  });

  // Canvas Menu
  $('.canvas-open').off('click').on('click', function () {
    $('.offcanvas-menu-wrapper').addClass('show-offcanvas-menu-wrapper');
    $('.offcanvas-menu-overlay').addClass('active');
  });

  $('.canvas-close, .offcanvas-menu-overlay').off('click').on('click', function () {
    $('.offcanvas-menu-wrapper').removeClass('show-offcanvas-menu-wrapper');
    $('.offcanvas-menu-overlay').removeClass('active');
  });

  // Search model
  $('.search-switch').off('click').on('click', function () {
    $('.search-model').fadeIn(400);
  });

  $('.search-close-switch').off('click').on('click', function () {
    $('.search-model').fadeOut(400, function () {
      $('#search-input').val('');
    });
  });

  // Masonry Gallery
  if ($('.gallery').length) {
    $('.gallery').masonry({
      itemSelector: '.gs-item',
      columnWidth: '.grid-sizer',
      gutter: 10
    });
  }

  // Slicknav Mobile Menu
  if ($('.mobile-menu').length && !$('#mobile-menu-wrap').hasClass('slicknav-init')) {
    $('.mobile-menu').slicknav({
      prependTo: '#mobile-menu-wrap',
      allowParentLinks: true
    });
    $('#mobile-menu-wrap').addClass('slicknav-init');
  }

  // Hero Slider
  if ($('.hs-slider').length) {
    if ($('.hs-slider').hasClass('owl-loaded')) {
      $('.hs-slider').owlCarousel('destroy');
    }
    $('.hs-slider').owlCarousel({
      loop: true,
      margin: 0,
      nav: true,
      items: 1,
      dots: false,
      animateOut: 'fadeOut',
      animateIn: 'fadeIn',
      navText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
      smartSpeed: 1200,
      autoHeight: false,
      autoplay: false
    });
  }

  // Team Slider
  if ($('.ts-slider').length) {
    if ($('.ts-slider').hasClass('owl-loaded')) {
      $('.ts-slider').owlCarousel('destroy');
    }
    $('.ts-slider').owlCarousel({
      loop: true,
      margin: 0,
      items: 3,
      dots: true,
      dotsEach: 2,
      smartSpeed: 1200,
      autoHeight: false,
      autoplay: true,
      responsive: {
        320: { items: 1 },
        768: { items: 2 },
        992: { items: 3 }
      }
    });
  }

  // Testimonial Slider
  if ($('.ts_slider').length) {
    if ($('.ts_slider').hasClass('owl-loaded')) {
      $('.ts_slider').owlCarousel('destroy');
    }
    $('.ts_slider').owlCarousel({
      loop: true,
      margin: 0,
      items: 1,
      dots: false,
      nav: true,
      navText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
      smartSpeed: 1200,
      autoHeight: false,
      autoplay: true
    });
  }

  // Image Popup
  if ($('.image-popup').length) {
    $('.image-popup').magnificPopup({ type: 'image' });
  }

  // Video Popup
  if ($('.video-popup').length) {
    $('.video-popup').magnificPopup({ type: 'iframe' });
  }

  // Barfiller
  if ($('#bar1').length) {
    $('#bar1').barfiller({ barColor: '#ffffff', duration: 2000 });
  }
  if ($('#bar2').length) {
    $('#bar2').barfiller({ barColor: '#ffffff', duration: 2000 });
  }
  if ($('#bar3').length) {
    $('#bar3').barfiller({ barColor: '#ffffff', duration: 2000 });
  }

  // Table Controls (Class Timetable)
  $('.table-controls ul li').off('click').on('click', function () {
    var tsfilter = $(this).data('tsfilter');
    $('.table-controls ul li').removeClass('active');
    $(this).addClass('active');
    if (tsfilter == 'all') {
      $('.class-timetable').removeClass('filtering');
      $('.ts-meta').removeClass('show');
    } else {
      $('.class-timetable').addClass('filtering');
    }
    $('.ts-meta').each(function () {
      $(this).removeClass('show');
      if ($(this).data('tsmeta') == tsfilter) {
        $(this).addClass('show');
      }
    });
  });
}