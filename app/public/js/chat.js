var socket = io();
var chatUsername = document.querySelector('#chat-username');
var chatMessage = document.querySelector('#chat-message');

socket.on('connect', function(){
	var chatForm = document.forms.chatForm;
		
	chatForm.addEventListener('submit',function(e){
		e.preventDefault();

		socket.emit('postMessage', {
			username : chatUsername.value,
			message: chatMessage.value
		});

		chatMessage.value='';
		chatMessage.focus();
	});

	socket.on('updateMessages',function(data){
		showMessage(data);
	});	

	socket.on('setUsers',function(data){
		$('#radios').empty();
		jQuery.each(data, function(i, val) {
			var label = document.createElement("label");
			var x = document.createElement("input");
			x.setAttribute("type", "radio");
			x.name = "Radios1";
			x.value = val.user;
			label.appendChild(x);
			label.appendChild(document.createTextNode(val.user));
			$('#radios').append(label);
			$('#radios').append('</br>');
		});
	});
});


function showMessage(data){
	var chatDisplay = document.querySelector('.chat-display');
	var newMessage = document.createElement('p');
	newMessage.innerHTML = '<strong>' + data.username + '</strong>: '+ data.message;
	chatDisplay.insertBefore(newMessage, chatDisplay.firstChild);
}

