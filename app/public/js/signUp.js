$('.formUser').submit(function(e) {
	e.preventDefault();
	var data = {"user":$('#user').val(),"pass":$('#pass').val()};
	$.ajax({
		type: "post",
		url: "/api/user",
		data:JSON.stringify(data),
		contentType:"applicaction/json; charset=utf-8",
		dataType: "json"
	});
});



/*

$('.formUser').submit(function(e) {
	e.preventDefault();
	$.post('/api/user',{
		name: $('#user').val(),
		pass: $('#pass').val()
	});
});

$.ajax({
	type: verb,
	url: route,
	data:JSON.stringify(data),
	contentType:"applicaction/json; charset=utf-8",
	dataType: "json";
	success: callbackSuccess,
	error: callbackError
}):

*/