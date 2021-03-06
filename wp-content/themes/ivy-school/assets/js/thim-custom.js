/**
 * Script custom for theme
 *
 * TABLE OF CONTENT
 *
 * Header: main menu
 * Header: main menu mobile
 * Sidebar: sticky sidebar
 * Feature: Preloading
 * Feature: Back to top
 * Custom select.
 */

(function($) {
    'use strict';

    $(document).ready(function() {
        thim_startertheme.ready();
    });

    $(window).on('load',function() {
        thim_startertheme.load();
    });

    var thim_startertheme = {

        /**
         * Call functions when document ready
         */
        ready: function() {
            this.header_menu();
            this.back_to_top();
            this.feature_preloading();
            this.sticky_sidebar();
            this.custom_select();
            this.contactform7();
            this.search_popup();
            this.comingsoon_countdown();
            this.related_service();
            this.thim_slider_service();
            this.magnific_popup_video();
            this.accordion();
            this.menu_scroll();
            this.hide_tool_bar();
            this.dropdown_click();
            this.infor_user();
            this.switch_layout();
            this.quick_view();

        },

        /**
         * Call functions when window load.
         */
        load: function() {
            this.header_menu_mobile();
            this.parallax();
            this.thim_post_gallery();
            this.thim_miniCartHover();
        },

        // CUSTOM FUNCTION IN BELOW

        thim_miniCartHover: function() {
            jQuery(document).on('mouseenter', '.minicart_hover', function () {
                jQuery(this).next('.widget_shopping_cart_content').slideDown();
            }).on('mouseleave', '.minicart_hover', function () {
                jQuery(this).next('.widget_shopping_cart_content').delay(100).stop(true, false).slideUp();
            });
            jQuery(document)
                .on('mouseenter', '.widget_shopping_cart_content', function () {
                    jQuery(this).stop(true, false).show();
                })
                .on('mouseleave', '.widget_shopping_cart_content', function () {
                    jQuery(this).delay(100).stop(true, false).slideUp();
                });
        },

        thim_post_gallery: function() {
            $('article.format-gallery .flexslider').imagesLoaded(function() {
                $('.flexslider').flexslider({
                    slideshow     : true,
                    animation     : 'fade',
                    pauseOnHover  : true,
                    animationSpeed: 400,
                    smoothHeight  : true,
                    directionNav  : true,
                    controlNav    : false,
                });
            });
        },

        /**
         * Mobile menu
         */
        header_menu_mobile: function() {
            let $main_menu = $('#primaryMenu');
            // if($('#primaryMenu').height()) {
                $(document).on('click', '.menu-mobile-effect', function(e) {
                    e.stopPropagation();
                    $('.responsive #wrapper-container').
                    toggleClass('mobile-menu-open');
                });

                $(document).
                on('click', '.mobile-menu-open #main-content', function() {
                    $('.responsive #wrapper-container.mobile-menu-open').
                    removeClass('mobile-menu-open');
                });

                $('.responsive .mobile-menu-container .navbar-nav>li.menu-item-has-children >a').after('<span class="icon-toggle"><i class="fa fa-angle-down"></i></span>');

                $('.responsive .mobile-menu-container .navbar-nav>li.menu-item-has-children .icon-toggle').
                on('click', function() {
                    if ($(this).next('ul.sub-menu').is(':hidden')) {
                        $(this).next('ul.sub-menu').slideDown(200, 'linear');
                        $(this).html('<i class="fa fa-angle-up"></i>');
                    } else {
                        $(this).next('ul.sub-menu').slideUp(200, 'linear');
                        $(this).html('<i class="fa fa-angle-down"></i>');
                    }
                });
            //}
        },

        /**
         * Header menu sticky, scroll, v.v.
         */
        header_menu: function() {
            var $header = $('#masthead.sticky-header'),
                off_Top = ($('#wrapper-container').length > 0) ? $('#wrapper-container').offset().top : 0,
                dentalTop = off_Top,
                $topbar = $('#thimHeaderTopBar'),
                menuH = $header.outerHeight(),
                latestScroll = 0,
                startFixed = 2;

            if ($topbar.length) {
                if ($topbar.hasClass('style-overlay')) {
                    $header.css({
                        top: $topbar.outerHeight() + 'px',
                    });
                }
                startFixed = $topbar.outerHeight();
            }



            $(window).scroll(function() {
                var current = $(this).scrollTop();
                if (current > startFixed) {
                    $header.removeClass('affix-top').addClass('affix');
                    $header.css('top', dentalTop + 'px');
                } else {
                    $header.removeClass('affix').addClass('affix-top');
                    if ($topbar.hasClass('style-overlay')) {
                        $header.css({
                            top: $topbar.outerHeight() + 'px',
                        });
                    } else {
                        $header.css({
                            top: 0,
                        });
                    }
                }

                if (current > latestScroll && current > menuH + off_Top) {
                    if (!$header.hasClass('menu-hidden')) {
                        $header.addClass('menu-hidden');
                        $header.css({
                            top: off_Top,
                        });
                    }
                } else {
                    if ($header.hasClass('menu-hidden')) {
                        $header.removeClass('menu-hidden');
                        $header.css({
                            top: dentalTop,
                        });
                    }
                }

                latestScroll = current;
            });

            /*---------------------------------------------*/
            $(window).on('load',function(){
                responSubMenu();
            });

            $(window).on('resize',function(){
                responSubMenu();
            });

            var responSubMenu = function(){
                $('.main-navigation > ul > li').each(function(){
                    var obj = $(this);
                    var posRight = 0;
                    var posRightSub = 0;
                    var deepestSubMenu = obj.children('.sub-menu').children().children('.sub-menu');
                    var numOfSubMenu = 1;

                    while(deepestSubMenu.find('.sub-menu').length > 0) {
                        numOfSubMenu++;
                        deepestSubMenu = deepestSubMenu.find('.sub-menu');
                    }

                    if(obj.children('.sub-menu').length > 0) {
                        posRight = obj.offset().left + obj.children('.sub-menu').outerWidth();

                        if(deepestSubMenu.length > 0) {
                            posRightSub = posRight + deepestSubMenu.outerWidth() * numOfSubMenu;
                        }
                    }

                    if(posRight >= $(window).width()) {
                        var move = posRight - $(window).width();
                        obj.children('.sub-menu').css('left', '-' + move + 'px');
                    }
                    else {

                    }

                    if(posRightSub >= $(window).width()) {
                        obj.children('.sub-menu').find('.sub-menu').css({'left':'auto','right':'calc(100%)'});
                    }
                    else {
                        obj.children('.sub-menu').find('.sub-menu').css({'right':'auto','left':'calc(100%)'});
                    }
                });
            };
        },
        /**
         *   click account
         */
        infor_user:function(){
            if($(window).width() <= 1024) {
                $('.mobile-sidebar .bp-element-login-popup .login-links>a').after('<span class="icon-toggle"><i class="fa fa-angle-down"></i></span>');
                var thim_log_out = $('.bp-element-login-popup .login-links').find('.logout');
                thim_log_out.on('click', function () {
                    $('.user-info').toggleClass('open-user-infor');
                });
            }

            // click angle down
            var user_infor = $('.mobile-sidebar .bp-element-login-popup .login-links').find('.user-info').hide();
            var angle_down = $('.mobile-sidebar .bp-element-login-popup .login-links').find('.icon-toggle');
            angle_down.on('click',function () {
                if(user_infor.is(':hidden') === true){
                    user_infor.slideDown('normal');
                    $(this).html('<i class="fa fa-angle-up"></i>');
                }else{
                    user_infor.slideUp('normal');
                    $(this).html('<i class="fa fa-angle-down"></i>');
                }
            });
        },

        /**
         * Back to top
         */
        back_to_top: function() {
            var $element = $('#back-to-top');
            $(window).scroll(function() {
                if ($(this).scrollTop() > 100) {
                    $element.addClass('scrolldown').removeClass('scrollup');
                } else {
                    $element.addClass('scrollup').removeClass('scrolldown');
                }
            });

            $element.on('click', function() {
                $('html,body').animate({scrollTop: '0px'}, 800);
                return false;
            });
        },

        /**
         * Sticky sidebar
         */
        sticky_sidebar: function() {
            var offsetTop = 20;

            if ($("#wpadminbar").length) {
                offsetTop += $("#wpadminbar").outerHeight();
            }
            if ($("#masthead.sticky-header").length) {
                offsetTop += $("#masthead.sticky-header").outerHeight();
            }

            $('.sticky-sidebar').each(function () {
                if ($(this).length > 0) {
                    if ( $().theiaStickySidebar ) {
                        $(this).theiaStickySidebar({
                            'containerSelector'     : '',
                            'additionalMarginTop'   : offsetTop,
                            'additionalMarginBottom': '0',
                            'updateSidebarHeight'   : false,
                            'minWidth'              : '768',
                            'sidebarBehavior'       : 'modern',
                        });
                    }
                }
            });

        },

        /**
         * Parallax init
         */
        parallax: function() {
            $(window).stellar({
                horizontalOffset: 0,
                verticalOffset  : 0,
            });
        },

        /**
         * feature: Preloading
         */
        feature_preloading: function() {
            var $preload = $('#thim-preloading');
            if ($preload.length > 0) {
                $preload.fadeOut(1000, function() {
                    $preload.remove();
                });
            }
        },

        /**
         * Custom select
         */
        custom_select: function() {
            if ( $().select2 ) {
                $('select').select2({
                    minimumResultsForSearch: Infinity,
                });
            }

        },

        /**
         * Custom effect and UX for contact form.
         */
        contactform7: function() {
            $('.wpcf7-submit').on('click', function() {
                $(this).css('opacity', 0.2);
                $(this).parents('.wpcf7-form').addClass('processing');
                $('input:not([type=submit]), textarea').attr('style', '');
            });

            $(document).on('spam.wpcf7', function() {
                $('.wpcf7-submit').css('opacity', 1);
                $('.wpcf7-form').removeClass('processing');
            });

            $(document).on('invalid.wpcf7', function() {
                $('.wpcf7-submit').css('opacity', 1);
                $('.wpcf7-form').removeClass('processing');
            });

            $(document).on('mailsent.wpcf7', function() {
                $('.wpcf7-submit').css('opacity', 1);
                $('.wpcf7-form').removeClass('processing');
            });

            $(document).on('mailfailed.wpcf7', function() {
                $('.wpcf7-submit').css('opacity', 1);
                $('.wpcf7-form').removeClass('processing');
            });

            $('body').
                on('click',
                    'input:not([type=submit]).wpcf7-not-valid, textarea.wpcf7-not-valid',
                    function() {
                        $(this).removeClass('wpcf7-not-valid');
                    });
        },

        /**
         * Blog auto height
         */
        thim_blog_auto_height: function() {
            var $blog = $(
                '.blog .blog-content article, .archive .blog-content article'),
                maxHeight = 0,
                setH = true;

            // Get max height of all items.
            $blog.each(function() {
                setH = $(this).hasClass('column-1') ? false : true;
                if (maxHeight < $(this).find('.content-inner').height()) {
                    maxHeight = $(this).find('.content-inner').height();
                }
            });

            // Set height for all items.
            if (maxHeight > 0 && setH) {
                $blog.each(function() {
                    $(this).find('.content-inner').css('height', maxHeight);
                });
            }
        },

        /**
         * Search popup
         */
        search_popup: function() {
            if($('.search-button').height()) {
                var $search_button = $('.search-button'),
                    $search_input = $('.bp-sc-search .search-field'),
                    $header = $('#masthead.sticky-header'),
                    windoH = $(window).height();

                $search_button.on('click', function(event) {
                    $('body').addClass('search-popup-active').on({
                        'mousewheel': function(e) {
                            if (e.target.id === 'el') {
                                return;
                            }

                            e.preventDefault();
                            e.stopPropagation();
                        }
                    });

                    $search_input.focus();

                    $(document).on('keydown', function(e) {
                        // ESCAPE key pressed
                        if (e.keyCode === 27) {
                            $('body').removeClass('search-popup-active').unbind('mousewheel');
                            $search_input.blur();
                        }
                    });
                });

                $(document).on('click', '.close-form', function(e) {
                    e.stopPropagation();
                    $('body').removeClass('search-popup-active').unbind('mousewheel');
                    $search_input.blur();
                });
            }

        },

        /**
         * Use for ComingSoon page template.
         */
        comingsoon_countdown: function () {
            var $thim_product_countdown = $('#thim-comingsoon-countdown');

            if ($thim_product_countdown.length) {


                var elem = $thim_product_countdown;
                var date = elem.attr('data-date');

                var myDate = new Date();
                myDate.setDate(myDate.getDate() + parseInt(date));

                elem.find('#knob-countdown').countdown({
                    until : myDate,
                    format: 'DHMS',
                    onTick: function (e) {
                        var secs = e[6], mins = e[5], hr = e[4], ds = e[3];
                        elem.find("#countdown-ds").val(ds).trigger("change");
                        elem.find("#countdown-hr").val(hr).trigger("change");
                        elem.find("#countdown-min").val(mins).trigger("change");
                        elem.find("#countdown-sec").val(secs).trigger("change");
                    }
                });

                $('.knob').knob();

            }
        },

        /**
        * Related services slider
        * */
        related_service: function() {
            var $services = $('#relatedService');

            $services.find('.js-slider-wrapper').slick({
                slidesToShow: 3,
                infinite      : false,
                prevArrow     : '<span class="icon-prev"></span>',
                nextArrow     : '<span class="icon-next"></span>',
            });
        },

        /**
        * Slider single service
        *
        **/
        thim_slider_service: function () {
            var $single = $('.thim-service-slider');
            $single.find('.service-item').slick({
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: false,
                fade: true,
                asNavFor: '.service-item-image'
            });
            $single.find('.service-item-image').slick({
                slidesToShow: 3,
                slidesToScroll: 1,
                asNavFor: '.service-item',
                dots: false,
                centerMode: true,
                focusOnSelect: true,
                prevArrow     : '<span class="icon-prev"></span>',
                nextArrow     : '<span class="icon-next"></span>',
            });

        },

        /**
		 * Update user info in profile page LearnPress v3
		 * */
        profile_update: function () {
            if (!$('body').hasClass('lp-profile')) {
                return;
            }

            $('.publicity .form-field').each(function () {

                $(this).find('p.description').append('<svg><use xlink:href="#checkmark" /></svg>');

                $(this).find('p.description').replaceWith(function () {
                    return $('<label/>', {
                        html: $(this).html()
                    });
                });

                $(this).find('label').attr('for', 'my-assignments');
            });

            var $form = $('form[name="lp-edit-profile"]'),
                data = $form.serialize(),
                timer = null;

            if ($form.hasClass('learnpress-v3-profile')) {
                $form.on('submit', function () {
                    var data = $form.serializeJSON(),
                        completed = 0,
                        $els = $('.lp-profile-section'),
                        total = $els.length,
                        $sections = $form.find('.lp-profile-section'),
                        serialize = function ($el) {
                            return $('<form />').append($el.clone()).serializeJSON();
                        };

                    $('#submit').css("color", "transparent");
                    $form.find('#submit .sk-three-bounce').removeClass('hidden');

                    $sections.each(function () {
                        var $section = $(this),
                            slug = $section.find('input[name="lp-profile-section"]').val();

                        if (slug === 'avatar') {
                            if ($section.find('input[name="lp-user-avatar-custom"]').last().val() !== 'yes') {
                                completed++;
                                return;
                            }
                        }

                        $.ajax({
                            url    : window.location.href,
                            data   : serialize($section),
                            type   : 'post',
                            success: function (res) {

                                if (++completed == total) {
                                    window.location.href = window.location.href;
                                }
                            }
                        });
                    });

                    return false;
                });
            } else {
                $form.on('submit', function () {
                    var data = $form.serializeJSON(),
                        completed = 0,
                        $els = $('.lp-profile-section'),
                        total = $els.length;

                    $('#submit').css("color", "transparent");
                    $form.find('#submit .sk-three-bounce').removeClass('hidden');
                    $els.each(function () {
                        data['lp-profile-section'] = $(this).find('input[name="lp-profile-section"]').val();
                        if (data['lp-profile-section'] === 'avatar') {
                            if ($(this).find('input[name="update-custom-avatar"]').last().val() !== 'yes') {
                                completed++;
                                return;
                            }
                        }

                        $.post({
                            url    : window.location.href,
                            data   : data,
                            success: function (res) {
                                completed++;
                                if (completed === total) {
                                    window.location.href = window.location.href;
                                }

                            }
                        })
                    });
                    return false;
                });
            }

            // Make update available immediately click on Remove button
            $('.clear-field').on('click', function () {
                $(this).siblings('input[type=text]').val('').trigger('change');
            });
        },

        /**
         * accordion
         */
        accordion: function() {
            try {
                $('.js-call-accordion').each(function(){
                    var wraper = $(this);

                    if($(wraper).hasClass('active-accordion')) {
                        $(wraper).find('.section-content').show();
                    }
                    else {
                        $(wraper).find('.section-content').hide();
                    }

                    $(wraper).find('.js-toggle-accordion').on('click', function(){
                        $(wraper).toggleClass('active-accordion');
                        $(wraper).find('.section-content').slideToggle();
                    });
                });

            } catch(er) {console.log(er);}
        },

        /**
         * Magnific-Popup-Video
         */
        magnific_popup_video: function() {
            try {
                $('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
                    disableOn: 700,
                    type: 'iframe',
                    mainClass: 'mfp-fade',
                    removalDelay: 160,
                    preloader: false,

                    fixedContentPos: false
                });
            } catch(er) {console.log(er);}
        },

        reset_password_ajax: function () {
            $("#resetpassform").on('submit', function() {
                var submit = $("#resetpass-button"),
                    message = $(this).find(".message-notice"),
                    loading = $(this).find(".sk-three-bounce"),
                    contents = {
                        action    : 'thim_reset_password_ajax',
                        nonce     : this.rs_user_reset_password_nonce.value,
                        pass1     : this.pass1.value,
                        pass2     : this.pass2.value,
                        user_key  : this.user_key.value,
                        user_login: this.rp_user.value
                    };

                // disable button onsubmit to avoid double submision
                submit.attr("disabled", "disabled").addClass('disabled');
                loading.removeClass("hidden");

                $.post(ajaxurl, contents, function (data) {
                    var response = JSON.parse(data), status, content = "";
                    submit.removeAttr("disabled").removeClass('disabled');
                    loading.addClass("hidden");

                    for (status in response) {
                        if (status === 'password_reset') {
                            content += "<p class='alert alert-success'>" + response[status][0] + "</p>";
                            message.html(content);
                            var newURL = window.location.protocol + "//" + window.location.host + "/" + window.location.pathname + "?result=changed";
                            window.location.replace(newURL);
                        } else {
                            content += "<p class='alert alert-danger'>" + response[status][0] + "</p>";
                        }
                    }
                    message.html(content);
                });

                return false;
            });

        },

        /**
        * Validate login form, register form, forgot password form
        **/

        validate_signing_form: function () {
            $('.thim-login form').each(function () {
                $(this).on('submit', function(event) {
                    var elem = $(this),
                        input_username = elem.find('#user_login'),
                        input_userpass = elem.find('#user_pass'),
                        input_email = elem.find('#user_email'),
                        input_captcha = elem.find('.thim-login-captcha .captcha-result'),
                        input_pass = elem.find('#password'),
                        input_rppass = elem.find('#repeat_password');

                    var elem = $('#thim-popup-login .thim-login-container');

                    var email_valid = /[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}/igm;

                    if (input_captcha.length > 0) {
                        var captcha_1 = parseInt(input_captcha.data('captcha1')),
                            captcha_2 = parseInt(input_captcha.data('captcha2'));

                        if (captcha_1 + captcha_2 != parseInt(input_captcha.val())) {
                            input_captcha.addClass('invalid').val('');
                            event.preventDefault();
                        }
                    }

                    if (input_username.length > 0 && input_username.val() === '') {
                        input_username.addClass('invalid');
                        event.preventDefault();
                    }

                    if (input_userpass.length > 0 && input_userpass.val() === '') {
                        input_userpass.addClass('invalid');
                        event.preventDefault();
                    }

                    if (input_email.length > 0 && (input_email.val() === '' || !email_valid.test(input_email.val()))) {
                        input_email.addClass('invalid');
                        event.preventDefault();
                    }

                    if (input_pass.length > 0 && input_rppass.length > 0) {
                        if (input_pass.val() !== input_rppass.val() || input_pass.val() === '') {
                            input_pass.addClass('invalid');
                            input_rppass.addClass('invalid');
                            event.preventDefault();
                        }
                    }
                });
            });

            $('.thim-login-captcha .captcha-result, .thim-login input, #popupLoginForm input').on('focus', function () {
                if ($(this).hasClass('invalid')) {
                    $(this).removeClass('invalid');
                }
            });
        },

        /**
        * WordPress Visual Composer full width row ( stretch row ) fix for RTL
        * */
        thim_fix_vc_full_width_row: function () {
            if ($('html').attr('dir') === 'rtl') {
                setTimeout(function () {
                    $(window).trigger('resize');
                }, 1000);
                $(window).resize(function () {
                    var get_padding1 = parseFloat($('body.rtl .vc_row-has-fill[data-vc-full-width="true"]').css('left')),
                        get_padding2 = parseFloat($('body.rtl .vc_row-no-padding[data-vc-full-width="true"]').css('left'));
                    if (get_padding1 != 'undefined') {
                        $('body.rtl .vc_row-has-fill[data-vc-full-width="true"]').css({
                            'right': get_padding1,
                            'left' : ''
                        });
                    }
                    if (get_padding2 != 'undefined') {
                        $('body.rtl .vc_row-no-padding[data-vc-full-width="true"]').css({
                            'right': get_padding2,
                            'left' : ''
                        });
                    }
                });
            }
        },

        /**
         * menu_scroll
         */
        menu_scroll: function() {
            try {
                $('body').append('<div class="menu-scroll-clone"><div class="container"></div></div>');

                var $menu = $('.bl-menu-scroll'),
                    latestScroll = 0,
                    startFixed = ($menu.length > 0) ? $menu.offset().top : 0 + $menu.outerHeight();

                var $contentClone = $menu.children().clone(),
                    $menuClone = $('.menu-scroll-clone');

                $menuClone.find('.container').append($contentClone);
                $menuClone.addClass('sticky-bottom')

                $(window).scroll(function() {
                    var current = $(this).scrollTop();

                    if (current > latestScroll && current > startFixed) {
                        if (!$menuClone.hasClass('show-menu')) {
                            $menuClone.addClass('show-menu');
                        }
                    } else {
                        if ($menuClone.hasClass('show-menu')) {
                            $menuClone.removeClass('show-menu');
                        }
                    }

                    latestScroll = current;
                });

            } catch(er) {console.log(er);}


            try {
                $('.js-call-menu-scroll a').on('click', function(event){
                    event.preventDefault();
                    $('html, body').animate({scrollTop: $($(this).attr('href')).offset().top}, 500);
                });

            } catch(er) {console.log(er);}
        },

        /**
         * Hide Toolbar
         */
        hide_tool_bar: function() {
            try {
                $('.close-notification-bar').on('click', function(){
                    $('.thim-topbar').remove();
                    $('.sticky-header').css('top','0');
                    return false;
                });

            } catch(er) {console.log(er);}
        },

        /**
         * dropdown_click
         */
        dropdown_click: function() {
            try {
                $('.js-dropdown-click').each(function(){
                    var $toggle = $(this).children('.widget-title');
                    var $content = $(this).children('ul');

                    if(!$toggle.hasClass('dropdown-active')) {
                        $content.hide();
                    }

                    $toggle.on('click', function(e){
                        e.stopPropagation();

                        if($toggle.hasClass('dropdown-active')) {
                            $content.slideUp('fast');
                            $(this).removeClass('dropdown-active');
                        }
                        else {
                            $content.slideDown('fast');
                            $(this).addClass('dropdown-active');
                        }
                    });

                    $(window).on('click', function() {
                        $content.slideUp('fast');
                        $toggle.removeClass('dropdown-active');
                    })
                });

            } catch(er) {console.log(er);}
        },

        /**
         * Grid & List
         */
        switch_layout: function () {
            var cookie_name = $('.grid-list-switch').data('cookie');
            var courses_layout = $('.grid-list-switch').data('layout');
            var $list_grid = $('.grid-list-switch');

            if (cookie_name == 'product-switch') {
                var gridClass = 'product-grid';
                var listClass = 'product-list';
            } else if (cookie_name == 'lpr_course-switch') {
                var gridClass = 'course-grid';
                var listClass = 'course-list';
            } else if (cookie_name == 'event-switch') {
                var gridClass = 'event-grid';
                var listClass = 'event-list';
            } else {
                var gridClass = 'blog-grid';
                var listClass = 'blog-list';
            }

            var check_view_mod = function () {
                var activeClass = 'switcher-active';
                if ($list_grid.hasClass('has-layout')) {
                    if (courses_layout == 'grid') {
                        $('.archive_switch').removeClass(listClass).addClass(gridClass);
                        $('.switchToGrid').addClass(activeClass);
                        $('.switchToList').removeClass(activeClass);
                    } else {
                        $('.archive_switch').removeClass(gridClass).addClass(listClass);
                        $('.switchToList').addClass(activeClass);
                        $('.switchToGrid').removeClass(activeClass);
                    }
                }
                else {
                    // if ($.cookie(cookie_name) == 'grid') {
                    // 	$('.archive_switch').removeClass(listClass).addClass(gridClass);
                    // 	$('.switchToGrid').addClass(activeClass);
                    // 	$('.switchToList').removeClass(activeClass);
                    // } else if ($.cookie(cookie_name) == 'list') {
                    // 	$('.archive_switch').removeClass(gridClass).addClass(listClass);
                    // 	$('.switchToList').addClass(activeClass);
                    // 	$('.switchToGrid').removeClass(activeClass);
                    // }
                    // else {
                    if (courses_layout === 'grid') {
                        $('.switchToList').removeClass(activeClass);
                        $('.switchToGrid').addClass(activeClass);
                        $('.archive_switch').removeClass(listClass).addClass(gridClass);
                    }
                    else {
                        $('.switchToList').addClass(activeClass);
                        $('.switchToGrid').removeClass(activeClass);
                        $('.archive_switch').removeClass(gridClass).addClass(listClass);
                    }
                    // }
                }
            };
            check_view_mod();

            var listSwitcher = function () {
                var activeClass = 'switcher-active';
                if ($list_grid.hasClass('has-layout')) {
                    $('.switchToList').click(function () {
                        $('.switchToList').addClass(activeClass);
                        $('.switchToGrid').removeClass(activeClass);
                        $('.archive_switch').fadeOut(300, function () {
                            $(this).removeClass(gridClass).addClass(listClass).fadeIn(300);
                        });
                    });
                    $('.switchToGrid').click(function () {
                        $('.switchToGrid').addClass(activeClass);
                        $('.switchToList').removeClass(activeClass);
                        $('.archive_switch').fadeOut(300, function () {
                            $(this).removeClass(listClass).addClass(gridClass).fadeIn(300);
                        });
                    });
                } else {

                    $('.switchToList').click(function () {
                        if (!$.cookie(cookie_name) || $.cookie(cookie_name) == 'grid') {
                            switchToList();
                        }
                    });
                    $('.switchToGrid').click(function () {
                        if (!$.cookie(cookie_name) || $.cookie(cookie_name) == 'list') {
                            switchToGrid();
                        }
                    });
                }

                function switchToList() {
                    $('.switchToList').addClass(activeClass);
                    $('.switchToGrid').removeClass(activeClass);
                    $('.archive_switch').fadeOut(300, function () {
                        $(this).removeClass(gridClass).addClass(listClass).fadeIn(300);
                        $.cookie(cookie_name, 'list', {expires: 3, path: '/'});
                    });
                }

                function switchToGrid() {
                    $('.switchToGrid').addClass(activeClass);
                    $('.switchToList').removeClass(activeClass);
                    $('.archive_switch').fadeOut(300, function () {
                        $(this).removeClass(listClass).addClass(gridClass).fadeIn(300);
                        $.cookie(cookie_name, 'grid', {expires: 3, path: '/'});
                    });
                }

                $(".product-filter").each(function () {
                    $('.switchToGrid').addClass(activeClass);
                    $('.archive_switch').removeClass('product-list').addClass('product-grid');
                });
            }

            listSwitcher();
        },

        /**
         * Quickview product
         */
        quick_view    : function () {
            $('.quick-view').on('click', function (e) {
                /* add loader  */
                $('.quick-view span').css('display', 'none');
                $(this).append('<span class="loading dark"></span>');
                var product_id = $(this).attr('data-prod');
                var data = {action: 'jck_quickview', product: product_id};
                $.post(ajaxurl, data, function (response) {
                    $.magnificPopup.open({
                        mainClass: 'my-mfp-zoom-in',
                        items    : {
                            src : response,
                            type: 'inline'
                        }
                    });
                    $('.quick-view span').css('display', 'inline-block');
                    $('.loading').remove();
                    $('.product-card .wrapper').removeClass('animate');
                    setTimeout(function () {
                        $('.product-lightbox form').wc_variation_form();
                    }, 600);

                    $('#slider').flexslider({
                        animation    : "slide",
                        controlNav   : false,
                        animationLoop: false,
                        directionNav : true,
                        slideshow    : false
                    });
                });
                e.preventDefault();
            });
        },

    };

})(jQuery);