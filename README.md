jquery-mimage
=============

jQuery plugin for mediaquery-like using of multiple images sources. Short &amp; clear implementation of the idea of the &lt;picture> element

Usage
=====

Set up an img element with specified "data-src-*" attributes. It can be "-mobile","-tablet","-desktop" and "-big". Every image will use when window size is ''less than appropriate size in options'', exepts "-big" - it will load if window width is more than size.destop.

html:
-----
<pre>&lt;img src="images/image-tablet.png" 
    data-src-mobile="images/image-mobile.png"
    data-src-tablet="images/image-tablet.png"
    data-src-desktop="images/image-desktop.png"
    data-src-big="images/image-big.png"
    alt="Image image" /></pre>

js:
---
<pre>$(document).ready(function(){
    $.mImg({
        selector: null,
        onresize: false,
        loader: true,
        loaderImg: undefined,
        sizes: {
            mobile: 320,
            tablet: 640,
            desktop: 1280
        }
    });
}</pre>

How it works
============
The img's "src" attribute is set to default image for compatibility in case if JS is switched off. Idea is that it has to be set to the smallest version to prevent useless data loading (in this case you can omit the "data-src-mobile" attribute to make the code shorter). Data-attributes can contain up to four different image links, which are switched (automatically if "onresize" set to "true") by window width. Breakpoints has to be set in "sizes" section of "options" argument. It also can automatically set the loader image for those images, which have specific data-attributes. Or you can leave "src" value empty if you are sure that js will be always turned on on your site. But then don't forget to set "data-src-mobile" value. You can omit not only mobile src, but every src you don't need. In this case plugin will use the smallest one which exists. For example if use set "mobile" vesion in "src" and set "data-src-big", the big picture will only appear on huge screens, else "mobile" image will be shown.

Supports
========
Everything, even IE7 and upper.

Options
=======

selector
--------
Using to specify the filter of images. If "null", will be applied only for images with "data-src-*" attributes. Can be string of jQuery filter function.

onresize
--------
Function to checkout working. Bind changing of srcs to the window.resize event.

loader
------
If set to "true" automatically adds the loader to all selected images. (sic!) If "loaderImg" wasn't set it will not work. To preload loader put this code in the &lt;head>:
<pre>&lt;script>var a=new Image();a.src="%pathToYourImage%"&lt;/script></pre>

loaderImg
---------
Link to the loader image.

sizes
-----
Place to set breakpoints of mediaqueries. Contains three options: "mobile","tablet" and "desktop".
