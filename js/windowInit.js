var windowWidth = 0, windowHeight = 0, windowWidthScale = 1, windowHeightScale = 1;
var initFirst = true, initHorizontal = false, fromHorizontal = false, lastWidth = 0; lastHeight = 0;
var scrollY = 0;
var currPage = 1;
var ua = window.navigator.userAgent;
var isIOS = /iPhone|iPod|iPad/i.test(ua);
function createFunctionProxy(fn, scope) {
    if (scope.functionTimeout) clearTimeout(scope.functionTimeout);
    var args = Array.prototype.slice.call(arguments, 0);
    scope.functionTimeout = setTimeout($.proxy(function () {
        fn.apply(scope, args);
    }, scope), isIOS ? 1 : 300);
};
function windowInit() {
    windowWidth = $(window).width();
    windowHeight = $(window).height();
    //console.log(windowWidth+"/"+windowHeight);
    if (initFirst) {
        lastWidth = windowWidth;
        lastHeight = windowHeight;
    }
    if (windowWidth > windowHeight) {
        if (initFirst) {
            initHorizontal = true;
        }
        fromHorizontal = true;
        if (currPage != 100) {
            $('html').css({ 'width': windowWidth + "px", 'height': windowHeight + "px" });
            $(".screentip").css({ 'width': windowWidth + "px", 'height': windowHeight + "px" }).removeClass('hide');
        } else {
            window.scrollTo(0, ~~scrollY);
        }
    } else {
        if (initHorizontal) {
            location.href = location.href;
        }
        if (fromHorizontal) {
            window.location.reload();
        } else {
            lastWidth = windowWidth;
            lastHeight = windowHeight;
        }
        fromHorizontal = false;
        $(".screentip").addClass('hide');
        $('html').css({ 'width': windowWidth + "px", 'height': windowHeight + "px" });
        createFunctionProxy(function () {
            $('html').css({ 'width': windowWidth + "px", 'height': windowHeight + "px" });
        }, window);
        windowWidthScale = windowWidth / 640;
        windowHeightScale = windowHeight / 1010;

        if (windowHeightScale > 1) windowHeightScale = 1;
        $('.zoom').css({
            'transform': 'scale(' + windowHeightScale + ')', '-o-transform': 'scale(' + windowHeightScale + ')',
            '-moz-transform': 'scale(' + windowHeightScale + ')', '-webkit-transform': 'scale(' + windowHeightScale + ')', '-ms-transform': 'scale(' + windowHeightScale + ')'
        });
        window.scrollTo(0, 0);
    }
    initFirst = false;
};