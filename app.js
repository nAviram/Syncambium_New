/**
 * Module dependencies.
 */

var express = require('express');
var app = express();
var routes = require('./routes/routes');
//var user = require('./routes/user');
var http = require('http').createServer(app);
var path = require('path');
var passport = require('./auth');

var io = require('socket.io');
var chatter = require('chatter');
var DBconnector = require('mySQLconnect');

// all environments
app.set('port', process.env.PORT || 8080);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session({ secret: 'keyboard cat' }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.bodyParser());

app.use(app.router);

// development only
if ('development' === app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.login);
app.get('/login', routes.login);
app.get('/user', routes.user);
app.get('/failed', routes.failed);



app.post('/login', passport.authenticate('local',{
	failureRedirect:'failed',
	successRedirect:'user'
//	successRedirect: app.post('chat', function(req,res){
//		res.sendfile('views/chat.html');
//	})
}));

var chat_room = io.listen(http);

chatter.set_sockets(chat_room.sockets);

chat_room.sockets.on('connection', function (socket) {
  chatter.connect_chatter({
    socket: socket,
    username: passport.passId,
	DBconnector: DBconnector
  });
});

var server = http.listen(app.get('port'), function(){
	console.log('Express server listening on port ' + app.get('port'));
	});

exports = server;
