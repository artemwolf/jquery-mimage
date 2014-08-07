/*!
 * jQuery Multisource Image Plugin
 * version: 0.1.0-alpha.1
 * Requires jQuery v1.5.0 or later
 * Copyright (c) 2014 Artem Wolf
 * Examples and documentation at: https://github.com/artemwolf/jquery-mimage/
 * Project repository: https://github.com/artemwolf/jquery-mimage/
 * Llicensed under the MIT
 * https://github.com/malsup/form#copyright-and-license
 */
(function( $ ){

    $.mImg = function(args) {

        var options = {
                selector: null,
                onresize: false,
                loader: true,
                loaderImg: undefined,                
                sizes: {
                    mobile: 320,
                    tablet: 640,
                    desktop: 1280                    
                }
            },
            $imgs = $('img'),
            empty = function(variable,flag){
                return (variable === undefined || variable === null || variable === "");
            },
            checkSrc = function(src){
                src.mobile = (!empty(src.mobile) ? src.mobile : src.original);
                src.tablet = (!empty(src.tablet) ? src.tablet : src.mobile);
                src.desktop = (!empty(src.desktop) ? src.desktop : src.tablet);
                src.big = (!empty(src.big) ? src.big : src.desktop);
                
                return src;
            },
            mQuery = function($img,src){
                var windowWidth = $(window).width(),
                    curSrc = $img.attr('src'),
                    newSrc = '';

                if (windowWidth >= options.sizes.desktop){
                    newSrc = src.big;
                } else if (windowWidth < options.sizes.desktop && windowWidth >= options.sizes.tablet){
                    newSrc = src.desktop;
                } else if (windowWidth < options.sizes.tablet && windowWidth >= options.sizes.mobile){
                    newSrc = src.tablet;
                } else if (windowWidth < options.sizes.mobile){
                    newSrc = src.mobile;
                }

                if (newSrc !== curSrc){
                    $img.attr('src',newSrc);
                    $img.css('background','none');
                }
            };
            
        /* Script body starts here */

        options = $.extend({}, options, args);
        
        if (empty(options.selector)){
            $imgs = $imgs.filter(function(){
                var prop;
                for (prop in $(this).data()){
                    if (prop.indexOf('src') === 0){
                        return true;
                    }
                }

                return false;
            });
        } else {
            $imgs = $imgs.filter(options.selector);
        }
        
        $.each($imgs,function(){
            var $this = $(this),
                src = {
                    original: $this.attr('src'),
                    mobile: $this.data('src-mobile'),
                    tablet: $this.data('src-tablet'),
                    desktop: $this.data('src-desktop'),
                    big: $this.data('src-big')
                };

            if (options.loader && options.loaderImg !== undefined){
                $this.attr('src','');            
                $this.css('background','url(' + options.loaderImg + ') no-repeat center center');
            }

            $this
                .removeAttr('data-src-mobile')
                .removeAttr('data-src-tablet')
                .removeAttr('data-src-desktop')
                .removeAttr('data-src-big');
        
            src = checkSrc(src);

            if (options.onresize){
                $(window).resize(function(e){
                    mQuery($this,src);
                });
            }

            mQuery($this,src);

        });
        
        return $imgs;
    };
})( jQuery );
