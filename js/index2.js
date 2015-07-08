window.onload = function() {
	var mybody = document.getElementsByTagName('body')[0];
	//默认的城市下拉列表
	var citylist = getClasses(deliveryWrapper, 'subWrapperCities')[0];
	//城市列表内的每一个城市选项
	var as = citylist.getElementsByTagName('a');
	//左上角显示点击后的城市位置的标签
	var city = document.getElementById('city');
	//获取带下拉框的标签
	var dropdowns = getClasses(tpinner, 'dropdown');
	//获取带下拉框的标签的小盖层
	var covers = getClasses(tpinner, 'cover');
	//获取默认隐藏的下拉框
	var subWrappers = getClasses(tpinner, 'subWrapper');
	//获取下拉框所在的li
	var lis = getAllClasses('li0');
	var focus = document.getElementById('focus');
	var slidePage = getClasses(focus, 'slidePage')[0];
	//获得分类列表ul
	var sortlist = focus.getElementsByTagName('ul')[0];
	//获取lifeservice下a标签
	var lsas = document.getElementById('lifeserv-ul').getElementsByTagName('a');
	//获取lifeservice下小图标所在标签i
	var lsis = document.getElementById('lifeserv-ul').getElementsByTagName('i');
	//获取sortlist下面的15个li选项
	var sllis = sortlist.getElementsByTagName('li');
	//获取包含15个隐藏框所在的div
	var sortWrapper = document.getElementById('sortWrapper');
	var subitems = getClasses(sortWrapper, 'subitem');
	var spans = slidePage.getElementsByTagName('span');
	var imgs = slidePage.getElementsByTagName('img');
	var feedback = document.getElementById('feedback');
	var icondog = document.getElementById('icon-dog');
	var imgNum = getClasses(slidePage, 'imgNum')[0];
	var indexs = imgNum.getElementsByTagName('span');
	var timer = setInterval(autoMoveImage, 5000);
	$('.today-slider')[0].scrollLeft = $('.today-slider li')[0].offsetWidth;
	var num = 0;
	var rTag = false;
	var rNum = 0;
	var dogover = null;
	var dogout = null;
	bindEvent();

	//城市列表下拉框点击事件
	citylist.onclick = function(e) {
			var e = e || window.event;
			var target = e.target || e.srcElement;
			if (target.tagName == 'A' && target.parentNode.tagName == 'DT') {
				for (var i = 0; i < as.length; i++) {
					as[i].className = '';
				};
				target.className = 'show';
				var timer = setTimeout(function() {
					citylist.style.display = 'none';
					city.innerHTML = target.innerHTML;
					covers[0].style.width = deliveryWrapper.clientWidth + 'px';
				}, 200);
			}
		}
		//为带下拉按钮的框绑定onmouseover事件
	for (var i = 0; i < lis.length; i++) {
		lis[i].onmouseover = function() {
			for (var i = 0; i < lis.length; i++) {
				if (lis[i] == this) {
					dropdowns[i].style.background = 'url(images/up_arrow.png) right center no-repeat';
					covers[i].style.width = lis[i].clientWidth + 'px';
					covers[i].style.display = 'block';
					if (i != 5) subWrappers[i].style.left = '-1px';
					else subWrappers[i].style.right = '-1px';
					subWrappers[i].style.display = 'block';
				};
			}
		};
	}
	//为带下拉按钮的框绑定onmouseout事件
	for (var i = 0; i < lis.length; i++) {
		lis[i].onmouseout = function() {
			for (var i = 0; i < lis.length; i++) {
				if (lis[i] == this) {
					dropdowns[i].style.background = 'url(images/down_arrow.png) right center no-repeat';
					covers[i].style.display = 'none';
					subWrappers[i].style.display = 'none';
				}
			};
		}
	};
	//鼠标滑过小狗事件
	icondog.onmouseover = function() {
			clearInterval(dogout);
			feedback.style.display = 'block';
			var fbopcity = getStyle(feedback, 'opacity') * 100;
			dogover = setInterval(function() {
				fbopcity += 100 / 15;
				if (icondog.offsetLeft - 1 < 46) {
					feedback.style.opacity = 1;
					icondog.style.left = '46px';
					clearInterval(dogover);
				} else {
					icondog.style.left = icondog.offsetLeft - 1 + 'px';
					feedback.style.opacity = fbopcity / 100;
					feedback.style.filter = 'alpha(opacity:' + fbopcity + ')';
				}
			}, 20);
		}
		//鼠标移出小狗事件
	icondog.onmouseout = function() {
		clearInterval(dogover);
		var fbopcity = getStyle(feedback, 'opacity') * 100;
		dogout = setInterval(function() {
			fbopcity -= 100 / 15;
			if (icondog.offsetLeft + 1 > 61) {
				feedback.style.opacity = 0;
				icondog.style.left = '61px';
				clearInterval(dogout);
				feedback.style.display = 'none';
			} else {
				icondog.style.left = icondog.offsetLeft + 1 + 'px';
				feedback.style.opacity = fbopcity / 100;
				feedback.style.filter = 'alpha(opacity:' + fbopcity + ')';
			}
		}, 20);
	}

	//滑过大图显示左右标签
	slidePage.onmouseover = function(e) {
			var e = e || window.event;
			var from = e.fromElement || e.relatedTarget;
			while (from) {
				if (from == this) {
					return false;
				}
				from = from.parentNode;
			}
			spans[0].style.display = 'block';
			spans[1].style.display = 'block';
			clearInterval(timer);
		}
		//离开大图隐藏左右标签
	slidePage.onmouseout = function(e) {
			var e = e || window.event;
			var to = e.toElement || e.relatedTarget;
			while (to) {
				if (to == this) {
					return false;
				}
				to = to.parentNode;
			}
			spans[0].style.display = 'none';
			spans[1].style.display = 'none';
			clearInterval(timer);
			timer = setInterval(autoMoveImage, 5000);
		}
		//当大图在切换过程中，清除左右箭头以及页码上对应的onmouseover, onmouseout事件
	function clearEvent() {
			removeEvent(spans[0], 'click', previousImage);
			removeEvent(spans[1], 'click', nextImage);
			for (var i = 0; i < indexs.length; i++) {
				indexs[i].index = i;
				indexs[i].onmouseover = function() {
					rTag = true;
					rNum = this.index;
				}
			}
			for (var i = 0; i < indexs.length; i++) {
				indexs[i].onmouseout = function() {
					return false;
				}
			};
		}
		//当页面加载完成或者大图在切换完成后，重新给左右箭头以及页码上绑定onmouseover,onmouseout事件
	function bindEvent() {
			addEvent(spans[0], 'click', previousImage);
			addEvent(spans[1], 'click', nextImage);
			for (var i = 0; i < indexs.length; i++) {
				indexs[i].index = i;
				indexs[i].onmouseover = function() {
					clearInterval(timer);
					if (num == this.index) {
						return false;
					}
					num = this.index;
					moveImage();
					setNumStyle();
				}
			}
			for (var i = 0; i < indexs.length; i++) {
				indexs[i].onmouseout = function() {
					clearInterval(timer);
					timer = setInterval(autoMoveImage, 5000);
				}
			};
		}
		//图片移动的执行函数
	function moveImage() {
			clearEvent();
			clearInterval(timer1);
			//将要显示的图片z-index设为1，其他不显示的设为0
			for (var p = 0; p < imgs.length; p++) {
				if (p == num) {
					imgs[p].style.zIndex = 1;
				} else {
					imgs[p].style.zIndex = 0;
				}
			};
			var i = 0;
			var timer1 = setInterval(function() {
				i += 10;
				if (i > 100) {
					clearInterval(timer1);
					imgs[num].style.opacity = 1;
					imgs[num].style.filter = 'alpha(opacity:100)';
					//将显示的图片的opacity设为1，其他的设为0；
					for (var q = 0; q < imgs.length; q++) {
						if (q == num) {
							imgs[q].style.opacity = 1;
							imgs[q].style.filter = 'alpha(opacity:100)';
						} else {
							imgs[q].style.opacity = 0;
							imgs[q].style.filter = 'alpha(opacity:0)';
						}
					};
					bindEvent();
					//快速滑动时，判断鼠标当前停留位置是不是等于num，如不等于，则显示当前停留位置对应的图片
					if (rTag == true) {
						if (rNum != num) {
							clearInterval(timer);
							num = rNum;
							moveImage();
							setNumStyle();
							rTag = false;
							timer = setInterval(autoMoveImage, 5000);
						}
					}
				} else {
					imgs[num].style.opacity = i / 100;
					imgs[num].style.filter = 'alpha(opacity:' + i + ')';
				}
			}, 30);
		}
		//图片移动式修改对应编号的样式
	function setNumStyle() {
			for (var i = 0; i < indexs.length; i++) {
				indexs[i].className = '';
			};
			indexs[num].className = 'show';
		}
		//默认的自动向右移动图片
	function autoMoveImage() {
			clearInterval(timer);
			num++;
			if (num > imgs.length - 1) {
				num = 0;
			}
			moveImage();
			setNumStyle();
			timer = setInterval(autoMoveImage, 5000);
		}
		//点击向左箭头时，使图片向左移动一张
	function previousImage() {
			clearInterval(timer);
			num--;
			if (num < 0) {
				num = imgs.length - 1;
			}
			moveImage();
			setNumStyle();
			timer = setInterval(autoMoveImage, 5000);
		}
		//点击向右箭头时，调用默认右移函数
	function nextImage() {
			autoMoveImage();
		}
		//绑定分类列表onmouseover事件
	sortlist.onmouseover = function(e) {
			var e = e || window.event;
			var target = e.target || e.srcElement;
			var from = e.fromElement || e.relatedTarget;
			if (target.tagName == 'LI' && target.parentNode.className == 'sortlist') {
				sortWrapper.style.display = 'block';
				for (var i = 0; i < sllis.length; i++) {
					if (sllis[i] == target) {
						subitems[i].style.display = 'block';
						sllis[i].style.background = '#f7f7f7';
						sllis[i].style.zIndex = '6';
						var sllisa = sllis[i].getElementsByTagName('a');
						for (var j = 0; j < sllisa.length; j++) {
							sllisa[j].style.color = '#b61d1d';
						};
						for (var z = 0; z < sllis.length; z++) {
							if (i != z) {
								subitems[z].style.display = 'none';
							}
						};
						var x = mybody.scrollTop;
						var y = getElementPosition(slidePage).top;
						if (x > y) {
							sortWrapper.style.top = x - y - 1 + 'px';
						} else {
							sortWrapper.style.top = '-1px';
						}
					} else {
						sllis[i].style.background = '#C81623';
						sllis[i].style.zIndex = '0';
						var sllisa = sllis[i].getElementsByTagName('a');
						for (var j = 0; j < sllisa.length; j++) {
							sllisa[j].style.color = '#fff';
						};
					}
				};
			}
		}
		//绑定分类列表onmouseout事件
	sortlist.onmouseout = function(e) {
			var e = e || window.event;
			var to = e.toElement || e.relatedTarget;
			while (to) {
				if (to == this) {
					return false;
				}
				to = to.parentNode;
			}
			sortWrapper.style.display = 'none';
			for (var i = 0; i < sllis.length; i++) {
				subitems[i].style.display = 'none';
			};
			for (var i = 0; i < sllis.length; i++) {
				sllis[i].style.background = '#C81623';
				sllis[i].style.zIndex = '0';
				var sllisa = sllis[i].getElementsByTagName('a');
				for (var j = 0; j < sllisa.length; j++) {
					sllisa[j].style.color = '#fff';
				};
			}
		}
		
	//页面加载完成给lifeservice下的i标签绑定背景图
	for (var i = 0; i < lsis.length; i++) {
		lsis[i].style.background = 'url(images/lifeservice.png) 0 ' + -25 * i + 'px no-repeat';
	};
	//给lifeservice下的a标签绑定onmouseover,onmouseout事件
	for (var i = 0; i < lsas.length; i++) {
		lsas[i].onmouseover = function() {
			for (var i = 0; i < lsas.length; i++) {
				if (lsas[i] == this) {
					var tmpi = lsas[i].getElementsByTagName('i')[0];
					tmpi.style.background = 'url(images/lifeservice.png) -25px ' + -25 * i + 'px no-repeat';
				}
			};
		}
		lsas[i].onmouseout = function() {
			for (var i = 0; i < lsas.length; i++) {
				if (lsas[i] == this) {
					var tmpi = lsas[i].getElementsByTagName('i')[0];
					tmpi.style.background = 'url(images/lifeservice.png) 0 ' + -25 * i + 'px no-repeat';
				}
			};
		}
	};
	//鼠标滑过显示箭头事件
	Sizzle('.today-slider-outer')[0].onmouseover = function() {
			Sizzle('#today-rec .leftArrow')[0].style.display = 'block';
			Sizzle('#today-rec .rightArrow')[0].style.display = 'block';
		}
		//鼠标移出隐藏箭头事件
	Sizzle('.today-slider-outer')[0].onmouseout = function() {
			Sizzle('#today-rec .leftArrow')[0].style.display = 'none';
			Sizzle('#today-rec .rightArrow')[0].style.display = 'none';
		}
		//单击左箭头图片向左滚动事件
	Sizzle('#today-rec .leftArrow')[0].onclick = function() {
			if (Sizzle('.today-slider')[0].scrollLeft % Sizzle('.today-slider li')[0].offsetWidth != 0) {
				return false;
			}
			var increment = 1000;
			var timer2 = setInterval(function() {
				increment -= 50;
				if (increment < 0) {
					clearInterval(timer2);
				} else {
					Sizzle('.today-slider')[0].scrollLeft -= 50;
				}
				if (Sizzle('.today-slider')[0].scrollLeft == 0) {
					Sizzle('.today-slider')[0].scrollLeft = Sizzle('.today-slider li')[0].offsetWidth * (Sizzle('.today-slider li').length - 2);
				}
			}, 20)
		}
		//单击右箭头图片向右滚动事件
	Sizzle('#today-rec .rightArrow')[0].onclick = function() {
		if (Sizzle('.today-slider')[0].scrollLeft % Sizzle('.today-slider li')[0].offsetWidth != 0) {
			return false;
		}
		var increment = 0;
		var timer3 = setInterval(function() {
			increment += 50;
			if (increment > 1000) {
				clearInterval(timer3);
			} else {
				Sizzle('.today-slider')[0].scrollLeft += 50;
			}
			if (Sizzle('.today-slider')[0].scrollLeft == Sizzle('.today-slider li')[0].offsetWidth * (Sizzle('.today-slider li').length - 1)) {
				Sizzle('.today-slider')[0].scrollLeft = Sizzle('.today-slider li')[0].offsetWidth;
			}
		}, 20)
	}
}

