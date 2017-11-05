var http = require('http');

var myServer = http.createServer(function(request,response)
{
	response.writeHead(200,{"Content-Type":"text/plain"});

	response.write("Hello world");
	response.end();
});

myServer.listen(3000);