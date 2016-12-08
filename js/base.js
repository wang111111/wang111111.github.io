//网页头部
$('.common').load("common.html",function(){
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
	
});
//轮播图插件开始
function Banner(banner){
		this.banner = banner,
		this.imgWrapper = banner.find('.img-wrapper'),
		this.imgs = banner.find('.img-wrapper img'),
		this.circleWrapper = banner.find('.circles .circle-wrapper'),
		this.arrowL = banner.find('.arrow-left'),
		this.arrowR = banner.find('.arrow-right'),
		this.now = 0,
		this.next = 0,
		this.timer = null,
		this.interval = 1500
	};
	
Banner.prototype = {
	constructor : Banner,
	init:function(){
		this.imgs.eq(0).show();
		this.circle();
		this.autoPlay();
		this.mouse();
		this.click();
	},
	circle:function(){
		var content = '';
		for(var i=0;i<this.imgs.length;i++){
			content += '<span class="circle-item"></span>';
		}
		this.circleWrapper.html(content);
		this.banner.find('.circle-item').eq(0).addClass('active');
		//var circleItem = this.banner.find('.circle-item');
	},
	autoPlay:function(){
		var that = this;
		this.timer = setInterval(function(){
			that.next++;
			that.imgSwitch();
		},that.interval)
	},
	imgSwitch:function(){
		//this.next ++;
		this.next %= this.imgs.length;
		this.imgs.eq(this.now).fadeOut();
		this.imgs.eq(this.next).fadeIn();
		this.banner.find('.circle-item').eq(this.next).addClass('active').siblings().removeClass('active');
		this.now = this.next;
	},
	click:function(){
		var that = this;
		this.arrowL.click(function(){
			that.next--;
			that.imgSwitch();
		});
		this.arrowR.click(function(){
			that.next++;
			that.imgSwitch();
		});
		this.circleWrapper.on('click','.circle-item',function(){
			that.next = $(this).index();
			$(this).addClass('active').siblings().removeClass('active');
			that.imgSwitch();
		})
	},
	mouse:function(){
		var that = this;
		this.banner.mouseenter(function(){
			that.arrowL.show();
			that.arrowR.show();
			clearInterval(that.timer);
		});
		this.banner.mouseleave(function(){
			that.arrowL.hide();
			that.arrowR.hide();
			that.autoPlay();
		})
	}
}
//轮播图插件结束
//回到顶部
function toTop(){
	$(window).scroll(function(){
		var t = $(this).scrollTop();
		if(t>300){
			$('.toTop').fadeIn("300");
		}else{
			$('.toTop').fadeOut("300");
		}
	});
	$('.toTop').click(function(){
		$('html,body').animate({scrollTop:0},300);
	})
}
toTop();
//回到顶部结束
//侧边栏
function sidebar(){
	$('.sidebar-img1').click(function(){
		$(this).stop(true).animate({
			right:'-42px'
		},function(){
			$('.sidebar-img2').stop(true).animate({
				right:'0'
			},300)
		});
	});
	$('.sidebar-img2').click(function(){
		$(this).stop(true).animate({
			right:'-209px'
		},300,function(){
			$('.sidebar-img1').stop(true).animate({
				right:'0'
			})
		});
	});
}
sidebar();
//侧边栏介绍




