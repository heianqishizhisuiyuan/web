var Article = App.rest.getModel("article");
var Everydayword=App.rest.getModel("everydayword")
exports.showIndex=function (req,res) {
	var Article=App.rest.getModel('article')
	var query = Article.find({});
	var query_everyday=	Everydayword.find({})
	query_everyday.sort({ctime:-1})
	query_everyday.skip(0);
	query_everyday.limit(1)
	query.sort({ctime:-1});//倒序
	query.skip(0);//分页
	query.limit(4);//条数
	/*Article.count({type:"css"},function(err,c){
	})*/
	query.find(function(err,article){
		if(err){
			console.log(err)
		}
		Article.find({},function(err,articles1){
			query_everyday.find(function(err,everydayword){
				res.render('index.html',{
				article:article||{},
				articles1:articles1.length||{},
				pages:0,
				everydayword:everydayword||{},
			})
			})
		
		})
	})
};

/*exports.personalArticle=function (req,res) {
	var Article=App.rest.getModel('article')
	var loginadmin = req.session['loginadmin'];
	Article.find({},function(err,article){
		if(err){
			console.log(err)
		}
		res.render('personalArticle.html',{
			article:article||{},
			loginadmin:loginadmin||{},
		})
		res.json({
			article:article||{},
			loginadmin:loginadmin||{}
		})
	})
};*/




			
/*exports.post_Article_youself = function(req,res){
	var Article=App.rest.getModel('article');
	var Visitor=App.rest.getModel('visitor')
	var loginadmin = req.session['loginadmin'];
	var id=req.body['id'];
	Article.findOne({id:id},function(err,article){
		if(err){
			console.log(err)
		}
		if(article){
			Visitor.find({artid:id},function(err,visitor){
				if(err){
					console.log(err)
				}
				if(visitor){
					res.render("anArticle.html",{
					article:article,
					loginadmin:loginadmin,
					visitor:visitor
					})
				}else{
					res.render("anArticle.html",{
						article:article,
						loginadmin:loginadmin,
						visitor:{}
						
					})
				}
			})
		}

	})
}


*/




exports.anArticle = function(req,res){
	var id = req.params["artid"];
	var Article=App.rest.getModel('article');
	var Visitor=App.rest.getModel('visitor')
	var query = Article.findOne({id:id});
	query.sort({ctime:-1});//倒序
	query.skip(0);//分页
	query.limit(10);//条数
	query.findOne(function(err,article){
		if(err){
			console.log(err)
		}
		if(article){
			Visitor.find({artid:id},function(err,visitor){
				if(err){
					console.log(err)
				}
				if(visitor){
					var query_aritcle=Article.find({})
					query_aritcle.sort({ctime:-1});//倒序
					query_aritcle.skip(0);//分页
					query_aritcle.limit(4);//条数
					query_aritcle.find(function(err,art_all){
						if(err){
							console.log(err)
						}
						res.render("anArticle.html",{
						article:article,
						art_all:art_all,
						visitor:visitor||{}
						})
					})
					
				}/*else if(!visitor){
					res.render("anArticle.html",{
						article:article,
						visitor:{}
					})
			}*/
			})
		}

	})
	
}
//主页翻页效果
exports.post_getpage=function(req,res){
	var pages=req.body['pages']
	var Article=App.rest.getModel('article')
	var query = Article.find({})
	pages=parseInt(pages)
	query.sort({ctime:-1});//倒序
	query.skip(pages*4);//分页
	query.limit(4);//条数
	query.find(function(err,article){
	if(err){
		console.log(err)
	}
	Article.find({},function(err,articles1){
		res.render('pages.html',{
			article:article||{},
			articles1:articles1.length||{},
				pages:pages,
				type:0
			})
		})
		
	})
}
//文章类型分类
exports.articleType=function(req,res){
	var type = req.params["typeid"];
	var Article=App.rest.getModel('article')
	var query = Article.find({type:type});
	query.sort({ctime:-1});//倒序
	query.skip(0);//分页
	query.limit(4);//条数
	query.find(function(err,article){
		if(err){
			console.log(err)
		}
		Article.count({type:type},function(err,c){
			res.render('articleType.html',{
				article:article||{},
				articles1:c||{},
				pages:0,
			})
		
		})
	})
}
//文章类型翻页效果
exports.post_typeGetPage=function(req,res){
	var pages=req.body['pages']
	var type=req.body['type']
	var Article=App.rest.getModel('article')
	var query = Article.find({type:type})
	pages=parseInt(pages)
	query.sort({ctime:-1});//倒序
	query.skip(pages*4);//分页
	query.limit(4);//条数
	query.find(function(err,article){
	if(err){
		console.log(err)
	}
	Article.find({},function(err,articles1){
		res.render('pages.html',{
			article:article||{},
			articles1:articles1.length||{},
				pages:pages,
				type:type
			})
		})
		
	})
}
//文章时间分类
exports.articleDate=function(req,res){
var articledate = req.params["dateid"];
var articledate_up=(parseInt(articledate.replace(',','0897'))+1).toString().replace("0897",",")  

if(articledate.length==6){
	articledate=articledate.replace(",","-0")
	articledate_up=articledate_up.replace(",","-0")
}else{
	articledate=articledate.replace(",","-")
	articledate_up=articledate_up.replace(",","-")
}
	var Article=App.rest.getModel('article')
	var query=Article.find({ctime:{"$gt":"20168"}})
	query.sort({ctime:-1});//倒序
	query.skip(0);//分页
	query.limit(4);//条数
	query.find(function(err,article){
		
		if(err){
			console.log(err)
		}
		Article.count({},function(err,c){
			res.render('articleDate.html',{
				article:article||{},
				articles1:c||{},
				pages:0,
			})
		})	
			
	})
}
exports.display=function(req,res){
	res.render("display.html")
}

exports.bootstrap=function(req,res){
	res.render("bootstrap.html")
}

exports.resume=function(req,res){
	res.render("resume.html")
}

exports.mi=function(req,res){
	res.render("mi.html")
}
exports.chuangkit=function(req,res){
	res.render("chuangkit.html")
}




