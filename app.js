var App = global.App = {
    apps_dir : __dirname + "/apps",
    static_dir : __dirname + "/static",
    upload_dir : __dirname + "/upload",
    lib_dir : __dirname + "/lib",
    root_dir : __dirname
};

App.api = {};
var common = require("mk-common");
App.common = require("./lib/common");
App.util = common.util;
App.uuid = common.uuid;
App.md5 = common.md5;
App.sms = require("./lib/sms");
App.meta = require("./lib/meta-data");
App.email = require("./lib/email");

//App.mongo = require("./lib/db/mongo").mongoose;
App.cv = new Date().getTime();

//html文字片段
var trimHtml = require('trim-html');

var server = require("mk-server")({
	root_dir : __dirname,
	db_uri : 'mongodb://localhost:27017/xnearu',
	static_dir:["static","upload"]
});

App.logger = server.logger;

App.rest = server.rest;


//配置图片上传功能
server.route("/mkimg",require("mk-image")({
	root_dir : __dirname,
	upload_dir : "upload"
}));


server.route("/mkmeta",require("mk-meta")({
	root_dir : __dirname,
	rest : App.rest
}));
server.route("/admin",require("./apps/admin")); 
server.route("/user",require("./apps/user")); 
server.route("/personal",require("./apps/personal"));

App.cache = require("./lib/data-cache");

server.listen(8001);