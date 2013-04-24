"use strict";

var querystring = require("querystring");
var url = require("url");

module.exports = function (req, res, done) {
	req.query = querystring.parse(url.parse(req.url).query);
	var header = req.query.header;

	res.statusCode = 200;
	if (header) {
		if (header === "ecma") {
			res.setHeader("Content-Type", "application/ecmascript");
		} else {
			res.setHeader("Content-Type", "text/javascript");
		}
	}
	res.end("ok( true, 'Script executed correctly.' );");
	done();
};
//5