jQuery(document).ready(function($) {
	// 为生活服务最上面的四个li标签绑定mouseover事件
	$('.mc ul li:lt(4)').bind('mouseover', bindMouseOver);
	$('.mc ul li:lt(4)').bind('mouseout', bindMouseOut);
	var timeout1 = null;
	var timeout2 = null;
	//隐藏框未显示的mouseover事件
	function bindMouseOver() {
			var i = $(this).index();
			timeout1 = setTimeout(function() {
				$('.mc ul li:lt(4)').unbind('mouseover', bindMouseOver);
				$('.mc .mc-inner>div').eq(i).show();
				$('.mc .mc-inner').stop().animate({
						top: '29px'
					},
					'fast');
				var timeout2 = setTimeout(function() {
					$('#lifeserv-ul li>a:lt(4)').stop().animate({
							paddingTop: 0
						},
						'fast',
						function() {
							$('.mc ul li:lt(4)').eq(i).css({
								borderTop: '2px solid #c81623',
								borderBottom: 'none'
							}).children('a').css({
								marginTop: '-2px'
							});
							$('.mc ul li:lt(4)').bind('mouseover', anotherMouseOver);
						});
				}, 60);

				$('#lifeserv-ul li>a>i:lt(4)').stop().animate({
						top: '-28px'
					},
					'fast');
			}, 500)
		}
		//隐藏框未显示的mouseout清除计时器
	function bindMouseOut() {
			clearTimeout(timeout1);
		}
		//隐藏框显示后的绑定新的mouseover事件
	function anotherMouseOver() {
			var i = $(this).index();
			$('.mc .mc-inner>div').eq(i).show().siblings().hide();
			$('.mc ul li:lt(4)').css({
				borderTop: 'none',
				borderBottom: '1px solid #E8E8E7'
			}).children('a').css({
				marginTop: '0px'
			});
			$('.mc ul li:lt(4)').eq(i).css({
				borderTop: '2px solid #c81623',
				borderBottom: 'none'
			}).children('a').css({
				marginTop: '-2px'
			});
		}
		//隐藏框右上角的关闭按钮X对应的点击事件
	$('.mc-inner .close').click(function() {
		$('.mc ul li:lt(4)').unbind('mouseover', anotherMouseOver);
		$('.mc ul li:lt(4)').css({
			borderTop: 'none',
			borderBottom: '1px solid #E8E8E7'
		}).children('a').css({
			marginTop: '0px'
		});
		$('#lifeserv-ul li>a:lt(4)').stop().animate({
				paddingTop: '41px'
			},
			'fast');
		$('#lifeserv-ul li>a>i:lt(4)').stop().animate({
				top: '13px'
			},
			'fast');
		$('.mc .mc-inner').stop().animate({
				top: '208px'
			},
			'fast',
			function() {
				$('.mc ul li:lt(4)').bind('mouseover', bindMouseOver);
				$('.mc .mc-inner>div').hide();
			});
	});
	//猜你喜欢绑定的hover事件
	$('#guessyou .mc').hover(function() {
		timeout2 = setTimeout(function() {
			$('.spacer i').css('right', '1211px');
			$('.spacer i').animate({
				right: '1px'
			}, 500, 'easeOutCirc');
		}, 500);
	}, function() {
		clearTimeout(timeout2);
	});
	//绑定换一批点击事件
	$('.mt .anotherBatch').click(function() {
		$('.mc .hide').removeClass('hide').siblings('ul').addClass('hide');
	});
	//为一楼服装鞋包下的theme绑定图标
	$('#clothes .left_up .themes i').each(function(index) {
		$(this).css('background', 'url(images/1F/clothesicon.png) 0 -' + 26 * index + 'px no-repeat');
	});

	$.fn.extend({
		imgRun:function (){
			if (initialized) return false;
			var i = 1;
			var n = 0;
			var tag = true;
			var timer4 = null;
			var timeout3 = null; 
			var initialized = false;
			var $_this=$(this);
			var imgW = $_this.find('.slider_main li').width();
			$_this.find('.slider_main').css('left', -imgW);//初始位置
			//复制插入节点
			var fir=$_this.find('.slider_main li:first').clone();
			var las=$_this.find('.slider_main li:last').clone();
			$_this.find('.slider_main').append(fir);
			$_this.find('.slider_main').prepend(las);
			//调用自动滚动函数
			autoMove();
			function autoMove(){
				timer4 = setInterval(function() {
					$_this.find('.slider_next').click();
				}, 5000);
			}
			//鼠标滑过显示左右点击箭头
			$_this.find('.slider').hover(function() {
					$_this.find('.slider_page').show();
			}, function() {
					$_this.find('.slider_page').hide();
			});
			//左边箭头点击事件
			$_this.find('.slider_prev').click(function() {
				if (!tag) return false;
				tag = false;
				i--;
				if (i < 0) {
					i = $_this.find('.slider_main').find('li').length - 3;
					$_this.find('.slider_main').css('left', -imgW * (i + 1));
				}
				n == 0 ? n = $_this.find('.slider_nav').find('li').length - 1 : n--;
				move();
			});
			//右边箭头点击事件
			$_this.find('.slider_next').click(function() {
				if (!tag) return false;
				tag = false;
				i++;
				if (i == $_this.find('.slider_main').find('li').length) {
					i = 2;
					$_this.find('.slider_main').css('left', -imgW);
				}
				n == $_this.find('.slider_nav').find('li').length - 1 ? n = 0 : n++;
				move();
			});
			//图片下方小圆点划过事件
			$_this.find('.slider_nav').find('li').hover(function() {
				var that = $(this);
				timeout3 = setTimeout(function() {
					n = $_this.find('.slider_nav').find('li').index(that);
					i = n + 1;
					move();
				}, 200);
			}, function() {
				clearTimeout(timeout3);
			});
			//公用代码，给小圆点改变样式，并移动图片
			function move() {
					clearInterval(timer4);
					$_this.find('.slider_nav').find('li').removeClass('slider_selected').eq(n).addClass('slider_selected');
					$_this.find('.slider_main').animate({
						left: -imgW * i
					}, function() {
						tag = true;
					});
					autoMove();
				};
		initialized = true;
		} 
	})
		/* tab切换事件 */
	function tabSwitch(floorid) {
		var $tabs = $(floorid).find('.tab_item');
		var $rights = $(floorid).find('.mc .right');
		var timeout4 = null;
		$tabs.hover(function() {
			var _this = this;
			timeout4 = setTimeout(function() {
				$tabs.removeClass('tab_selected').eq($tabs.index(_this)).addClass('tab_selected');
				$rights.addClass('hide').eq($tabs.index(_this)).removeClass('hide');
			}, 100);
		}, function() {
			clearTimeout(timeout4);
		});
	}

		$('#clothes').imgRun();
		$('#cosmetics').imgRun();
		$('#mobiles').imgRun();
		$('#electronics').imgRun();
		$('#digitals').imgRun();
		$('#sports').imgRun();
		$('#livings').imgRun();
		$('#babys').imgRun();
		$('#foods').imgRun();
		$('#books').imgRun();
		$('#life_slider1').imgRun();
		$('#life_slider2').imgRun();
		tabSwitch('#clothes');
		tabSwitch('#cosmetics');
		tabSwitch('#mobiles');
		tabSwitch('#electronics');
		tabSwitch('#digitals');
		tabSwitch('#sports');
		tabSwitch('#livings');
		tabSwitch('#babys');
		tabSwitch('#foods');
		tabSwitch('#books');

	$.fn.extend({
		shareMove: function () {
			var $_this = $(this);
			var i = 1;
			var timer5 = null;
			var liH = $_this.find('.show_box li').outerHeight(true);
			$_this.find('.show_box').scrollTop(liH);//初始位置
			//复制插入节点
			var fir=$_this.find('.show_box li:first').clone();
			var las=$_this.find('.show_box li:last').clone();
			$_this.find('.show_box ul').append(fir);
			$_this.find('.show_box ul').prepend(las);
			autoMove(); //自动开始滚动
			function autoMove(){
				timer5 = setInterval(function(){
					i--;
					if(i<0){
						i = $_this.find('.show_box li').length - 3;
						$_this.find('.show_box').scrollTop(liH*(i+1));
					}
					$_this.find('.show_box').stop().animate({'scrollTop': liH*i}, 'slow');
				}, 3000);
			}
			$_this.find('.mc').hover(function() {
				clearInterval(timer5);
			}, function() {
				autoMove();
			});
		}
		})
	$('#share').shareMove();
	//今日抄底图片向左移动效果
	$('#special .mc li').hover(function() {
		var i = $('#special .mc li').index(this);
		$('#special .mc .p_img img').eq(i).css('position', 'relative').stop().animate({right: '10px'})
	}, function() {
		var i = $('#special .mc li').index(this);
		$('#special .mc .p_img img').eq(i).css('position', 'relative').stop().animate({right: '0px'})
	});
	//页面加载和滚动时，判定当前所在楼层
	var scrollTimer = null;
	$(window).on('load scroll', function() {
		var floor1H = $('#clothes').offset().top;
		var floor11B = $('#life').offset().top + $('#life').parent().outerHeight();
		var screenH = $(window).height();
		var winScrollTop = $(window).scrollTop();
		if (scrollTimer) {
			clearTimeout(scrollTimer);
		}
		scrollTimer = setTimeout(function() {
			showElevator();
			checkFloor();
		}, 100);
		//左侧电梯滑动到1F时开始显示
		function showElevator() {
			if ($(window).scrollTop() > floor1H - screenH && $(window).scrollTop() < floor11B) {
				$('#elevator').css('display', 'block');
			} else {
				$('#elevator').css('display', 'none');
			}
		}
		//检测当前滑动到第几层,并改变电梯样式和内容
		function checkFloor() {
			for (var i = 0; i < $('.floor').length; i++) {
				var floorH = $('.floor').eq(i).offset().top;
				if (i + 1 < $('.floor').length) {
					var floorH2 = $('.floor').eq(i + 1).offset().top;
					if (winScrollTop > floorH - screenH / 2 && winScrollTop < floorH2 - screenH / 2) {
						change(i);
					}
				}else{
					if (winScrollTop > floorH - screenH / 2) {
						change(i);
					}
				}
			};
		}
		function change(i) {
			$('.floor').eq(i).addClass('floor_current').siblings().removeClass('floor_current');
			$('#elevator li').eq(i).addClass('current').siblings().removeClass('current');
		}
	});
	//绑定电梯每一层的点击事件
	$('#elevator li').click(function() {
		var ind = $('#elevator li').index(this);
		var flT = parseInt($('.floor').eq(ind).offset().top);
		$('#elevator li').eq(ind).addClass('current').siblings().removeClass('current');
		$('document').animate({'scrollTop': flT-2}, 'slow', 'easeOutExpo');
		$('html, body').animate({'scrollTop': flT-2}, 'slow', 'easeOutExpo');
	});
	//右侧定位工具条点击事件
	$('#global_toolbar .toolbar_tabs .tab, #global_toolbar .toolbar_header').click(function() {
		$('#global_toolbar .toolbar').css('right', '270px');
		$(this).addClass('hover').siblings().removeClass('hover').find('em').css('left', '35px');
	});
	//右侧定位工具条关闭按钮
	$('#global_toolbar .close').click(function() {
		$('#global_toolbar .toolbar').css('right', '0px');
		$('#global_toolbar .toolbar_tabs .tab').removeClass('hover');
	});
	//返回顶部
	$('#backToTop').click(function() {
		$('document').animate({'scrollTop': 0}, 'slow', 'easeOutExpo');
		$('html, body').animate({'scrollTop': 0}, 'slow', 'easeOutExpo');
	});
	//右侧定位工具条hover事件
	$('#global_toolbar .tab').hover(function() {
		$(this).find('em').stop().animate({left: '-60px'}, 100);
	}, function() {
		$(this).find('em').stop().animate({left: '35px'}, 100);
	});
});

