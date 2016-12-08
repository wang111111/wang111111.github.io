/*$('.common').load("common.html",function(){
	//$.getScript('js/getDom.js',function(){
		//控制左边二级菜单显示隐藏
		var cataGroup = $(".cata-group");
		cataGroup.each(function(k, v) {
			$(v).hover(function() {
				$(".cata-group-sub").eq(k).show();
			}, function() {
				$(".cata-group-sub").eq(k).hide();
			});
		});
	//})
	
});*/
var navBanner1 = $('.nav-banner .nav-banner1');
var navBanner2 = $('.nav-banner .nav-banner2');
var banner1 = new Banner(navBanner1);
var banner2 = new Banner(navBanner2);
banner1.init();
//轮播图右侧登录注册部分
$('.s-login-list li a').mouseenter(function(){
	var index = $(this).parent('li').index();
	$(this).addClass('active').parent('li').siblings().children().removeClass('active');
	//$('.s-login-content ul').eq(index).addClass('active').siblings().removeClass('active');
	$('.s-login-content ul').eq(index).stop(true).animate({
		opacity:1
	}).siblings().stop(true).animate({
		opacity:0
	});
});
//主体展示部分，中间图片显示边框阴影和说明
function mainShowShdow(){
	var ul = $('.suit-dress-content-middle ul');
	ul.on('mouseenter','li',function(){
		$(this).addClass('active').siblings().removeClass('active');
	});
	ul.mouseleave(function(){
		ul.find('li').removeClass('active');
	})
}
mainShowShdow();
//主体展示部分，左边信息模态
function mainShowModel(){
	var ul = $('.sd-c-l-txt').find('ul');
	ul.hover(function(){
		$(this).css({
			"width":"200px",
			//"paddingLeft":0
		});
		$(this).children("li").addClass('active');
		$(this).parent().next(".sd-c-l-img").find("a img").eq($(this).index())
		.stop(true).fadeTo(200,0.1);
	},function(){
		$(this).children("li").removeClass('active');
		$(this).css({
			"width":"95px",
			//"paddingLeft":"10px"
		});
		$(this).parent().next(".sd-c-l-img").find("a img").eq($(this).index())
		.stop(true).fadeTo(200,1);
	});
}
mainShowModel();
//多商动态部分-左边轮播图
function DyBanner(){
	var banner = $('.dy-banner');
	var imgWrapper = $('.dy-img-wrapper');
	var lis = imgWrapper.find('li');
	var arrowL = banner.find('.dy-arrow-left');
	var arrowR = banner.find('.dy-arrow-right');
	var circleWrapper = $('.dy-circle-wrapper').find('ul');
	var circles = circleWrapper.find('li');
	
	var imgWidth = lis.eq(0).width();
	var index = 0;
	var timer = null;
	
	init();
	imgSwitch();
	autoPlay();
	
	function init(){
		var content ='';
		for(var i=0;i<lis.length;i++){
			content += '<li></li>';
		}
		circleWrapper.append(content);
	};
	var circles = circleWrapper.find('li');
	circles.eq(0).addClass('active');
	imgWrapper.append(lis.eq(0).clone(true));
	lis = imgWrapper.find('li');
	
	function imgSwitch(){
		if(index >= lis.length){
			imgWrapper.css({
				left:0
			});
			index = 1;
			imgWrapper.stop(true).animate({
				left: -index * imgWidth
			});
		}
		if(index <= -1){
			imgWrapper.css({
				left: -(lis.length -1) * imgWidth
			});
			index = lis.length -2;
			imgWrapper.stop(true).animate({
				left: -index * imgWidth
			});
		}
		index %= lis.length;
		if(index == lis.length -1){
			circles.eq(0).addClass('active').siblings().removeClass('active');
		}else{
			circles.eq(index).addClass('active').siblings().removeClass('active');
		}
		imgWrapper.stop(true).animate({
			left: -index * imgWidth
		});
	};
	
	function autoPlay(){
		timer = setInterval(function(){
			index ++;
			imgSwitch();
			
		},1000);
	};
	
	banner.mouseenter(function(){
		clearInterval(timer);
	});
	banner.mouseleave(function(){
		autoPlay();
	});
	arrowL.click(function(){
		index --;
		imgSwitch();
	})
	arrowR.click(function(){
		index ++;
		imgSwitch();
	})
}
DyBanner();
//友情链接显示隐藏
function friendfyLink(){
	var count = 0;
	var flag = true;
	$('.friendfyLink .cap a').on('click',function(){
		if(!flag){
			return;
		}
		flag = false;
		$('.friendfyLink .shop-partner').slideToggle(500,function(){
			flag = true;
		});
		count ++;
		if(count % 2 == 1){
			$(this).html("展开友情链接↑");
		}else{
			$(this).html("收起友情链接↓");
		}
	});	
}
friendfyLink();











