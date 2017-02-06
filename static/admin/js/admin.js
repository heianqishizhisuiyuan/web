//注销
/*$("span#cancel").click(function(){
	remoter.post("/admin/cancel",{},function(rs){
		if(rs.code == 1){
			$.tip("注销成功！")
			setTimeout(function(){
				location.href = "../biz-admin"				
			},1000)
		}
	})
})
//一级菜单活动项
$("ul.sidebar-menu li:first").addClass("mine-action");
var Admin = {
	showModal : function(title,btext,callback){
		$('#modal-container').modal({backdrop:false});
		$('#modal-container').find(".modal-title").html(title);
		$('#modal-container').find("#button-sure").html(btext).off("click").on("click",function(){
			callback($('#modal-container'));
		});

		return $('#modal-container').find(".modal-body").empty();

	}
}
//登陆
$("button#login").click(function(){
	var email = $("input[name='email']").val()
	var password = $("input[name='password']").val()
	if(!$.form.isEmpty(email)){
		$.tip("请输入账号")
	}else if(!$.form.isEmpty(password)){
		$.tip("请输入密码")
	}else{
		remoter.post("/admin/login",{
			email : email,
			password : password
		},function(rs){
			if(rs.code == 1){
				$.tip("登陆成功");
				setTimeout(function(){
					location.href = "../admin"
				},500)
			}else if(rs.code == -1){
				$.tip("账号不存在")
			}else if(rs.code == -2){
				$.tip("密码错误")
			}
		})
	}	
})
//创建超级管理员
$("button#regist").click(function(){
	var mRest = Rest.create("manager");
	var email = $("input[name='email']").val()
	var password = $("input[name='password']").val()
	var repassword = $("input[name='repassword']").val()
	if(!$.form.isEmpty(email)){
		$.tip("请输入您的登陆账号")
	}else if(!$.form.hasBlank(email)){
		$.tip("账号不能含有空格")
	}else if(!$.form.isEmail(email)){
		$.tip("邮箱格式不正确")
	}else if(!$.form.isEmpty(password)){
		$.tip("密码不能为空")
	}else if(!$.form.hasBlank(password)){
		$.tip("密码不能含有空格")
	}else if(!$.form.isEmpty(repassword)){
		$.tip("请输入确认密码")
	}else if(!$.form.isSame(password,repassword)){
		$.tip("两次密码输入不一致")
	}else{
		remoter.post("/admin/createSuper",{
			email : email,
			password : password
		},function(rs){
			if(rs.code == 1){
				var data = {
					email : email,
	   				password : password,
	   				power : "2",
	    			authority : "user,column,archive,content,forum,setting"
				}
				mRest.add(data,function(rs){
	                if(rs.code > 0){
	                  $.tip("超级管理员创建成功");
	                  setTimeout(function(){
	                      location.href = "../admin";
	                  },500)              
	                }
	            })
			}else if(rs.code == -1){
				$.tip("超级管理员已存在，不可重复创建");
			}
		})
	}	
})
*/

// admin注册
$("#biz_regist").click(function () {
	var mRest = Rest.create("admin");
	var username=$("#biz_regist_form input[name=username]").val();
	var mobile=$("#biz_regist_form input[name=mobile]").val();
	var password=$("#biz_regist_form input[name=password]").val();
	
	if(!$.form.isEmpty(username)){
		$.tip("用户名不能为空");
	}else if(!$.form.isAdmin(username)){
		$.tip("用户名输入错误");
	}else if(!$.form.isEmpty(mobile)){
		$.tip("手机号不能为空");
	}else if(!$.form.isPhone(mobile)){
		$.tip("请输入正确的手机号码")
	}else if(!$.form.isEmpty(password)){
		$.tip("请输入密码")
	}else if(password.length<6){
		$.tip("请输入不小于六位的密码")
	}else{
		remoter.post('admin/adminRegist',{
			mobile:mobile
		},function(res){
			if(res.code==-1){
				$.tip("手机号已经被注册，请登录")
			}else if(res.code==1){
				mRest.add({
					mobile:mobile,
					password:password,
					username:username
				},function (res) {
					$.tip("注册成功")
					location.href=("../login.html")
				})
				
			}
		})
	}
})
//admim登录
$("#biz_login").click(function () {
	var mobile=$("#loginForm input[name=mobile]").val()
	var password=$("#loginForm input[name=password]").val()
	if(!$.form.isEmpty(mobile)){
		$.tip("请输入手机号")
	}else if(!$.form.isPhone(mobile)){
		$.tip("请输入正确的手机号")
	}else if (!$.form.isEmpty(password)){
		$.tip("请输入密码")
	}else{
		remoter.post("/admin/adminLogin",{
			mobile:mobile,
			password:password
		},function (res) {
			if(res.code==1){
				$.tip("登录成功")
				location.href="../admin.html"
			}else if(res.code==-1){
				$.tip("账号或密码不正确")
			}
		})
	}
	
})
//admin 注销
$("#cancel").click(function () {
	remoter.post('/admin/adminSignout',{},function (res) {
		if(res.code==1){
			$.tip("退出成功")
			setTimeout(function () {
				location.href="../login.html"
			},1000)
		}
	})
})

