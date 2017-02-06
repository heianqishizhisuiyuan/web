(function($){
	function getPageY(evt){
		if(evt.pageY){
			return evt.pageY;
		}else if(evt.originalEvent && evt.originalEvent.touches){
			return evt.originalEvent.touches[0].pageY;
		}
		return 0;
	}
	$.fn.pages = function(opts){
		var self_ = this;
		opts = opts || {};
		this.on("touchstart",function(evt){

			var sy = getPageY(evt);
			var wh = $(this).height(),dy=0;

			self_.on("touchmove",function(evt1){
				var cy = getPageY(evt1);
				dy = cy-sy;
				//console.log(dy);
				//
				self_.find(".active").css("transform","translate(0,"+dy+"px)");
				self_.find(".next").css("transform","translate(0,"+(wh+dy)+"px)");
				self_.find(".pre:last").css("transform","translate(0,"+(-wh+dy)+"px)");
			});

			self_.on("touchend",function(){			
				self_.off("touchmove");
				self_.off("touchend");

				if(-100<dy && dy<100){
					self_.find(".active").addClass("trans_200").css({
						"-webkit-transform" : "translate3d(0,0,0,)",
						"transform" : "translate3d(0,0,0)"
					});

					self_.find(".pre").addClass("trans_200").css({
						"-webkit-transform" : "translate3d(0,"+-wh+"px,0)",
						"transform" : "translate3d(0,"+-wh+"px,0)"
					});

					self_.find(".next").addClass("trans_200").css({
						"-webkit-transform" : "translate3d(0,"+wh+"px,0)",
						"transform" : "translate3d(0,"+wh+"px,0)"
					});

					setTimeout(function(){	
						self_.find(".page").removeClass("trans_200");					
					},250);

					return ;
				}

				//debugger;
				var active;
				if(dy > 0){
					self_.find(".active").addClass("trans_200").css({
						"-webkit-transform" : "translate3d(0,"+wh+"px,0)",
						"transform" : "translate3d(0,"+wh+"px,0)"
					});
					console.log(self_.find(".pre"))
					self_.find(".pre").addClass("trans_200").css({
						"-webkit-transform" : "translate3d(0,0,0)",
						"transform" : "translate3d(0,0,0)"
					});
					active = self_.find(".pre");                    //        question
				}else{
					self_.find(".active").addClass("trans_200").css({
						"-webkit-transform" : "translate3d(0,"+-wh+"px,0)",
						"transform" : "translate3d(0,"+-wh+"px,0)"
					});
					self_.find(".next").addClass("trans_200").css({
						"-webkit-transform" : "translate3d(0,0,0)",
						"transform" : "translate3d(0,0,0)"
					});
					active = self_.find(".next");
				}

				setTimeout(function(){	
					if(typeof opts.onUnActive == "function"){
						opts.onUnActive(self_.find(".active"));
					}				

					self_.find(".page").removeClass("pre").removeClass("next").removeClass("active").removeClass("trans_200");
					active.addClass("active");

					if(active.next().length){
						active.next().addClass("next");
					}else{
						self_.find(".page:first").addClass("next");
					}

					if(active.prev().length){
						active.prev().addClass("pre");
					}else{
						self_.find(".page:last").addClass("pre");
					}

					if(typeof opts.onActive == "function"){
						opts.onActive(active);
					}

				},250);
			});

		})
	}
	

})(jQuery);