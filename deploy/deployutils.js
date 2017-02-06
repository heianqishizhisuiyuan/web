
//js
var fs = require('fs'),
	jsp = require("uglify-js").parser,
	pro = require("uglify-js").uglify,
	cleanCSS = require('clean-css');

exports.minifyJs = function(fileIn, fileOut,source) {
     fileIn=Array.isArray(fileIn)? fileIn : [fileIn];
     var origCode,ast,finalCode='';
     for(var i=0; i<fileIn.length; i++) {
    	 origCode = fs.readFileSync(fileIn[i], 'utf8');
        
        if(!source){
        	ast = jsp.parse(origCode);
        	ast = pro.ast_mangle(ast);
            ast= pro.ast_squeeze(ast);
        	ast = pro.gen_code(ast);
        }else{
        	ast = origCode;
        }
       /// ast = jsp.parse(origCode);
        
        finalCode +=';\n//#'+fileIn[i]+"\n"+ ast; //pro.gen_code(ast);
     }
	finalCode +=";\n"
    fs.writeFileSync(fileOut, finalCode, 'utf8');
};
 

exports.minifyCss = function(fileIn, fileOut) {
     fileIn=Array.isArray(fileIn)? fileIn : [fileIn];
     var origCode,finalCode='';
     for(var i=0; i<fileIn.length; i++) {
        origCode = fs.readFileSync(fileIn[i], 'utf8');
        finalCode += '\n/*#'+fileIn[i]+"*/\n"+ cleanCSS.process(origCode);
     }
    fs.writeFileSync(fileOut, finalCode, 'utf8');
};
