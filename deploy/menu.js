var appid = "wx964fdadab3b05d85";
var sppsecret = "4cdf2e5478da8fdb8104ebb32725301d";

var tokenurl = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential" +
		"&appid=" + appid +
		"&secret=" + sppsecret;

var https = require("https");
https.get(tokenurl, function(res) {
	 res.on("data",function(d){
		 var data = JSON.parse(d.toString());
		 console.dir(data);
		 createMenu(data);
	 });
}).on('error', function(e) {
	console.log(2);
	console.log("Got error: " + e.message);
});


var menu = {
	"button":[{
        "type":"view",
        "name":"云快查",
        "url":"http://www.ebaiding.com/"
    },{
        "name":"新年红包",
        "sub_button":[{
                "type":"view",
                "name":"抢红包",
                "url":"http://www.ebaiding.com/static/coopbis/qianghb.html"
             },{
                "type":"view",
                "name":"发红包",
                "url":"https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx964fdadab3b05d85&redirect_uri=http%3A%2F%2Fwww.ebaiding.com%2Fcoopbis%2FcoopbisForm&response_type=code&scope=snsapi_userinfo&state=login#wechat_redirect"
             },{
                "type":"view",
                "name":"红包排行榜",
                "url":"http://www.ebaiding.com/cooplist"
             },{
                "type":"view",
                "name":"活动说明",
                "url":"http://www.ebaiding.com/static/coopbis/intro.html"
             }
        ]
	},{
        "name":"用户中心",
        "sub_button":[{
	           	 "type":"view",
	             "name":"商户登陆",
	             "url":"http://www.ebaiding.com/bislogin"
	        },{
            	 "type":"view",
	             "name":"用户登陆",
	             "url":"http://www.ebaiding.com/user/login"
            },{
            	 "type":"view",
	             "name":"我的收藏",
	             "url":"http://www.ebaiding.com/collection"
            },{
            	 "type":"click",
	             "name":"申请收录",
	             "key":"bis_apply"
            }
        ]
	}]
};

function createMenu(data){
	if(!data.access_token) return ;
	var options = {
		  hostname: 'api.weixin.qq.com',
		  port: 443,
		  path: '/cgi-bin/menu/create?access_token='+data.access_token,
		  method: 'POST'
	};
	
	var req = https.request(options, function(res) {	
		res.on('data', function(d) {
			  console.log(d.toString());
		});
	});
	
	req.write(JSON.stringify(menu));
	req.end();
	
	req.on('error', function(e) {
		console.log(1);
		console.dir(e);
	});
	
	
}