var ue
var allMenu={
	oneMenu:function(){	
		$.ajax({
			type:"get",
			url:'../oneMenu.html',
			success:function(h){
				$("#menuwrapper").html(h)
				userlist1();
				changeColor()
			}
		})
	},
	twoMenu:function () {
		$.ajax({
			type:"get",
			url:'../twoMenu.html',
			success:function(h){
				$("#class-management-wrapper").html(h)
				allMenu.allVisitor()
				
			}
		});
	},
	allUser:function(){
		$.ajax({
			type:"get",
			url:'../userList.html',
			success:function(res){
			var ttr
			for(var i=0;i<res.list.length;i++ ){
				if(res.list[i].username==undefined){
					res.list[i].username=' '
				}
				if(res.list[i].address==undefined){
					res.list[i].address=' '
				}
				var tr="<tr><td>"+res.list[i].username+"</td><td>"+res.list[i].mobile+"</td><td>"+res.list[i].address+"</td><td>"+res.list[i].ctime.substring(0,10)+"</td></tr>"
				ttr=ttr+tr
			}
			$('.tbody').append(ttr)
			}
		});
	},
	allVisitor:function(){
		$.ajax({
			type:"get",
			url:'../visitorList.html',
			success:function(res){
			var ttr
			for(var i=0;i<res.list.length;i++ ){
				if(res.list[i].visitoremail==undefined){
					res.list[i].username=' '
				}
				
				var tr="<tr><td><td>"+
				(i+1)+"</td>"+res.list[i].visitorname+"</td><td>"+res.list[i].visitoremail+"</td><td>"+res.list[i].visitorcontent.substring(0,10)+"</td><td>"+res.list[i].ctime.substring(0,10)+"</td><td><buttom class='btn btn-default remove_btn' visitorid="
				+res.list[i].id+">删除</button></td></tr>"
				ttr=ttr+tr
			}
			$('.tbody').append(ttr)
				removeVisitor()
			}
		});
	},
	
	/*文章显示*/
	showArticle:function () {
		$.ajax({
			type:"get",
			url:"../articl.html",
			success:function(h){
				$("#menuwrapper").html(h)
				changeColor();
				addArticle();
				showArticleFrame ();
			}
		});
	},
	addArticle:function (artid) {
		$.ajax({
			type:"post",
			url:"../addArticle.html",
			data : {
				artid : artid
			},
			success:function(h){
				$("#class-management-wrapper").html(h)
				if(ue){
					ue.destroy();
				}
				ue = UE.getEditor('editor');
				//$(".article_content").val()
				UE.getEditor("editor").addListener("ready",function(){
					UE.getEditor("editor").setContent($(".article_content").val(),false)
				})
				getArticle()
				$("#image-upload").bindUpload({
					url :"/mkimg/upload",
					upload_dir:"aticale_cover",
					oncomplate : function(rs){
						$("input[name='imgurl']").val(rs.url)
					}
				});
			}
		});
	},
	showArticleFrame:function(){
		$.ajax({
			type:'get',
			url:'showArticleFrame.html',
			success:function(h){
				$("#class-management-wrapper").html(h)
				allMenu.showArticleList();
			}
		})
	},
	showArticleList:function(){
		$.ajax({
			type:"get",
			url:'../showArticleList.html',
			success:function(res){
			var ttr
			for(var i=res.list.length-1;i>=0;i-- ){
				var tr="<tr><td>"+res.list[i].title+"</td><td>"
				+res.list[i].type+"</td><td>"
				+res.list[i].content.substring(0,10)+"</td><td>"
				+res.list[i].ctime.substring(0,10)
				+"</td><td><button class='btn btn-default article_remove' articleid="+res.list[i].id+">删除</button> <button class='btn btn-default article_editor' artid="+res.list[i].id+" title="+res.list[i].title+">编辑</button></td></tr>"
				ttr=ttr+tr
			}
			$('.article-tbody').append(ttr)
			articleRemove()
			
			editArticle()
			}
		});
	},
	showEverydaywordMenu:function(){
		$.ajax({
			type:"get",
			url:'/admin/everydaywordMenu',
			success:function(h){
				$("#menuwrapper").html(h)
				changeColor()
				$(".everyday-li-public").click(function(){
					allMenu.showEverydaywords()
				})
				$(".everyday-li-list").click(function(){
					allMenu.showEverydayList()
				})
			}
		})
	},
	showEverydaywords:function(){
		$.ajax({
			type:"get",
			url:"/admin/showEverydaywords",
			success:function(h){
				$("#class-management-wrapper").html(h)
				reportevertdayword()
				
			}
		});
	},
	showEverydayList:function(){
		$.ajax({
			type:"get",
			url:"/admin/showEverydayWordsList",
			success:function(h){
				console.log(h)
				$("#class-management-wrapper").html(h)
				
			}
		});
	},
	editorRoll:function(){
		$.ajax({
			type:"get",
			url:"/admin/editorRoll",
			success:function(h){
				$("#class-management-wrapper").html(h)
				$("#image-upload").bindUpload({
					url :"/mkimg/upload",
					upload_dir:"aticale_cover",
					oncomplate : function(rs){
						$("input[name='imgurl']").val(rs.url)
					}
				});
				
			}
		});
	},
/*	showRollList:function(){
		$.ajax({
			type:"get",
			url:"../carousel-list.html",
			success:function(){
				
			}
		});
	},*/
	
	
}




