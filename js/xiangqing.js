
$(function(){
	//放大镜
	function fangdajing(){
		var goods = $('.goodsIndex-fl');
		var smallBox = goods.find('.smallBox');
		var smallImg = smallBox.find('img');
		var mask = smallBox.find('.mask');
		var imgList = goods.find('.smallBoxList');
		var largerBox = goods.find('.largerBox');
		var largerImg = largerBox.find('img');
		
		smallBox.mouseenter(function(){
			mask.show();
			largerBox.show();
		});
		smallBox.mouseleave(function(){
			mask.hide();
			largerBox.hide();
		});
		imgList.on('mouseenter','li',function(){
			$(this).addClass('active').siblings().removeClass('active');
			var index = $(this).index();
			smallImg.attr('src','img/xiangqing/fang00'+(index+1)+'.jpg');
			largerImg.attr('src','img/xiangqing/fang00'+(index+1)+'.jpg');
		});
		smallBox.mousemove(function(e){
			var left = e.pageX - smallBox.offset().left - mask.width()/2;
			var t = e.pageY - smallBox.offset().top - mask.height()/2;
			left = left<0?0:(left>smallBox.width()-mask.width()?smallBox.width()-mask.width():left);
			t = t<0?0:(t>smallBox.height()-mask.height()?smallBox.height()-mask.height():t);
			mask.css({
				left:left,
				top:t
			});
			largerImg.css({
				left:-2*left,
				top:-2*t
			});
		})
	};
	fangdajing();
	//免费供应商
	$('.fmid-fd .fd-ba span .item').mouseenter(function(){
		$(this).next().stop(true).slideDown();
	});
	$('.fmid-fd .fd-ba span .item').mouseleave(function(){
		$(this).next().stop(true).slideUp();
	});
	//衣服尺码切换
	$('.fmid-fe .fe-color span').click(function(){
		var index = $(this).index(".fmid-fe .fe-color span");
		var ul = $(this).parent().next().find('.fe-size-content').children();
		console.log(index,$('.fmid-fe .fe-color span'));
		$(this).addClass('active').siblings().removeClass('active');
		ul.eq(index).addClass('active').siblings().removeClass('active');
	});
	//看了有看更多商品
	$('.pro-search a img').click(function(){
		var ul = $('.ps-content ul');
		var content ='';
		$.getJSON("data/data.json",function(data){
			for(var i=0;i<4;i++){
				var index =parseInt(Math.random()*data.more.length);
				content += '<li>'
						+		'<a href="javascript:;">'
						+			'<img src="'+data.more[index].src+'" />'
						+		'</a>'
						+		'<span>'
						+			'￥<i>'+data.more[index].price+'</i>'
						+		'</span>'
						+	'</li>';
			}
			ul.html(content);
		});
	});
	//热门商品，左右移动
	function hotsbanner(){
		var index = 0;
		var width = $('.saleHot-wrapper dl').outerWidth(true);
		var maxIndex = ($('.saleHot-wrapper').width() - $('.saleHot-list').width())/width;
		var maxIndex = parseInt(maxIndex);
		$('.saleHot-list .arrow-left').click(function(){
			index --;
			imgSwitch();
		});
		$('.saleHot-list .arrow-right').click(function(){
			index ++;
			imgSwitch();
		});
		function imgSwitch(){
			if(index <= -1){
				index = 0;
			}else{
				index %= maxIndex +1;
			}
			$('.saleHot-wrapper').stop(true).animate({
				left:-index * width
			});
		};
	};
	hotsbanner();
	//商品详情和服务切换
	$(".g-details-list .gd-title .item").click(function(){
		$(this).find('a').addClass('active');
		$(this).siblings().find('a').removeClass('active');
		$(this).find('b').show();
		$(this).siblings().find('b').hide();
		if ($(this).parent().index() == 0) {
			$(this).parents('.g-details-list').find('.gd-a-attr').addClass('active');
			$(this).parents('.g-details-list').find('.gd-a-img').addClass('active');
		}else if($(this).parent().index() == 1){
			$(this).parents('.g-details-list').find('.gd-a-attr').removeClass('active');
			$(this).parents('.g-details-list').find('.gd-a-img').removeClass('active');
		}else{
			$(this).parents(".gir-details").hide();
		}
	});
});
