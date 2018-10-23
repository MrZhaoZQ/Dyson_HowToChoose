var isIphone = /iphone/gi.test(ua);
var isX = isIphoneX();
var h = $(window).height();
if(isX){
	$(".btn").css({"bottom":"85px"});
	$(".btns").css({"bottom":"85px"});
	$(".nextTxt").css({"bottom":"245px"});
	$(".nextPage").css({"animation":"moveDownX 2s linear infinite","-webkit-animation":"moveDownX 2s linear infinite"});
}
$("#loadImg").width("640px").height(h+"px");
var introImgs=[],showProImgs=[];
var testInd = 0, swiperInd = 0;
var Q1 = 0, Q2 = [0,0,0,0], Q3 = [0,0,0,0], Q4 = 0;
var proSrc = "", layerSrc = "", mt = "", mp = "";	//mt:merits_text; mp:merits_picture
var txt = {
	"1v78":["手持模式可除螨", "节约空间，随取随吸", "深入缝隙窄缝", "声学降噪设计"],
	"1v10":["深层高效除螨", "无绳设计，可单手操作", "深入缝隙窄缝", "声学降噪设计"],
	"2v78":["气旋分离灰尘", "手持模式可除螨", "深入缝隙窄缝", "声学降噪设计"],
	"2v10":["气旋分离灰尘", "深层高效除螨", "深入缝隙窄缝", "声学降噪设计"],
	"3v78":["手持模式可除螨", "有助吸附99.97%<br/>小至0.3微米的微尘", "哮喘和过敏人群友好", "上提一步清空尘筒"],
	"3v10":["深层高效除螨", "有助吸附99.97%<br/>小至0.3微米的微尘", "哮喘和过敏人群友好", "一键下推清空尘筒"],
	"4v78":["手持模式可除螨", "节约空间，随取随吸", "深入缝隙窄缝", "亦可清洁车厢"],
	"4v10":["深层高效除螨", "无绳设计，<br/>可单手操作", "深入缝隙窄缝", "亦可清洁车厢"],
	"5v78":["轻柔清洁桌面及摆饰", "轻巧平衡设计", "深入缝隙窄缝", "上提一步清空尘筒"],
	"5v10":["轻柔清洁易损表面", "轻巧平衡设计", "深入缝隙窄缝", "一键下推清空尘筒"],
	"vm":["深层高效除螨", "床褥专用配件组合", "整机过滤系统，<br/>排出洁净空气", "上提一步清空尘筒，<br/>不脏手"],
	"vt":["车载专用配件组合", "深入缝隙窄缝", "延长软管可扩展<br/>清洁范围", "配车载充电器"]
};
var quest1 = {	//question1的每个选项的帧动画长度
	"11": 8, "12": 7, "13": 10, "14": 5, "15": 8
};
var quest3 = {
	"311": 7, "312": 6, "313": 12, "314": 8,
	"321": 7, "322": 6, "323": 12, "324": 8,
	"331": 7, "332": 6, "333": 12, "334": 11,
	"341": 7, "342": 6, "343": 6, "344": 12,
	"351": 7, "352": 6, "353": 12, "354": 10
};

$(window).resize(windowInit);

var links = {
	"wxmoment": [
		"",
		"",
		"",
		"",
		"",
		"",
		""
	],
	"yoyi_zhihuishu": [
		"",
		"",
		"",
		"",
		"",
		"",
		""
	]
};

