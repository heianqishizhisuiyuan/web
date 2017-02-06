exports.app_dir = __dirname;
var personal = require("./personal_");
var metamodel = require("./meta-model");
exports.route = function(app,remoter){
   app.get('../',personal.showIndex);
/*   app.get('../personalArticle.html',personal.personalArticle);*/
  	app.get('../anArticle/:artid.html',personal.anArticle);
  	app.get('../:pageid.html',personal.pages);
  	app.get('../articleType/:typeid.html',personal.articleType)
  	app.get('../articleDate/:dateid.html',personal.articleDate)
  	app.get('../display',personal.display)
  	app.get('../bootstrap',personal.bootstrap)
	app.get('../resume.htm',personal.resume)
	app.get('../mi',personal.mi)
	app.get('../chuangkit',personal.chuangkit)
    remoter.bind(personal);
}