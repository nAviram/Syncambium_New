
var io = require('socket.io'),
	connect = require('connect'),
	chatter = require('chatter'),
	DBconnector = require('mySQLconnect'),
	app = require('./app');
  
//var app = connect().use(connect.static('public')).listen(3000);


//TODO: make more rooms 