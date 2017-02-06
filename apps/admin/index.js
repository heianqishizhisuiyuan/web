exports.app_dir = __dirname;
var admin = require("./admin_");
var metamodel = require("./meta-model");

exports.route = function(app, remoter) {
	app.get('../regist.html',admin.showRegist)
	app.get('../login.html',admin.showLogin)
	app.get('../admin.html',admin.showAdmin)
	app.get('../oneMenu.html',admin.showoneMenu)
	app.get('../twoMenu.html',admin.showtwoMenu)
	app.get('../userList.html',admin.showUserList)
	app.get('../visitorList.html',admin.showVisitorList)
	app.get('../articl.html',admin.showArticle_btn)
	app.post('../addArticle.html',admin.addArticle)
	app.get('../showArticleFrame.html',admin.showArticleFrame)
	app.get('../showArticleList.html',admin.showArticleList)
	
	remoter.bind(admin)
	
}