function userlist1(){
	$(".user2").click(function () {
		allMenu.twoMenu()
	})
}
function  removeVisitor(){
	$(".remove_btn").on("click",function(){
		var mRest = Rest.create('visitor');
		var visitorid=$(this).attr("visitorid")
		mRest.remove({id:visitorid},function(){
			$.tip('删除成功')
			setTimeout(function () {
				allMenu.twoMenu()
			},500)
			
		})
		
	})
}
function changeColor(){
	$(".oneMenu-ul li").click(function () {
		var index=$(this).index()
		if(index==0){
		}else{
			$(".oneMenu-ul li").removeClass('active')
		$(this).addClass("active")
		}
		
	})
}
$("#biz_group_purchase").click(function () {
	
	allMenu.oneMenu()
	$("#class-management-wrapper").html("")
})
$("#biz_activity").click(function () {
	$("#class-management-wrapper").html("")
	allMenu.showArticle()
})

$("#biz_enroll").click(function(){
	allMenu.showEverydaywordMenu()
})
$("#biz_roll").click(function(){
	allMenu.editorRoll()
})
/*添加文章函数*/
function addArticle(){
	$(".addArticle").click(function () {
		allMenu.addArticle()
	})
}
/*编辑文章函数*/
function editArticle(){
	$("#showArticle-list .article_editor").on("click",function(){
		var artid = $(this).attr("artid")
		allMenu.addArticle(artid)
	})
	
}
/*添加文章*/
function getArticle(){
	$("#article-btn").click(function () {
	
		var article_id=$(".article_id").val()
		var title=$("#articletitle").val();
		var content=UE.getEditor('editor').getContent();
		var getContentTxt=UE.getEditor('editor').getContentTxt()
		var imgurl=$("input[name='imgurl']").val()
		var mRest = Rest.create('article');
		var adminname=$("#adminname").html()
		var articleType=$('input:radio[name="articleType"]:checked').val()
		if(!$.form.isEmpty(title)){
		$.tip("请填写标题");
		}else if(!$.form.isEmpty(articleType)){
			$.tip("请选择文章类型");
		}else if(!$.form.isEmpty(imgurl)){
			$.tip("请上传图片");
		}else if(!$.form.isEmpty(content)){
			$.tip("请填写文章")
		}else if(article_id){
			mRest.update( {id:article_id},{
				adminname:adminname,
				title:title,
				content:content,
				getContentTxt:getContentTxt,
				type:articleType,
				imgurl:imgurl,
				
			});
			$.tip('更新成功')
			setTimeout(function(){
				allMenu.showArticleFrame()
			},1000)
		}else{
			mRest.add({
				adminname:adminname,
				title:title,
				content:content,
				getContentTxt:getContentTxt,
				type:articleType,
				imgurl:imgurl,
			});
			$.tip("添加成功")
			setTimeout(function(){
				allMenu.showArticleFrame()
			},2000)
		}
			
		
	})
}
/*编辑器获取内容*/
function getContent() {
    var arr = [];
    arr.push(UE.getEditor('editor').getContent());
    return (arr.join("\n"));
 }

//编辑器获取内容(纯文本内容)
function getContentTxt() {
   var arr = [];
   arr.push(UE.getEditor('editor').getContentTxt());
   return (arr.join("\n"));
 }
 
 
 function showArticleFrame (){
 	$(".articleList").click(function () {
		allMenu.showArticleFrame()
})
 }
 /*编辑器编辑内容*/
 function setContent(isAppendTo) {
        var arr = [];
    	arr.push("使用editor.setContent('欢迎使用ueditor')方法可以设置编辑器的内容");
        UE.getEditor('editor').setContent('欢迎使用ueditor', isAppendTo);
        alert(arr.join("\n"));
    }

/*删除文章函数*/
function articleRemove(){
	$("#showArticle-list .article_remove").on("click",function(){
		var articleid=$(this).attr('articleid')
		console.log(articleid)
		remoter.post('/admin/removeArticle',{
			id:articleid
		},function (res) {
			if(res.code==1){
				$.tip("删除成功")
				setTimeout(function () {
					allMenu.showArticleFrame()
				},1000)
			}
		})
	})
}


/*每日一言*/
function reportevertdayword(){
	$("#report_evertdayword_btn").click(function(){
		var mRest=Rest.create('everydayword')
		var txt=$(".everydaywords").val()
		mRest.add({
			content:txt
		},function(res){
			if(res.code>0){
				$.tip("发表成功")
			}
		})
		
	})
	
}














