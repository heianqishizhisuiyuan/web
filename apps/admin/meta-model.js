var Admin = exports.Admin = App.rest.regist("admin",{
	mobile : Number,
	password : String,
	username : String,
	sex : String,
	address : String,
});
var Article=exports.Article = App.rest.regist("article",{
	adminname:String,
	title : String,
	content : String,
	getContentTxt:String,
	type:String,
	imgurl:String,
});

var Everydayword=exports.Everydayword=App.rest.regist("everydayword",{
	content:String,
	
});