$('.formUser').submit(function(e) {
	e.preventDefault();
	$.post('/api/user/login',{
		user: $('#user').val(),
		pass: $('#pass').val()
	}, function(){
		alert("Login successful");
		window.location = "/";
	})
	.fail(function(){
		alert("Incorrect user or password");
	});
});