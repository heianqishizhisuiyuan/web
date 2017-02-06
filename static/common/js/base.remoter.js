var remoter = {
	get : function(path,data,callback){
		$.ajax({
			url : path,
			data : data,
			timeout : 5000,
			error : function(err){
				console.log(err);
				callback(null);
			},
			success : function(data){
				callback(data);
			}
		});
	},
	post : function(path,data,callback){
		$.ajax({
			url : path,
			data : data,
			type : "post",
			timeout : 10000,
			error : function(err){
				console.log(err);
				callback(null);
			},
			success : function(data){
				callback(data);
			}
		});
	}
}