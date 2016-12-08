var ul = $('.nav-banner ul:last');
var imgs = $('.nav-banner2 .img-wrapper li');
var imgWrapper = $('.nav-banner2 .img-wrapper');
var banner = $('.nav-banner2');
var arrowL = $('.nav-banner2 .arrow-left');
var arrowR = $('.nav-banner2 .arrow-right');

var index = 0;
var timer;

init();
autoPlay();

function init() { //根据图片的数量动态生成小圆圈的数量
	var content = '';
	for(var i = 0; i < imgs.length; i++) {
		content += '<li class="circle-item">' + (i + 1) + '</li>';
	}
	ul.html(content);
	//addClass(ul.children[0],'active'); //默认让第一高亮显示
}
var circleItems = $('.circle-item');
//addClass(circleItems[0], 'active'); 
circleItems.eq(0).addClass('active');//默认让第一高亮显示

for(var i = 0; i < circleItems.length; i++) {
	circleItems[i].index = i;
	circleItems[i].onclick = function() {
		index = this.index; //点击小圆圈的时候只需把当前索引传递给共同的索引（index），
		imgSwitch(); //然后调用图片切换函数即可
	}
}

imgWrapper.append(imgs[0].cloneNode(true));
imgs = $('.nav-banner2 .img-wrapper li'); //把第一张图片复制一份放到图片容器的最后面，然后重新获取一下图片对象

function autoPlay() { //自动播放，就是把图片切换放到一个定时器里，改变索引即可
	timer = setInterval(function() {
		index++;
		imgSwitch();
	}, 1500); //图片是500毫秒运动一次， 自动播放就是一秒运动一次

}

arrowL.onclick = function() { //只需改变索引值，调用图片切换函数即可
	index--;
	imgSwitch();
}
arrowR.onclick = function() {
	index++;
	imgSwitch();
}

function imgSwitch() { //在图片切换里控制索引的范围，和小圆圈的高亮
	var widthL = parseInt(imgs.eq(0).css('width'));

	if(index >= imgs.length) {
		imgWrapper.css({
			left:0
		})
//		imgWrapper.style.marginLeft = 0;
		index = 1;
	}
	if(index <= -1) { //当图片往左走到第一张之后还往左走的时候将图片瞬间拉到最后一张把索引改为倒数第二张的索引
		imgWrapper.style.marginLeft = -widthL * (imgs.length - 1) + 'px';
		index = imgs.length - 2; //因为上面已经对索引减减了，所以此时的索引应该是倒数第二张的索引，视觉效果上的最后一张
	}
	index %= imgs.length; //防止索引越界
	for(var k = 0; k < circleItems.length; k++) {
		circleItems[k].className = 'circle-item';
	}
	if(index == imgs.length - 1) {//当图片显示最后一张的时候，视觉效果是第一张，所以此时小圆圈第一高亮
		circleItems.eq(0).addClass('active').siblings().removeClass('active');
	}
	
	imgWrapper.animate({
		left:-widthL * index
	},500);
	/*animate(imgWrapper, {
		marginLeft: -widthL * index
	}, 500);*/
}
banner.onmouseenter = function() {
	clearInterval(timer);
}
banner.onmouseleave = function() {
	autoPlay();
}