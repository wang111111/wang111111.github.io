/*
 	1、读取cookie   readCookie
 	2、设置cookie   setCookie
 	3、将cookie中的数据渲染到页面上   initData
 	4、数量增加
 	5、数量减少
 	6、直接输入
 	7、删除
 	8、选中
 	9、结算信息填充
*/
$(function(){
	var Cart = {
		cart:{},
		pay:{},
		data:null,
		cartCon : $('.cart-main-content'),
		init:function(){
			var that = this;
			this.readCookie();
			$.getJSON("data/shopDetails.json?key="+ Math.random(),function(data){
				that.data = data;
				for(var key in that.cart){
					(function(k){
						var ul = $('<ul class="cart-goods-item clear"></ul>');
						ul.load('goodsInfo.html?key='+Math.random(),function(){
							that.cartCon.append(ul);
							var gid = that.cart[k]["goods-id"];
							ul.attr({
								"data-gid":gid,
								"data-goodssize":k
							})
							ul.find('.goods-size').html(data[gid]['size'][k]);
							ul.find('.goods-price').html(data[gid]['goods-sale']);
							ul.find('.amount-input').val(that.cart[k].amount);
							var total = that.cart[k].amount * data[gid]['goods-sale'];
							ul.find('.goods-money').html(total.toFixed(2));
						})
					})(key);
				};
			});
			
			this.increase();
			this.decrease();
			this.amountInput();
			this.remove();
			this.goodsSelect();
			this.selectAll();
			this.delSelected();
			//console.log(this.pay);
			//this.selectAll();
		},
		increase:function(){
			var that = this;
			$('.cart-main-content').on('click','.amount-increase',function(){
				var amount = $(this).prev().val();
				var gid = $(this).parents('.cart-goods-item').data('gid');
				var goodsSize = $(this).parents('.cart-goods-item').data('goodssize');
				amount ++;
				if(amount >= 30){
					amount = 30;
				};
				$(this).prev().val(amount);
				that.handleCookie($(this).prev());
			})
		},
		decrease:function(){
			var that = this;
			$('.cart-main-content').on('click','.amount-decrease',function(){
				var amount = $(this).next().val();
				amount --;
				if(amount <= 1){
					amount = 1;
				};
				$(this).next().val(amount);
				that.handleCookie($(this).next());
			})
		},
		amountInput:function(){
			var that = this;
			this.cartCon.on('input','.amount-input',function(){
				var amount = parseInt( $(this).val().trim() );
				var gid = $(this).parents('.cart-goods-item').data('gid');
				var stock = that.data[gid].stock;
				if(amount >= stock){
					amount = stock ;
				}
				if(isNaN(amount) || amount<=1){
					amount = 1;
				}
				$(this).val(amount);
				that.handleCookie($(this));
			});
		},
		remove:function(){
			var that = this;
			this.cartCon.on('click','.delete',function(){
				var goodssize = $(this).parents('.cart-goods-item').data('goodssize');
				if(confirm("您确定删除该宝贝吗？")){
					$(this).parents('.cart-goods-item').remove();
					delete that.cart[goodssize];
					that.setCookie();
				}
			});
		},
		handleCookie:function(input){
			var goodsItem = input.parents('.cart-goods-item');
			var goodssize = goodsItem.data('goodssize');
			var goodsPrice = parseFloat( goodsItem.find('.goods-price').html() );
			var goodsAmount = parseInt( input.val() );
			var goodsMoney = goodsItem.find('.goods-money');
			goodsMoney.html( (goodsAmount * goodsPrice).toFixed(2));
			
			this.cart[goodssize].amount = parseInt( input.val() );
			this.setCookie();
		},
		goodsSelect:function(){
			var that = this;
			this.cartCon.on('change','.td-checkbox input[type="checkbox"]',function(){
				var goodsItem = $(this).parents('.cart-goods-item');
				var gid = goodsItem.data('gid');
				var goodssize = goodsItem.data('goodssize');
				var totalPrice = goodsItem.find('.goods-money').html();
				
				if(!goodsItem.find('input[type="checkbox"]').prop("checked")){
					delete that.pay[goodssize];
				}else{
					that.pay[goodssize] = parseFloat( totalPrice );
				}
				//console.log(that.pay);
				var checkBoxAll = that.cartCon.find('input[type="checkbox"]');
				var checked = that.cartCon.find('input[type="checkbox"]:checked');
				if(checkBoxAll.length == checked.length){
					$('.select-all-btn').prop('checked',true);
				}else{
					$('.select-all-btn').prop('checked',false);
				}
				
				that.handlePay();
			});
		},
		handlePay:function(){
			var goodsAmount = $('.user-goods-amount');
			var goodsMoney = $('.user-goods-money');
			var canPay = $('.go-pay');
			
			var totalNum = 0;
			var totalMoney = 0;
			for(var key in this.pay){
				totalNum ++;
				totalMoney += this.pay[key];
			};
			if(totalNum <= 0){
				canPay.removeClass('can-pay');
			}else{
				canPay.addClass('can-pay');
			};
			
			goodsAmount.html(totalNum);
			goodsMoney.html(totalMoney.toFixed(2));
		},
		selectAll:function(){
			$('.select-all-btn').click(function(){
				var status = $(this).prop('checked');
				var checkBoxAll = $('.cart-main-content input[type="checkbox"]');
				if(status){
					checkBoxAll.prop('checked',true);
				}else{
					checkBoxAll.prop('checked',false);
				};
				checkBoxAll.change();
			});
		},
		delSelected:function(){
			var that = this;
			$('.options .delete').click(function(){
				var checked = that.cartCon.find('input[type="checkbox"]:checked');
				if(checked.length == 0){
					alert('请选择商品');
					return;
				};
				if(confirm("您确定删除该商品吗？")){
					checked.each(function(){
						var goodssize = $(this).parents('.cart-goods-item').data('goodssize');
						$(this).parents('.cart-goods-item').remove();
						delete that.cart[goodssize];
						that.setCookie();
						
						delete that.pay[goodssize];
						that.handlePay();
					})
				}
			});
		},
		readCookie:function(){
			this.cart = $.cookie("tb_cart") || '{}';
			this.cart = JSON.parse(this.cart);
		},
		setCookie:function(){
			$.cookie('tb_cart',JSON.stringify(this.cart),{expires:365,path:'/'});
		}
	};
	Cart.init();
})