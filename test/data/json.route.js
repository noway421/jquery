"use strict";

var querystring = require("querystring");
var url = require("url");

module.exports = function (req, res, done) {
	req.query = querystring.parse(url.parse(req.url).query);
	if (req.query.header) {
		res.setHeader("Content-Type", "application/json");
	}
	res.statusCode = 200;

	if (req.query.json) {
		//res.send('[ {"name": "John", "age": 21}, {"name": "Peter", "age": 25 } ]');
		res.end(JSON.stringify([ {name: "John", age: 21}, {name: "Peter", age: 25 } ]));
	} else {
		//res.send('{ "data": {"lang": "en", "length": 25} }');
		res.end(JSON.stringify({ data: {lang: "en", length: 25} }));
	}
	done();
};
//5
