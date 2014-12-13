//$(document).ready(function() {
//
//    var onMousewheel = function (event) {
//        var wheelDeltaY = (event.webkitDirectionInvertedFromDevice) ? event.originalEvent.wheelDelta : -event.originalEvent.wheelDelta;
//        var scrollTop = $('.container-right > .body').scrollTop() + wheelDeltaY;
//        if (scrollTop > 0) {
//            $('.container-right > .body').scrollTop(scrollTop);
//            $('.container-left > .body').scrollTop(scrollTop);
//        }
//    };
//    $(".container-left > .body").bind('mousewheel',onMousewheel);
//
//
//    $('.container-right > .body').scroll(function(e) {
//        //sync both containers scrolling top and bottom
//        $('.container-left > .body').scrollTop($('.container-right > .body').scrollTop());
//
//        //sync header and body in the container
//        $('.container-right > .header-container').scrollLeft($('.container-right > .body').scrollLeft());
//    });
//
//});