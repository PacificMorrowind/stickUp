/*jslint browser: true */
/*jslint plusplus: true */
/*global jQuery */
(function ($) {
    'use strict';
    $(document).ready(function () {
        var contentTop = [],
            content = [],
            lastScrollTop = 0,
            scrollDir = '',
            itemClass = '',
            itemHover = '',
            menuSize = null,
            stickyHeight = 0,
            stickyMarginB = 0,
            currentMarginT = 0,
            topMargin = 0,
            topPadding = 0,
            topPaddingElement,
            vartop,
            originalCSS;
        $(window).scroll(function () {
            var st = $(this).scrollTop();
            if (st > lastScrollTop) {
                scrollDir = 'down';
            } else {
                scrollDir = 'up';
            }
            lastScrollTop = st;
        });
        $.fn.stickUp = function (options) {
            // adding a class to users div
            $(this).addClass('stuckMenu');
            //get options
            if (options) {
                if (options.itemClass) {
                    itemClass = options.itemClass;
                    menuSize = $('.' + itemClass).size();
                }
                if (options.itemHover) {
                    itemHover = options.itemHover;
                }
                if(options.topMargin != null) {
                    if(options.topMargin == 'auto') {
                        topMargin = parseInt($('.stuckMenu').css('margin-top'));
                    } else {
                        if(isNaN(options.topMargin) && options.topMargin.search("px") > 0){
                            topMargin = parseInt(options.topMargin.replace("px",""));
                        } else if(!isNaN(parseInt(options.topMargin))) {
                            topMargin = parseInt(options.topMargin);
                        } else {
                            console.log("incorrect argument, ignored.");
                            topMargin = 0;
                        }
                    }
                } else {
                    topMargin = 0;
                }
                menuSize = $('.'+itemClass).size();
            }
            //$(this).find('*').removeClass(itemHover);
        }
        $(document).on('scroll', function() {
            varscroll = parseInt($(document).scrollTop());
            if(menuSize != null){
                for(var i=0;i < menuSize;i++)
                {
                    contentTop[i] = $('#'+content[i]+'').offset().top;
                        }
                    }
                    if(scrollDir == 'down' && varscroll > contentTop[i]-50 && varscroll < contentTop[i]+50) {
                        $('.'+itemClass).removeClass(itemHover);
                        $('.'+itemClass+':eq('+i+')').addClass(itemHover);
            stickyHeight = parseInt($(this).height(), 10);
            stickyMarginB = parseInt($(this).css('margin-bottom'), 10);
            currentMarginT = parseInt($(this).next().closest('div').css('margin-top'), 10);
            vartop = parseInt($(this).offset().top, 10);
            originalCSS =  {
                "position" : $('.stuckMenu').css('position'),
               // "width" : $('.stuckMenu').css('width'),
                "z-index" : $('.stuckMenu').css('z-index'),
                "top" : $('.stuckMenu').css('top'),
                "padding-top" : $('.stuckMenu').css('padding-top'),
                "margin-top" : $('.stuckMenu').css('margin-top')
            };
        function bottomView(i, varscroll) {
            var contentView = $('#' + content[i]).height() * 0.4,
                testView = contentTop[i] - contentView;
            if (varscroll > testView) {
                $('.' + itemClass).removeClass(itemHover);
                $('.' + itemClass + ':eq(' + i + ')').addClass(itemHover);
            } else if (varscroll < 50) {
                $('.' + itemClass).removeClass(itemHover);
                $('.' + itemClass + ':eq(0)').addClass(itemHover);
            }
        }
                    }
                    if (scrollDir === 'up') {
                        bottomView(i, varscroll);
                    }
                }
            }



            if(vartop < varscroll + topMargin){
                $('.stuckMenu').addClass('isStuck');
                $('.stuckMenu').next().closest('div').css({
                    'margin-top': stickyHeight + stickyMarginB + currentMarginT + 'px'
                }, 10);
                $('.stuckMenu').css("position","fixed");
                $('.isStuck').css({
                    top: '0px'
                }, 10, function(){

                });
            }

            if(varscroll + topMargin < vartop){
                $('.stuckMenu').removeClass('isStuck');
                $('.stuckMenu').next().closest('div').css({
                    'margin-top': currentMarginT + 'px'
                }, 10);
                $('.stuckMenu').css(originalCSS);
            }
        });
    });
}(jQuery));
