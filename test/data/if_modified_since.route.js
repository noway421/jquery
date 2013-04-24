"use strict";

var querystring = require("querystring");
var url = require("url");

module.exports = function (req, res, done) {
	req.query = querystring.parse(url.parse(req.url).query);

	var
		ts = req.query.ts,
		ifModifiedSince = req.headers["if-modified-since"] || false;

	if (ifModifiedSince === ts) {
		res.statusCode = 304;
		res.end(null);
		done();
		return;
	}
	res.setHeader("Last-Modified", ts);
	res.statusCode = 200;

	if (ifModifiedSince) {
		res.end("OK:" + ts);
	} else {
		res.end("FAIL");
	}
	done();
};
//5
