
var schedule = require("node-schedule");

exports.everyHour = function(callback){
	var rule = new schedule.RecurrenceRule();
	rule.minute = 0;
	rule.second = 10;
	return schedule.scheduleJob(rule, callback);
}

exports.everyDay = function(callback){
	var rule = new schedule.RecurrenceRule();
	rule.hour = 0;
　　rule.minute = 0;
	return schedule.scheduleJob(rule, callback);
}

exports.everyWeek = function(callback){
	var rule = new schedule.RecurrenceRule();
	rule.dayOfWeek = 1;
	rule.hour = 0;
	rule.minute = 1;
	return schedule.scheduleJob(rule, callback);
}

exports.everyMonth = function(callback){
	var rule = new schedule.RecurrenceRule();
	rule.date = 1;
	rule.hour = 0;
　　rule.minute = 2;
	return schedule.scheduleJob(rule, callback);
}