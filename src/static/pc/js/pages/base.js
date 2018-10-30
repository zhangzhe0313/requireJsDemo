require(['jquery', 'mscore', 'select2','validateUtils', 'homeSvgFont'], function ($, mscore) {
    
    // 判断平台
    function judgePlatform() {
        var userAgentInfo = navigator.userAgent;
        var rgx = /pad|pod|iPod|iPad/i;
        var flag = false;
        if(rgx.test(userAgentInfo)) {
            flag = true;
        }
        return flag;
    }

    // 根据平台设置viewport
    function autoSetViewport() {
        var winWidths = window.outerWidth,
            scallVal = 1,
            _winViewport = document.querySelector("meta[name=viewport]");
        if (!_winViewport) {
            return;
        }
        if(winWidths < 1170) {
            scallVal = winWidths/1170 < 0.5 ? 0.5 : Math.floor((winWidths/1170)*10)/10;
        }
        
        _winViewport.setAttribute('content', 'width=device-width, initial-scale=' + scallVal + ', minimum-scale= '+ scallVal +', maximum-scale=1.0, user-scalable=no');
    }

    if (judgePlatform()) {
        autoSetViewport();
        var evt = "onorientationchange" in window ? "orientationchange" : "resize";
        window.addEventListener(evt,function(){
            autoSetViewport();
        },false);
    }
});