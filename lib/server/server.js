var express = require('express');
var app = express();
var fs = require('fs');
var path = require('path');
var Cookies = require('cookies');
var ejs = require('ejs');
//var dust = require('dustjs-linkedin');
//var cons = require('consolidate');

app.set('views', App.root_dir + '/apps');

app.engine('html', ejs.renderFile);
app.set('view engine', 'ejs'); 


//app.set('view engine', 'dustjs-linkedin');

app.use(express.query());
app.use(require("body-parser").json());
app.use(require("body-parser").urlencoded({ extended: false }));
app.use(require("cookie-parser")());
app.use(require('cookie-session')({secret: 'keyboard cat', cookie: {maxAge: 60*60*1000}}));

app.use('/static',express.static(App.static_dir));
app.use('/upload',express.static(App.upload_dir));


app.use(function(req, res, next){
    //console.log(req.cookies["userphone"]);

    if(req.cookies["userphone"] && !req.session["loginuser"]){

        App.model.User.findOne({userphone : req.cookies["userphone"]},function(err,user){
            if(!err && user){
                var cookie = new Cookies(req, res);
                cookie.set("userphone",user.userphone,{maxAge:30*24*60*60*1000});
                req.session["loginuser"] = user.toJSON();
            }            
            
            next();
        });
    }else{
        next();
    }

});

exports.app = app;
exports.listen = function(port){
    app.listen(port);
    App.logger.info("listen to the port "+port);
};

exports.loadApp = function(app_path,dir){
    var config = null;
    App.logger.info("loading app "+ dir);
    config = require(App.root_dir+"/apps/"+dir+"/config");

    if(config && config.setting){
        config.setting(app);
    }

    function relViewPath(action){
        return function(req,res,callback){
            res._viewpath = path.join(dir,"tmpl");
            action.apply(this,arguments);
        }
    }

    if(config && config.route){
        config.route({
            get:function(sub_path,action){
                app.get(handlePath(app_path, sub_path),relViewPath(action)); 
            },
            post:function(sub_path,action){
                app.post(handlePath(app_path, sub_path),relViewPath(action));
            },
            _app : app
        });
    }

    if(config && config.remoter){
        config.remoter({
            bind : function(handle){
                for(var m in handle){
                    if(m.indexOf("get_") == 0){
                        var p_ = m.replace("get_","");
                        app.get(handlePath(app_path, p_),relViewPath(handle[m]));  
                    }else if(m.indexOf("post_") == 0){
                        var p_ = m.replace("post_","");
                        app.post(handlePath(app_path, p_),relViewPath(handle[m]));  
                    }
                }
            }
        });
    }
};

exports.config = function(callback){
    callback(app);
};

var reg = new RegExp("\\"+path.sep,"g");
function handlePath(app_path,sub_path){
    if(sub_path == "/") sub_path = "";
    var path_ = path.join(app_path,sub_path);
    return path_.replace(reg,"/");
}

global.handleError = function(err,callback){
    if(err){
        if(typeof callback == "function"){
            callback(err);
        }else{
            console.log(err);
        }

        return true;
    }
    return false;
};
