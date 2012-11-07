var fs = require('fs');
var common = require('common');

var parse = function(file, cb) {
	var numbers = '';

	fs.readFile(file, 'utf8', function (err,data) {
	  if (err) {
	    cb(err);
	  }

	  var lines = data.split('\n');
	  
	  for (var i in lines) {
	  	var line = lines[i];

	  	if (line[0] === '"') {
	  		var parts = line.split(',');
	  		var date = new Date(parts[0] + parts[1]);

	  		if (date < Date.now()) {
	  			numbers += common.format('{0} {1}\n', datify(date), parts[2]);
	  		}
	  	}
	  }

	  cb(null, numbers);
	});
}
exports.parse = parse;

var datify = function(date) {
	return common.format('{0}/{1}/{2} {3}:{4}:{5}',date.getMonth(),date.getDay(),date.getFullYear(),date.getHours() || '00',date.getMinutes() || '00',date.getSeconds() || '00');
}