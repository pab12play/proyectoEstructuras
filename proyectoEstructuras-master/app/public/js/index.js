$('.formUser').submit(function(e) {
	e.preventDefault();
	$.post('/api/user/login',{
		user: $('#user').val(),
		pass: $('#pass').val()
	}, function(data){
		alert("Login successful");
		window.localStorage.setItem("user",data.user);
		window.localStorage.setItem("token",data.token);
		document.cookie='token='+ data.token;
		window.location = "/chat";
	})
	.fail(function(){
		alert("Incorrect user or password");
	});
});