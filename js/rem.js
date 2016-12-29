//使命： 针对不同设备改变font-size值的大小，以达到通过rem自适应布局的目的
(function(t){
	var doc = t.documentElement; //获取根元素的dom节点;

	var curDeviceWidth = doc.clientWidth || window.innerWidth; //拿到当前设备的宽度

	//动态的改变根元素字体大小：

	doc.style.fontSize = curDeviceWidth * (22/414) + 'px';
})(document);