jquery-mimage
=============

jQuery plugin for mediaquery-like using of multiple images sources. Short &amp; clear implementation of the idea of the &lt;picture> element

Usage
=====

html:
-----
<code><img src="images/image-tablet.png" 
    data-src-mobile="images/image-mobile.png"
    data-src-tablet="images/image-tablet.png"
    data-src-desktop="images/image-desktop.png"
    data-src-big="images/image-big.png"
    alt="Image image" /></code>

js:
---
$(document).ready(function(){
    $.mImg({
        onresize: false,
        loader: true,
        loaderImg: undefined,
        sizes: {
            mobile: 320,
            tablet: 640,
            desktop: 1280
        }
    });
}

How it works
============
The img's "src" attribute is set to default image for compatibility in case if JS is switched off. Idea is that it has to be set to the smallest version to prevent useless data loading (in this case you can omit the "data-src-mobile" attribute to make the code shorter). Data-attributes can contain up to four different image links, which are switched (automatically if "onresize" set to "true") by window width. Breakpoints has to be set in "sizes" section of "options" argument. It also can automatically set the loader image for those images, which have specific data-attributes. Or you can leave "src" value empty if you are sure that js will be always turned on on your site. But then don't forget to set "data-src-mobile" value. You can omit not only mobile src, but every src you don't need. In this case plugin will use the smallest one which exists. For example if use set "mobile" vesion in "src" and set "data-src-big", the big picture will only appear on huge screens, else "mobile" image will be shown.

Supports
========
Everything, even IE7 and upper.
