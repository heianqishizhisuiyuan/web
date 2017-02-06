
var Sequelize = require('sequelize');

var logger = require("../logger").getLog("sql");
logger.setLevel('info');

var mysql = new Sequelize('solo_leg', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },
  logging:function(info){    
    //logger.info(info);
  },
  define: {
      charset: 'utf8',
      collate: 'utf8_general_ci'
  }
});

Sequelize.tdn = function(type,dvalue,allowNull,primaryKey){
  return {
    type : type,
    defaultValue : dvalue,
    allowNull : allowNull,
    primaryKey : primaryKey
  }
}

mysql.Sequelize = Sequelize;

module.exports = mysql;