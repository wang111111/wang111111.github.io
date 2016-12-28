 var mySwiper = new Swiper ('#theMedia', {
    direction: 'vertical',
    loop: true,
     onInit: function(swiper){ //Swiper2.x的初始化是onFirstInit
	    swiperAnimateCache(swiper); //隐藏动画元素 
	    swiperAnimate(swiper); //初始化完成开始动画
	  }, 
	  onSlideChangeEnd: function(swiper){ 
	    swiperAnimate(swiper); //每个slide切换结束时也运行当前slide动画
	  } 
  })
 //music
 var music = {
 	btn:$('.music-logo'),
 	au:$('#audio'),
 	init:function(){
 		this.play();
 	},
 	play:function(){
 		var that = this;
 		this.btn.click(function(){
 			
	 	})
 	}
 }
music.init();
//page2 ball
var ball = {
	camera : $('#page2-ball'),
	ul : $('#page2-ball').find('.space'),
	init:function(){
		var content = '';
		for(var i=1;i<=9;i++){
			content += '<li class="box">'
					+		'<img src="img2/'+i+'.jpg" />'
					+	'</li>';
		}
		this.ul.html(content);
	}
}
ball.init();
