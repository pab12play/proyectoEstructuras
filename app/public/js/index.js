$('.formUser').submit(function(e) {
	e.preventDefault();
	$.post('/api/user/login',{
		user: $('#user').val(),
		pass: $('#pass').val()
	}, function(data){
		alert("Login successful");
		console.log(data);
		window.localStorage.setItem("session",data);
		document.cookie='token='+ data.token;
		window.location = "/chat";
	})
	.fail(function(){
		alert("Incorrect user or password");
	});
});