var AnimateUtil = function() {

    var AnimateImage =new Object({
        imgArr: [], source: {}, nowi: 0, now2: 0, imgindex: 0, playtimer: null,
        canvas2: undefined,
        view: {w: 640, h: 960},
        ctx: undefined,//= canvas2.getContext("2d");
        loadend: 0,
        _this: this,
        canstop: false
    });
    AnimateImage.init=function (date) {
        var _this = this;
        _this.canvas2 = document.querySelector(date.canvas);
        if (date.view) {
            if (date.view.w) {
                _this.view.w = date.view.w
            }
            if (date.view.h) {
                _this.view.h = date.view.h;
            }
        }
        _this.canvas2.width = _this.view.w;
        _this.canvas2.height = _this.view.h;
        _this.ctx = _this.canvas2.getContext("2d");
        _this.ctx.clearRect(0, 0, _this.canvas2.width, _this.canvas2.height);
        if (date.fundonephoto) {
            _this.fundonephoto = date.fundonephoto;
        }
        if (date.showvideoframe) {
            _this.showvideoframe = date.showvideoframe
        }
        _this.nowi = _this.now2 = 0;
        if (date.imgsrc) {
            if (date.maxload)
                _this.loadend = date.maxload;
            else
                _this.loadend = date.imgsrc.length;
            _this.pushImgArr(date.imgsrc)
        }
    }
    AnimateImage.pushImgArr=function (src) {
        var _this = this;
        _this.imgArr = [];
        for (var i = 0; i < src.length && i < _this.loadend; i++) {
            _this.imgArr.push(src[i]);
            _this.imgLoad();
            if (i == _this.loadend - 1) {
                setTimeout(function () {
                    _this.fundonephoto();
                }, 10);
            }
        }
        //console.log(_this.imgArr);
    }
    AnimateImage.imgLoad=function () {
        var _this = this;
        var src = _this.source;
        var now = _this.nowi;
        if(now >= _this.loadend)return;
        //console.log('src' + now);
        src['src' + now] = new Image();
        src['src' + now].src = _this.imgArr[now];
        _this.nowi++;
    }
    AnimateImage.movieInit= function () {
        var _this = this;
        _this.canstop = false;
        clearInterval(_this.playtimer);
        _this.playtimer = setInterval(function () {
            if(_this.canstop){
                clearInterval(_this.playtimer);
            }
            else{
                _this.showvideoframe(_this.imgindex, _this.imgArr);
                if (_this.imgindex == (_this.imgArr.length)) {
                    _this.imgindex = 0;
                } else {
                    var frame = parseInt(_this.imgindex);
                    _this.ctx.clearRect(0, 0, _this.canvas2.width, _this.canvas2.height);
                    _this.ctx.drawImage(_this.source['src' + frame], 0, 0, _this.view.w, _this.view.h);
                    _this.imgindex++;
                }
            }
        }, 75);
    }
    AnimateImage.stop=function () {
        var _this = this;
        _this.canstop = true;
        _this.imgindex = _this.imgArr.length;
        _this.ctx.clearRect(0, 0, _this.canvas2.width, _this.canvas2.height);
        _this.ctx.drawImage(_this.source['src' + parseInt(_this.imgindex-1)], 0, 0, _this.view.w, _this.view.h);
    }

    return AnimateImage;
}
