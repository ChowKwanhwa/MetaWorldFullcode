(function($) {
    "use strict";

    if ($('.main-slider-two__img').length) {
        $('.main-slider-two__img').tilt({
            maxTilt: 5,
            scale: 1,
            perspective: 700,
            speed: 1000
        });
    }

    // Popular Causes Progress Bar
    if ($('.count-bar').length) {
        $('.count-bar').appear(function() {
            var el = $(this);
            var percent = el.data('percent');
            $(el).css('width', percent).addClass('counted');
        }, {
            accY: -50
        });

    }

    //Progress Bar / Levels
    if ($(".progress-levels .progress-box .bar-fill").length) {
        $(".progress-box .bar-fill").each(
            function() {
                $(".progress-box .bar-fill").appear(function() {
                    var progressWidth = $(this).attr("data-percent");
                    $(this).css("width", progressWidth + "%");
                });
            }, {
                accY: 0
            }
        );
    }


    //Fact Counter + Text Count
    if ($(".count-box").length) {
        $(".count-box").appear(
            function() {
                var $t = $(this),
                    n = $t.find(".count-text").attr("data-stop"),
                    r = parseInt($t.find(".count-text").attr("data-speed"), 10);

                if (!$t.hasClass("counted")) {
                    $t.addClass("counted");
                    $({
                        countNum: $t.find(".count-text").text(),
                    }).animate({
                        countNum: n,
                    }, {
                        duration: r,
                        easing: "linear",
                        step: function() {
                            $t.find(".count-text").text(
                                Math.floor(this.countNum)
                            );
                        },
                        complete: function() {
                            $t.find(".count-text").text(this.countNum);
                        },
                    });
                }
            }, {
                accY: 0
            }
        );
    }




    if ($(".scroll-to-target").length) {
        $(".scroll-to-target").on("click", function() {
            var target = $(this).attr("data-target");
            // animate
            $("html, body").animate({
                    scrollTop: $(target).offset().top,
                },
                1000
            );

            return false;
        });
    }


    // mailchimp form
    if ($(".mc-form").length) {
        $(".mc-form").each(function() {
            var Self = $(this);
            var mcURL = Self.data("url");
            var mcResp = Self.parent().find(".mc-form__response");

            Self.ajaxChimp({
                url: mcURL,
                callback: function(resp) {
                    // appending response
                    mcResp.append(function() {
                        return '<p class="mc-message">' + resp.msg + "</p>";
                    });
                    // making things based on response
                    if (resp.result === "success") {
                        // Do stuff
                        Self.removeClass("errored").addClass("successed");
                        mcResp.removeClass("errored").addClass("successed");
                        Self.find("input").val("");

                        mcResp.find("p").fadeOut(10000);
                    }
                    if (resp.result === "error") {
                        Self.removeClass("successed").addClass("errored");
                        mcResp.removeClass("successed").addClass("errored");
                        Self.find("input").val("");

                        mcResp.find("p").fadeOut(10000);
                    }
                },
            });
        });
    }



    if ($(".main-menu__list").length && $(".mobile-nav__container").length) {
        let navContent = document.querySelector(".main-menu__list").outerHTML;
        let mobileNavContainer = document.querySelector(".mobile-nav__container");
        mobileNavContainer.innerHTML = navContent;
    }
    if ($(".sticky-header__content").length) {
        let navContent = document.querySelector(".main-menu").innerHTML;
        let mobileNavContainer = document.querySelector(".sticky-header__content");
        mobileNavContainer.innerHTML = navContent;
    }

    if ($(".mobile-nav__container .main-menu__list").length) {
        let dropdownAnchor = $(
            ".mobile-nav__container .main-menu__list .dropdown > a"
        );
        dropdownAnchor.each(function() {
            let self = $(this);
            let toggleBtn = document.createElement("BUTTON");
            toggleBtn.setAttribute("aria-label", "dropdown toggler");
            toggleBtn.innerHTML = "<i class='fa fa-angle-down'></i>";
            self.append(function() {
                return toggleBtn;
            });
            self.find("button").on("click", function(e) {
                e.preventDefault();
                let self = $(this);
                self.toggleClass("expanded");
                self.parent().toggleClass("expanded");
                self.parent().parent().children("ul").slideToggle();
            });
        });
    }

    if ($(".mobile-nav__toggler").length) {
        $(".mobile-nav__toggler").on("click", function(e) {
            e.preventDefault();
            $(".mobile-nav__wrapper").toggleClass("expanded");
            $("body").toggleClass("locked");
        });
    }


    if ($(".odometer").length) {
        var odo = $(".odometer");
        odo.each(function() {
            $(this).appear(function() {
                var countNumber = $(this).attr("data-count");
                $(this).html(countNumber);
            });
        });
    }

    if ($(".wow").length) {
        var wow = new WOW({
            boxClass: "wow", // animated element css class (default is wow)
            animateClass: "animated", // animation css class (default is animated)
            mobile: true, // trigger animations on mobile devices (default is true)
            live: true, // act on asynchronously loaded content (default is true)
        });
        wow.init();
    }

    if ($("#donate-amount__predefined").length) {
        let donateInput = $("#donate-amount");
        $("#donate-amount__predefined")
            .find("li")
            .on("click", function(e) {
                e.preventDefault();
                let amount = $(this).find("a").text();
                donateInput.val(amount);
                $("#donate-amount__predefined").find("li").removeClass("active");
                $(this).addClass("active");
            });
    }


    $(".add").on("click", function() {
        if ($(this).prev().val() < 999) {
            $(this)
                .prev()
                .val(+$(this).prev().val() + 1);
        }
    });
    $(".sub").on("click", function() {
        if ($(this).next().val() > 1) {
            if ($(this).next().val() > 1)
                $(this)
                .next()
                .val(+$(this).next().val() - 1);
        }
    });


    function thmSwiperInit() {
        // swiper slider
        const swiperElm = document.querySelectorAll(".thm-swiper__slider");
        swiperElm.forEach(function(swiperelm) {
            const swiperOptions = JSON.parse(swiperelm.dataset.swiperOptions);
            let thmSwiperSlider = new Swiper(swiperelm, swiperOptions);
        });
    }

    function thmTinyInit() {
        // tiny slider
        const tinyElm = document.querySelectorAll(".thm-tiny__slider");
        tinyElm.forEach(function(tinyElm) {
            const tinyOptions = JSON.parse(tinyElm.dataset.tinyOptions);
            let thmTinySlider = tns(tinyOptions);
        });
    }

    function thmTestimonialsThumbCarousel() {
        if ($("#testimonials-one__thumb").length) {
            let testimonialsThumb = new Swiper("#testimonials-one__thumb", {
                slidesPerView: 3,
                spaceBetween: 0,
                speed: 1400,
                watchSlidesVisibility: true,
                watchSlidesProgress: true,
                autoplay: {
                    delay: 5000
                }
            });

            let testimonialsCarousel = new Swiper("#testimonials-one__carousel", {
                observer: true,
                observeParents: true,
                speed: 1400,
                mousewheel: true,
                slidesPerView: 1,
                autoplay: {
                    delay: 5000
                },
                thumbs: {
                    swiper: testimonialsThumb
                }
            });
        }
    }


    // window load event

    $(window).on("load", function() {
        if ($(".preloader").length) {
            $(".preloader").fadeOut();
        }
        thmSwiperInit();
        thmTinyInit();
        thmTestimonialsThumbCarousel();


        if ($(".circle-progress").length) {
            $(".circle-progress").appear(function() {
                let circleProgress = $(".circle-progress");
                circleProgress.each(function() {
                    let progress = $(this);
                    let progressOptions = progress.data("options");
                    progress.circleProgress(progressOptions);
                });
            });
        }
        if ($(".post-filter").length) {
            var postFilterList = $(".post-filter li");
            // for first init
            $(".filter-layout").isotope({
                filter: ".filter-item",
                animationOptions: {
                    duration: 500,
                    easing: "linear",
                    queue: false,
                },
            });
            // on click filter links
            postFilterList.on("click", function() {
                var Self = $(this);
                var selector = Self.attr("data-filter");
                postFilterList.removeClass("active");
                Self.addClass("active");

                $(".filter-layout").isotope({
                    filter: selector,
                    animationOptions: {
                        duration: 500,
                        easing: "linear",
                        queue: false,
                    },
                });
                return false;
            });
        }

        if ($(".post-filter.has-dynamic-filter-counter").length) {
            var activeFilterItem = $(".post-filter.has-dynamic-filter-counter").find(
                "li"
            );

            activeFilterItem.each(function() {
                var filterElement = $(this).data("filter");
                var count = $(".filter-layout").find(filterElement).length;
                $(this).append("<sup>[" + count + "]</sup>");
            });
        }


        //Testimonials Two
        if ($('.listing-details__gallery .bxslider').length) {
            $('.listing-details__gallery .bxslider').bxSlider({
                nextSelector: '.listing-details__gallery #slider-next',
                prevSelector: '.listing-details__gallery #slider-prev',
                nextText: '<i class="icon-right-arrow1"></i>',
                prevText: '<i class="icon-right-arrow1 icon-prev"></i>',
                mode: 'horizontal',
                auto: 'true',
                speed: '1000',
                pagerCustom: '.listing-details__gallery .slider-pager .listing-details__thumb-box'
            });
        };


    });

    // window scroll event

    $(window).on("scroll", function() {
        if ($(".stricked-menu").length) {
            var headerScrollPos = 130;
            var stricky = $(".stricked-menu");

            if ($(window).scrollTop() > headerScrollPos) {
                stricky.addClass("stricky-fixed");
                $(".btn_lang").hover(function() {
                    $(this).css('color', '#fff');
                });
            } else if ($(this).scrollTop() <= headerScrollPos) {
                stricky.removeClass("stricky-fixed");
                $(".btn_lang").hover(function() {
                    $(this).css('color', '#fff');
                });
            }
        }
        if ($(".scroll-to-top").length) {
            var strickyScrollPos = 100;
            if ($(window).scrollTop() > strickyScrollPos) {
                $(".scroll-to-top").fadeIn(500);
            } else if ($(this).scrollTop() <= strickyScrollPos) {
                $(".scroll-to-top").fadeOut(500);
            }
        }
    });

})(jQuery);