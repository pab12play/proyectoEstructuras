$('.formUser').submit(function(e) {
		e.preventDefault();
		$.post('/',{
			user:$('#user').val(),
			pass:$('#pass').val()
		});
	});