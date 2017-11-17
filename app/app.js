var express = require('express');
var reload = require('reload');
var app = express();
var io = require('socket.io')();
var mongoose = require('mongoose');
var User = require('../app/models/user');
var Message = require('../app/models/message');
var usersList = [];

app.set('port',process.env.PORT || 3000);
app.set('view engine','ejs');
app.set('views','./app/views');

app.use(express.static('./app/public'));
app.use(require('./routes/api'));
app.use(require('./routes/chat'));
app.use(require('./routes/index'));
app.use(require('./routes/signUp'));

server = app.listen(app.get('port'),function(){
	console.log('Listening on port '+app.get('port'));
});

mongoose.connect('mongodb://localhost/chat');
var db = mongoose.connection;

io.attach(server);

io.on('connection', function(socket){
	console.log('User Connected');
	
	User.getUsers(function(err, users){
		if(err){
			throw err;
		}
		io.emit('setUsers', users);
	});

	socket.on('username', function(userName) {
      	usersList[userName.user] = socket.id;
    });


	socket.on('postMessage', function(data){
		console.log(data);
		Message.saveUserMessage(data,function(err,data){
			if(err){
				throw err;
			}
			io.emit('newMessages');
		});
	});

	socket.on('getMessages', function(users){
		Message.getUserMessages(users,function(err,data){
			if(err){
				throw err;
			}
			socket.emit('updateMessages',data);
		});
	});

	socket.on('disconnect', function(){
		console.log('user Disconnected');
	});
});

reload(server,app);