

http = require("http");
https = require("https");
var querystring = require("querystring");

exports.getJSON = function(url,param,callback){

    var ps = [];

    //querystring.stringify(param);
    if(param){
        url = url +"?"+ querystring.stringify(param);
    }
    //ps.join("&");

    var dataarr = [];

    //console.log(url);

    try{

        http.get(url, function(res1) {
            res1.on("data",function(d){
                dataarr.push(d.toString());
            });

            res1.on("end",function(){
                try{
                    //console.log(dataarr.join(""));
                    var json = JSON.parse(dataarr.join(""));
                    //console.dir(json.data.result);
                    callback(json);
                }catch(e){
                    console.dir(e);
                    callback(null);
                }
            });
        }).on("end",function(){

        }).on('error', function(e) {
            console.dir(e);
            callback(null);
        });

    }catch(e){
        console.dir(e);
        callback(null);
    }

}

exports.postData = function(host,path,data,callback){
    //var postData = querystring.stringify(data);

    var ps = [];
    var dataarr = [];
    var options = {
      hostname: host,
      port: 80,
      path: path,
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json;charset=utf-8'
      }
    };

    var req = https.request(options, function(res) {
        res.setEncoding('utf8');
        res.on("data",function(d){
            dataarr.push(d.toString());
        });

        res.on("end",function(){
            try{
                var json = JSON.parse(dataarr.join(""));
                callback(json);
            }catch(e){
                console.dir(e);
                callback(null);
            }
        });
    }).on("end",function(){

    }).on('error', function(e) {
        console.dir(e);
        callback(null);
    });

    req.write(data);
    req.end();

}

