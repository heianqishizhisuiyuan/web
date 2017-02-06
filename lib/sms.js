
//var Requester = require("requester");

var host = "https://api.miaodiyun.com";
var accountSid = "d5080ca4233e4e969696aeef9d7b30fd";
//var smsContent = "【长清微学堂】你的验证码是***，5分钟内有效，感谢您的使用！"
var AUTH_TOKEN = "bfe70fcf03684839acfdaeacc51208a3"
//var appkey = "bfe70fcf03684839acfdaeacc51208a3";
//var appid = "f8610003f9424b20ac5d1852835b3403";

var url ="/20150822/industrySMS/sendSMS";

//var request = require('request');

function post(url,data,callback_){
    console.log(data)
    var options = {
      url: url,
      method: 'post',
      headers: {
       //'Accept': 'application/json',
       "encoding":"utf8",
       'Content-Type': 'application/x-www-form-urlencoded'
      },
      form: data
    };


    function callback(error, response, body) {
      if (!error && response.statusCode == 200) {
        callback_(body);
      }
    }

    request(options, callback);
}




exports.sendSMS = function(to,opts,callback){
    var timestamp =  new Date().pattern("yyyyMMddHHmmss");

    var sig = App.common.md5(accountSid+AUTH_TOKEN+timestamp).toLowerCase();

    var curl = host + url;
    var data = ""

  /*  var d = {
        accountSid: accountSid, 
        smsContent: "【长清微学堂】你的验证码是"+opts.code+"，5分钟内有效，感谢您的使用！",  
        to: to,
        timestamp : timestamp,
        sig : sig
    }*/
    if(opts.code == 'getEnrollNotice'){
        var smsContent = "【长清微学堂】手机号码是"+opts.tel+"的用户，在"+opts.group_title+"中报名了，请及时登录微学堂后台进行处理！"  
    }else{
        var smsContent = "【长清微学堂】你的验证码是"+opts.code+"，5分钟内有效，感谢您的使用"  
    }
    data = "accountSid="+accountSid+"&smsContent="+smsContent+"&to="+to+"&timestamp="+timestamp+"&sig="+sig
    post(curl,data,callback)
}

exports.sendValiCode = function(phone,code,callback){
    exports.sendSMS(phone,{
        code : code
    },function(data){
        if(typeof callback == "function"){
           callback(data);
        }
        //console.dir();
    });
}
//
exports.sendNotice = function(phone,opts,callback){
    exports.sendSMS(phone,opts,function(data){
        if(typeof callback == "function"){
           callback(data);
        }
        //console.dir();
    });
}

exports.sendService = function(phone,param,callback){
    exports.sendSMS(phone,{
        tmplid : "17207795",
        param : param.join(",")
    },function(data){
        if(typeof callback == "function"){
           callback(data);
        }
        //console.dir();
    });
}

exports.sendTemplate = function(phone,tmplId,callback){
    exports.sendSMS(phone,{
        tmplid : tmplId,
        param : "1"
    },function(data){
        if(typeof callback == "function"){
           callback(data);
        }
    });
}



/*exports.sendValiCode("13113113111","123123",function(data){
  console.dir(data)
});*/


/*
var params = ["13573771903","服务咨询","你好我是上帝！"];
exports.sendService("13573771903",params,function(){
    console.dir(data);
});
*/

