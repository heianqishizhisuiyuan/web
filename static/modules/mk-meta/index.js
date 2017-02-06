
var MetaLoader = function(modelname,wrapper){
    var MetaRest = Rest.create(modelname);
    var self = {
        loadList : function(page){  
            self.page = page || self.page || "0";    
            // if(!page)page = "0";      
            $.ajax({
                url:"/mkmeta/list/"+modelname,
                data : {page:self.page},
                success:function(h){
                    wrapper.html(h);
                    self.bindAction();
                }
            });
        },
        
        bindAction : function(){
            wrapper.find("a.delete").click(function(){
                var id = $(this).attr("id")
                if(confirm("确定要删除此案例吗？")){
                    MetaRest.remove({id:id},function(rs){                        
                        $.tip(rs.message);
                        if(rs.code > 0){
                            self.loadList();
                        }                        
                    });              
                }
            });
            
            wrapper.find("a.edit").click(function(){
                var metaid = $(this).attr("id")
                self.loadMetaEdit(metaid);
            });
            
            wrapper.find("button#addcase").click(function(){
                self.loadMetaEdit();
            });
            
            wrapper.find(".pager-bar").pager(function(page){
                self.loadList(page);
            });
        },
        
        loadMetaEdit:function(metaid){
            $.ajax({
                url:"/mkmeta/editform/"+modelname,
                data:{
                    id : metaid
                },
                success:function(h){
                    var edwrapper = $("<div id='editwrapper' class='dialog-wrapper'></div>");
                    edwrapper.appendTo(document.body);
                    edwrapper.html(h);
                    self.bindEditAction(edwrapper);
                }
            })
        },
        
        bindEditAction : function(wrapper){
            wrapper.find("button.close").click(function(){
                wrapper.remove();
            });
            
            wrapper.find("#image-upload").bindUpload({
                url : "/mkimg/upload",
                accept : "image/*",
                params : {upload_dir:"metaimg"},
                oncomplate : function(data){
                    var wp = wrapper.find("#image-upload").parent().parent();
                    wp.find(".up-img").attr("src",data.url).show();
                    wp.find("input.up-url").val(data.url);
                }
            });
            
            wrapper.find("button#metasave").click(function(){
                var data = wrapper.find("#metaform").serializeJson();
                if(data.isuse == "on"){
                    data.isuse = "1";
                }else{
                    data.isuse = "0";
                }

                if(data.istop == "on"){
                    data.istop = "1";
                }else{
                    data.istop = "0";
                }
                
                if(data.id){
                    var mid = data.id;
                    delete data.id;
                    MetaRest.update({id:mid},data,function(rs){
                        $.tip(rs.message);                        
                        if(rs.code > 0){
                            wrapper.remove();
                            self.loadList();
                        }
                    });
                }else{
                    MetaRest.add(data,function(rs){
                        $.tip(rs.message);
                        if(rs.code > 0){
                            wrapper.remove();
                            self.loadList();
                        }
                    });
                }
            })
        }
    }
    
    return self;
}

