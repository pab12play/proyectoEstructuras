var mongoose = require('mongoose');
var edge = require('edge');
var clrMethod = edge.func('./app/data/RSA.dll');




// Message Schema
var messageSchema = mongoose.Schema({
	sender:{
		type: String,
		required: true
	},
	recipient:{
		type: String,
		required: true
	},
	message:{
		type: String,
		required: true
	},
	file:{
		type: String,
		required: false
	},
	create_date:{
		type: Date,
		default:Date.now
	}
});

var Message = module.exports = mongoose.model('message',messageSchema);

// Get User Messages
module.exports.getUserMessages = function(users, callback){
	Message.find({$or:[{sender:users.sender,recipient:users.recipient},{sender:users.recipient,recipient:users.sender}]}, callback);
};

// Save User Messages
module.exports.saveUserMessage = function(data, callback){
	var parameters = {
	    uno: '-c',
	    dos: '-f',
	    tres: data.message
	};
	clrMethod(parameters, function (error, result) {
	    if (error) throw error;
	    data.message = result;
	    Message.create(data, callback);
	});
};

module.exports.decipherMessage = function(data){
		var parameters = {
	    uno: '-d',
	    dos: '-f',
	    tres: data.message
	};
	clrMethod(parameters, function (error, result) {
	    if (error) throw error;
	    data.message = result;
	    return data;
	});
};


/*
// Get Users
module.exports.getUsers = function(callback, limit){
	User.find(callback).limit(limit);
};

// Get User
module.exports.getUserById = function(id, callback){
	User.findById(id, callback);
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

*/