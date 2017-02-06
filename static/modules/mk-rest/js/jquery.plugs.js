(function($){
	
	$.tip = function(text){
        var panel = $("<div style='position:fixed;bottom:200px;left:0;padding:20px;text-align:center;width:100%;z-index:10002;'>"
                +"<span style='border-radius:6px;background:rgba(0,0,0,0.7);color:#FFFFFF;padding:10px 20px;font-size:18px;'>"+text+"</span>"
                +"</div>").appendTo(document.body);
        setTimeout(function(){
            panel.fadeOut(800,function(){
                panel.remove();
            });
        },1000);
    };

	/*
     * html5 tranform
     */
    var trans_end = "transitionend";
    if('onwebkittransitionend' in window) {
        trans_end = 'webkitTransitionEnd';
    } else if('onotransitionend' in document) {
        trans_end = 'oTransitionEnd';
    }

    var vendor = (/webkit/i).test(navigator.appVersion) ? 'webkit' :
        (/firefox/i).test(navigator.userAgent) ? '' :
        (/MSIE/i).test(navigator.userAgent) ? 'ms' :
        'opera' in window ? 'O' : '';
/*
    $.fn.transform = function(opts){
        var el = $(this);
        if(opts.time || opts.end && trans_end){
            var h = function(){
                if(opts.time){
                    //el[0].style[vendor+"Transition"] = "";
                    if(vendor){
                        el.css("-"+vendor+"-Transition","");
                    }else{
                        el.css("Transition","");
                    }

                }
                //Event.remove(el,trans_end,h);
                el.unbind(trans_end);

                if(opts.end){
                    opts.end();
                }
            };
            el.bind(trans_end,h);
        }

        if(opts.time){
            if(opts.time > 100){
                opts.time = opts.time/1000;
            }
            if(vendor){
                el.css("-"+vendor+"-Transition","-"+vendor+"-transform "+opts.time+"s linear");
            }else{
                el.css("transition","transform "+opts.time+"s linear");
            }
        }

        var tranf = vendor ? "-"+vendor+"-Transform" : "transform";
        if("top" in opts && "left" in opts){
            el.css(tranf,"translate3d("+opts.left+"px,"+opts.top+"px,0)");
        }else if("top" in opts){
            el.css(tranf,"translate3d(0px,"+opts.top+"px,0)");
        }else if("left" in opts){
            el.css(tranf,"translate3d("+opts.left+"px,0px,0)");
        }else if("exp" in opts){
            el.css(tranf,opts.exp);
        }
    };*/

    /*
     * Upload
     */
    
    window.handle_ = {};
    function craeteHandler(callback,name){
        if(!this.handle) this.handle = {num:0};
        var hname = name || "callback_" + this.handle.num++;
        window.handle_[hname] = callback;
        return  "handle_." + hname;
    };

    $.fn.bindUpload = function(opts){
        var str = ["<div style='position:absolute;top:0px;left:0px;z-index:100'><form method='post' enctype='multipart/form-data' action='"+opts.url+"' target='uptarget'>"];
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
                //var canvas = $(document.body).canvasPanel("<div style='margin-top:48%'>上传中...</div>");
                if(typeof opts.onupload == "function"){
                    opts.onupload();
                }
                var callback = craeteHandler(function(data){
                    if(typeof opts.oncomplate == "function"){
                        opts.oncomplate(data);
                    }
                    //canvas.remove();
                });
                
                //alert(callback);
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

    $.fn.canvasPanel = function(html){
        return $("<div class='canvas_panel'></div>").css({
            position:"fixed",
            top : 0,left:0,
            "z-index":10,
            width:"100%",height:"100%",
            "text-align":'center',
            background:"rgba(100,100,100,0.7)"
        }).appendTo(this).append(html);
    };

    $.bottomConfirm = function(text,onsure,oncancel){
        var panel = $("<div style='position:fixed;bottom:0;left:0;width:100%;z-index:10001;background:#000000;opacity:0.6;padding:10px'>"
                +"<div style='padding:10px;'>"+text+"</div>"
                +"<button id='btn-default' type='button' class='btn btn-danger' style='position:relative;top:-6px;float:left;margin-left:30%;'>取消</button>"
                +"<button id='btn-primary' type='button' class='btn btn-success' style='position:relative;top:-6px;float:right;margin-right:30%;'>确定</button>"
                +"</div>").appendTo(document.body);
        
        panel.find("#btn-default").click(function(){
            if(typeof oncancel == "function"){oncancel();}
            panel.remove();
        });
        
        panel.find("#btn-primary").click(function(){
            if(typeof onsure == "function"){onsure();}
            panel.remove(); 
        });
    };



    $.fn.pager = function(callback){
        var pager = $(this);
        pager.find(".pager-page").click(function(){
            var page = $(this).attr("page");
            callback(page);
        });
        pager.find(".pager-next").click(function(){
            var page = parseInt(pager.attr("page"))+1;
            callback(page);
        });
        pager.find(".pager-pre").click(function(){
            var page = parseInt(pager.attr("page"))-1;
            callback(page);
        });
    };

   
    $.fn.onenter = function(callback){
        $(this).on("keypress",function(evt){
            if(evt.keyCode == 13 && typeof callback == "function"){
                callback(evt);
            }
        })
    };
    

    $.fn.scrollToBottom = function(){
        var nScrollHight = this[0].scrollHeight;
        if(nScrollHight > 0){
            this[0].scrollTop = nScrollHight;
        }
    };


    $.eventPos = function(evt){
        if(window.event && !evt){
            evt = window.event;
        }

        if(evt.originalEvent){
            evt = evt.originalEvent;
        }

        if(evt.touches) {
            var touch = (evt.targetTouches||evt.changedTouches)[0];
            if(touch){
                return {x:touch.pageX,y:touch.pageY};
            }else{
                return {x:evt.pageX,y:evt.pageY};
            }
        }

        return {x:evt.clientX,y:evt.clientY};
    };

    $.getQuery = function(name){
        var result = location.search.match(new RegExp("[\?\&]" + name+ "=([^\&]+)","i"));
        if(result == null || result.length < 1){
            return "";
        }
        return result[1];
    };
    
    $.form = {
        isID:function(str){
            str = str.toUpperCase();
            //身份证号码为18位,18位前17位为数字，最后一位是校验位，可能为数字或字符X。
            if (!(/(^\d{17}([0-9]|X)$)/.test(str)))
            {
                return false;
            }
            else
                return true;
        },
        isQQ : function(str){
            if(str.search(/^[1-9]\d{4,8}$/) !=-1){ 
                return true;
            } 
            if(str.length == 0){
                return true;  
            }
            else
                return false;
        },
        isTel : function(str){
             return (/^(([0\+]\d{2,3})?(0\d{2,3}))(\d{7,8})((\d{3,}))?$/.test(str)); 
        },
        hasBlank : function(str) {
            return str.indexOf(" ") == -1?true:false;
        },
        delBlank : function(str) {
            return str.replace(/(^\s+)|(\s+$)/g, "");
        },
        //密码校验
        isSame : function(str1,str2){
            return str1 === str2?true:false; 
        },
        // 是否为空
        isEmpty : function(str){
           /* if(!str && str !== 0) return true;
            if(str.replace(/(^s*)|(s*$)/g, "").length ==0) return true;
            return false;*/
            return str.length == 0?false:true;
        },
        // email是否正确
        isEmail : function(str){
            if(/^[A-Za-z\d]+([-_\.][A-Za-z\d]+)*@([A-Za-z\d]+[-\.])+[A-Za-z\d]{2,5}$/.test(str)){
                return true;
            }
            else{
                return false;
            }
        },
        // 手机验证
        isPhone : function(str){
            var reg = /^1\d{10}$/;
            if (reg.test(str)) {
                return true;
            }
            if(str.length == 0){
                return true;  
            }
            return false;
            
        },//手机号码验证

        hasIllegalChar : function(w){
        	return /[<>@#\$%\^&\*]+/g.test(w);
        }
        
    }
	
	$.getCookie = function(name){
        var dc = document.cookie;
        var prefix = name + "=";
        var begin = dc.indexOf("; " + prefix);
        if (begin == -1) {
            begin = dc.indexOf(prefix);
            if (begin != 0)
                return null;
        } else {
            begin += 2;
        }
        var end = document.cookie.indexOf(";", begin);
        if (end == -1) {
            end = dc.length;
        }
        return unescape(dc.substring(begin + prefix.length, end));
    };
	
    $.setCookie = function(name, value, hs,path){
        var str = [name + "=" + escape(value)];
        if (hs > 0) {
            var date = new Date();
            var ms = hs * 3600 * 1000;
            date.setTime(date.getTime() + ms);
            str.push(" expires=" + date.toGMTString());
        }

        if(!path){
            path = "/";
        }
        str.push(" path="+path);
        document.cookie = str.join(";");
    };

    $.getStorage = function(key){
        if(window.localStorage){
            return window.localStorage.getItem(key);
        }else{
            return $.getCookie(key);
        }
    };

    $.setStorage = function(key,value){
        if(window.localStorage){
            window.localStorage.setItem(key,value);
        }else{
            $.setCookie(key,value,24*5);
        }
    };
    // 序列化方法
    $.fn.serializeJson=function(){  
        var serializeObj={};  
        $(this.serializeArray()).each(function(){  
            serializeObj[this.name]=this.value;  
        });  
        return serializeObj;  
    };  

})(jQuery);