
exports.user_avatar = function(userid){
	return userid.substr(0,2) + "/" + userid + ".png"
}