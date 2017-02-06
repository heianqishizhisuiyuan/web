
$(function(){

	var setIn
	$(".wrapper").pages({
		onActive : function(page){
			page.find(".box").each(function(){
				$(this).addClass($(this).attr("anim"));
				if(setIn){
					a=1
					clearInterval(setIn)
					$(".five-txt").html("")
				}
				if($(".active p").hasClass('five-txt')){
					setIn= setInterval(box,100)
				}
			});
		},
		onUnActive : function(page){
			page.find(".box").each(function(){
				$(this).removeClass($(this).attr("anim"));
			});
			
		
		}
	});
	//开头的音乐
	$(".music i").click(function () {
		if($(".music i").hasClass("fa-spin")){
			$(".myaudio").get(0).pause()
		}else{
			$(".myaudio").get(0).play()
		}
		$(".music i").toggleClass("fa-spin")
	
	})
	$('html').one('touchstart',function(){
			$(".myaudio").get(0).play()
	});
	
	
	
		//打字机效果
	var str="热爱编程,喜欢挑战;有较强的逻辑分析和解决问题的能力有较好的团队合作和沟通能力,有责任心。踏实稳定，工作认真热爱生活,阳光向上,爱好广泛,并且能够将爱好长期坚持下来."
	var a=0
	function box(){
		if(a<=str.length){
		  		$(".five-txt").html(str.substring(0,a))
		  		a++;
	  	}else{
	  		a=0
	  		clearInterval(setIn)
	  	}
	  	
	}


})



