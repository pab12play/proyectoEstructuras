var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var cookieParser = require('cookie-parser');

router.use(cookieParser());

router.get('/chat', function(request,response){
	jwt.verify(request.cookies['token'], 'my_secret_key', function(err, data){
		if(err){
			response.sendStatus(403);
		}else{
			response.render('chat');
		}
	});
});

function ensureToken(request, response, next){
	var bearerHeader = request.headers["authorization"];
	if(typeof bearerHeader !== 'undefined'){
		var bearer = bearerHeader.split(" ");
		var bearerToken = bearer[1];
		request.token = bearerToken;
		next();
	}else{
		response.sendStatus(403);
	}
}


module.exports = router;