(function($){
	//scrolltop 
	$.fn.goTop=function(time){
		var self = $(this);
		$(document).scroll(function(){
			var h = $(document).scrollTop();
			if (h==0) {
				self.fadeOut(100);
			}else{
				self.fadeIn(500);
			}
		})
		$(this).click(function(){
			var h=$(document).scrollTop();
			$("html,body").animate({ scrollTop: 0}, time);
		})
	}
	//slide bar
})(jQuery)