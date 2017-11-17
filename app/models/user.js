var mongoose = require('mongoose');
var edge = require('edge');

// User Schema
var userSchema = mongoose.Schema({
	user:{
		type: String,
		required: true
	},
	pass:{
		type: String,
		required: true
	},
	create_date:{
		type: Date,
		default:Date.now
	}
});

var clrMethod = edge.func('./app/data/RSA.dll');



var User = module.exports = mongoose.model('User',userSchema);

// Get Users
module.exports.getUsers = function(callback, limit){
	User.find({},{_id:0,pass:0,create_date:0,__v:0},callback);
};

// Get User
module.exports.getUserById = function(id, callback){
	User.findById(id, callback);
};

// Get User
module.exports.getUserByName = function(user, callback){
	var parameters = {
	    uno: '-c',
	    dos: '-f',
	    tres: user.pass
	};
	clrMethod(parameters, function (error, result) {
	    if (error) throw error;
	    User.findOne({"user":user.user,"pass":result}, callback);
	});
};

// Add user
module.exports.addUser = function(user, callback){
	var parameters = {
	    uno: '-c',
	    dos: '-f',
	    tres: user.pass
	};
	clrMethod(parameters, function (error, result) {
	    if (error) throw error;
	    User.create({user:user.user,pass:result}, callback);
	});
};

// Update user
module.exports.updateUser = function(id, user, options, callback){
	var query = {_id:id};
	var update = {
		user: user.user,
		pass: user.pass
	}
	User.findOneAndUpdate(query, update, options, callback);
};

// Delete user
module.exports.deleteUser = function(id, callback){
	var query = {_id:id};
	User.remove(query, callback);
};