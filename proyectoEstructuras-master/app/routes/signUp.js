var express = require('express');
var router = express.Router();

router.get('/signUp',function(request,response){
	response.render('signUp');
});

/*
router.use(bodyParser.json());

router.post('/signUp',function(request,response){
	data.unshift(request.body);
	fs.writeFile('app/data/data.json',JSON.stringify(data),'utf8',function(error){
		console.log(error);
	});
	response.json(data);
});

*/

module.exports = router;
