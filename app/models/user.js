var mongoose = require('mongoose');


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

var User = module.exports = mongoose.model('User',userSchema);

// Get Users
module.exports.getUsers = function(callback, limit){
	User.find(callback).limit(limit);
};

// Get User
module.exports.getUserById = function(id, callback){
	User.findById(id, callback);
};

// Add user
module.exports.addUser = function(user, callback){
	User.create(user, callback);
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