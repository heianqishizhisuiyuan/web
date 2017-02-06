
//二维码
$(function(){
	var qrcode = new QRCode(document.getElementById("qrcode"), {
		width : 80,
		height : 80,
		
	});
	qrcode.makeCode("http://qm.qq.com/cgi-bin/qm/qr?k=SJ0lJQcchxqvfRrl3Ee5cwN_Oz-L8TXQ");
	$("#main_nav li").click(function(){
		$("#main_nav li").removeClass("active")
		$(this).addClass("active")
	})

	$(".content").on("click",".back_home",function(){
		$(this).off('click',".back_home")
		location.href="../"
	})
	$(".toup").click(function(){
		window.scroll(0,0)
	})
	
	//visitor创建
	$("#create_visitor_btn").click(function () {
		var mRest=Rest.create('visitor')
		var visitor_name=$("#visitor-id").val()
		var visitor_email=$("#visitor-email").val()
		var visitor_content=$("#visitor-content").val()
		var visitor_artid=$("#_artid").val();
		mRest.add({
			visitorname:visitor_name,
			visitoremail:visitor_email,
			visitorcontent:visitor_content,
			artid:visitor_artid,
		});
	
		setTimeout(function(){
			$.tip("评论成功");
			location.reload();
		},1000)
	})
	
	var pagecount=Math.ceil($("#_pagecount").val()/4)  
	var li=[]
	for(var i=0;i<pagecount;i++){
		li+="<li><a  pages='"+i+"' href='javascript:void(0)'>第"+(i+1)+"页</a> </li>"
	}
	$(".page-wrapp").append(li)

	/*	
		var val=$("#now_page").val()
		if(val>=2){
			if(val>pagecount-4){
				$(".page-wrapp").css("margin-left",-65*(pagecount-4)+"px")
			}else{
				$(".page-wrapp").css("margin-left",-65*(val-1)+"px")
			}
			
		}
		*/
	//主页翻页效果	
	$(".index-page-wrapp a").click(function(){
		var pages= $(this).attr("pages")
		var _this=$(this)
		$.ajax({
			type:"post",
			url:"/personal/getpage",
			data:{
				pages:pages
			},
			success:function(h){
				$("#article").html(h)
				var val=$("#now_page").val()
				if(val>=2){
					if(val>pagecount-4){
						$(".page-wrapp").css("margin-left",-65*(pagecount-4)+"px")
					}else{
						$(".page-wrapp").css("margin-left",-65*(val-1)+"px")
					}
				}else{
					$(".page-wrapp").css("margin-left",0+"px")
				}
		/*		console.log(this)
				$(this).css("background","red")*/
				$("#_pages li").removeClass("page-li")
				_this.parent().addClass("page-li")
				
			}
		})
	})
	
	//文章类型翻页效果
	$(".article-type-page a").click(function(){
		var pages= $(this).attr("pages")
		var type=$(".two-menu").html()
		var _this=$(this)
		$.ajax({
			type:"post",
			url:"/personal/typeGetPage",
			data:{
				pages:pages,
				type:type
			},
			success:function(h){
				$("#article").html(h)
				var val=$("#now_page").val()
				if(val>=2){
					if(val>pagecount-4){
						$(".page-wrapp").css("margin-left",-65*(pagecount-4)+"px")
					}else{
						$(".page-wrapp").css("margin-left",-65*(val-1)+"px")
					}
				}else{
					$(".page-wrapp").css("margin-left",0+"px")
				}
				$("#_pages li").removeClass("page-li")
				_this.parent().addClass("page-li")
			}
		})
	})
	
	
	
	
	
/*	$("#_pages li a").click(function(){
		$("#_pages li").removeClass("page-li")
		$(this).parent().addClass("page-li")
	})*/
	
	


	var str=$.trim($("#eveyday-talk-txt").val())
	var b=0;
	function typerwriter(){
		if(b<=str.length){
			var strr=str.substring(0,b)
			b++
			$(".eveyday-talk p").html(strr)
		}else{
			clearInterval(typerwriter_loop)
		}
	}
	var typerwriter_loop= setInterval(typerwriter,200)
	
	
	
	$(".display").click(function(){
		window.location.href='../display'
	})
	
	$(".bootstrap").click(function(){
		window.location.href='../bootstrap'
	})

	$(".resume").click(function(){
		window.location.href='../resume.htm'
	})
	
	$(".mi").click(function(){
		window.location.href='../mi'
	})
	$(".chuangkit").click(function(){
		window.location.href='../chuangkit'
	})
	
	
	
	
	
	
	
	
	
	
	
	
})
  