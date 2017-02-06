(function($){
	
    window.handle_ = {};
    function craeteHandler(callback,name){
        if(!this.handle) this.handle = {num:0};
        var hname = name || "callback_" + this.handle.num++;
        window.handle_[hname] = callback;
        return  "handle_." + hname;
    };

    $.fn.bindUpload = function(opts){
        var str = ["<div style='position:absolute;top:0px;left:0px;width:100%;height:100%;z-index:100'><form method='post' enctype='multipart/form-data' action='"+opts.url+"' target='uptarget'>"];
        str.push("<input type='file' name='file' style='cursor:pointer' accept='"+(opts.accept||"")+"' capture='camera'/>");
        str.push("<input type='hidden' name='callback'/>");
        if(opts.params){
            for(var p in opts.params){
                str.push("<input type='hidden' name='"+p+"' value='"+opts.params[p]+"'/>");
            }           
        }
        str.push("</form>"+
            "<iframe name='uptarget' id='uptarget' style='display:none'>"+
                "</iframe>");
        str.push("</div>");
        
        var c = $(str.join(""));
        c.find("input[name='file']").css({
            "line-height": (opts.height || $(this).height())+"px",
            "width": (opts.width || $(this).width())+"px",
            "opacity":0,
        }).on("change",function(){
            try{
                if(typeof opts.onupload == "function"){
                    opts.onupload();
                }
                var callback = craeteHandler(function(data){
                    if(typeof opts.oncomplate == "function"){
                        opts.oncomplate(data);
                    }
                });
                c.find("form").find("input[name='callback']").val(callback);
                c.find("form").submit(function(e){
                    e.stopPropagation();
                });
                c.find("form").submit();
            }catch(e){
                alert(e);
            }
        });
        $(this).append(c);
    };

    $.fn.imgCrop = function(){
        var self_ = this,
            container = $(this).parent(),
            iw=$(this).width(),ih=$(this).height();
        var wrap = $("<div style='position:absolute;left:0;top:0;background:rgba(0,0,0,0.4)'></div>").css({
            width : iw+"px",
            height : ih+"px",
            "z-index" : parseInt($(this).css("z-index"))+1
        }).appendTo(container);
        
        var size,left=0,top=0;
        if(iw > ih){
            size = ih;
            left = (iw - ih)/2;
        }else{
            size = iw;
            top = (ih - iw)/2;
        }
        var size = $(this).width() > $(this).height() ?  $(this).height() : $(this).width();
        
        var crop = $("<div style='position:absolute;border:1px dashed #999999;'></div>").css({
            left : left+"px",
            top : top + "px",
            overflow :"hidden",
            width : size+"px",
            height : size+"px"
        }).appendTo(wrap);
        
        var imgc = $("<div style='position:absolute;'><img src='"+$(this).attr("src")+"'/></div>").css({
            width : iw+"px",
            height : ih+"px",
            left : (-left-1)+"px",
            top : (-top-1)+"px"
        }).appendTo(crop);
        var img = imgc.find("img").css({
            width : "100%",
            height : "100%"
        });
        
        
        var handle = $("<img src='/static/images/avatar_resize.png' style='position:absolute'/>").css({
            height : "32px",
            width : "32px",
            right : "0px",
            bottom : "0px",
            cursor : "se-resize",
            transform : "rotate(90deg)"
        }).appendTo(crop);
        
        var actions = {
            "start":"mousedown",
            "move" : "mousemove",
            "end" : "mouseup"
        };
        if("ontouchmove" in document.body){
            actions = {
                "start":"touchstart",
                "move" : "touchmove",
                "end" : "touchend"
            };
        }       
        
        var minw = 100,minh = 100;
        handle.on(actions.start,function(evt){
            try{
            evt.preventDefault();
            var pos = $.eventPos(evt);
            //alert(pos.x);
            var maxw = iw - left - 2 ;maxh = ih - top - 2;
            var sw = crop.width(),sh=crop.height();
            var onmove  = function(evt1){
                evt1.preventDefault();
                var pos1 = $.eventPos(evt1);
                var curw = sw + (pos1.x - pos.x);
                var curh = sh + (pos1.y - pos.y);
                if(curw < minw) curw = minw;
                if(curh < minh) curh = minh;
                if(curw > maxw) curw = maxw;
                if(curh > maxh) curh = maxh;
                curh < curw ? curw = curh : curh = curw ;
                crop.height(curh);
                crop.width(curw);
            },
            onend = function(){
                $(document.body).unbind(actions.move,onmove);
                $(document.body).unbind(actions.end,onend);
            };
            
            $(document.body).bind(actions.move,onmove);
            $(document.body).bind(actions.end,onend);
            }catch(e){
                alert(e);
            }
            
        });
        
        img.on(actions.start,function(evt){
            evt.preventDefault();
            var pos = $.eventPos(evt);
            var maxleft = iw - crop.width()-2,maxtop = ih - crop.height()-2;
            var sleft = left,stop = top;
            var onmove  = function(evt1){
                evt1.preventDefault();
                var pos1 = $.eventPos(evt1);
                left = sleft + (pos1.x - pos.x);
                top = stop + (pos1.y - pos.y);
                if(left < 0) left = 0;
                if(top < 0) top = 0;
                if(left > maxleft) left = maxleft;
                if(top > maxtop) top = maxtop;
                crop.css("left",left+"px");
                crop.css("top",top+"px");
                imgc.css("left",(-left-1)+"px");
                imgc.css("top",(-top-1)+"px");
            },
            onend = function(){
                $(document.body).unbind(actions.move,onmove);
                $(document.body).unbind(actions.end,onend);
            };
            
            $(document.body).bind(actions.move,onmove);
            $(document.body).bind(actions.end,onend);
            
        });
        
        return {
            getSelect : function(){
                return {x:left,y:top,h:crop.height(),w:crop.width()};
            },
            getScale : function(){
                return $(self_).width()/$(self_)[0].naturalWidth;
            }
        };
    };
})(Zepto);