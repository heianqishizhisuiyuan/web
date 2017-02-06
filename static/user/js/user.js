$(function(){
	$('#user_regist').click(function(){
		var mobile = $('input[name=mobile]').val();
		var password = $('input[name=password]').val();
		var repassword = $('input[name=repassword]').val();
		
		if(!$.form.isEmpty(mobile)){
			$.tip('手机号码不能为空！');
		}else if(!$.form.isPhone(mobile)){
			$.tip('手机号码格式错误！');
		}else if(!$.form.isEmpty(password)){
			$.tip('密码不能为空！');
		}else if(!$.form.isEmpty(repassword)){
			$.tip('确认密码不能为空！');
		}else if(!$.form.isSame(password,repassword)){
			$.tip('两次密码输入不一致！');
		}else{
			remoter.post('user/userRegist',{
				mobile:mobile
			},function(rs){
				if(rs.code == 1){
					var mRest = Rest.create('user');
	    			mRest.add({
						mobile:mobile,
						password:password
					});
					$.tip('注册成功！');
				}else if(rs.code == -1){
					$.tip('该用户已被注册！');
				}
			});
		}
	});
	
	$('#user_login').click(function(){
		var mobile = $('input[name=mobile]').val();
		var password = $('input[name=password]').val();
		
		if(!$.form.isEmpty(mobile)){
			$.tip('手机号码不能为空！');
		}else if(!$.form.isPhone(mobile)){
			$.tip('手机号码格式错误！');
		}else if(!$.form.isPhone(mobile)){
			$.tip('用户不存在！');
		}else if(!$.form.isEmpty(password)){
			$.tip('密码不能为空！');
		}else if(!$.form.isEmpty(password)){
			$.tip('密码错误！');
		}else{
			remoter.post('/user/userLogin',{
				mobile:mobile,
				password:password
			},function(rs){
				if(rs.code == 1){
					$.tip('登陆成功！');
					location.href = '../myinfo.html';
				}else if(rs.code == -1){
					$.tip('该用户未注册！');
				}else if(rs.code == 0){
					$.tip('密码错误！');
				}
			});
		}
	});
	

	
	
	
	
	$('.chose').click(function(){
		$('.ui-actionsheet').addClass('show');
	});
	setTimeout(function(){
		$('.person_close').click(function(){
			$('.ui-actionsheet').removeClass('show');
		});
	},1000);
	
	


	 $('.ui-searchbar').tap(function(){
        $('.ui-searchbar-wrap').addClass('focus');
        $('.ui-searchbar-input input').focus();
    });
    
    $('.ui-searchbar-cancel').tap(function(){
        $('.ui-searchbar-wrap').removeClass('focus');
    });
    
    
    $('.name_button').click(function(){
//  	var mRest = Rest.create('user');
    	var id = $('input[name=userid]').val();
    	var username = $("#new_name").val();
    	if(!username){
    		$.tip('用户名不能为空！');
    	}else{
//  		mRest.update({id:id},{username : username},function(){
//	    		$.tip('保存成功！');
//	    	});

			remoter.post('/user/updateUsername',{
				newname:username,
				id:id
			},function(rs){
				if(rs.code == -1){
					$.tip('该用户名已被注册！');
				}else if(rs.code == 1){
					$.tip('保存成功！');
					setTimeout(function(){
						location.href = '/person.html';
					},1000);
				}
			});
			
    	}
    });
    
    $('.addr_button').click(function(){
    	var id = $('input[name=useraddrid]').val();
    	var address = $('[name=address]').val();
    	if(!address){
    		$.tip('地址不能为空！');
    	}else{
    		remoter.post('/user/updateAddress',{
    			address:address,
    			id:id
    		},function(rs){
    			if(rs.code == 1){
    				$.tip('保存成功！');
    				setTimeout(function(){
						location.href = '/person.html';
					},1000);
    			}
    		});
    	}
    });
    
    $('.phone_button').click(function(){
    	var id = $('input[name=userphoneid]').val();
    	var mobile = $('[name=userphone]').val();
    	if(!mobile){
    		$.tip('手机号不能为空！');
    	}else if(!$.form.isPhone(mobile)){
    		$.tip('手机号码格式错误！');
    	}else{
    		remoter.post('/user/updateMobile',{
    			mobile:mobile,
    			id:id
    		},function(rs){
    			if(rs.code == -1){
    				$.tip('该手机号已被注册！');
    			}else if(rs.code == 1){
    				$.tip('保存成功！');
    				setTimeout(function(){
						location.href = '/person.html';
					},1000);
    			}
    		});
    	}
    });
    
  /*  $('.sex_chose button').click(function(){
    	var id = $('input[name=userpersonid]').val();
    	var _this = $(this);
    	var sex = _this.text();
    		remoter.post('/user/updateSex',{
    			sex:sex,
    			id:id
    		},function(rs){
    			if(rs.code == 1){
  					
    				$.tip('保存成功！');
					setTimeout(function(){
						location.href = '/person.html';
					},1000);
    			}
    		});
    });
    */
    $('.password_button').click(function(){
    	var id = $('input[name=userpasswordid]').val();
    	var oldpassword = $('input[name=oldpassword]').val();
    	var newpassword = $('input[name=newpassword]').val();
    	var repassword = $('input[name=repassword]').val();
    	
    	if(!oldpassword){
    		$.tip('原密码不能为空！');
    	}else if(!newpassword){
    		$.tip('新密码不能为空！');
    	}else if(newpassword != repassword){
    		$.tip('重复密码错误！');
    	}else{
    		remoter.post('/user/updatePassword',{
    			oldpassword : oldpassword,
    			newpassword : newpassword,
    			id:id
    		},function(rs){
    			if(rs.code == -1){
    				$.tip('原密码错误！');
    			}else if(rs.code == 1){
    				$.tip('密码修改成功！');
    				setTimeout(function(){
						location.href = '/person.html';
					},1000);
    			}
    		});
    	}
    });
	

    $(".ui-list li").click(function () {
    
    	if($(this).data("href")){
    		location.href=$(this).data('href')
    	}
    })
    
    $(".signOut").click(function () {
    	remoter.post("/user/signOut",{},function(rs){
    		if(rs.code==1){
    			$.tip("退出成功")
    			location.href='login.html'
    		}
    	})
    })
    
    
    
    
    
});


















