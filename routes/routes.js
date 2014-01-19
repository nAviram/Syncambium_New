//routes module
/*
 * GET home page.
 */
path = require('path');

exports.login = function(req, res){
  //res.render('index', { title: 'Express' });
  res.render('login',{title:'Login'});
};
exports.user = function(req,res){
	if (req.session.passport.user === undefined){
        res.redirect('/login');
    }else{
      //console.log("LOG: ROUTES.user - req: " + req.user);
      //res.render('user', {title: 'Welcome!', user: req.user});
	//res.redirect('/chat.html');
      res.sendfile('chat.html', {'root': './views/'});
      //res.render('chat');
    }
};
exports.failed = function(req, res){
  //res.render('index', { title: 'Express' });
  res.render('failed',{title:'Login Failed'});
};
 