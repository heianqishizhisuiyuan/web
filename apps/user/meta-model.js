/*var updateCache=function(model,listname){
    model._trigger = {
        "on_add" : function(){
            setTimeout(function(){
                model.find({},function(err,list){
                    if(err){console.dir(err)}
                    App.cache[listname] = list
                })
            },500);
        },
        "on_update" : function(query,data){
             setTimeout(function(){
                model.find({},function(err,list){
                    if(err){console.dir(err)}
                    App.cache[listname] = list
                })
            },500);
        },
        "on_remove" : function(query){
             setTimeout(function(){
                model.find({},function(err,list){
                    if(err){console.dir(err)}
                    App.cache[listname] = list
                })
            },500);
        }
    }
}*/
//
//var User  = exports.User = App.rest.regist('user',function(){
//	mobile : Number,
//	password : String
//});
var User = exports.User = App.rest.regist("user",{
	mobile : Number,
	password : String,
	username : String,
	sex : String,
	address : String,
});