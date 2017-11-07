var express = require('express');
var router = express.Router();

router.get('/',function(request,response){
	var info = '';
	var dataFile = request.app.get('appData');
	dataFile.speakers.forEach(function(item){
		info += `
		<li>
			<h2>${item.name}</h2>
			<p>${item.summary}</p>
		</li>
		`
	});
	response.send(`
			<h1>Hello</h1>
			${info}
			<script src="/reload/reload.js"></script>
		`);
});



module.exports = router;