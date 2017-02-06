

$(function () {
	//显示登录和注册
	$(".nav_login").hover(function () {
		$("._login_box").slideDown(300)
			},function () {
		$("._login_box").slideUp(300)
	})
	//导航条下面的移动条柱
		$(".nav_ul li").hover(function () {
		var index=$(this).index()
		switch (index){
			case 0:
			
				$(".nav_under").css({
					width:"81px",
					left:100*index
				})
				break;
			case 1:
				$(".nav_under").css({
					width:"81px",
					left:100*index
				})
				break;
			case 2:
				$(".nav_under").css({
						width:"81px",
						left:100*index
					})
				break;
			case 3:
				$(".nav_under").css({
					width:"81px",
					left:100*index
				})
				break;
			case 4:
				$(".nav_under").css({
					width:"41px",
					left:100*index
				})
				break;
			case 5:
				$(".nav_under").css({
					width:"41px",
					left:100*(index-1)+58,
				})
				break;
			case 6:
				$(".nav_under").css({
					width:"41px",
					left:100*(index-2)+116
				})
				break;	
			default:
				break;
			}
			
		},function () {
			$(".nav_under").css({
				width:"81px",
				left:0
			})
		})
	
	
	//轮播器
	var i=0;
	var setIn=setInterval(function(){
		/*console.log(1)*/
		$(".myslide_left img").css("opacity","0")
		$(".myslide_left img").eq(i).animate({
			opacity:1
		},1000)
		$(".myslide_right img").css("opacity","1")
		$(".myslide_right img").eq(i).css("opacity","0.3")
		if(i==3){
			i=0;
		}else{
			i++
		}
	},5000)
	
	$(".myslide_right div").click(function () {
		clearInterval(setIn)
		
		var i=$(this).index()
		$(".myslide_right img").css("opacity","1")
		$(".myslide_right img").eq(i).css("opacity","0.3")
		$(".myslide_left img").css("opacity","0")
		$(".myslide_left img").eq(i).animate({
				opacity:1
		},1000)
		i++;
		 setIn=setInterval(function(){
			/*console.log(2)*/
			$(".myslide_left img").css("opacity","0")
			$(".myslide_right img").css("opacity","1")
			$(".myslide_right img").eq(i).css("opacity","0.3")
			$(".myslide_left img").eq(i).animate({
				opacity:1
			},1000)
			if(i==3){
				i=0;
			}else{
				i++
			}
		},5000)
	})

	/*瀑布流*/
	 var $container = $('#masonry');
   	 $container.imagesLoaded(function() {
		$container.masonry({
        itemSelector: '.box',
        gutter: 20,
        isAnimated: true,
   		 });
     });
	/*页数*/
	$(".masonry_btn span button").click(function () {
		$(".masonry_btn span button").removeClass("active")
		$(this).addClass("active")
	})
	
	//注册登录
	function center(element){
		var top=(document.documentElement.clientHeight-$(element).height())/2
		var left=(document.documentElement.clientWidth-$(element).width())/2
		$(element).show()
		$(element).css({
			"box-shadow":"0 0 0 3000px rgba(96,96,96,0.5)",
			top:top+"px",
			left:left+"px",
		})
	}
	$(".login").click(function () {
		center("#login")
	})
	$(".reg").click(function () {
		center("#reg")
	})
	
	
	$(".login_close").click(function () {
		$("#login").hide()
	})
	$(".reg_close").click(function () {
		$("#reg").hide()
	})
	
	//json数据接收
/*	$.ajax({
		url:"../tags.json",
		success:function(data){
			console.log(data)
		}
		
		
		
	})*/
	
	
	

})

