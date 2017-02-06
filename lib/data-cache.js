


exports.cssCount = "";
exports.jsCount = "";
exports.nodeCount = "";
exports.lifeCount = "";
exports.timeCount = "";
exports.dateSort={}

//文章类型匹配
exports.cssCount = function(req,res){
	var Article = App.rest.getModel("article")
	Article.count({type:"css"},function(err,c){
		exports.cssCount = c
	})
}
exports.cssCount()

exports.jsCount = function(req,res){
	var Article = App.rest.getModel("article")
	Article.count({type:"js"},function(err,c){
		exports.jsCount = c
	})
}
exports.jsCount()

exports.nodeCount = function(req,res){
	var Article = App.rest.getModel("article")
	Article.count({type:"node"},function(err,c){
		exports.nodeCount = c
	})
}
exports.nodeCount()

exports.lifeCount = function(req,res){
	var Article = App.rest.getModel("article")
	Article.count({type:"life"},function(err,c){
		exports.lifeCount = c
	})
}
exports.lifeCount()






exports.dateSort = function(req,res){
	var Article = App.rest.getModel("article")
	var datelist={}
	Article.find({},function(err,list){
		if(err){
			console.log(err)
		}	
		list.forEach(function(item,i){
			var date_month=item.ctime.getFullYear().toString()+"年"+
			(item.ctime.getMonth()+1).toString()+"月"
			if(date_month in datelist){
			    var articleNum=parseInt(datelist[date_month])+1;
				datelist[date_month]=articleNum.toString()
			}else{
				datelist[date_month]="1"
			}
		})
		exports.dateSort=datelist;
	})
}
exports.dateSort()
/*//文章时间匹配
exports.timeCount=function(req,res){
	var Article = App.rest.getModel("article")
	Article.count({ctime:"//"},function(err,c){
		exports.lifeCount = c
	})
}
exports.timeCount()*/

/*<%=App.cache.cssCount%>*/
