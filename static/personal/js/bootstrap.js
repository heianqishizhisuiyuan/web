var i=0;
var j=0;
var x=0;
var y=0;
var str1="世情薄，人情恶，雨送黄昏花易落"
var str2="晓风干，泪痕残。欲笺心事，独语斜阑。难，难，难！"
var str3="人成各，今非昨，病魂常似秋千索。"
var str4="角声寒，夜阑珊。怕人寻问，咽泪装欢。瞒，瞒，瞒！"
/*function box() {
	if(data-slide-to=="2"){
		if(i<str1.length){
			var str11= str1.substring(0,i)
			$("#mystr1").html(str11)
			i++;
		}
	}
	if(data-slide-to=="1"){
		if(i<str2.length){
			var str11= str2.substring(0,i)
			$("#mystr1").html(str11)
			i++;
		}
	}
	if(data-slide-to=="3"){
		if(i<str3.length){
			var str11= str3.substring(0,i)
			$("#mystr1").html(str11)
			i++;
		}
	}
	if(data-slide-to==null){
		if(i<str4.length){
			var str11= str4.substring(0,i)
			$("#mystr1").html(str11)
			i++;
		}
	}
}
*/

/*$('#myModal a ').click(function(){
	function box(){
		if(i<str1.length){
				var str11= str1.substring(0,i)
				$('.carousel-inner').find('.active').find('h3').html(str11)
				i++;
			}
	}
	setInterval(box,200)
	
})*/

/*
function box11(i,str){
	if(i<=str.length){
		var str11= str.substring(0,i)
				$('.carousel-inner').find('.active').find('h3').html(str11)
				i++;
	}
}

$("#mybtn3").click(function(){
	debugger;
	function box(){
		if ($('.carousel-inner').find('.active').hasClass("item1")) {
			box11(i,str1)
		}
		
		else if ($('.carousel-inner').find('.active').hasClass("item2")) {
			
			box11(j,str2)
		}
		
		else if ($('.carousel-inner').find('.active').hasClass("item3")) {
			box11(x,str3)
		}
		
		else if ($('.carousel-inner').find('.active').hasClass("item4")) {
			box11(y,str4)
		}
	}
	setInterval(box,200)
	
})*/









$("#mybtn3").click(function(){
	function box(){
		if ($('.carousel-inner').find('.active').hasClass("item1")) {
			if(i<=str1.length){
				var str11= str1.substring(0,i)
				$('.carousel-inner').find('.active').find('h3').html(str11)
				i++;
				
			}
		}
		
		else if ($('.carousel-inner').find('.active').hasClass("item2")) {
			
			if(j<=str2.length){
				var str11= str2.substring(0,j)
				$('.carousel-inner').find('.active').find('h3').html(str11)
				j++;
			}
		}
		
		else if ($('.carousel-inner').find('.active').hasClass("item3")) {
			if(x<=str3.length){
				var str11= str3.substring(0,x)
				$('.carousel-inner').find('.active').find('h3').html(str11)
				x++;
			}
		}
		
		else if ($('.carousel-inner').find('.active').hasClass("item4")) {
			if(y<=str4.length){
				var str11= str4.substring(0,y)
				$('.carousel-inner').find('.active').find('h3').html(str11)
				y++;
			}
		}
		
		
		
		
	}
	setInterval(box,200)
	
	
	
	
	
})