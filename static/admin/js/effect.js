$(function(){
	Menu.operate();
	SubMenu.operate();
})


//一级菜单
var Menu = {
	operate:function(){
		$(".my-treeview").click(function(){
			$(this).addClass("mine-action").siblings().removeClass("mine-action");
		})
	}
}

//二级菜单

var SubMenu = {
	operate:function(){
		$(".my-set-li").each(function() {
			$(this).click(function() {
				$(this).addClass("my-set-active").siblings().removeClass("my-set-active");
				$(this).children().addClass("my-set-color");
				$(this).siblings().children().removeClass("my-set-color");
			})
		})
	}
}