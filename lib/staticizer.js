var fs = require("fs");
var path = require("path");

var mk_dir = function(root,path){
    if(!path)return;

    path = path.replace(/\\/g,"/");
    var dirs = path.split("/");

    var tpath = root;
    while(tpath && dirs.length >0){
        tpath = tpath + "/" + dirs.shift();
        if(!fs.existsSync(tpath)){
            fs.mkdirSync(tpath);
        }
    }
};


module.exports = function(req,res,dpath){
    return function(err,html){
       

       if(err){
            console.dir(err);
            res.end("error");
       }
       
       //console.log(html);

        res.end(html);

        dpath = dpath || req.path

        //console.log(dpath);

        if(!html || dpath.indexOf(".html")<0){
            return ;
        }
        
        process.nextTick(function(){
            var root = path.join(__dirname,"../web");
            

            var folders = dpath.split("/");
            folders.pop();
            mk_dir(root,folders.join("/"));

            var fp = path.join(root,dpath);

           // console.log(fp);

            fs.writeFile(fp, html, "utf8", function (err) {
              if (err) console.dir(err);
            });
        });

    }
}