function isIphoneX(){	//判断是否是iPhone X
	var dw = document.documentElement.clientWidth;
	var dh = document.documentElement.clientHeight;
	console.log(dw,dh);
	if(isIphone && dw==640 && dh>1138){
		return true;
	}else{
		return false;
	}
}
function onLoaded() {
    var arr=[
    	"imgs/quest/unselect.png","imgs/quest/select.png","imgs/quest/single.png","imgs/quest/multi.png", 
    	"imgs/quest/white1.png","imgs/quest/black1.png","imgs/quest/white2.png","imgs/quest/black2.png",
    	"imgs/result/1v7.png","imgs/result/1v8.png","imgs/result/1v10.png","imgs/result/1vm.png","imgs/result/1vm2.png","imgs/result/1vx2.png",
    	"imgs/result/2v7.png","imgs/result/2v8.png","imgs/result/2v10.png","imgs/result/2vm.png","imgs/result/2vm2.png","imgs/result/2vx2.png",
    	"imgs/result/3v7.png","imgs/result/3v8.png","imgs/result/3v10.png","imgs/result/3vm.png","imgs/result/3vm2.png","imgs/result/3vx2.png",
    	"imgs/result/4v7.png","imgs/result/4v8.png","imgs/result/4v10.png","imgs/result/4vt.png","imgs/result/4vt2.png","imgs/result/4vx2.png",
    	"imgs/result/5v7.png","imgs/result/5v8.png","imgs/result/5v10.png","imgs/result/5vm.png",
    	"imgs/prod/v7.png","imgs/prod/v8.png","imgs/prod/v8ab.png","imgs/prod/v10.png","imgs/prod/v10ab.png","imgs/prod/vm.png","imgs/prod/vt.png",
    	"imgs/prod/v7x.png","imgs/prod/v8x.png","imgs/prod/v8abx.png","imgs/prod/v10x.png","imgs/prod/v10abx.png","imgs/prod/vmx.png","imgs/prod/vtx.png",
    ];
    for(var i=1;i<16;i++){
        introImgs.push("imgs/video/intro/"+i+".jpg");
        arr.push("imgs/video/intro/"+i+".jpg");
    }
    for(var m in quest1){
    	for (var n=1; n<=quest1[m]; n++) {
    		arr.push("imgs/video/"+m+"/"+n+".jpg")
    	}
    }
    for(var p in quest3){
    	for (var q=1; q<=quest3[p]; q++) {
    		arr.push("imgs/video/"+p+"/"+q+".jpg")
    	}
    }
    lazyNode = $('.lazy-bk');
    preload(lazyNode, function () {
        windowInit();     
        introAnima=new AnimateUtil();
        introAnima.init({
            canvas:"#intro",
            view:{w:640,h:h},
            imgsrc:introImgs,
            maxload:15,
            fundonephoto:function(){
                setTimeout(function(){
                    loadingPageHide();
                    introAnima.movieInit();
                },200);
            },
            showvideoframe:function(index,array){
            	//console.log(index);
            	//console.log(this);
                if(index==14) {
					introAnima.stop();
					$(".intro_anima").fadeOut("normal",function(){
						$(this).siblings(".pro_display").fadeIn("fast",function(){
							stm_clicki('send', 'pageview', {'page': '入口页', 'title': 'Entrance'});
							$(this).find(".proImg").animate({left:"56px"},1000,function(){
								$(this).siblings(".subtitle").fadeIn("normal").siblings("#testBtn").fadeIn("normal");
							});
						});
					});
                }
            }
        });
    }, '', arr, false);
    
    $("#skip").on("click", function(){
    	stm_clicki('send', 'event', '跳过动画', '点击', '按钮');
    	var skipBtn = $(this);
        skipBtn.parents(".intro_anima").fadeOut("fast").siblings(".pro_display").fadeIn("fast").find(".proImg").animate({left:"56px"},500,function(){
			$(this).siblings(".subtitle").fadeIn("normal").siblings("#testBtn").fadeIn("normal");
		});
		stm_clicki('send', 'pageview', {'page': '入口页', 'title': 'Entrance'});
    });
    
    //开始测试
    $("#testBtn").on("click", function(){
    	stm_clicki('send', 'event', '开始挑选', '点击', '按钮');
    	var testBtn = $(this);
        testBtn.parents(".pro_display").fadeOut("normal", function(){
        	$(this).siblings(".test").fadeIn("normal");
        	stm_clicki('send', 'pageview', {'page': '问卷页', 'title': 'Questionnaire'});
        	//复原product display page
        	testBtn.fadeOut().siblings(".subtitle").fadeOut().siblings(".proImg").css({"left":"100%"});
        })
    });
    
    //选择测试问题的选项 quest1/quest3
    $(".playlist").find("li").on("click", function(){
    	var ind = $(this).index() + 1, _img = $(this).find("img.imgs"), _this = $(this);
    	play(ind, _img, _this);
    	console.log("Q1:"+Q1,"Q3:"+Q3);
    });
    function play(ind, _img, _this){
    	var x = 1, y = "1"+ind, z = "3"+Q1+ind;
    	console.log(z);
    	if(testInd==0){
    		_this.parent(".playlist").find("img.tag").attr("src","imgs/quest/unselect.png").eq(ind-1).attr("src","imgs/quest/select.png");
	    	var timer = setInterval(function(){		//当hint是污水时
				if(x>=quest1[y]){
					clearInterval(timer);
					x = quest1[y];
				}else{
					x++;
				}
				_img.attr("src","imgs/video/"+y+"/"+x+".jpg");
			},200);
			if(Q1!=ind){
				Q1 = ind;
				Q2 = [0,0,0,0];
				Q3 = [0,0,0,0];
			}
    	}else{
    		if(_this.attr("data-is")==1){
	    		_this.attr("data-is","0").children(".tag").attr("src","imgs/quest/unselect.png");
	    		ind>3?Q3[3]=0:Q3[ind-1]=0;
	    	}else{
	    		_this.attr("data-is","1").children(".tag").attr("src","imgs/quest/select.png");
	    		ind>3?Q3[3]=1:Q3[ind-1]=1;
	    		var timer = setInterval(function(){		//当hint是污水时
					if(x>=quest3[z]){
						clearInterval(timer);
						x = quest3[z];
					}else{
						x++;
					}
					_img.attr("src","imgs/video/"+z+"/"+x+".jpg");
				},200);
	    	}	    	
    	}	
    }
    $(".two").find("li").on("click", function(){
    	var ind = $(this).index(), is = $(this).attr("data-is"), _this = $(this);
    	if(is==1){
    		_this.attr("data-is","0").children(".tag").attr("src","imgs/quest/unselect.png");
    		Q2[ind] = 0;
    	}else{
    		_this.attr("data-is","1").children(".tag").attr("src","imgs/quest/select.png");
    		Q2[ind] = 1;
    		_this.parents(".two").find(".imgs").eq(ind).css({"transform":"scale(1.3,1.3)","-webkit-transform":"scale(1.3,1.3)"});
	    	setTimeout(function(){
	    		_this.parents(".two").find(".imgs").eq(ind).css({"transform":"scale(1,1)","-webkit-transform":"scale(1,1)"});
	    	},500);
    	}
    	console.log(Q2);
    });
    $(".four").find("li").on("click", function(){
    	var ind = $(this).index(),_this = $(this);
    	_this.parents(".four").find(".tag").attr("src","imgs/quest/unselect.png").eq(ind).attr("src","imgs/quest/select.png");
    	_this.parents(".four").find(".imgs").eq(ind).css({"transform":"scale(1.3,1.3)","-webkit-transform":"scale(1.3,1.3)"});
    	setTimeout(function(){
    		_this.parents(".four").find(".imgs").eq(ind).css({"transform":"scale(1,1)","-webkit-transform":"scale(1,1)"});
    	},500);
    	Q4 = ind + 1;
    	console.log("Q4:"+Q4);
    	stm_clicki('send', 'event', 'Q4选择', Q4, '测试问题');
    	//展示推荐产品页
		_this.parents(".test").fadeOut().siblings(".load_tips").fadeIn();
		
		matchPro(Q1,Q4,Q3,Q2);//根据Q1、Q4、Q3、Q2推荐产品并展示内容
		//console.log(proSrc);
		parseInt(proSrc[1])>0?showByChoose(proSrc,11):showByChoose(proSrc,1);
		return false;
    });
    
    $(".next").on("click", function(){
    	if(testInd==0 && Q1==0){
    		return false;
    	}else if(testInd==1 && Q2.indexOf(1)<0){
    		return false;
    	}else if(testInd==2 && Q3.indexOf(1)<0){
    		return false;
    	}else if(testInd==3 && Q4==0){
    		return false;
    	}
    	if(testInd==0){
    		stm_clicki('send', 'event', 'Q1选择', Q1, '测试问题');
    	}else if(testInd==1){
    		stm_clicki('send', 'event', 'Q2选择', Q1+getABCD(Q2), '测试问题');
    	}else if(testInd==2){
    		stm_clicki('send', 'event', 'Q3选择', getABCD(Q3), '测试问题');
    	}
    	testInd++;
    	$(this).parents(".testItem").fadeOut("normal", function(){
    		if(testInd==1 || testInd==2){
    			$(".testItem").eq(testInd).find(".item").hide().eq(Q1-1).show();
    		}
    		$(".testItem").eq(testInd).fadeIn().siblings("#num").width((testInd+1)*25+"%");
    	});
    });
    function getABCD(arrQ){
    	var c = "";
    	if(arrQ[0]==1){
    		c += "A"
    	}
    	if(arrQ[1]==1){
    		c += "B"
    	}
    	if(arrQ[2]==1){
    		c += "C"
    	}
    	if(arrQ[3]==1){
    		c += "D"
    	}
    	return c;
    }
    $(".prev").on("click", function(){
    	testInd--;
    	$(this).parents(".testItem").fadeOut("normal", function(){
    		$(".testItem").eq(testInd).fadeIn().siblings("#num").width((testInd+1)*25+"%");
    	});
    });
    
    var resSwiper = new Swiper ('.swiper-container', {
		direction: 'vertical',  //默认方向：水平
		loop: false,
		speed: 1000,
		//pagination: '.swiper-pagination',    // 如果需要分页器
		//autoplay: 2000,
		autoplayDisableOnInteraction: false,
		observer:true, //修改swiper自己或子元素时，自动初始化swiper
		observeParents:true, //修改swiper的父元素时，自动初始化swiper
		onTransitionEnd:function(resSwiper){
        	swiperInd = resSwiper.activeIndex;
        	if(swiperInd==1){
        		stm_clicki('send', 'event', '了解更多', '下滑', '按钮');
        	}
        }
	});
	
    //点击take
    $("#take").on("click", function(){
    	if(swiperInd==0){
    		stm_clicki('send', 'event', '立即入手', '点击', '子页面1按钮');
    	}else{
    		stm_clicki('send', 'event', '立即入手', '点击', '子页面2按钮');
    	}
    	
    	var proType = proSrc,
    	source = "";
    	_link = "";
    	if(/wxmoment/i.test(cloc)){
    		source = "wxmoment";
    	}else if(/yoyi_zhihuishu/i.test(cloc)){
    		source = "yoyi_zhihuishu";
    	}else{
    		source = "wxmoment";
    	}
		getlink(source,proType);
    	console.log(proType,source);
    	console.log(_link);
    	window.open(_link);
    });
    //点击重新挑选
    $("#reTest").on("click", function(){
    	if(swiperInd==0){
    		stm_clicki('send', 'event', '再玩一次', '点击', '子页面1按钮');
    	}else{
    		stm_clicki('send', 'event', '再玩一次', '点击', '子页面2按钮');
    	}
    	
    	$(this).parents(".pro_recom").fadeOut("normal", function(){
    		$(this).siblings(".pro_display").fadeIn("normal",function(){
    			stm_clicki('send', 'pageview', {'page': '入口页', 'title': 'Entrance'});
				$(this).find(".proImg").animate({left:"56px"},1000,function(){
					$(this).siblings(".subtitle").fadeIn("normal").siblings("#testBtn").fadeIn("normal");
				});
    			resSwiper.slideTo(0);
			});
    	});
    	//所有选择数据归零
    	showProImgs = [];
    	testInd = 0;
    	Q1 = 0;
    	Q2 = [0,0,0,0];
    	Q3 = [0,0,0,0];
    	Q4 = 0;
    	$(".resultImg").fadeOut().siblings("#info").fadeOut().siblings(".nextTxt").fadeOut().siblings(".nextPage").fadeOut();	//复原product recommend page
    	
    	clearSelected();
    	h = $(window).height();
    });
    
    $("#info").on("click", function(){
    	stm_clicki('send', 'event', '查看附加说明', '点击', '按钮');
    	$(".more").show();
    });
    $("#close").on("click", function(){
    	$(".more").hide();
    });
     $(".nextPage").on("click", function(){
    	resSwiper.slideTo(1,1000);
    	swiperInd = 1;
    });
}
onLoaded();

