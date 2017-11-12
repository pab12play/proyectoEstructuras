var express = require('express');
var reload = require('reload');
var app = express();
var io = require('socket.io')();

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

io.attach(server);

io.on('connection', function(socket){
	console.log('User Connected');

	socket.on('postMessage', function(data){
		io.emit('updateMessages', data);
	});

	socket.on('disconnect', function(){
		console.log('user Disconnected');
	});
});

reload(server,app);