"use strict";

var querystring = require("querystring");
var url = require("url");

module.exports = function (req, res, done) {
	req.query = querystring.parse(url.parse(req.url).query);

	res.setHeader("Sample-Header", "Hello World");
	res.setHeader("Empty-Header", "");
	res.setHeader("Sample-Header2", "Hello World 2");
	res.statusCode = 200;

	var keys = req.query.keys.split("_"), buf = "", i;

	for (i = 0; i < keys.length; i++) {
		buf += keys[i] + ": " + (req.headers[keys[i].toLowerCase()] || "") + "\n";
	}

	res.end(buf);
	done();
};
//5
