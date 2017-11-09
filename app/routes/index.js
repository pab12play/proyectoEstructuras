var express = require('express');
var router = express.Router();
var fs = require('fs');
var data = require('../data/data.json');

router.get('/',function(request,response){
	response.render('index');
});

router.post('/',function(request,response){
	console.log(request.body.user);
	response.render('index');
});

module.exports = router;