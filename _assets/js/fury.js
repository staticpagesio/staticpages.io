(function ($) {
    'use strict';
    var fury = {
        // Inverse header background when scroll 
        hederInverse: function () {
            $(window).on('scroll', function () {
                if ($(this).scrollTop() > 5) {
                    $('body').addClass('is-scrolling');
                } else {
                    $('body').removeClass('is-scrolling');
                }
            });
        },

        carouselsInit: function () {
            $('[data-init="carousel"]').slick({
                customPaging: function () {
                    return "<span class='slick-dot'></span>";
                }
            });
        },

        slickMargin: function () {
            $('[data-slick-margin]').each(function () {

                var margin = $(this).data('slick-margin');

                $(this).find('.slick-list').css({
                    marginLeft: -margin,
                    marginRight: -margin
                });

                $(this).find('.slick-slide').css({
                    marginLeft: margin,
                    marginRight: margin
                });

            });
        },

        hamburgarToggler: function () {
            $('.js-hamburger').on('click', function () {
                $(this).toggleClass('is-active');
            });
        },

        parallaxInit: function () {
            if ($(window).width() > 768) {
                $('[data-parallax]').each(function () {
                    var params = {
                        imageSrc: $(this).data('parallax'),
                        speed: 0.3
                    };
                    $(this).parallax(params);
                });
            }
        },

        accordianToggleIcon: function () {
            $(".accordion__title").on('click', function () {
                $('.accordion__title.active').removeClass('active');
                $(this).addClass('active');
            });
        },

        // Smooth scroll to target element
        scrollTo: function () {
            $('[data-scrollto]').on('click', function () {
                // build identifier of the target element
                var id = '#' + $(this).data('scrollto');
                if ($(id).length > 0) {
                    var offset = 0;
                    if ($('.header').length) {
                        offset = $('.header').outerHeight();
                    }
                    $('html,body').animate({ scrollTop: $(id).offset().top - offset }, 700);
                }
                return false;
            });
        },

        // Tabs toggle 
        tabsToggle: function () {
            $('.tabs a').click(function (e) {
                $('.tabs a.active').removeClass('active box-shadow-v1');
                e.preventDefault();
                $(this).tab('show');
                $(this).addClass('active box-shadow-v1');
            });
        },

        /// Scroll to top
        scrollTop: function () {
            var documentOffsetHeight = document.body.offsetHeight,
                windowHeight = $(window).height(),
                // cache controls & save on DOM queries a bit
                button = $('.scroll-top'), fa = button.find('.fa');
            // handle scroll event
            $(window).on('scroll', function () {
                if ($(this).scrollTop() > 0) {
                    button.addClass('active') &&
                    fa.removeClass('fa-angle-up fa-angle-down').addClass('fa-angle-up');
                } else {
                    button.removeClass('active') &&
                    fa.removeClass('fa-angle-up').addClass('fa-angle-down');
                }
            });
            button.on('click', function () {
                $("html, body").animate({
                    scrollTop: 0
                }, 600);
                return false;
            });
        },

        wowInit: function () {
            var wow = new WOW(
                {
                    boxClass: 'wow',
                    animateClass: 'animated',
                    offset: 0,
                    mobile: true,
                    live: true,
                    scrollContainer: null
                }
            );
            wow.init();
        },


        isotop: function () {
            $('.portfolio-filter').on('click', 'li', function () {
                var filterValue = $(this).attr('data-filter');
                $('.portfolio-filter > li.active').removeClass('active');
                $(this).addClass('active');
                $('.portfolio').isotope({
                    filter: filterValue
                });
            });

            var $portfolio = $('.portfolio');
            $portfolio.imagesLoaded(function () {
                $portfolio.isotope({
                    itemSelector: '.portfolio-item',
                    layoutMode: 'fitRows'
                });
            });
        },

        postTab: function () {
            $('.post-tab-list').on('click', 'a', function (e) {
                e.preventDefault();
                $('.post-tab-list a.active').removeClass('active');
                var tab = $(this).data('tab');
                $('.post__tab-content').removeClass('active');
                $('#' + tab).addClass('active');
                $(this).addClass('active');

            });
        },

        typingText: function () {
            if ($('[data-type]').data('type') === undefined) {
                return false;
            }
            var typedTxt = $('[data-type]').data('type').split(',');
            var typed = new Typed('[data-type]', {
                strings: typedTxt,
                typeSpeed: 80,
                loop: true,
                backSpeed: 80,
                showCursor: false
            });
        },

        BSprogressBar: function () {

            if (typeof appear === 'function') {
                appear({
                    elements: function elements() {
                        return $('.progress-bar');
                    },
                    appear: function appear(el) {
                        $(el).each(function () {
                            var progressWidth = $(this).attr('aria-valuenow');
                            $(this).css({
                                width: progressWidth + "%"
                            });
                        });
                    },
                    bounds: 200,
                    reappear: true
                });
            } else {
                $('.progress-bar').each(function () {
                    var progressWidth = $(this).attr('aria-valuenow');
                    $(this).css({
                        width: progressWidth + "%"
                    });
                });
            }
        },


        countDown: function () {
            if (!$.fn.countdown) return;
            $('[data-countdown]').each(function () {
                var $this = $(this), finalDate = $(this).data('countdown');
                $this.countdown(finalDate, function (event) {

                    if ($this.find('.countdown-days').length > 0) {
                        $this.find('.countdown-days').text(event.strftime('%D'));
                    }
                    if ($this.find('.countdown-hours').length > 0) {
                        $this.find('.countdown-hours').text(event.strftime('%H'));
                    }
                    if ($this.find('.countdown-minutes').length > 0) {
                        $this.find('.countdown-minutes').text(event.strftime('%M'));
                    }
                    if ($this.find('.countdown-seconds').length > 0) {
                        $this.find('.countdown-seconds').text(event.strftime('%S'));
                    }
                });
            });
        },

        // Init the main function 
        init: function () {
            fury.hederInverse();
            fury.carouselsInit();
            fury.parallaxInit();
            fury.hamburgarToggler();
            fury.accordianToggleIcon();
            fury.slickMargin();
            fury.scrollTo();
            fury.tabsToggle();
            fury.scrollTop();
            if (typeof wow == 'function') {
                fury.wowInit();
            }
            fury.postTab();
            fury.isotop();

            fury.typingText();
            fury.BSprogressBar();
            fury.countDown();

        }



    };




    fury.init();

}(jQuery));