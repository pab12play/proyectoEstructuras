var mongoose = require('mongoose');


// User Schema
var messageSchema = mongoose.Schema({
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

var Message = module.exports = mongoose.model('message',messageSchema);

// Get Users
module.exports.getMessage = function(callback, limit){
	Message.find(callback).limit(limit);
};
