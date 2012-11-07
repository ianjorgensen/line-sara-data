var http = require('http');
var route = require('router')();
var parse = require('./parse').parse;

var port = process.argv[2] || 9090;

route.get('/sara', function(req, res) {
	parse('./data.csv', function(err, data) {
		res.writeHead(err ? 500 : 200, {'Content-Type': 'text/plain'});
		res.end(data);	
	})
});

route.all('*', function(request, response) {
	response.writeHead(404);
	response.end('404');
});

http.createServer(route).listen(port);

console.log('server running on port',port);

process.on('uncaughtException', function(err) { console.log(err.stack) });