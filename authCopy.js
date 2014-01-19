
//var DBconnector = require('mySQLconnect');

var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;

module.exports = passport;

passport.use(new LocalStrategy(
  function(username, password, done){
	//this.username = username;
	console.log(username + "+" +password) ;
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


//module.exports = passId;
