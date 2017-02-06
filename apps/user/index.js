exports.app_dir = __dirname;
var user = require("./user_");
var metamodel = require("./meta-model");  
exports.route = function(app,remoter){
    app.get("../login.html",user.showLogin);  
    app.get("../Lregist.html",user.showRegist);
    app.get("../myinfo.html",user.showInfo);  	
    app.get("../person.html",user.showPerson);
    app.get("../person_name.html",user.showPerson_name);
    app.get("../person_addr.html",user.showPerson_addr);
    app.get("../person_phone.html",user.showPerson_phone);
    app.get("../person_password.html",user.showPerson_password);
   
    remoter.bind(user);
}