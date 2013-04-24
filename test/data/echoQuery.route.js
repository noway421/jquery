"use strict";

var url = require("url");

module.exports = function (req, res, done) {
	req.query = url.parse(req.url).query;
	var get = req.query;

	res.setHeader("Content-Type", "text/plain");
	res.statusCode = 200;
	res.end(get);
	done();
};

//5
