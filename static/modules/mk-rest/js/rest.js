
var Rest = window.Rest || {};

Rest.create = function(model_name){
	return {
		add : function(data,callback){
			$.ajax({
				url : "/add/"+model_name,
				data : data,
				type : "post",
				success : callback
			});
		},
		query : function(data,callback){
			$.ajax({
				url : "/query/"+model_name,
				data : data,
				type : "get",
				success : callback
			});
		},
		get : function(id,callback){
			$.ajax({
				url : "/get/"+model_name+"/"+id,
				type : "get",
				success : callback
			});
		},
		update : function(query,data,callback){
			$.ajax({
				url : "/update/"+model_name+"?"+$.param(query),
				type : "post",
				data : data,
				success : callback
			});
		},
		remove : function(data,callback){
			$.ajax({
				url : "/remove/"+model_name,
				type : "get",
				data : data,
				success : callback
			});
		},
		action : function(action,data,callback){
			$.ajax({
				url : "/action/"+model_name+"/"+action,
				type : "post",
				data : data,
				success : callback
			});
		}
	}
}
