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

router.post('/api/user/login',function(request,response){
	var user1 = request.body;
	User.getUserByName(user1, function(err,user){
		if(err){
			console.log('error '+user);
			throw err;
		}
		if(user.user===user1.user&&user.pass===user1.pass){
			response.json(user);
		}else{
			response.status(401).send({
			   message: 'User does not exist'
			});
		}
	});	
});

router.post('/api/user',function(request,response){
	var user1 = request.body;
	User.getUserByName(user1, function(err,user){
		if(err){
			console.log('error '+user);
			throw err;
		}
		if(user===null){
			User.addUser(user1, function(err, user2){
				if(err){
					console.log('error '+user2);
					throw err;
				}
				console.log('User '+user2+' created');
				response.json(user2);
			});
		}else{
			response.status(401).send({
			   message: 'User already exists'
			});
		}
	});	
});

router.put('/api/user/:_id',function(request,response){
	var id = request.params._id;
	var user = request.body;
	User.updateUser(id, user, {}, function(err, user){
		if(err){
			throw err;
		}
		console.log('User '+user+' updated');
		response.json(user);
	});
});


router.delete('/api/user/:_id',function(request,response){
	var id = request.params._id;
	User.dleteUser(id, function(err, user){
		if(err){
			throw err;
		}
		console.log('User '+id+' deleted');
		response.json(user);
	});
});

module.exports = router;