
var methodMapping = {};

exports.dwrMapping = function(app){
    app.get("/dwr/remote",function(req,res){
        var action = req.param("__action");
        delete req.query["__action"];

        var param = req.param("param") || {};

       // console.log(param);

        if(typeof param == "string"){
            param = JSON.parse(param);
        }

        param["req"] = req;
        param["res"] = res;

        if(methodMapping[action]){

            var rs = methodMapping[action](param,function(rs_){
                if(rs_)
                    res.end(JSON.stringify(rs_));
                else
                    res.end("");
            });

            if(rs){
                res.end(JSON.stringify(rs));
            }
        }
    });

    app.get("/dwr/mapping",function(req,res){
        var actions =[];
        for(var h in methodMapping){
            actions.push(h);
        }
        res.end(JSON.stringify(actions));
    });
};

var mapping = exports.mapping = function(handle,actions){
    if(typeof actions == "function"){
        methodMapping[handle] = actions;
    }else{
        for(var m in actions){
            if(typeof actions[m] == "function"){
                methodMapping[handle+"."+m] = actions[m];
            }
        }
    }
};
