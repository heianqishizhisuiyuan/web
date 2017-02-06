var log4js = require('log4js');
log4js.loadAppender('file');

exports.getLog = function(type){
	log4js.addAppender(log4js.appenders.file('logs/'+type+'.log'), type);
	return log4js.getLogger(type);
}
