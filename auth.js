
var DBconnector = require('mySQLconnect');

var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;

var passId;



passport.use(new LocalStrategy(
  function(username, password, done){
	//this.username = username;
	console.log(username + "+" +password) ;
	//var res = DBconnector.querySelectUser({username:username, password:password});
	DBconnector.connection.query("SELECT * from Simpoze.TBusers WHERE (USERNAME ='admin123' AND PASSWORD = '123')", function(err, rows){
		console.log(err || rows);
		
		//if (username === 'admin' && password === '123'){
		if (rows && rows[0] && rows[0].username === username && rows[0].password === password){
			passId = username;
			return done(null, {username: username, id: password});
		}else{
			return done(null, false);
		}
	});
/*
    User.findOne({ username: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
*/
  }
));

passport.serializeUser(function(user, done) {
  console.log("USER: "+user.username + "| ID: "+user.id);
  //console.log(password);
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  //User.findById(id, function(err, user) {
  //  done(err, user);
  //});
    console.log("deserializeUser");
    done(null, {id:id});
});


module.exports = passId;
module.exports = passport;