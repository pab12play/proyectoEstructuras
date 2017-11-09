var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var User = require('../../app/models/user');

// parse application/x-www-form-urlencoded
router.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
router.use(bodyParser.json())

mongoose.connect('mongodb://localhost/chat');
var db = mongoose.connection;

router.get('/api/user',function(request,response){
	User.getUsers(function(err, users){
		if(err){
			throw err;
		}
		response.json(users);
	});
});

router.get('/api/user/:_id',function(request,response){
	User.getUserById(request.params._id,function(err, user){
		if(err){
			throw err;
		}
		response.json(user);
	});
});

router.post('/api/user',function(request,response){
	var user = request.body;
	console.log(user);
	User.addUser(user, function(err, user){
		if(err){
			console.log('error '+user);
			throw err;
		}
		console.log('user inserted');
		response.json(user);
	});
});

router.put('/api/user/:_id',function(request,response){
	var id = request.params._id;
	var user = request.body;
	User.updateUser(id, user, {}, function(err, user){
		if(err){
			throw err;
		}
		response.json(user);
	});
});


router.delete('/api/user/:_id',function(request,response){
	var id = request.params._id;
	User.dleteUser(id, function(err, user){
		if(err){
			throw err;
		}
		response.json(user);
	});
});

module.exports = router;