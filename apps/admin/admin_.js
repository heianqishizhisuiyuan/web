var Admin = App.rest.getModel("admin");
	/*var Biz = App.rest.getModel("biz");*/


exports.showRegist=function (req,res) {
	var Admin = App.rest.getModel("admin")
	Admin.find({},function(err,list){
		if(err){
			console.log(err)
		}
		if(list.length==1){
			res.render("login.html")
		}else if(list.length==0){
			res.render("regist.html")
		}
	})
	
}
exports.showLogin=function (req,res) {
	res.render("login.html")
}
exports.showAdmin=function (req,res) {
	
	var loginadmin = req.session['loginadmin'];
	if(loginadmin){
		res.render("admin.html",{
			loginadmin:loginadmin,
		})
	}else{
		res.render('login.html')
	}
	
}







exports.post_adminRegist=function(req,res){
	var Admin=App.rest.getModel('admin');
	var mobile = req.body["mobile"];

	Admin.findOne({mobile:mobile},function(err,admin){
		if(err){
			console.log(err)
		}
		if(admin){
			res.json({
				code:-1
			})
		}else{
			res.json({
				code:1
			})
		}
	})
}
exports.post_adminLogin=function (req,res) {
	var Admin = App.rest.getModel("admin");
	var mobile=req.body['mobile'];
	var password=req.body['password'];
	
	Admin.findOne({mobile:mobile},function(err,admin){
		if(err){
			console.log(err)
		}
		if(!admin){
			res.json({
				code:-1
			})
		}
		if(admin){
			if(admin.password==password){
				 req.session["loginadmin"] = admin.toJSON();
				res.json({
					code:1
				})
			}else{
				res.json({
					code:-1
				})
		}
		}
	})
}
exports.post_adminSignout=function(req,res){
	delete req.session['loginadmin']
	res.json({
		code:1,
	})
}


exports.showoneMenu=function(req,res){
	res.render("oneMenu.html")
}
exports.showtwoMenu=function(req,res){
	
	res.render("twoMenu.html")
}

exports.showUserList=function(req,res){
	var User=App.rest.getModel('user')
	User.find({},function(err,list){
		if(err){
			console.log(err)
		}
		if(list){
			res.json({
				list:list||[]
			})
		}
	})
}
exports.showVisitorList=function(req,res){
	var Visitor=App.rest.getModel('visitor')
	Visitor.find({},function(err,list){
		if(err){
			console.log(err)
		}
		if(list){
			res.json({
				list:list||[]
			})
		}
	})
}
exports.showArticle_btn=function (req,res) {
	res.render("article.html")
}

exports.addArticle=function (req,res) {
	var Article=App.rest.getModel('article')
	var artid=req.body['artid']
	Article.findOne({id:artid},function(err,article){
		if(err){
			console.log(err)
		}
		res.render("addArticle.html",{
			article : article || {}
		})
	})
}

exports.showArticleFrame=function(req,res){
	res.render("showArticleFrame.html")
}
exports.showArticleList=function(req,res){
	
	var Article=App.rest.getModel('article')
	Article.find({},function(err,list){
		if(err){
			console.log(err)
		}
		if(list){
			res.json({
				list:list||[]
			})
		}
	})
}
exports.post_removeArticle=function(req,res){
	var Article=App.rest.getModel('article')
	var id=req.body['id']
	console.log(id)
	Article.remove({id:id},function(err){
		if(err){
			console.log(err)
		}else{
			res.json({
				code:1
			})
		}
	})
}
exports.get_everydaywordMenu=function(req,res){
	res.render("everydayMenu.html")
}

exports.get_showEverydaywords=function(req,res){
	res.render('everydayword.html')
}
exports.get_showEverydayWordsList=function(req,res){
	
	var Everydayword=App.rest.getModel('everydayword')
	Everydayword.find({},function(err,list){
		if(err){
			console.log(err)
		}
		res.render("everydayWordsList.html",{
			list:list
		})
	})
}


/*轮播器*/

exports.get_editorRoll=function(req,res){
	res.render("carousel-set.html")
}



/*exports.showUserList=function(req,res){
	var User=App.rest.getModel('user')
	User.find({},function(err,list){
		if(err){
			console.log(err)
		}
		if(list){
			res.json({
				list:list||[]
			})
		}
	})
}
*/








