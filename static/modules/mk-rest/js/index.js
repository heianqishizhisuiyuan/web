
function test_add(data){
	var model_name = $("select[name=model_name]").val();
	$.ajax({
		url : "/add/"+model_name,
		data : data,
		type : "post",
		success : function(rs){
			show_info(JSON.stringify(rs,2));
		}
	});
}

function test_query(data){
	var model_name = $("select[name=model_name]").val();
	$.ajax({
		url : "/query/"+model_name,
		data : data,
		type : "get",
		success : function(rs){
			$("#box-2").val(JSON.stringify(rs.list,null,2));
		}
	});
}

function test_get(id){
	var model_name = $("select[name=model_name]").val();
	$.ajax({
		url : "/get/"+model_name+"/"+id,
		type : "get",
		success : function(rs){
			if(rs.code < 0){
				show_err(JSON.stringify(rs,null,2));
			}else{
				$("#box-2").val(JSON.stringify(rs.data,null,2));
			}
			
		}
	});
}

function test_update(query,data){
	var model_name = $("select[name=model_name]").val();
	$.ajax({
		url : "/update/"+model_name+"?"+$.param(query),
		type : "post",
		data : data,
		success : function(rs){
			if(rs.code < 0){
				show_err(JSON.stringify(rs,null,2));
			}else{
				show_info(JSON.stringify(rs,null,2));
				//$("#box-2").val(JSON.stringify(rs.data,null,2));
			}
			
		}
	});
}

function test_remove(data){
	var model_name = $("select[name=model_name]").val();
	$.ajax({
		url : "/remove/"+model_name,
		type : "get",
		data : data,
		success : function(rs){
			if(rs.code < 0){
				show_err(JSON.stringify(rs,null,2));
			}else{
				show_info(JSON.stringify(rs,null,2));
			}
			
		}
	});
}

/*
function test_custom(data){
	$.ajax({
		url : "/action/"+model_name+"/update_phone",
		type : "post",
		data : data,
		success : function(rs){
			if(rs.code < 0){
				show_err(JSON.stringify(rs,null,2));
			}else{
				show_info(JSON.stringify(rs,null,2));
			}			
		}
	});
}*/



function show_info(str){
	$("#action-info").removeClass("bg-danger").html(str);
}

function show_err(str){
	$("#action-info").addClass("bg-danger").html(str);
}

$(function(){
	$("#action-add").click(function(){		
		try{
			var datastr = $("#box-2").val();
			var data = eval("("+datastr+")");
			test_add(data);
		}catch(e){
			show_err(e.toString());
		}
	});

	$("#action-query").click(function(){		
		try{
			var datastr = $("#box-1").val();
			if(!datastr) datastr = "{}";
			var data = eval("("+datastr+")");
			test_query(data);
		}catch(e){
			show_err(e.toString());
		}
	});

	$("#action-get").click(function(){		
		try{
			var id = $("#box-1").val();
			test_get(id);
		}catch(e){
			show_err(e.toString());
		}
	});

	$("#action-update").click(function(){		
		try{
			var datastr1 = $("#box-1").val();
			if(!datastr1) datastr1 = "{}";
			var data1 = eval("("+datastr1+")");

			var datastr2 = $("#box-2").val();
			if(!datastr2) datastr2 = "{}";
			var data2 = eval("("+datastr2+")");

			test_update(data1,data2);
		}catch(e){
			show_err(e.toString());
		}
	});

	$("#action-remove").click(function(){		
		try{
			var datastr1 = $("#box-1").val();
			if(!datastr1) datastr1 = "{}";
			var data1 = eval("("+datastr1+")");

			test_remove(data1);
		}catch(e){
			show_err(e.toString());
		}
	});

    /*	
	$("#action-cs").click(function(){		
		try{
			var datastr = $("#box-2").val();
			if(!datastr) datastr = "{}";
			var data = eval("("+datastr+")");

			test_custom(data);
		}catch(e){
			show_err(e.toString());
		}
	});
	*/

	

	
});