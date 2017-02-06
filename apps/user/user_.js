	var User = App.rest.getModel("user");
	var Biz = App.rest.getModel("biz");
	
	exports.showLogin=function(req,res){
	    res.render("login.html",{
	    	type : "user",
	    	tip : ""
	    })
	}
	
	exports.showRegist=function(req,res){
		res.render("regist.html",{})
	}
	
	exports.showWeixin_regist=function(req,res){
		var User = App.rest.getModel("user");
		var authcode = req.query["code"];
		var state = req.query["state"];
		if(authcode&&state){
			App.weixinapi.getAuthUser(authcode,function(data){
				var openid = data.openid
				User.findOne({
					openid : openid
				},function(err,user){
					if(user){
						req.session["loginuser"] = user.toJSON()
						res.render("../../home/tmpl/index.html",{
							user : user||{},
							islogin : "1"
						})
					}else{
						res.render("weixin_regist.html",{
			           		authen : data || {}
			           	}); 
					}
				})
	        });
		}
	}
	 
	exports.post_Login = function(req,res){
		var type = req.body["type"];
		var Model = App.rest.getModel(type);
		var mobile = req.body["mobile"];
		var password = req.body["password"];
		Model.findOne({mobile:mobile},function(err,obj){
			if(obj && obj.password == App.md5.b64_md5(password)){
				req.session["login"+type] = obj.toJSON();
				res.json({
					code : 1
				})
			}else if(obj && obj.password != App.md5.b64_md5(password)){
				res.json({
					code : -1
				})
			}else if(!obj){
				res.json({
					code : -2
				})
			}
		})
	}
	
	exports.post_Regist = function(req,res){
		var type = req.body["type"];
		var Model = App.rest.getModel(type);
		var mobile = req.body["mobile"];
		var password = req.body["password"];
		var valicode = req.body["valicode"];
		if(!req.session["valicode"] || valicode != req.session["valicode"]){
	        res.json({code : -1})
	    }else{
			var type = new Model({
				id : App.uuid.createShortId(),
				mobile : mobile,
				password : App.md5.b64_md5(password),
				ctime : new Date(),
				avatar : "/static/common/images/avatar.jpg",
				address : "编辑地址",
				sex : "1"
			})
			type.save(function(err){
				if(err){console.dir(err)}
				req.session["loginuser"] = type.toJSON()
				res.json({
					code : 1
				})
			})
		}
	}
	
	exports.post_weixinRegist = function(req,res){
		var User = App.rest.getModel("user");
		var nickname = req.body["nickname"];
		var openid = req.body["openid"];
		var avatar = req.body["avatar"];
		var mobile = req.body["mobile"];
		var password = req.body["password"];
		var valicode = req.body["valicode"];
		User.findOne({
			openid : openid
		},function(err,user){
			if(user){
				res.json({code:-1})
			}else{
				User.findOne({
					nickname : nickname
				},function(err,user){
					if(user){
						res.json({code : -2})
					}else{
						if(!req.session["valicode"] || valicode != req.session["valicode"]){
					        res.json({code : -3})
					    }else{
					    	var user = new User({
								id : App.uuid.createShortId(),
								ctime : new Date(),
								avatar : avatar,
								nickname : nickname,
								openid : openid,
								mobile : mobile,
								password : App.md5.b64_md5(password)
							})
							req.session["loginuser"] = user.toJSON()
							user.save(function(err){
								res.json({
									code : 1
								})
							})
					    }
					}
				})
			}
		})
	}
	
	exports.post_cancel = function(req,res){
		delete req.session["loginuser"]
		res.json({code : 1})
	}
	
	exports.post_updateLoginuser = function(req,res){
		var User = App.rest.getModel("user");
		var userid = req.body["userid"];
		User.findOne({id:userid},function(err,user){
			req.session["loginuser"] = user.toJSON()
			res.json({
				code : 1
			})
		})
	}
	
	exports.post_changePwd = function(req,res){
		var User = App.rest.getModel("user");
		var user = req.session["loginuser"];
		var old_password = req.body["old_password"];
		var new_password = req.body["new_password"];
		var userid = req.body["userid"];
		if(user.password != App.md5.b64_md5(old_password)){
			res.json({
				code : -1
			})
		}else{
			User.findOne({id:userid},function(err,user){
				user.password = App.md5.b64_md5(new_password)
				user.save(function(err){
					req.session["loginuser"] = user.toJSON()
					res.json({
						code : 1
					});
				});
			});
		}
	}
	
	exports.post_sendValiCode = function(req,res){
		var User = App.rest.getModel("user");
		var phone = req.body["mobile"];
	    User.findOne({
	        mobile : phone
	    },function(err,user){
	        if(user){
	            res.json({code : -1})
	        }else{
	            var code = App.common.rand(899999) + 100000+"";
	            req.session["valicode"] = code;
	            App.sms.sendValiCode(phone,code,function(data){
	                console.dir(data);
	                res.json({
	                    code : 1
	                });
	            });
	        }
	    });
	}
	
	exports.post_changephone = function(req,res){
		var User = App.rest.getModel("user");
		var userid = req.body["userid"];
		var new_mobile = req.body["new_mobile"];
		var valicode = req.body["valicode"];
		if(!req.session["valicode"] || valicode != req.session["valicode"]){
	        res.json({code : -1})
	    }else{
			User.update({id:userid},{mobile:new_mobile},function(err){
				res.json({
					code : 1
				});
			});
		}
	 }
	
	//	生成短ID的接口方法：var user = new User({
	//		id : App.uuid.createShortId(),
	//		ctime : new Date()
	//	});
	exports.post_userRegist = function(req,res){
		var User = App.rest.getModel('user');
		var mobile = req.body['mobile'];
		
		User.findOne({
			mobile:mobile
		},function(err,user){
			if(err){
    			console.log(err);
    		}else if(user){
    			res.json({
    				code:-1
    			});
    		}else if(!user){
    			res.json({
    				code:1	
    			});
    		}
		});
	}

    exports.post_userLogin = function(req,res){
    	var User =  App.rest.getModel('user');
    	var mobile = req.body['mobile'];
    	var password = req.body['password'];
    	
    	User.findOne({
    		mobile:mobile
    	},function(err,user){
    		if(err){
    			console.log(err);
    		}else if(user && user.password == password){
    			req.session['loginuser'] = user.toJSON();
    			res.json({
    				code:1
    			});
    		}else if(!user){
    			res.json({
    				code:-1	
    			});
    		}else if(user && user.password != password){
    			res.json({
    				code:0	
    			});
    		}
    	});
    }
    
    exports.showInfo = function(req,res){
    	var loginuser = req.session['loginuser'];
    	if(loginuser){
    		res.render('myinfo.html',{
    			loginuser:loginuser
    		});
    	}else{
    		res.render('login.html',{
    		});
    	}
    	
    }
    
    exports.showPerson = function(req,res){
    	var loginuser = req.session['loginuser'];
    	console.log(loginuser)
    	if(loginuser){
    		res.render('person.html',{
    			loginuser:loginuser
    		});
    	}else{
    		res.render('login.html',{
    		});
    	}
    	
    }
    
    exports.showPerson_name = function(req,res){
    	var loginuser = req.session['loginuser'];
    	
    	if(loginuser){
    		res.render('person_name.html',{
    			loginuser:loginuser
    		});
    	}else{
    		res.render('login.html',{
    		});
    	}
    	
    }
	
	
	exports.post_updateUsername = function(req,res){
		var User =  App.rest.getModel('user');
		var username = req.body['newname'];
		var id = req.body['id'];
		
		User.findOne({username:username},function(err,user){
			if(err){
				console.log(err);
			}
			if(user){
				res.json({
					code:-1
				});
			}else if(!user){
				User.update({id:id},{username : username},function(err){
		    		if(err){console.log(err);}
	    			User.findOne({id:id},function(err,user){
	    				req.session['loginuser'] = user.toJSON();
	    				res.json({
	    					code:1
	    				});
	    			});
		    	});
			}
		});
	}
	
	exports.post_updateSex = function(req,res){
		var User =  App.rest.getModel('user');
		var sex = req.body['sex'];
		var id = req.body['id'];
		
		User.update({id:id},{sex:sex},function(err){
			if(err){console.log(err);}
			User.findOne({id:id},function(err,user){
				req.session['loginuser'] = user.toJSON();
				res.json({
					code:1
				});
			});
		})
	}
	
	
	exports.showPerson_addr = function(req,res){
		var loginuser = req.session['loginuser'];
			if(loginuser){
    			res.render('person_addr.html',{
    				loginuser:loginuser
    			});
		    	}else{
		    		res.render('login.html',{
		    		});
		    	}
    }
	
	exports.post_updateAddress = function(req,res){
		var User =  App.rest.getModel('user');
		var address = req.body['address'];
		var id = req.body['id'];
		
		User.update({id:id},{address:address},function(err){
			if(err){console.log(err);}
			User.findOne({id:id},function(err,user){
				req.session['loginuser'] = user.toJSON();
				res.json({
					code:1
				});
			});
		})
	}
	
	exports.showPerson_phone = function(req,res){
		var loginuser = req.session['loginuser'];
		if(loginuser){
			res.render('person_phone.html',{
	    		loginuser:loginuser
	    	});
	    	}else{
	    		res.render('login.html',{
	    		});
	    	}
    	
    }
	
	exports.post_updateMobile = function(req,res){
		var User =  App.rest.getModel('user');
		var mobile = req.body['mobile'];
		var id = req.body['id'];
		
		User.findOne({mobile:mobile},function(err,user){
			if(err){console.log(err);}
			if(user){
				res.json({
					code:-1
				});
			}else{
				User.update({id:id},{mobile:mobile},function(err){
					if(err){console.log(err);}
					User.findOne({id:id},function(err,user){
						req.session['loginuser'] = user.toJSON();
						res.json({
							code:1
						});
					});
				});
			}
		});
	}
	
	exports.showPerson_password = function(req,res){
		var loginuser = req.session['loginuser'];
		if(loginuser){
			res.render('person_password.html',{
    		loginuser:loginuser
		});
    	}else{
    		res.render('login.html',{
    		});
    	}
    	
    }
	
	exports.post_updatePassword = function(req,res){
		var User =  App.rest.getModel('user');
		var oldpassword = req.body['oldpassword'];
		var newpassword = req.body['newpassword'];
		var id = req.body['id'];
		
		User.findOne({id:id},function(err,user){
			if(user.password == oldpassword){
				User.update({id:id},{password:newpassword},function(err){
					if(err){console.log(err);}
					res.json({
						code:1
					});
				});
			}else{
				res.json({
					code:-1
				});
			}
		});
	}
	
	exports.post_signOut=function(req,res){
		delete req.session['loginuser'];
		res.json({
			code:1
		})
	}
	
	