function clearSelected(){	//复原test page
	$(".tag").attr("src","imgs/quest/unselect.png");
	$(".answerlist").find("li").attr("data-is","0");
	$(".testItem").hide().eq(0).show().siblings("#num").width("25%");
}
function matchPro(Q1,Q4,Q3,Q2){
	if(Q1==1){
		if(Q3[0]==0 && Q3[1]==0 && Q3[2]==1 && Q3[3]==0){
			proSrc = "vm";
			Q2[3]==1?layerSrc="1vm2":layerSrc="1vm";
			mt = "vm";
		}else if(Q4==1 && Q3[1]==0){
			proSrc = "v7";
			Q2[3]==1?layerSrc="1vx2":layerSrc="1v7";
			mt = "1v78";
		}else if(Q4==1 && Q3[1]==1){
			proSrc = "v8ab";
			Q2[3]==1?layerSrc="1vx2":layerSrc="1v8";
			mt = "1v78";
		}else if(Q4==2 && Q3[1]==0){
			proSrc = "v8";
			Q2[3]==1?layerSrc="1vx2":layerSrc="1v8";
			mt = "1v78";
		}else if(Q4==2 && Q3[1]==1){
			proSrc = "v8ab";
			Q2[3]==1?layerSrc="1vx2":layerSrc="1v8";
			mt = "1v78";
		}else if(Q4==3 && Q3[1]==0){
			proSrc = "v10";
			Q2[3]==1?layerSrc="1vx2":layerSrc="1v10";
			mt = "1v10";
		}else if(Q4==3 && Q3[1]==1){
			proSrc = "v10ab";
			Q2[3]==1?layerSrc="1vx2":layerSrc="1v10";
			mt = "1v10";
		}
		proSrc=="vm"?mp="vm":mp="1"+proSrc;
	}else if(Q1==2){
		if(Q3[0]==0 && Q3[1]==0 && (Q3[2]==1 || Q3[3]==1)){
			proSrc = "vm";
			Q2[3]==1?layerSrc="2vm2":layerSrc="2vm";
			mt = "vm";
		}else if(Q4==1 && Q3[1]==0){
			proSrc = "v7";
			Q2[3]==1?layerSrc="2vx2":layerSrc="2v7";
			mt = "2v78";
		}else if(Q4==1 && Q3[1]==1){
			proSrc = "v8ab";
			Q2[3]==1?layerSrc="2vx2":layerSrc="2v8";
			mt = "2v78";
		}else if(Q4==2 && Q3[1]==0){
			proSrc = "v8";
			Q2[3]==1?layerSrc="2vx2":layerSrc="2v8";
			mt = "2v78";
		}else if(Q4==2 && Q3[1]==1){
			proSrc = "v8ab";
			Q2[3]==1?layerSrc="2vx2":layerSrc="2v8";
			mt = "2v78";
		}else if(Q4==3 && Q3[1]==0){
			proSrc = "v10";
			Q2[3]==1?layerSrc="2vx2":layerSrc="2v10";
			mt = "2v10";
		}else if(Q4==3 && Q3[1]==1){
			proSrc = "v10ab";
			Q2[3]==1?layerSrc="2vx2":layerSrc="2v10";
			mt = "2v10";
		}
		proSrc=="vm"?mp="vm":mp="2"+proSrc;
	}else if(Q1==3){
		if(Q3[0]==0 && Q3[1]==0 && Q3[2]==1 && Q3[3]==0){
			proSrc = "vm";
			Q2[3]==1?layerSrc="3vm2":layerSrc="3vm";
			mt = "vm";
		}else if(Q4==1 && Q3[1]==0){
			proSrc = "v7";
			Q2[3]==1?layerSrc="3vx2":layerSrc="3v7";
			mt = "3v78";
		}else if(Q4==1 && Q3[1]==1){
			proSrc = "v8ab";
			Q2[3]==1?layerSrc="3vx2":layerSrc="3v8";
			mt = "3v78";
		}else if(Q4==2 && Q3[1]==0){
			proSrc = "v8";
			Q2[3]==1?layerSrc="3vx2":layerSrc="3v8";
			mt = "3v78";
		}else if(Q4==2 && Q3[1]==1){
			proSrc = "v8ab";
			Q2[3]==1?layerSrc="3vx2":layerSrc="3v8";
			mt = "3v78";
		}else if(Q4==3 && Q3[1]==0){
			proSrc = "v10";
			Q2[3]==1?layerSrc="3vx2":layerSrc="3v10";
			mt = "3v10";
		}else if(Q4==3 && Q3[1]==1){
			proSrc = "v10ab";
			Q2[3]==1?layerSrc="3vx2":layerSrc="3v10";
			mt = "3v10";
		}
		proSrc=="vm"?mp="vm":mp="3"+proSrc;
	}else if(Q1==4){
		if(Q3[0]==0 && Q3[1]==0 && (Q3[2]==1 || Q3[3]==1)){
			proSrc = "vt";
			Q2[3]==1?layerSrc="4vt2":layerSrc="4vt";
			mt = "vt";
		}else if(Q4==1 && Q3[1]==0){
			proSrc = "v7";
			Q2[3]==1?layerSrc="4vx2":layerSrc="4v7";
			mt = "4v78";
		}else if(Q4==1 && Q3[1]==1){
			proSrc = "v8ab";
			Q2[3]==1?layerSrc="4vx2":layerSrc="4v8";
			mt = "4v78";
		}else if(Q4==2 && Q3[1]==0){
			proSrc = "v8";
			Q2[3]==1?layerSrc="4vx2":layerSrc="4v8";
			mt = "4v78";
		}else if(Q4==2 && Q3[1]==1){
			proSrc = "v8ab";
			Q2[3]==1?layerSrc="4vx2":layerSrc="4v8";
			mt = "4v78";
		}else if(Q4==3 && Q3[1]==0){
			proSrc = "v10";
			Q2[3]==1?layerSrc="4vx2":layerSrc="4v10";
			mt = "4v10";
		}else if(Q4==3 && Q3[1]==1){
			proSrc = "v10ab";
			Q2[3]==1?layerSrc="4vx2":layerSrc="4v10";
			mt = "4v10";
		}
		proSrc=="vt"?mp="vt":mp="4"+proSrc;
	}else if(Q1==5){
		if(Q3[0]==0 && Q3[1]==0 && (Q3[2]==1 || Q3[3]==1)){
			proSrc = "vm";
			layerSrc="5vm";
			mt = "vm";
		}else if(Q4==1 && Q3[1]==0){
			proSrc = "v7";
			layerSrc="5v7";
			mt = "5v78";
		}else if(Q4==1 && Q3[1]==1){
			proSrc = "v8ab";
			layerSrc="5v8";
			mt = "5v78";
		}else if(Q4==2 && Q3[1]==0){
			proSrc = "v8";
			layerSrc="5v8";
			mt = "5v78";
		}else if(Q4==2 && Q3[1]==1){
			proSrc = "v8ab";
			layerSrc="5v8";
			mt = "5v78";
		}else if(Q4==3 && Q3[1]==0){
			proSrc = "v10";
			layerSrc="5v10";
			mt = "5v10";
		}else if(Q4==3 && Q3[1]==1){
			proSrc = "v10ab";
			layerSrc="5v10";
			mt = "5v10";
		}
		proSrc=="vm"?mp="vm":mp="5"+proSrc;
	}
}
function showByChoose(reconType,max){
	for(var i=1;i<=max;i++){
        showProImgs.push("imgs/video/"+reconType+"/"+i+".jpg");
    }
	for(var i=1;i<=txt[mt].length;i++){
        showProImgs.push("imgs/merits/"+mp+"/"+i+".jpg");
        $(".text").eq(i-1).html(txt[mt][i-1]);
        $(".pic").eq(i-1).attr("src","imgs/merits/"+mp+"/"+i+".jpg");
    }
	showProImgs.push("imgs/banner/"+proSrc+".jpg");
	$(".banner").attr("src","imgs/banner/"+proSrc+".jpg");
	preload($('.lazy-bk'),function(){
		showProAnima=new AnimateUtil();
		//isX?h=1040:h;
	    showProAnima.init({
	        canvas:"#showPro",
	        view:{w:640,h:1040},
	        imgsrc:showProImgs,
	        maxload:max,
	        fundonephoto:function(){
	            setTimeout(function(){
	                $(".load_tips").fadeOut("normal", function(){
	                	stm_clicki('send', 'pageview', {'page': '产品推荐页', 'title': 'Recommended'});
		    			$(this).siblings(".test").fadeOut().siblings(".pro_recom").fadeIn("normal", function(){
		    				showProAnima.movieInit();
		    			});
		    		});
	            },200);
	        },
	        showvideoframe:function(index,showProImgs){
	        	//console.log(index);
	            if(index==max-1) {
					showProAnima.stop();
					
					if(proSrc=="v10ab"){
						$(".resultImg").css({"margin-top":"18px"});
					}
					if(isX){
						$("#product").attr("src","imgs/prod/"+proSrc+"x.png").fadeIn().siblings("#layer").attr("src","imgs/result/"+layerSrc+".png").fadeIn().siblings("#info").fadeIn();
					}else{
						$("#product").attr("src","imgs/prod/"+proSrc+".png").fadeIn().siblings("#layer").attr("src","imgs/result/"+layerSrc+".png").fadeIn().siblings("#info").fadeIn();
					}
					
					$(".nextTxt").fadeIn().siblings(".nextPage").fadeIn();

	            	setWeShare(proSrc);
	            }
	        }
	    });
	},"",showProImgs,false,"",1);
		
}
function setWeShare(t){
	var _name = "";
	if(t=="v7"){
		_name = "V7 fluffy";
	}else if(t=="v8"){
		_name = "V8 fluffy";
	}else if(t=="v8ab"){
		_name = "V8 absolute";
	}else if(t=="v10"){
		_name = "V10 fluffy";
	}else if(t=="v10ab"){
		_name = "V10 absolute";
	}else if(t=="vm"){
		_name = "V7 mattress";
	}else if(t=="vt"){
		_name = "V7 trigger+";
	}	            	
	setwxshare("挑选我的戴森吸尘器！","刚选中了最适合我家的"+_name+"，一招解决清洁烦恼！仅需4步，你也来试试吧！");
}
function getlink(source,type){
	if(type=="v7"){
    	_link = links[source][0];		
	}else if(type=="v8"){
		_link = links[source][1];
	}else if(type=="v8ab"){
		_link = links[source][2];
	}else if(type=="v10"){
		_link = links[source][3];
	}else if(type=="v10ab"){
		_link = links[source][4];
	}else if(type=="vm"){
		_link = links[source][5];
	}else if(type=="vt"){
		_link = links[source][6];
	}
}
