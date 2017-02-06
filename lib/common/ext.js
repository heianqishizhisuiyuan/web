/*
 * 
 */
Date.prototype.pattern=function(fmt) {
    var o = {     
    "M+" : this.getMonth()+1, //月份     
    "d+" : this.getDate(), //日     
    "h+" : this.getHours()%12 == 0 ? 12 : this.getHours()%12, //小时     
    "H+" : this.getHours(), //小时     
    "m+" : this.getMinutes(), //分     
    "s+" : this.getSeconds(), //秒     
    "q+" : Math.floor((this.getMonth()+3)/3), //季度     
    "S" : this.getMilliseconds() //毫秒     
    };     
    var week = {     
    "0" : "\日",     
    "1" : "\一",     
    "2" : "\二",     
    "3" : "\三",     
    "4" : "\四",     
    "5" : "\五",     
    "6" : "\六"    
    };     
    if(/(y+)/.test(fmt)){     
        fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));     
    }     
    if(/(E+)/.test(fmt)){     
        fmt=fmt.replace(RegExp.$1, ((RegExp.$1.length>1) ? (RegExp.$1.length>2 ? "\星\期" : "\周") : "")+week[this.getDay()+""]);     
    }     
    for(var k in o){     
        if(new RegExp("("+ k +")").test(fmt)){     
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));     
        }     
    }     
    return fmt;     
};

Date.prototype.getTimeAgo = function(fmt) {
	var time = this.getTime();
	var curtime = new Date().getTime();
	var s = parseInt((curtime-time)/1000);
	if(s< 0){
		if(fmt) return this.pattern(fmt);
		return "";
	}
	if(s<60){
	return s + " 秒前";
	}
	var m = parseInt(s/60);
	if(m < 60){
	return m + " 分钟前";
	}
	var h = parseInt(m/60);
	if(h < 24){
	return h + " 小时前";
	}
	var d = parseInt(h/24);
	if(d < 6){
	return d + " 天前";
	}
	
	if(this.getFullYear()==new Date().getFullYear()){
		fmt = "MM-dd HH:mm";
		return this.pattern(fmt);
	}else{
		fmt = "yyyy-MM-dd HH:mm";
		return this.pattern(fmt);
	}
};

/*
*/
Array.prototype.each = function(action){
	var l = this.length;
	if(typeof action != "function") return ;
	for(var i=0;i<l;i++){		
		action(this[i]);
	}
};

Array.prototype.clone = function(){
	return this.slice(0); 	
};

Array.prototype.indexOf = function(o, from){
	var len = this.length;
	from = from || 0;
	from += (from < 0) ? len : 0;
	for (; from < len; ++from){
		if(this[from] === o){
			return from;
		}
	}
	return -1;
};

Array.prototype.addSet = function(o){
	if(this.indexOf(o) < 0){
		this.push(o);
		return true;
	}
	return false;
};

Array.prototype.addSetAll = function(sets){
	for(var i=0;i<sets.length;i++){
		this.addSet(sets[i]);
	}
};

String.prototype.complexSub = function(n){
    var r = /[^\x00-\xff]/g;      
    if(this.replace(r, "mm").length <= n)   
        return this;     
  
    var m = n;//Math.floor(n/2);      
    for(var i=m; i<this.length; i++) {      
        if(this.substr(0, i).replace(r, "mm").length>=n && (r.test(this[i+1])|| /\s/.test(this[i+1]))) {   
            return this.substr(0, i);   
        }  
    }   
    return this;     
};  


exports.rand = function(max){
	return Math.floor(Math.random() * max)+1;
};

exports.floatSum = function(f1,f2){
	var r = parseFloat(f1) + parseFloat(f2);
	return Math.round(r*100)/100;
};


