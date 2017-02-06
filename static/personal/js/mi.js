/*$(".shopping").mouseover(function(){
	$(".shoppingtitle").css("display","inline-block")
	
})
$(".shopping").mouseout(function(){
	$(".shoppingtitle").css("display","none")
})*/
/*$().hover(function(){
	$(".mytable").show()
},function(){
	
})*/



$(".nav_ul").mymenu1({
	sub_list : ".product-list",
	sub_tag : "ul"
});
//自己写的菜单插件
$(".side-menu").mymenu2({
	sub_list : ".nav_intro",
	sub_tag : "table"

});



//自己写的
/* $(".side-menu li").mouseenter(function(){
	var index=$(this).index()+1
	$(".mytable"+index).show()
	$(".mytable").not(".mytable"+index).hide()
	
	$(".mytable").mouseover(function(e){
		e.stopPropagation();
		
	})
})

$(".side-menu li").on('mouseover', function(e){
	e.stopPropagation();
})
$("body").on('mouseover', function(){  
	$(".mytable").hide()
}) */





$("#act li").click(function(){
   alert($(this).index("li") );
   })


var i=1
function coll () {
	if(i==1){
		$(".mibest_btn2").css("color","#ff6700")
		$(".mi_best_1").css("margin-left","-1230px")
		$(".mibest_btn1").css("color","#ddd")
		i=2
	}else if(i==2){
		$(".mibest_btn1").css("color","#ff6700")
	$(".mi_best_1").css("margin-left","0")
	$(".mibest_btn2").css("color","#ddd")
	i=1
	}
}
var setIn=setInterval(coll,5000)

$(".mibest_btn1").click(function(){
	clearInterval(setIn)
	$(".mibest_btn2").css("color","#ff6700")
	$(".mi_best_1").css("margin-left","-1230px")
	$(this).css("color","#ddd")
	i=2;
	setIn=setInterval(coll,5000)

})


$(".mibest_btn2").click(function(){
	clearInterval(setIn)
	$(".mibest_btn1").css("color","#ff6700")
	$(".mi_best_1").css("margin-left","0")
	$(this).css("color","#ddd")
	i=1;
	setIn=setInterval(coll,5000)
	
	
})