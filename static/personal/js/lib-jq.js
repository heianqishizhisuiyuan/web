 (function($){
	$.fn.mymenu1 = function(opts){
		var sub_list = opts.sub_list;
		this.mouseenter(function(){
			$(sub_list).animate({
				height : "150px"
			});
			$(document.body).one("mousemove",function(){
				$(sub_list).animate({
					height : "0px"
				});
			})
		});

		this.find("li").mouseenter(function(){
			var index = $(this).index();
			$(sub_list).find(opts.sub_tag).hide();
			$(sub_list).find(opts.sub_tag).eq(index).show();
		});

		this.on("mousemove",function(evt){
			evt.stopPropagation();
		})

		$(sub_list).on("mousemove",function(evt){
			evt.stopPropagation();
		})
	}
})(jQuery); 

(function($){
	$.fn.mymenu2 = function(opts){
		var sub_list = opts.sub_list;
		this.mouseenter(function(){
			$(sub_list).show()
			$(document.body).one("mousemove",function(){
				$(sub_list).hide()
			})
		});
		this.find("li").mouseenter(function(){
			var index = $(this).index();
			$(sub_list).find(opts.sub_tag).hide();
			$(sub_list).find(opts.sub_tag).eq(index).show();
		});

		this.on("mousemove",function(evt){
			evt.stopPropagation();
		})

		$(sub_list).on("mousemove",function(evt){
			evt.stopPropagation();
		})
	}
})(jQuery);






